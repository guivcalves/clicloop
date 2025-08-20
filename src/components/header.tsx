import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

interface NavigationItem {
  id: string;
  label: string;
}

// ============================================================================
// DATA
// ============================================================================

const navigationItems: NavigationItem[] = [
  { id: "funcionalidades", label: "Funcionalidades" },
  { id: "planos", label: "Planos" },
  { id: "faq", label: "FAQ" },
];

// ============================================================================
// COMPONENT
// ============================================================================

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  // ============================================================================
  // EFFECTS
  // ============================================================================

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // ============================================================================
  // HELPER FUNCTIONS
  // ============================================================================

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

  // ============================================================================
  // RENDER
  // ============================================================================

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "bg-white/80 backdrop-blur-xl border-b border-gray-100/50 shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* ========================================================================
              LOGO
          ========================================================================= */}
          <div className="flex-shrink-0">
            <div className="text-2xl font-bold text-gradient-blue">
              ClicLoop
            </div>
          </div>

          {/* ========================================================================
              DESKTOP NAVIGATION
          ========================================================================= */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-gray-700 hover:text-blue-600 transition-all duration-300 font-medium hover:scale-105"
              >
                {item.label}
              </button>
            ))}
            
            <Button
              onClick={() => scrollToSection("planos")}
              className="btn-premium text-white px-6 py-2 rounded-full font-semibold"
            >
              Começar Agora
            </Button>
          </nav>

          {/* ========================================================================
              MOBILE MENU BUTTON
          ========================================================================= */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* ========================================================================
            MOBILE NAVIGATION
        ========================================================================= */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100 glass-effect rounded-b-2xl">
            <div className="flex flex-col space-y-4">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-gray-700 hover:text-blue-600 transition-colors font-medium text-left"
                >
                  {item.label}
                </button>
              ))}
              
              <Button
                onClick={() => scrollToSection("planos")}
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
