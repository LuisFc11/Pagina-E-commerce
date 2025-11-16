import { createContext, useContext, useState, ReactNode } from 'react';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

interface ChatContextType {
  messages: Message[];
  isOpen: boolean;
  sendMessage: (text: string) => void;
  toggleChat: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

const botResponses: { [key: string]: string } = {
  hola: '¡Hola! Bienvenido a FC Store. ¿En qué puedo ayudarte hoy?',
  productos: 'Tenemos electrodomésticos, tecnología, cocina y audio/video. ¿Qué te interesa?',
  precio: 'Nuestros precios son muy competitivos. ¿Buscas algo en particular?',
  envio: 'Hacemos envíos a todo el país. El tiempo de entrega es de 2-5 días hábiles.',
  pago: 'Aceptamos tarjetas de crédito, débito y transferencias bancarias.',
  horario: 'Estamos disponibles de lunes a sábado de 9:00 AM a 7:00 PM.',
  garantia: 'Todos nuestros productos tienen garantía del fabricante.',
  devolucion: 'Tienes 30 días para devoluciones sin preguntas.',
  contacto: 'Puedes contactarnos al (555) 123-4567 o por email a ventas@fcstore.com',
  default: 'Gracias por tu pregunta. Un asesor te contactará pronto. ¿Hay algo más en lo que pueda ayudarte?',
};

export function ChatProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: '¡Hola! Soy el asistente virtual de FC Store. ¿En qué puedo ayudarte?',
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [isOpen, setIsOpen] = useState(false);

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    for (const [key, response] of Object.entries(botResponses)) {
      if (lowerMessage.includes(key)) {
        return response;
      }
    }

    return botResponses.default;
  };

  const sendMessage = (text: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);

    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(text),
        isBot: true,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };

  const toggleChat = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <ChatContext.Provider value={{ messages, isOpen, sendMessage, toggleChat }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within ChatProvider');
  }
  return context;
}
