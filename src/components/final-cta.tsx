import { Sparkles } from "lucide-react"
import { CheckoutConsent } from "./checkout-consent"

export function FinalCTA() {
  return (
    <section className="py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-br from-indigo-500/20 to-pink-600/20 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-cyan-500/10 to-blue-600/10 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-8 border border-white/20">
          <Sparkles className="w-4 h-4 mr-2" />O próximo passo para sua evolução digital
        </div>

        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight animate-fade-in-up">
          Transforme sua abordagem: <span className="block text-gradient-purple">com a IA ao seu lado</span>
        </h2>

        <p
          className="text-xl text-blue-100 mb-12 leading-relaxed max-w-3xl mx-auto animate-fade-in-up"
          style={{ animationDelay: "0.2s" }}
        >
          Inicie sua jornada com a inteligência artificial. Posicione-se à frente no mercado digital.
        </p>

        <div
          className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16 animate-fade-in-up"
          style={{ animationDelay: "0.4s" }}
        >
          <CheckoutConsent />

          <div className="text-center">
            <p className="text-blue-100 text-sm flex items-center justify-center">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
              Flexibilidade total: cancele quando quiser
            </p>
            <p className="text-blue-100 text-sm flex items-center justify-center">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
              Suporte ClicLoop • Otimize seu potencial
            </p>
          </div>
        </div>

        <div
          className="grid grid-cols-2 md:grid-cols-3 gap-12 text-center animate-fade-in-up"
          style={{ animationDelay: "0.6s" }}
        >
          <div className="group">
            <div className="text-2xl font-bold text-white mb-2 group-hover:scale-110 transition-transform">
              24 horas
            </div>
            <div className="text-blue-200 text-sm">por dia todos os dias</div>
          </div>
          <div className="group">
            <div className="text-4xl font-bold text-white mb-2 group-hover:scale-110 transition-transform">∞</div>
            <div className="text-blue-200 text-sm">Uso Ilimitado</div>
          </div>
          <div className="group col-span-2 md:col-span-1">
            <div className="text-4xl font-bold text-gradient-purple mb-2 group-hover:scale-110 transition-transform">
              R$29,90
            </div>
            <div className="text-blue-200 text-sm">Por mês</div>
          </div>
        </div>
      </div>
    </section>
  )
}
