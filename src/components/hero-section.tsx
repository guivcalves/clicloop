import { Sparkles, ArrowRight } from "lucide-react"
import { CheckoutConsent } from "./checkout-consent"

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

interface StatItem {
  value: string;
  label: string;
  className?: string;
}

interface BackgroundElement {
  className: string;
  style?: React.CSSProperties;
}

// ============================================================================
// DATA
// ============================================================================

const backgroundElements: BackgroundElement[] = [
  {
    className: "absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-float"
  },
  {
    className: "absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-indigo-400/20 to-pink-600/20 rounded-full blur-3xl animate-float",
    style: { animationDelay: "2s" }
  },
  {
    className: "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-cyan-400/10 to-blue-600/10 rounded-full blur-3xl animate-float",
    style: { animationDelay: "4s" }
  }
];

const floatingElements = [
  {
    className: "absolute -top-6 -right-6 bg-white rounded-full p-4 shadow-premium animate-float",
    icon: <Sparkles className="w-6 h-6 text-blue-600" />
  },
  {
    className: "absolute -bottom-6 -left-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full p-4 shadow-premium animate-float",
    icon: <ArrowRight className="w-6 h-6 text-white" />,
    style: { animationDelay: "1s" }
  },
  {
    className: "absolute top-1/2 -right-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full p-3 shadow-premium animate-float",
    icon: <Sparkles className="w-5 h-5 text-white" />,
    style: { animationDelay: "2s" }
  }
];

const statsData: StatItem[] = [
  {
    value: "24 horas",
    label: "por dia todos os dias"
  },
  {
    value: "∞",
    label: "Uso Ilimitado"
  },
  {
    value: "R$29,90",
    label: "Por mês",
    className: "text-blue-600"
  }
];

// ============================================================================
// COMPONENT
// ============================================================================

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 pt-32 pb-24">
      
      {/* ========================================================================
          ANIMATED BACKGROUND ELEMENTS
      ========================================================================= */}
      <div className="absolute inset-0 overflow-hidden">
        {backgroundElements.map((element, index) => (
          <div
            key={index}
            className={element.className}
            style={element.style}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          
          {/* ========================================================================
              CONTENT SECTION
          ========================================================================= */}
          <div className="text-center lg:text-left animate-slide-in-left">
            
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-blue-700 text-sm font-medium mb-8 border border-white/30">
              <Sparkles className="w-4 h-4 mr-2" />
              Inteligência Artificial para seu negócio
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight mb-8 max-w-4xl mx-auto lg:mx-0">
              Potencialize seu marketing sem a complexidade de{" "}
              <span className="text-gradient-blue">múltiplos profissionais</span>
            </h1>

            {/* Description */}
            <p className="text-lg sm:text-xl text-gray-600 mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Com o ClicLoop, a inteligência artificial otimiza sua presença online, gera ideias e oferece insights
              estratégicos — tudo ilimitado por apenas <span className="font-bold text-blue-600">R$29,90/mês</span>.
            </p>

            {/* CTA Button */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start mb-12">
              <CheckoutConsent />
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-8 text-center lg:text-left max-w-md mx-auto lg:mx-0">
              {statsData.map((stat, index) => (
                <div key={index}>
                  <div className={`text-lg sm:text-xl font-bold text-gray-900 ${stat.className || ''}`}>
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ========================================================================
              HERO VISUAL - DASHBOARD INTERFACE
          ========================================================================= */}
          <div className="relative animate-slide-in-right">
            <div className="relative">
              
              {/* Main Dashboard Card */}
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
                
                {/* Floating Elements */}
                {floatingElements.map((element, index) => (
                  <div
                    key={index}
                    className={element.className}
                    style={element.style}
                  >
                    {element.icon}
                  </div>
                ))}
              </div>

              {/* Glow Effect Behind Dashboard */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-3xl blur-xl opacity-50 -z-10"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
