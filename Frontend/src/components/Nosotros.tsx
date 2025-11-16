import { Users, Target, Award, Globe, Shield, Heart } from 'lucide-react';

export default function About() {
  const teamMembers = [
    {
      name: "María González",
      role: "CEO & Fundadora",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      description: "Más de 10 años de experiencia en e-commerce y tecnología."
    },
    {
      name: "Carlos Rodríguez",
      role: "Director Tecnológico",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      description: "Especialista en innovación y desarrollo de productos."
    },
    {
      name: "Ana Martínez",
      role: "Directora de Marketing",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      description: "Apasionada por conectar marcas con sus clientes."
    }
  ];

  const values = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Calidad Garantizada",
      description: "Todos nuestros productos pasan por rigurosos controles de calidad."
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Atención Personalizada",
      description: "Cada cliente recibe la atención y soporte que merece."
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Compromiso Global",
      description: "Llegamos a todo el país con estándares de excelencia."
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Innovación Constante",
      description: "Siempre a la vanguardia de las últimas tendencias tecnológicas."
    }
  ];

  const stats = [
    { number: "10K+", label: "Clientes Satisfechos" },
    { number: "5+", label: "Años de Experiencia" },
    { number: "500+", label: "Productos Disponibles" },
    { number: "24/7", label: "Soporte al Cliente" }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section Nosotros */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">Sobre InnovVentas</h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Somos más que una tienda, somos tu partner tecnológico de confianza. 
              Desde 2019, hemos estado transformando la experiencia de compra online 
              con productos de calidad y servicio excepcional.
            </p>
          </div>
        </div>
      </section>

      {/* Nuestra Historia */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-slate-800 mb-6">Nuestra Historia</h2>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>
                  InnovVentas nació de una simple idea: hacer la tecnología accesible 
                  para todos. Lo que comenzó como un pequeño emprendimiento en un garaje, 
                  hoy es una de las tiendas online más confiables del país.
                </p>
                <p>
                  Nuestro viaje comenzó en 2019 cuando nuestro fundador, María González, 
                  identificó la necesidad de una plataforma que ofreciera no solo productos 
                  de calidad, sino también una experiencia de compra excepcional.
                </p>
                <p>
                  Hoy, seguimos comprometidos con nuestros valores fundacionales: 
                  calidad, innovación y servicio al cliente. Cada producto en nuestro 
                  catálogo es cuidadosamente seleccionado para garantizar la mejor 
                  experiencia para nuestros clientes.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="Nuestro equipo de trabajo"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-lg">
                <div className="flex items-center space-x-3">
                  <Award className="w-8 h-8 text-amber-500" />
                  <div>
                    <p className="font-bold text-slate-800">Premio a la Excelencia 2023</p>
                    <p className="text-slate-600 text-sm">Mejor E-commerce del Año</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Estadísticas */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">{stat.number}</div>
                <div className="text-slate-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nuestros Valores */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">Nuestros Valores</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Los principios que guían cada decisión que tomamos en InnovVentas
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="text-blue-600 mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">{value.title}</h3>
                <p className="text-slate-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nuestro Equipo */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">Conoce Nuestro Equipo</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              El talento y pasión detrás de InnovVentas
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-slate-50 rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-bold text-slate-800 mb-2">{member.name}</h3>
                <p className="text-blue-600 font-semibold mb-3">{member.role}</p>
                <p className="text-slate-600 text-sm leading-relaxed">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">¿Listo para Experimentar la Diferencia InnovVentas?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Únete a miles de clientes satisfechos y descubre por qué somos la elección preferida en tecnología.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-slate-100 transition-colors duration-200">
              Ver Productos
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-200">
              Contactarnos
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}