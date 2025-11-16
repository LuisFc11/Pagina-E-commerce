import { Wrench, Truck, Shield, Clock, Users, Zap, MessageCircle, ArrowRight, CheckCircle, Star } from 'lucide-react';

export default function Services() {
  const services = [
    {
      icon: <Wrench className="w-8 h-8" />,
      title: "Instalación Profesional",
      description: "Instalación experta de todos tus dispositivos tecnológicos por nuestro equipo certificado",
      features: ["Configuración completa", "Capacitación de uso", "Garantía de instalación", "Soporte post-instalación"],
      price: "Desde $49.99",
      popular: false
    },
    {
      icon: <Truck className="w-8 h-8" />,
      title: "Entrega Express",
      description: "Recibe tus productos en tiempo récord con nuestro servicio de entrega prioritario",
      features: ["Entrega en 24-48h", "Seguimiento en tiempo real", "Instalación incluida", "Horarios flexibles"],
      price: "Desde $19.99",
      popular: true
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Garantía Extendida",
      description: "Protege tu inversión con nuestras garantías extendidas y planes de protección",
      features: ["Hasta 3 años adicionales", "Cobertura completa", "Reparación o reemplazo", "Soporte prioritario"],
      price: "Desde $29.99/año",
      popular: false
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Soporte Técnico 24/7",
      description: "Asistencia técnica especializada disponible las 24 horas del día, los 7 días de la semana",
      features: ["Soporte remoto", "Asistencia telefónica", "Chat en vivo", "Visita técnica"],
      price: "Desde $79.99/mes",
      popular: false
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Consultoría Tecnológica",
      description: "Asesoramiento personalizado para empresas y hogares en transformación digital",
      features: ["Análisis de necesidades", "Recomendaciones personalizadas", "Plan de implementación", "Seguimiento continuo"],
      price: "Consultar precio",
      popular: false
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Mantenimiento Premium",
      description: "Mantenimiento preventivo y correctivo para mantener tus dispositivos en óptimo estado",
      features: ["Mantenimiento preventivo", "Actualizaciones de software", "Limpieza profesional", "Optimización"],
      price: "Desde $99.99/trimestre",
      popular: false
    }
  ];

  const processSteps = [
    {
      step: "01",
      title: "Consulta",
      description: "Comunica tus necesidades y nuestro equipo te asesorará"
    },
    {
      step: "02",
      title: "Cotización",
      description: "Recibe una propuesta personalizada sin compromiso"
    },
    {
      step: "03",
      title: "Implementación",
      description: "Nuestros expertos ejecutan el servicio con calidad"
    },
    {
      step: "04",
      title: "Seguimiento",
      description: "Acompañamiento continuo para garantizar tu satisfacción"
    }
  ];

  const stats = [
    { number: "5,000+", label: "Servicios Realizados" },
    { number: "98%", label: "Satisfacción del Cliente" },
    { number: "24/7", label: "Soporte Disponible" },
    { number: "30 min", label: "Tiempo Respuesta Promedio" }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">Servicios Premium InnovVentas</h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Más allá de vender productos, ofrecemos soluciones completas que garantizan 
              la mejor experiencia tecnológica para tu hogar o empresa.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-slate-50">
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

      {/* Services Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">Nuestros Servicios</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Soluciones integrales diseñadas para maximizar el valor de tu tecnología
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div 
                key={index} 
                className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 ${
                  service.popular 
                    ? 'border-blue-500 relative transform hover:scale-105' 
                    : 'border-transparent hover:border-slate-200'
                }`}
              >
                {service.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                      Más Popular
                    </span>
                  </div>
                )}
                
                <div className="p-6">
                  <div className="text-blue-600 mb-4">
                    {service.icon}
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-800 mb-3">
                    {service.title}
                  </h3>
                  
                  <p className="text-slate-600 mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  <div className="space-y-2 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span className="text-slate-700 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-slate-800">{service.price}</span>
                    {service.popular && (
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-amber-400 fill-current" />
                        <span className="text-sm text-slate-600">4.9</span>
                      </div>
                    )}
                  </div>

                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition-colors duration-200 flex items-center justify-center space-x-2 group">
                    <span>Contratar Servicio</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">Cómo Funciona</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Un proceso simple y transparente para garantizar los mejores resultados
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4 shadow-lg">
                  {step.step}
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-2">{step.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <MessageCircle className="w-10 h-10" />
          </div>
          <h2 className="text-4xl font-bold mb-6">¿Necesitas un Servicio Personalizado?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Nuestros especialistas están listos para crear una solución a medida para tus necesidades específicas
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-slate-100 transition-colors duration-200 shadow-2xl">
              Solicitar Cotización
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-200">
              <span className="flex items-center justify-center space-x-2">
                <MessageCircle className="w-5 h-5" />
                <span>Chat en Vivo</span>
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Guarantee Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-50 rounded-3xl p-8 text-center">
            <Shield className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-slate-800 mb-4">Garantía de Satisfacción</h3>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto mb-6">
              Estamos tan seguros de la calidad de nuestros servicios que ofrecemos una 
              garantía de satisfacción del 100%. Si no estás contento, haremos lo necesario para solucionarlo.
            </p>
            <div className="flex items-center justify-center space-x-2 text-slate-600">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="font-semibold">30 días de garantía en todos los servicios</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}