import { MessageSquare, Zap, TrendingUp } from "lucide-react"
import { useEffect, useRef, useState } from "react"

export function HowItWorks() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const steps = [
    {
      icon: MessageSquare,
      title: "Você interage",
      description: "Descreva sua necessidade: conteúdo, análise, ideia ou dúvida de marketing",
      gradient: "from-blue-500 to-cyan-500",
      delay: "0s",
    },
    {
      icon: Zap,
      title: "A IA otimiza em segundos",
      description: "Nossa inteligência artificial processa e entrega soluções estratégicas",
      gradient: "from-purple-500 to-pink-500",
      delay: "0.2s",
    },
    {
      icon: TrendingUp,
      title: "Seu impacto digital se expande",
      description: "Aplique as orientações e observe a evolução da sua presença online",
      gradient: "from-green-500 to-emerald-500",
      delay: "0.4s",
    },
  ]

  return (
    <section
      ref={sectionRef}
      id="funcionalidades"
      className="py-32 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden"
    >
      {" "}
      {/* Reduzido py-40 para py-32 para mais compactação */}
      {/* Background decoration */}
      <div className="absolute inset-0 bg-mesh-2 opacity-30"></div>
      <div className="relative z-10 max-w-7xl mx-auto">
        <div
          className={`text-center mb-20 transition-all duration-1000 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
        >
          {" "}
          {/* Reduzido mb-24 para mb-20 */}
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">Como funciona?</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            <span className="font-semibold text-gradient-blue">Simplifique sua estratégia digital.</span> A IA entende
            suas necessidades.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-12">
          {" "}
          {/* Reduzido gap-16 para gap-12 */}
          {steps.map((step, index) => (
            <div
              key={index}
              className={`text-center group transition-all duration-1000 ${
                isVisible ? "animate-fade-in-up" : "opacity-0"
              }`}
              style={{ animationDelay: step.delay }}
            >
              <div className="relative mb-8">
                {" "}
                {/* Reduzido mb-10 para mb-8 */}
                <div
                  className={`w-20 h-20 bg-gradient-to-br ${step.gradient} rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-all duration-500 shadow-premium group-hover:shadow-premium-hover animate-glow`}
                >
                  {" "}
                  {/* Reduzido w-24 h-24 para w-20 h-20, rounded-3xl para rounded-2xl */}
                  <step.icon className="w-10 h-10 text-white" />
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-gray-200 via-blue-200 to-transparent"></div>
                )}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>{" "}
              {/* Reduzido text-2xl para text-xl, mb-4 para mb-3 */}
              <p className="text-gray-600 leading-relaxed text-base">{step.description}</p>{" "}
              {/* Reduzido text-lg para text-base */}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
