import { useState, useEffect, useRef } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
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

  const faqs = [
    {
      question: "Preciso saber marketing para usar?",
      answer:
        "Não! A IA faz todo o trabalho pesado. Você só precisa descrever o que precisa e ela cria, analisa e orienta. É como ter um especialista em marketing trabalhando 24 horas por dia para você.",
    },
    {
      question: "Preciso pagar caro?",
      answer:
        "Definitivamente não. Por apenas R$29,90/mês você tem acesso a uma inteligência de marketing que custaria milhares de reais. É menos que 1 real por dia!",
    },
    {
      question: "Posso cancelar quando quiser?",
      answer:
        "Claro! Sem burocracia, sem multa, sem pegadinha. Você cancela quando quiser direto na plataforma. Simples assim.",
    },
    {
      question: "A IA vai substituir minha criatividade?",
      answer:
        "Não! Ela vai potencializar sua criatividade. A IA te dá a base técnica e estratégica, mas você continua sendo o dono do seu negócio e das decisões finais.",
    },
    {
      question: "Funciona para qualquer tipo de negócio?",
      answer:
        "Sim! Seja você dentista, personal trainer, consultora, arquiteto ou qualquer outro profissional, a IA se adapta ao seu nicho e cria estratégias personalizadas.",
    },
    {
      question: "As sugestões de marketing são eficazes?",
      answer:
        "As sugestões são geradas com base em boas práticas e inteligência artificial, mas os resultados dependem totalmente da execução do usuário ou da empresa. Não nos responsabilizamos pelos resultados obtidos.",
    },
  ]

  return (
    <section
      ref={sectionRef}
      id="faq"
      className="py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/30 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-10 w-72 h-72 bg-gradient-to-br from-purple-400/10 to-pink-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-gradient-to-br from-blue-400/10 to-cyan-600/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <div
          className={`text-center mb-20 transition-all duration-1000 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">Perguntas Frequentes</h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            Tire suas dúvidas e comece a otimizar seu marketing hoje mesmo
          </p>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-premium border border-white/50 transition-all duration-1000 ${
                isVisible ? "animate-fade-in-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-white/50 transition-all duration-300 group"
              >
                <span className="font-semibold text-gray-900 text-lg group-hover:text-blue-600 transition-colors">
                  {faq.question}
                </span>
                <div className="flex-shrink-0 ml-4">
                  {openIndex === index ? (
                    <ChevronUp className="w-6 h-6 text-blue-600 group-hover:scale-110 transition-transform" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-gray-400 group-hover:text-blue-600 group-hover:scale-110 transition-all" />
                  )}
                </div>
              </button>
              {openIndex === index && (
                <div className="px-8 pb-6 animate-fade-in-up">
                  <p className="text-gray-700 leading-relaxed text-lg">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
