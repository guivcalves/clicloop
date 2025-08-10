import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "bg-white/80 backdrop-blur-xl border-b border-gray-100/50 shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <div className="text-2xl font-bold text-gradient-blue">ClicLoop</div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection("funcionalidades")}
              className="text-gray-700 hover:text-blue-600 transition-all duration-300 font-medium hover:scale-105"
            >
              Funcionalidades
            </button>
            <button
              onClick={() => scrollToSection("planos")}
              className="text-gray-700 hover:text-blue-600 transition-all duration-300 font-medium hover:scale-105"
            >
              Planos
            </button>
            <button
              onClick={() => scrollToSection("faq")}
              className="text-gray-700 hover:text-blue-600 transition-all duration-300 font-medium hover:scale-105"
            >
              FAQ
            </button>
            <Button
              onClick={() => (window.location.href = "#checkout")}
              className="btn-premium text-white px-6 py-2 rounded-full font-semibold"
            >
              Começar Agora
            </Button>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100 glass-effect rounded-b-2xl">
            <div className="flex flex-col space-y-4">
              <button
                onClick={() => scrollToSection("funcionalidades")}
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium text-left"
              >
                Funcionalidades
              </button>
              <button
                onClick={() => scrollToSection("planos")}
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium text-left"
              >
                Planos
              </button>
              <button
                onClick={() => scrollToSection("faq")}
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium text-left"
              >
                FAQ
              </button>
              <Button
                onClick={() => (window.location.href = "#checkout")}
                className="btn-premium text-white px-6 py-2 rounded-full font-semibold w-full"
              >
                Começar Agora
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
