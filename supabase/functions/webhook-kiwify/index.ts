import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.53.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const SUPABASE_URL = Deno.env.get("SUPABASE_URL") || "https://egrohrtaazpahdwsvzsu.supabase.co";
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

function json(body: unknown, init: ResponseInit = {}) {
  return new Response(JSON.stringify(body), {
    headers: { "Content-Type": "application/json", ...corsHeaders },
    ...init,
  });
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return json({ error: "Method Not Allowed" }, { status: 405 });
  }

  try {
    if (!SERVICE_ROLE_KEY) {
      console.error("Missing SERVICE_ROLE_KEY");
      return json({ ok: false }, { status: 500 });
    }

    const raw = await req.text();
    let payload: any;
    try {
      payload = JSON.parse(raw || "{}");
    } catch (e) {
      console.error("Invalid JSON", e);
      // Return 200 to avoid provider retries but note invalid
      return json({ ok: true, note: "invalid_json" });
    }

    // Attempt to normalize fields from Kiwify
    const status = (payload?.status || payload?.data?.status || payload?.event?.status || "").toString().toLowerCase();
    const email = (payload?.email || payload?.customer?.email || payload?.buyer?.email || payload?.data?.customer?.email || "").toString().trim();
    const name = (payload?.name || payload?.customer?.name || payload?.buyer?.name || payload?.data?.customer?.name || email).toString();

    console.log("webhook-kiwify incoming:", { status, email });

    // Always return 200 for non-approved to acknowledge receipt
    if (status !== "approved") {
      return json({ ok: true, ignored: true });
    }

    if (!email) {
      console.warn("Approved payment without email");
      return json({ ok: true, note: "missing_email" });
    }

    const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

    // Find or create auth user by email
    let userId: string | null = null;

    try {
      // Prefer getUserByEmail if available
      // @ts-ignore - some versions expose getUserByEmail
      if (supabase.auth?.admin?.getUserByEmail) {
        // @ts-ignore
        const { data: byEmail, error: byEmailErr } = await supabase.auth.admin.getUserByEmail(email);
        if (byEmail?.user?.id) userId = byEmail.user.id;
        if (byEmailErr) console.warn("getUserByEmail error", byEmailErr);
      }
    } catch (e) {
      console.warn("getUserByEmail not available", e);
    }

    if (!userId) {
      const { data: created, error: createErr } = await supabase.auth.admin.createUser({
        email,
        email_confirm: true,
        user_metadata: { nome: name },
      });
      if (created?.user?.id) {
        userId = created.user.id;
      } else {
        // If user already exists (e.g., conflict), try to list and find by email as fallback
        console.warn("createUser error or no id", createErr);
        try {
          // @ts-ignore
          const { data: list } = await supabase.auth.admin.listUsers({ page: 1, perPage: 1000 });
          const existing = list?.users?.find((u: any) => (u.email || "").toLowerCase() === email.toLowerCase());
          if (existing?.id) userId = existing.id;
        } catch (e) {
          console.warn("listUsers fallback failed", e);
        }
      }
    }

    if (!userId) {
      console.error("Could not resolve userId for email", email);
      return json({ ok: true, note: "user_not_resolved" });
    }

    // Ensure profile exists and set plano_ativo = true
    const { data: profile, error: profileErr } = await supabase.from("profiles").select("id").eq("id", userId).maybeSingle();
    if (profileErr) console.warn("select profile error", profileErr);

    if (!profile) {
      const { error: insertErr } = await supabase.from("profiles").insert({
        id: userId,
        nome: name || email,
        plano_ativo: true,
      });
      if (insertErr) {
        console.error("insert profile error", insertErr);
      }
    } else {
      const { error: updateErr } = await supabase.from("profiles").update({ plano_ativo: true }).eq("id", userId);
      if (updateErr) {
        console.error("update profile error", updateErr);
      }
    }

    // Acknowledge successfully
    return json({ ok: true });
  } catch (e) {
    console.error("webhook-kiwify error", e);
    // Return 200 to avoid retries but log the error
    return json({ ok: true, note: "exception" });
  }
});
