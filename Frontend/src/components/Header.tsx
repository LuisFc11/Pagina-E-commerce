import { useState } from 'react';
import { ShoppingCart, Store, User, Menu, X, Search, Phone, Mail } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

interface HeaderProps {
  onCartClick: () => void;
  currentSection: string;
  onSectionChange: (section: string) => void;
}

export default function Header({ onCartClick, currentSection, onSectionChange }: HeaderProps) {
  const { getCartCount } = useCart();
  const cartCount = getCartCount();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const navigationItems = [
    { name: 'Inicio', id: 'inicio' },
    { name: 'Productos', id: 'productos' },
    { name: 'Servicios', id: 'servicios' },
    { name: 'Nosotros', id: 'nosotros' },
    { name: 'Contacto', id: 'contacto' },
  ];

  const handleNavigation = (sectionId: string) => {
    onSectionChange(sectionId);
    setIsMenuOpen(false);
  };

  return (
    <>
   

      {/* Main Header */}
      <header className="bg-white shadow-lg sticky top-0 z-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            
            {/* Logo and Mobile Menu Button */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6 text-slate-600" />
                ) : (
                  <Menu className="w-6 h-6 text-slate-600" />
                )}
              </button>

              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-2 rounded-lg">
                  <Store className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
                </div>
                <div className="hidden sm:block">
                  <h1 className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                    InnovVentas
                  </h1>
                  <p className="text-slate-600 text-xs lg:text-sm">Tecnología & Innovación</p>
                </div>
              </div>
            </div>

            {/* Desktop Navigation - Center */}
            <nav className="hidden lg:flex items-center space-x-8 absolute left-1/2 transform -translate-x-1/2">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item.id)}
                  className={`text-slate-700 hover:text-blue-600 font-medium transition-colors duration-200 relative group py-2 ${
                    currentSection === item.id ? 'text-blue-600' : ''
                  }`}
                >
                  {item.name}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-blue-600 transition-all ${
                    currentSection === item.id ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}></span>
                </button>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center space-x-3 lg:space-x-4">
              
              {/* Search Bar - Desktop */}
              <div className="hidden lg:flex items-center">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Buscar productos..."
                    className="w-64 pl-4 pr-10 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                  <Search className="w-4 h-4 text-slate-400 absolute right-3 top-2.5" />
                </div>
              </div>

              {/* User Menu */}
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-1 p-2 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <User className="w-5 h-5 lg:w-6 lg:h-6 text-slate-600" />
                  <span className="hidden lg:block text-slate-700 font-medium text-sm">Cuenta</span>
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-slate-200 py-2 z-50">
                    <button className="w-full text-left px-4 py-2 text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors text-sm">
                      Iniciar Sesión
                    </button>
                    <button className="w-full text-left px-4 py-2 text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors text-sm">
                      Registrarse
                    </button>
                    <div className="border-t border-slate-200 my-1"></div>
                    <button className="w-full text-left px-4 py-2 text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors text-sm">
                      Mis Pedidos
                    </button>
                    <button className="w-full text-left px-4 py-2 text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors text-sm">
                      Lista de Deseos
                    </button>
                  </div>
                )}
              </div>

              {/* Cart Button */}
              <button
                onClick={onCartClick}
                className="relative flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-3 lg:px-4 py-2 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-md hover:shadow-lg group"
              >
                <ShoppingCart className="w-4 h-4 lg:w-5 lg:h-5" />
                <span className="hidden sm:block font-medium text-sm">Carrito</span>
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 lg:w-6 lg:h-6 flex items-center justify-center animate-bounce">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Search Bar */}
          <div className="lg:hidden pb-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar productos..."
                className="w-full pl-4 pr-10 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
              <Search className="w-4 h-4 text-slate-400 absolute right-3 top-2.5" />
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="lg:hidden border-t border-slate-200 py-4">
              <div className="flex flex-col space-y-3">
                {navigationItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavigation(item.id)}
                    className={`text-left text-slate-700 hover:text-blue-600 font-medium py-2 transition-colors text-sm ${
                      currentSection === item.id ? 'text-blue-600' : ''
                    }`}
                  >
                    {item.name}
                  </button>
                ))}
                
                <div className="border-t border-slate-200 pt-3">
                  <button className="w-full text-left py-2 text-slate-700 hover:text-blue-600 font-medium text-sm">
                    Iniciar Sesión
                  </button>
                  <button className="w-full text-left py-2 text-slate-700 hover:text-blue-600 font-medium text-sm">
                    Registrarse
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
}