import { Sparkles, ArrowRight } from "lucide-react"
import { CheckoutConsent } from "./checkout-consent"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 pt-32 pb-24">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-indigo-400/20 to-pink-600/20 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-cyan-400/10 to-blue-600/10 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {" "}
        {/* Adicionado py-12 para mais respiro */}
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Content */}
          <div className="text-center lg:text-left animate-slide-in-left">
            <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-blue-700 text-sm font-medium mb-8 border border-white/30">
              <Sparkles className="w-4 h-4 mr-2" />
              Inteligência Artificial para seu negócio
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight mb-8 max-w-4xl mx-auto lg:mx-0">
              Potencialize seu marketing sem a complexidade de{" "}
              <span className="text-gradient-blue">múltiplos profissionais</span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-600 mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Com o ClicLoop, a inteligência artificial otimiza sua presença online, gera ideias e oferece insights
              estratégicos — tudo ilimitado por apenas <span className="font-bold text-blue-600">R$29,90/mês</span>.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start mb-12">
              <CheckoutConsent />
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 text-center lg:text-left max-w-md mx-auto lg:mx-0">
              <div>
                <div className="text-lg sm:text-xl font-bold text-gray-900">24 horas</div>
                <div className="text-xs sm:text-sm text-gray-600">por dia todos os dias</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-gray-900">∞</div>
                <div className="text-xs sm:text-sm text-gray-600">Uso Ilimitado</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-blue-600">R$29,90</div>
                <div className="text-xs sm:text-sm text-gray-600">Por mês</div>
              </div>
            </div>
          </div>

          {/* Hero Visual - Dashboard Interface */}
          <div className="relative animate-slide-in-right">
            <div className="relative">
              {/* Main dashboard card */}
              <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-6 shadow-premium border border-white/20">
                <div className="bg-white rounded-2xl overflow-hidden shadow-premium-hover">
                <div className="w-full h-96 flex items-center justify-center relative">
  <img 
    src="/rocket-dashboard.jpg" 
    alt="Painel ClicLoop" 
    className="w-full h-full object-cover rounded-lg shadow-lg"
  />
</div>
</div>
                {/* Floating elements */}
                <div className="absolute -top-6 -right-6 bg-white rounded-full p-4 shadow-premium animate-float">
                  <Sparkles className="w-6 h-6 text-blue-600" />
                </div>
                <div
                  className="absolute -bottom-6 -left-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full p-4 shadow-premium animate-float"
                  style={{ animationDelay: "1s" }}
                >
                  <ArrowRight className="w-6 h-6 text-white" />
                </div>
                <div
                  className="absolute top-1/2 -right-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full p-3 shadow-premium animate-float"
                  style={{ animationDelay: "2s" }}
                >
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
              </div>

              {/* Glow effect behind the dashboard */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-3xl blur-xl opacity-50 -z-10"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
