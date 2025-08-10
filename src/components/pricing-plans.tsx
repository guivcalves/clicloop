import { Check, Star, Sparkles } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { CheckoutConsent } from "./checkout-consent"

export function PricingPlans() {
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

  const plans = [
    {
      name: "ClicLoop",
      price: "29,90",
      description: "Solução Completa para sua Estratégia Digital",
      features: [
        "Acesso Ilimitado à IA",
        "Geração de ideias, legendas e hashtags com IA",
        "Análise aprofundada de campanhas",
        "Orientação estratégica com IA",
        "Sugestões de conteúdo adaptadas",
        "Painel de insights estratégicos",
        "Suporte dedicado",
        "Funcionalidades completas",
      ],
      popular: true,
    },
  ]

  return (
    <section ref={sectionRef} id="planos" className="py-32 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-mesh-1 opacity-20"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div
          className={`text-center mb-20 transition-all duration-1000 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Investimento Inteligente para seu Marketing
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Um único plano com tudo incluído. Sem limitações, sem surpresas.
          </p>
        </div>

        <div className="flex justify-center max-w-2xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative group transition-all duration-1000 ${
                isVisible ? "animate-fade-in-scale" : "opacity-0"
              }`}
            >
              <div
                className={`relative bg-white/90 backdrop-blur-sm rounded-3xl p-10 shadow-premium hover:shadow-premium-hover transition-all duration-500 border-2 ${plan.popular ? "border-blue-200" : "border-gray-100"} group-hover:scale-105`}
              >
                {plan.popular && (
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full text-sm font-semibold flex items-center shadow-premium">
                      <Star className="w-4 h-4 mr-2" />
                      Mais Popular
                    </div>
                  </div>
                )}

                <div className="text-center mb-10">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-6">
                    <Sparkles className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-3">{plan.name}</h3>
                  <p className="text-gray-600 mb-6 text-lg">{plan.description}</p>
                  <div className="flex items-center justify-center mb-2">
                    <span className="text-lg text-gray-500">R$</span>
                    <span className="text-6xl font-bold text-gradient-blue">{plan.price}</span>
                    <span className="text-gray-500 text-lg">/mês</span>
                  </div>
                  <p className="text-sm text-gray-500">Menos que 1 real por dia</p>
                </div>

                <ul className="space-y-4 mb-10">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mr-4 mt-0.5">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-gray-700 text-lg">{feature}</span>
                    </li>
                  ))}
                </ul>

                <CheckoutConsent />

                <p className="text-center text-sm text-gray-500 mt-4">✓ Flexibilidade de cancelamento</p>
              </div>

              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
