// components/Inicio.tsx
import Hero from './Principal';
import { Star, Users, Award, Clock } from 'lucide-react';

interface InicioProps {
  onExploreProducts: () => void;
  onViewOffers: () => void;
}

export default function Inicio({ onExploreProducts, onViewOffers }: InicioProps) {
  const features = [
    {
      icon: <Award className="w-8 h-8" />,
      title: "Calidad Premium",
      description: "Productos seleccionados con los más altos estándares de calidad"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Atención Personalizada",
      description: "Asesoramiento experto para encontrar lo que necesitas"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Entrega Rápida",
      description: "Recibe tus productos en tiempo récord"
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: "Satisfacción Garantizada",
      description: "Tu satisfacción es nuestra prioridad número uno"
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <Hero 
        onExploreProducts={onExploreProducts}
        onViewOffers={onViewOffers}
      />

      {/* Features Section */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">
              ¿Por Qué Elegir InnovVentas?
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Descubre la diferencia de comprar en una tienda que realmente se preocupa por tu experiencia
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
                <div className="text-blue-600 mb-4 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            ¿Listo para Comenzar?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Explora nuestro catálogo completo y descubre productos que se adaptan a tu estilo de vida
          </p>
          <button 
            onClick={onExploreProducts}
            className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-slate-100 transition-colors duration-200 shadow-2xl hover:shadow-3xl transform hover:scale-105"
          >
            Ver Catálogo Completo
          </button>
        </div>
      </section>
    </div>
  );
}