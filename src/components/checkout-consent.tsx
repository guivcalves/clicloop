import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowRight, Loader2 } from "lucide-react"

export function CheckoutConsent() {
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handlePurchase = async () => {
    setError(null)
    setIsLoading(true)

    if (!email) {
      setError("Por favor, insira seu e-mail para continuar.")
      setIsLoading(false)
      return
    }

    // Simular um pequeno delay para mostrar o loading
    await new Promise(resolve => setTimeout(resolve, 500))

    try {
      // Armazenar o email no localStorage para referência futura
      localStorage.setItem('clicloop_user_email', email)
      
      // Redirecionar diretamente para o checkout Kiwify
      window.location.href = "https://pay.cakto.com.br/k2rh6sp_535214"
    } catch (err) {
      console.error("Erro ao redirecionar:", err)
      setError("Ocorreu um erro ao redirecionar para o checkout. Tente novamente.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="w-full max-w-md space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Seu E-mail</Label>
          <Input
            id="email"
            type="email"
            placeholder="seu.email@exemplo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="h-12 text-lg"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="terms"
            checked={acceptedTerms}
            onCheckedChange={(checked) => setAcceptedTerms(!!checked)}
            className="w-5 h-5"
          />
          <Label htmlFor="terms" className="text-xs sm:text-sm whitespace-nowrap cursor-pointer">
            Eu li e aceito os{" "}
            <a
              href="/termos-de-uso"
              className="text-blue-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Termos de Uso
            </a>{" "}
            e a{" "}
            <a
              href="/politica-de-privacidade"
              className="text-blue-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Política de Privacidade
            </a>
            .
          </Label>
        </div>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
      </div>
      <Button
        onClick={handlePurchase}
        disabled={!acceptedTerms || isLoading}
        className="btn-premium w-full max-w-md h-14 text-lg font-semibold"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Processando...
          </>
        ) : (
          <>
            Começar Agora
            <ArrowRight className="w-5 h-5 ml-2" />
          </>
        )}
      </Button>
    </div>
  )
}
