import { Clock, DollarSign, Lightbulb, BarChart3, Target, Rocket } from "lucide-react"
import { useEffect, useRef, useState } from "react"

export function Benefits() {
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

  const benefits = [
    {
      icon: Clock,
      title: "Gere conteúdo com agilidade",
      description: "Nunca mais trave na hora de criar posts, legendas ou campanhas",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: BarChart3,
      title: "Obtenha análises estratégicas",
      description: "Entenda o que está funcionando e o que pode ser aprimorado",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: Lightbulb,
      title: "Descubra novas perspectivas",
      description: "A IA sugere estratégias adaptadas para o seu negócio",
      gradient: "from-yellow-500 to-orange-500",
    },
    {
      icon: DollarSign,
      title: "Otimize recursos e tempo",
      description: "Substitua consultores caros por uma IA que trabalha 24/7",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      icon: Target,
      title: "Concentre-se no essencial",
      description: "Deixe a IA cuidar do marketing enquanto você foca nos clientes",
      gradient: "from-red-500 to-pink-500",
    },
    {
      icon: Rocket,
      title: "Impulsione sua presença digital",
      description: "Estratégias baseadas em dados, aplicadas com inteligência",
      gradient: "from-indigo-500 to-purple-500",
    },
  ]

  return (
    <section
      ref={sectionRef}
      className="py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/30 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-blue-400/10 to-purple-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-gradient-to-br from-indigo-400/10 to-pink-600/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div
          className={`text-center mb-20 transition-all duration-1000 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Autonomia para impulsionar seu marketing
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Sua inteligência de marketing, agora ilimitada e acessível — por menos de um real por dia.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className={`group card-hover bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-premium border border-white/50 transition-all duration-1000 ${
                isVisible ? "animate-fade-in-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div
                className={`w-16 h-16 bg-gradient-to-br ${benefit.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
              >
                <benefit.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{benefit.title}</h3>
              <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
