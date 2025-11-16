import { Zap, Truck, Shield, Clock, ArrowRight, Sparkles } from 'lucide-react';

interface HeroProps {
  onExploreProducts: () => void;
  onViewOffers: () => void;
}

export default function Hero({ onExploreProducts, onViewOffers }: HeroProps) {
  return (
    <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
      {/* Elementos de fondo */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Contenido principal */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-slate-800/50 border border-slate-700 rounded-full px-4 py-2 mb-6">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span className="text-sm font-medium text-slate-300">
                Bienvenido a InnovVentas
              </span>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
              <span className="text-white">Tu Experiencia</span>
              <br />
              <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                Tecnológica Premium
              </span>
            </h1>
            
            <p className="text-lg lg:text-xl text-slate-300 mb-8 leading-relaxed max-w-lg mx-auto lg:mx-0">
              Descubre un mundo de innovación y calidad. En InnovVentas conectamos 
              la tecnología más avanzada con tu día a día, ofreciendo productos 
              seleccionados para transformar tu experiencia digital.
            </p>

            {/* Botones de acción */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
              <button 
                onClick={onExploreProducts}
                className="group bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-amber-500/25 flex items-center justify-center"
              >
                <span>Explorar Catálogo</span>
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={onViewOffers}
                className="border border-slate-600 hover:border-slate-500 text-slate-300 hover:text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 backdrop-blur-sm"
              >
                Ofertas Especiales
              </button>
            </div>

            {/* Características rápidas */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-slate-300">
              <div className="flex items-center justify-center lg:justify-start space-x-3 bg-slate-800/30 rounded-xl p-3">
                <div className="bg-green-500/20 p-2 rounded-lg">
                  <Truck className="w-5 h-5 text-green-400" />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-sm">Envío Express</div>
                  <div className="text-xs text-slate-400">24-48 horas</div>
                </div>
              </div>
              <div className="flex items-center justify-center lg:justify-start space-x-3 bg-slate-800/30 rounded-xl p-3">
                <div className="bg-blue-500/20 p-2 rounded-lg">
                  <Shield className="w-5 h-5 text-blue-400" />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-sm">Garantía</div>
                  <div className="text-xs text-slate-400">30 días</div>
                </div>
              </div>
              <div className="flex items-center justify-center lg:justify-start space-x-3 bg-slate-800/30 rounded-xl p-3">
                <div className="bg-purple-500/20 p-2 rounded-lg">
                  <Clock className="w-5 h-5 text-purple-400" />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-sm">Soporte</div>
                  <div className="text-xs text-slate-400">24/7</div>
                </div>
              </div>
            </div>
          </div>

          {/* Imagen destacada */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1607082350899-7e105aa886ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                alt="Productos tecnológicos InnovVentas"
                className="w-full h-auto transform hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent"></div>
            </div>
            
            {/* Badges informativos */}
            <div className="absolute -bottom-4 -left-4 bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
              <div className="text-center">
                <div className="text-2xl font-bold text-slate-800 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-amber-500 mr-2" />
                  4.9/5
                </div>
                <div className="text-slate-600 text-sm">Rating de Clientes</div>
              </div>
            </div>
            
            <div className="absolute -top-4 -right-4 bg-amber-500 text-white rounded-2xl p-3 shadow-lg">
              <div className="text-center">
                <div className="font-bold text-sm">+10K</div>
                <div className="text-xs">Clientes</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}