import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.53.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-api-key",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

// Supabase project URL (public URL is safe to embed)
const SUPABASE_URL = "https://egrohrtaazpahdwsvzsu.supabase.co";

// Secrets from Lovable/Supabase environment
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
const ACCEPT_API_KEY = Deno.env.get("ACCEPT_API_KEY");
const TERMS_URL = Deno.env.get("TERMS_URL");
const TERMS_SERVER_SECRET = Deno.env.get("TERMS_SERVER_SECRET");

function jsonResponse(body: unknown, init: ResponseInit = {}) {
  return new Response(JSON.stringify(body), {
    headers: { "Content-Type": "application/json", ...corsHeaders },
    ...init,
  });
}

function textEncoder() { return new TextEncoder(); }

async function sha256Hex(input: string): Promise<string> {
  const data = textEncoder().encode(input);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return [...new Uint8Array(hash)].map(b => b.toString(16).padStart(2, "0")).join("");
}

async function hmacSHA256Hex(secret: string, dataStr: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    textEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, textEncoder().encode(dataStr));
  return [...new Uint8Array(signature)].map(b => b.toString(16).padStart(2, "0")).join("");
}

function isValidEmail(email: string): boolean {
  // Simple RFC5322-like check (good enough for basic validation)
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (req.method !== "POST") {
      return jsonResponse({ error: "Method Not Allowed" }, { status: 405 });
    }

    if (!SERVICE_ROLE_KEY) {
      // Misconfiguration on server
      return jsonResponse({ error: "Server misconfigured" }, { status: 500 });
    }

    // Validate API key header
    const apiKey = req.headers.get("x-api-key");
    if (!ACCEPT_API_KEY || !apiKey || apiKey !== ACCEPT_API_KEY) {
      return jsonResponse({ error: "Unauthorized" }, { status: 401 });
    }

    // Enforce content type
    const contentType = req.headers.get("content-type") || "";
    if (!contentType.toLowerCase().includes("application/json")) {
      return jsonResponse({ error: "Content-Type must be application/json" }, { status: 415 });
    }

    // Size limit: 10KB
    const rawText = await req.text();
    const byteLen = textEncoder().encode(rawText).length;
    if (byteLen > 10 * 1024) {
      return jsonResponse({ error: "Payload too large (max 10KB)" }, { status: 413 });
    }

    let payload: any;
    try {
      payload = JSON.parse(rawText);
    } catch {
      return jsonResponse({ error: "Invalid JSON body" }, { status: 400 });
    }

    const {
      email,
      user_id,
      terms_version,
      metodo,
      checkout_session_id,
      terms_text,
    } = payload ?? {};

    if (!email || typeof email !== "string" || !isValidEmail(email)) {
      return jsonResponse({ error: "Invalid email" }, { status: 400 });
    }

    if (!terms_version || typeof terms_version !== "string" || terms_version.length > 100) {
      return jsonResponse({ error: "Invalid terms_version" }, { status: 400 });
    }

    let metodoValue: string = "post-payment";
    if (typeof metodo === "string") {
      if (metodo !== "pre-payment" && metodo !== "post-payment") {
        return jsonResponse({ error: "Invalid metodo" }, { status: 400 });
      }
      metodoValue = metodo;
    }

    // Capture client info
    const ip = (req.headers.get("x-forwarded-for") || req.headers.get("cf-connecting-ip") || "").split(",")[0].trim() || null;
    const user_agent = req.headers.get("user-agent") || null;

    // Get terms text: either provided or fetched from TERMS_URL
    let finalTermsText = "";
    if (typeof terms_text === "string" && terms_text.trim().length > 0) {
      finalTermsText = terms_text;
    } else {
      if (!TERMS_URL) {
        return jsonResponse({ error: "Server missing TERMS_URL" }, { status: 500 });
      }
      const termsResp = await fetch(TERMS_URL);
      if (!termsResp.ok) {
        return jsonResponse({ error: "Could not fetch terms" }, { status: 502 });
      }
      finalTermsText = await termsResp.text();
    }

    // Hash terms
    const terms_hash = await sha256Hex(finalTermsText);

    // Supabase admin client (service role key is not exposed to the client)
    const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

    // Insert acceptance
    const insertObj: Record<string, unknown> = {
      user_id: typeof user_id === "string" ? user_id : null,
      email,
      ip,
      user_agent,
      terms_version,
      terms_text: finalTermsText,
      terms_hash,
      metodo: metodoValue,
      checkout_session_id: typeof checkout_session_id === "string" ? checkout_session_id : null,
      consentido: true,
    };

    const { data: inserted, error: insertError } = await supabase
      .from("aceites_termos")
      .insert(insertObj)
      .select("id, criado_em")
      .single();

    if (insertError || !inserted) {
      console.error("Insert error aceites_termos:", insertError);
      return jsonResponse({ error: "Failed to insert acceptance" }, { status: 500 });
    }

    // Compute HMAC signature
    if (!TERMS_SERVER_SECRET) {
      return jsonResponse({ error: "Server missing TERMS_SERVER_SECRET" }, { status: 500 });
    }

    const payloadStr = `${inserted.id}|${email}|${terms_hash}|${inserted.criado_em}`;
    const hmac_assinatura = await hmacSHA256Hex(TERMS_SERVER_SECRET, payloadStr);

    // Update record with HMAC
    const { error: updateError } = await supabase
      .from("aceites_termos")
      .update({ hmac_assinatura })
      .eq("id", inserted.id);

    if (updateError) {
      console.error("Update error aceites_termos:", updateError);
      return jsonResponse({ error: "Failed to finalize acceptance" }, { status: 500 });
    }

    // Audit log (table created via migration)
    const { error: logError } = await supabase
      .from("logs_auditoria")
      .insert({
        user_id: typeof user_id === "string" ? user_id : null,
        acao: "ACEITE_TERMS",
        detalhes: { aceite_id: inserted.id },
      });

    if (logError) {
      console.error("Insert error logs_auditoria:", logError);
      // Don't fail the whole request due to logging error
    }

    return jsonResponse({ success: true, id: inserted.id, hmac_assinatura });
  } catch (e) {
    console.error("/api/aceite-termos error:", e);
    return jsonResponse({ error: "Internal Server Error" }, { status: 500 });
  }
});
