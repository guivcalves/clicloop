import { Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent mb-4">
              ClicLoop
            </div>
            <p className="text-gray-400 leading-relaxed">
              A plataforma de IA que otimiza a presença digital de pequenos negócios.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Contato</h3>
            <div className="flex items-center text-gray-400">
              <Mail className="w-4 h-4 mr-2" />
              <a href="mailto:admclicloop@gmail.com" className="hover:text-white transition-colors">
                admclicloop@gmail.com
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="/termos-de-uso" className="hover:text-white transition-colors">
                  Termos de Uso
                </a>
              </li>
              <li>
                <a href="/politica-de-privacidade" className="hover:text-white transition-colors">
                  Política de Privacidade
                </a>
              </li>
              <li>
                <a href="mailto:admclicloop@gmail.com" className="hover:text-white transition-colors">
                  Suporte
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 ClicLoop. Todos os direitos reservados.</p>
          <p className="text-xs mt-2">
            Aviso: Os resultados podem variar de acordo com o uso, nicho e outros fatores externos. Não garantimos
            vendas ou clientes.
          </p>
        </div>
      </div>
    </footer>
  )
}
