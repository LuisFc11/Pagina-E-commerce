import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Sparkles, Zap } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

export default function ChatBot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const systemPrompt = `
Eres InnovVentas Assistant, un asistente de IA profesional, amigable, rápido y experto en tecnología. Siempre respondes en español, con un tono claro, corto, servicial, positivo y profesional (máximo 100 palabras). Usa emojis relevantes de forma equilibrada. Nunca inventes productos, marcas o precios fuera del catálogo. Si preguntan por algo que no existe, responde: “Lo siento, no manejamos ese producto en InnovVentas. ¿Deseas ver opciones similares de nuestro catálogo?”

Tu misión es vender, asistir al cliente y dar información útil sobre InnovVentas, tienda especializada en computación y tecnología ubicada en:
📍 Jr. 2 de Mayo, Huánuco – Perú  
🕒 Lunes a Sábado 9:00 AM – 8:00 PM (Domingos cerrado)

Puedes ofrecer:
- Visitas a tienda
- Envíos locales y nacionales
- Recomendaciones tecnológicas
- Servicios técnicos

Siempre sugiere productos relacionados.

────────────────────────────────────────
📦 **CONSULTAS SOBRE PEDIDOS**
Cuando pregunten por el estado de un pedido:
- Pide el número (ej: #FC12345).
- Si lo dan, responde con escenarios reales: "en preparación", "en tránsito", "listo para recoger", "llega en 2 días".
- No inventes estados de seguimiento específicos.
- Si no dan el número, pídeselo.

────────────────────────────────────────
💳 **PAGOS**
Explica que aceptamos:
- Tarjetas (Visa / Mastercard)
- Yape / Plin (QR tienda)
- Transferencias (BCP / Interbank)
- Pago contraentrega (local)
- En tienda: efectivo y tarjetas
- Online: pasarelas Niubiz o Culqi

────────────────────────────────────────
🔄 **DEVOLUCIONES Y GARANTÍAS**
- 7 días para devoluciones con boleta y producto en buen estado
- Garantías: Laptops 1 año, componentes 2 años, otros 1-3 años
- Procesos: entrega en tienda o envío por courier
- Reembolsos en 3–5 días hábiles
- Mantén tono empático en quejas

────────────────────────────────────────
🚚 **ENVÍOS**
- Huánuco: 24–48 horas (gratis > S/ 200)
- Provincias: 3–5 días (costo S/ 20–50)
- Couriers: Olva, Shalom, Serpost
- Siempre confirmar dirección

────────────────────────────────────────
⭐ **CATÁLOGO COMPLETO (AMPLIADO)**  
Usa SOLO estos productos. Puedes describirlos, pero NO agregar nuevos.

──────────────────────────
📌 **LAPTOPS Y NOTEBOOKS**
Básicas:
- HP 15.6" i3-1215U / 8GB / 512GB SSD – S/ 1,800  
- Lenovo IdeaPad 3 Ryzen 5-5500U / 8GB / 512GB SSD – S/ 2,100  
- ASUS Vivobook i5-1135G7 / 8GB / 256GB SSD – S/ 2,000  
- Acer Aspire 5 Ryzen 3-5300U / 8GB / 512GB SSD – S/ 1,700  

Gamer:
- ASUS TUF A15 i5-12500H / 16GB / RTX 3050 / 1TB – S/ 3,500  
- Acer Nitro 5 Ryzen 7-6800H / RTX 4060 / 16GB – S/ 4,200  
- Lenovo Legion 5 Ryzen 5-5600H / RTX 3060 – S/ 3,800  
- MSI Katana i7-11800H / RTX 3070 – S/ 4,500  

Profesionales / Premium:
- Dell XPS 13 i7-1360P / OLED / 16GB / 1TB – S/ 5,500  
- MacBook Air M2 / 8GB / 256GB – S/ 4,000  
- MacBook Pro M1 Pro / 16GB / 512GB – S/ 6,000  

──────────────────────────
🖥️ **COMPUTADORAS ARMADAS**
Básica:
- i3-12100 / 8GB / 512GB SSD – S/ 1,200  
Oficina:
- Ryzen 5-5600G / 16GB / 1TB SSD – S/ 2,000  
Gamer:
- i7-13700K / 32GB / RTX 3070 / 2TB SSD – S/ 4,500  
- Ryzen 7-5800X / 32GB / RTX 3060 Ti – S/ 4,000  

──────────────────────────
🖥️ **MONITORES**
Básicos:
- LG 24" FHD 75Hz – S/ 450  
- Samsung 27" Curvo – S/ 600  
Gamer:
- ASUS 27" 144Hz – S/ 800  
- LG Ultrawide 34" 1440p – S/ 1,200  

──────────────────────────
⌨️🖱️ **PERIFÉRICOS**
Teclados:
- Redragon K552 RGB – S/ 150  
- Logitech K380 – S/ 80  
Mouse:
- Logitech G502 Hero – S/ 180  
- Microsoft Básico – S/ 45  
Audífonos:
- Sony WH-CH520 – S/ 100  
- HyperX Cloud II – S/ 250  
Webcams / Micrófonos:
- Logitech C920 – S/ 200  
- Blue Yeti Nano – S/ 120  

──────────────────────────
🧩 **COMPONENTES INTERNOS**
RAM DDR4:
- 8GB 3200MHz – S/ 100  
- 16GB 3200MHz – S/ 180  

Almacenamiento:
- SSD Kingston 512GB – S/ 150  
- SSD Kingston 1TB – S/ 250  
- HDD Seagate 1TB – S/ 120  

Tarjetas de video:
- GTX 1650 4GB – S/ 800  
- RTX 3060 12GB – S/ 1,500  

Placas madre:
- ASUS B450M-A – S/ 300  
- MSI Z790 – S/ 600  

Fuentes:
- Corsair CX500 – S/ 150  
- EVGA 750W Gold – S/ 250  

Procesadores:
- Intel i9-13900K – S/ 2,500  
- Ryzen 9 5900X – S/ 1,800  

Cases y coolers:
- NZXT H510 – S/ 250  
- Noctua NH-U12S – S/ 200  

──────────────────────────
🌐 **REDES**
- Router TP-Link AX3000 – S/ 200  
- Mesh TP-Link Deco M5 (x3) – S/ 400  
- Cable HDMI 2.1 – S/ 30  
- Cable USB-C 100W – S/ 20  

──────────────────────────
🖨️ **IMPRESORAS**
- Brother DCP-T730DW – S/ 900  
- Epson EcoTank L3150 – S/ 600  
- Tintas Brother original – S/ 150  
- Tintas genéricas – S/ 80  

──────────────────────────
📱 **CELULARES Y TABLETS**
Celulares:
- Samsung A15 128GB – S/ 800  
- iPhone 14 128GB – S/ 3,500  
Tablets:
- Lenovo Tab M10 Plus – S/ 600  
- iPad 10th Gen – S/ 1,800  

──────────────────────────
🎮 **OTROS**
- Silla gamer Secretlab Titan Evo – S/ 350  
- UPS APC 650VA – S/ 200  
- Antivirus Kaspersky – S/ 100  
- Parlante JBL Go 3 – S/ 150  
- Cargador inalámbrico Anker – S/ 80  

────────────────────────────────────────
🛠️ **SERVICIOS**
- Instalación software – S/ 50  
- Armado PC – desde S/ 100  
- Reparaciones – desde S/ 80  
- Upgrade RAM/SSD – S/ 50 mano de obra  

────────────────────────────────────────
📌 **REGLAS PARA RESPONDER**
- Si preguntan “¿qué productos tienes?”, lista SOLO categorías.
- Si preguntan por marcas: lista marcas del catálogo.
- Si preguntan por modelos: lista modelos y precios del catálogo.
- Siempre sugiere una venta adicional.
- Si la pregunta NO es de tecnología → responder:  
  “Lo siento, soy especialista en InnovVentas y tecnología. ¿Deseas ayuda con algún producto?”

Termina cada mensaje con:  
“¿En qué más puedo ayudarte?”.
`;

  const toggleChat = () => setIsOpen(!isOpen);

  const sendMessage = (text: string, isBot: boolean = false) => {
    const newMessage = {
      id: Date.now().toString(),
      text,
      isBot,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

const handleSend = async (text: string) => {
  // 1. Mostrar mensaje del usuario en pantalla
  sendMessage(text);
  setIsTyping(true);

  try {
    // 2. Construir el historial que se enviará al backend
    const contents: any[] = [
      {
        role: "user",
        parts: [{ text: systemPrompt }],
      },
      {
        role: "model",
        parts: [{ text: "Entendido, soy el Asistente FC Store. ¿En qué puedo ayudarte?" }],
      },
    ];

    // Agregamos todo el historial que ya tienes
    messages.forEach((msg) => {
      contents.push({
        role: msg.isBot ? "model" : "user",
        parts: [{ text: msg.text }],
      });
    });

    // Y el mensaje actual del usuario
    contents.push({
      role: "user",
      parts: [{ text }],
    });

    // 3. Llamada a tu backend (NO a Gemini directo)
    const res = await fetch('http://localhost:4000/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents }),
    });

    if (!res.ok) {
      console.error('Error HTTP backend:', res.status);
      throw new Error('Error en backend');
    }

    const data = await res.json();
    const botResponse =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      'Lo siento, tuve un problema al responder. Intenta de nuevo.';

    // 4. Mostrar respuesta del bot
    sendMessage(botResponse, true);
  } catch (error) {
    console.error('Error detallado:', error);
    sendMessage('Lo siento, no entendí bien tu solicitud. ¿Podrías repetirla?', true);
  } finally {
    setIsTyping(false);
  }
};


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      await handleSend(input);
      setInput('');
    }
  };

  const quickReplies = [
    "📦 Estado de pedido",
    "💳 Métodos de pago", 
    "🔄 Devoluciones",
    "🚚 Envíos",
    "⭐ Productos"
  ];

  return (
    <>
      {/* Floating Action Button - Más pequeño */}
      <button
        onClick={toggleChat}
        className={`fixed bottom-6 right-6 p-3 rounded-2xl shadow-2xl transition-all duration-500 z-[100] group ${
          isOpen 
            ? 'bg-gradient-to-br from-red-500 to-rose-600 rotate-90 scale-110' 
            : 'bg-gradient-to-br from-blue-600 to-purple-700 hover:scale-110 hover:shadow-3xl'
        }`}
      >
        <div className="relative">
          {!isOpen && (
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
          )}
          {isOpen ? (
            <X className="w-5 h-5 text-white" />
          ) : (
            <MessageCircle className="w-5 h-5 text-white" />
          )}
        </div>
        {!isOpen && (
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
        )}
      </button>

      {/* Chat Window - Más pequeño y posición ajustada */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 w-80 h-[450px] bg-gradient-to-br from-white to-slate-50/80 rounded-2xl shadow-2xl flex flex-col z-[100] border border-white/20 backdrop-blur-sm overflow-hidden">
          
          {/* Header compacto */}
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-4 rounded-t-2xl">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-green-400 rounded-full border border-white"></div>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-sm truncate">Asistente InnovVentas</h3>
                <p className="text-slate-300 text-xs flex items-center truncate">
                  <Zap className="w-2 h-2 mr-1 text-amber-400 flex-shrink-0" />
                  <span className="truncate">En línea • Listo para ayudar</span>
                </p>
              </div>
            </div>
          </div>

          {/* Messages Area - Más compacto */}
          <div className="flex-1 overflow-y-auto p-4 bg-gradient-to-b from-slate-50/50 to-blue-50/30">
            {messages.length === 0 ? (
              <div className="text-center h-full flex flex-col items-center justify-center">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center mb-3">
                  <Sparkles className="w-5 h-5 text-blue-500" />
                </div>
                <h4 className="font-bold text-slate-700 text-sm mb-1">¡Hola! Soy tu asistente</h4>
                <p className="text-slate-500 text-xs mb-4 max-w-xs">
                  ¿En qué puedo ayudarte hoy?
                </p>
                
                {/* Quick Replies compactas */}
                <div className="space-y-1.5 w-full max-w-xs">
                  {quickReplies.map((reply, index) => (
                    <button
                      key={index}
                      onClick={async () => {
                        await handleSend(reply);
                      }}
                      className="w-full text-left p-2 bg-white/80 backdrop-blur-sm border border-white/20 rounded-xl text-slate-700 text-xs hover:bg-white hover:shadow-md transition-all duration-200"
                    >
                      {reply}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                  >
                    <div className="flex items-start space-x-2 max-w-[90%]">
                      {message.isBot && (
                        <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 shadow-md">
                          <Bot className="w-3 h-3 text-white" />
                        </div>
                      )}
                      <div
                        className={`rounded-2xl px-3 py-2 backdrop-blur-sm border ${
                          message.isBot
                            ? 'bg-white/80 border-white/20 text-slate-800 shadow-md'
                            : 'bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-lg'
                        }`}
                      >
                        <p className="text-xs leading-relaxed">{message.text}</p>
                        <div className={`flex items-center mt-1 text-[10px] ${
                          message.isBot ? 'text-slate-500' : 'text-blue-100'
                        }`}>
                          {message.isBot ? (
                            <Bot className="w-2 h-2 mr-1" />
                          ) : (
                            <User className="w-2 h-2 mr-1" />
                          )}
                          <span>
                            {message.timestamp.toLocaleTimeString('es-ES', {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </span>
                        </div>
                      </div>
                      {!message.isBot && (
                        <div className="w-6 h-6 bg-gradient-to-br from-slate-600 to-slate-700 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 shadow-md">
                          <User className="w-3 h-3 text-white" />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                
                {/* Typing Indicator compacto */}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="flex items-start space-x-2 max-w-[90%]">
                      <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 shadow-md">
                        <Bot className="w-3 h-3 text-white" />
                      </div>
                      <div className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl px-3 py-2 shadow-md">
                        <div className="flex space-x-1">
                          <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></div>
                          <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          {/* Input Area compacta */}
          <form onSubmit={handleSubmit} className="p-3 bg-white/80 backdrop-blur-sm border-t border-white/20">
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Escribe tu mensaje..."
                  className="w-full px-3 py-2 bg-white/90 border border-white/20 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm pr-10 text-xs transition-all duration-200"
                />
                {input.trim() && (
                  <button
                    type="submit"
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-1.5 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-md hover:scale-110"
                  >
                    <Send className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>
            
            {/* Quick Actions compactas */}
            {messages.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {quickReplies.slice(0, 3).map((reply, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={async () => {
                      await handleSend(reply);
                    }}
                    className="px-2 py-1 bg-white/60 backdrop-blur-sm border border-white/20 rounded-lg text-slate-600 text-[10px] hover:bg-white hover:shadow-sm transition-all duration-200"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            )}
          </form>
        </div>
      )}
    </>
  );
}