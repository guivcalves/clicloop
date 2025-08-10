import { Star } from "lucide-react"

export function Testimonials() {
  const testimonials = [
    {
      name: "Maria Silva",
      business: "Consultora de Beleza",
      content:
        "Antes eu gastava horas criando posts e nunca sabia se estava certo. Agora a IA faz tudo em segundos e meus posts têm muito mais engajamento!",
      rating: 5,
    },
    {
      name: "João Santos",
      business: "Personal Trainer",
      content:
        "Consegui triplicar meus seguidores em 3 meses. A IA me dá ideias que eu nunca teria pensado sozinho. Vale cada centavo!",
      rating: 5,
    },
    {
      name: "Ana Costa",
      business: "Arquiteta Autônoma",
      content:
        "Não entendo nada de marketing digital, mas com o Cliente Já consegui atrair clientes que nunca imaginei. A IA realmente funciona!",
      rating: 5,
    },
  ]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Quem já usa, aprova</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Veja como outros empreendedores estão transformando seus negócios
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100"
            >
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed">"{testimonial.content}"</p>
              <div>
                <p className="font-semibold text-gray-900">{testimonial.name}</p>
                <p className="text-sm text-gray-600">{testimonial.business}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
