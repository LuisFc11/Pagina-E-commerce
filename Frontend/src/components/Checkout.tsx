import { useState } from 'react';
import { X, CreditCard, Shield, Truck, Clock, Sparkles, CheckCircle2, Lock } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

interface CheckoutProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Checkout({ isOpen, onClose }: CheckoutProps) {
  const { cart, getCartTotal, clearCart } = useCart();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  if (!isOpen) return null;

  const subtotal = getCartTotal();
  const shipping = subtotal > 100 ? 0 : 12.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simular procesamiento de pago
    setTimeout(() => {
      setIsProcessing(false);
      setOrderComplete(true);
      
      setTimeout(() => {
        clearCart();
        setOrderComplete(false);
        setFormData({ 
          name: '', email: '', phone: '', address: '', city: '', zipCode: '',
          cardNumber: '', expiryDate: '', cvv: '' 
        });
        setCurrentStep(1);
        onClose();
      }, 4000);
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const nextStep = () => setCurrentStep(prev => prev + 1);
  const prevStep = () => setCurrentStep(prev => prev - 1);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        {/* Backdrop con gradiente */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-slate-900/20 backdrop-blur-sm" 
          onClick={onClose} 
        />

        {/* Modal Principal */}
        <div className="relative bg-gradient-to-br from-white to-slate-50/80 rounded-3xl shadow-2xl max-w-4xl w-full max-h-[95vh] overflow-y-auto backdrop-blur-sm border border-white/20">
          
          {orderComplete ? (
            /* Pantalla de éxito */
            <div className="p-12 text-center">
              <div className="mb-8">
                <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
                  <CheckCircle2 className="w-12 h-12 text-white" />
                </div>
                <h2 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4">
                  ¡Pedido Confirmado!
                </h2>
                <p className="text-slate-600 text-lg mb-2">
                  Tu orden ha sido procesada exitosamente
                </p>
                <p className="text-slate-500">
                  Recibirás un correo con los detalles de seguimiento
                </p>
              </div>
              <div className="bg-white/80 rounded-2xl p-6 max-w-md mx-auto border border-white/20">
                <div className="flex items-center justify-center space-x-4 text-slate-600">
                  <div className="flex items-center space-x-2">
                    <Truck className="w-5 h-5 text-blue-500" />
                    <span>Envío en 2-3 días</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Sparkles className="w-5 h-5 text-amber-500" />
                    <span>Orden #{Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-8 flex items-center justify-between rounded-t-3xl">
                <div className="flex items-center space-x-4">
                  <div className="bg-white/20 p-3 rounded-2xl">
                    <CreditCard className="w-8 h-8" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold">Finalizar Compra</h2>
                    <p className="text-slate-300 flex items-center">
                      <Lock className="w-4 h-4 mr-2" />
                      Pago 100% seguro
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-3 hover:bg-white/10 rounded-2xl transition-all duration-200 hover:scale-110"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Progress Steps */}
              <div className="px-8 pt-6">
                <div className="flex items-center justify-between mb-8">
                  {[1, 2, 3].map((step) => (
                    <div key={step} className="flex items-center flex-1">
                      <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 font-bold transition-all duration-300 ${
                        currentStep >= step 
                          ? 'bg-blue-600 border-blue-600 text-white shadow-lg' 
                          : 'border-slate-300 text-slate-400'
                      }`}>
                        {step}
                      </div>
                      {step < 3 && (
                        <div className={`flex-1 h-1 mx-2 transition-all duration-300 ${
                          currentStep > step ? 'bg-blue-600' : 'bg-slate-200'
                        }`} />
                      )}
                    </div>
                  ))}
                </div>
                <div className="flex justify-between text-sm text-slate-500 px-2">
                  <span>Información</span>
                  <span>Pago</span>
                  <span>Confirmación</span>
                </div>
              </div>

              <div className="p-8">
                <div className="grid lg:grid-cols-2 gap-8">
                  
                  {/* Form Section */}
                  <div className="space-y-6">
                    {currentStep === 1 && (
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center">
                            <Sparkles className="w-5 h-5 mr-2 text-amber-500" />
                            Información de Contacto
                          </h3>
                          <div className="grid gap-4">
                            <div>
                              <label className="block text-sm font-semibold text-slate-700 mb-2">
                                Nombre Completo
                              </label>
                              <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 bg-white/80 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm transition-all duration-200"
                                placeholder="Juan Pérez"
                              />
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                  Correo Electrónico
                                </label>
                                <input
                                  type="email"
                                  name="email"
                                  value={formData.email}
                                  onChange={handleChange}
                                  required
                                  className="w-full px-4 py-3 bg-white/80 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm"
                                  placeholder="juan@ejemplo.com"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                  Teléfono
                                </label>
                                <input
                                  type="tel"
                                  name="phone"
                                  value={formData.phone}
                                  onChange={handleChange}
                                  required
                                  className="w-full px-4 py-3 bg-white/80 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm"
                                  placeholder="(555) 123-4567"
                                />
                              </div>
                            </div>

                            <div>
                              <label className="block text-sm font-semibold text-slate-700 mb-2">
                                Dirección
                              </label>
                              <textarea
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                required
                                rows={2}
                                className="w-full px-4 py-3 bg-white/80 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm"
                                placeholder="Calle y número"
                              />
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                  Ciudad
                                </label>
                                <input
                                  type="text"
                                  name="city"
                                  value={formData.city}
                                  onChange={handleChange}
                                  required
                                  className="w-full px-4 py-3 bg-white/80 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm"
                                  placeholder="Ciudad"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                  Código Postal
                                </label>
                                <input
                                  type="text"
                                  name="zipCode"
                                  value={formData.zipCode}
                                  onChange={handleChange}
                                  required
                                  className="w-full px-4 py-3 bg-white/80 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm"
                                  placeholder="12345"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {currentStep === 2 && (
                      <div className="space-y-6">
                        <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center">
                          <CreditCard className="w-5 h-5 mr-2 text-blue-500" />
                          Información de Pago
                        </h3>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                              Número de Tarjeta
                            </label>
                            <input
                              type="text"
                              name="cardNumber"
                              value={formData.cardNumber}
                              onChange={handleChange}
                              required
                              className="w-full px-4 py-3 bg-white/80 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm"
                              placeholder="1234 5678 9012 3456"
                              maxLength={19}
                            />
                          </div>
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-semibold text-slate-700 mb-2">
                                Fecha de Expiración
                              </label>
                              <input
                                type="text"
                                name="expiryDate"
                                value={formData.expiryDate}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 bg-white/80 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm"
                                placeholder="MM/AA"
                                maxLength={5}
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-semibold text-slate-700 mb-2">
                                CVV
                              </label>
                              <input
                                type="text"
                                name="cvv"
                                value={formData.cvv}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 bg-white/80 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm"
                                placeholder="123"
                                maxLength={3}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="flex space-x-4 pt-4">
                      {currentStep > 1 && (
                        <button
                          type="button"
                          onClick={prevStep}
                          className="px-6 py-3 border border-slate-300 text-slate-700 rounded-xl font-semibold hover:bg-slate-50 transition-colors"
                        >
                          Anterior
                        </button>
                      )}
                      {currentStep < 2 ? (
                        <button
                          type="button"
                          onClick={nextStep}
                          className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
                        >
                          Continuar
                        </button>
                      ) : (
                        <button
                          type="submit"
                          disabled={isProcessing}
                          onClick={handleSubmit}
                          className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-bold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50"
                        >
                          {isProcessing ? 'Procesando...' : 'Confirmar Pedido'}
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Order Summary */}
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 h-fit">
                    <h3 className="text-xl font-bold text-slate-800 mb-4">Resumen del Pedido</h3>
                    <div className="space-y-3 mb-6">
                      {cart.map((item) => (
                        <div key={item.id} className="flex items-center justify-between py-2 border-b border-slate-100">
                          <div className="flex items-center space-x-3">
                            <img
                              src={item.imagen}
                              alt={item.nombre}
                              className="w-12 h-12 object-cover rounded-lg bg-slate-100"
                            />
                            <div>
                              <p className="font-semibold text-slate-800 text-sm">{item.nombre}</p>
                              <p className="text-slate-500 text-xs">Cantidad: {item.quantity}</p>
                            </div>
                          </div>
                          <span className="font-bold text-slate-800">
                            ${(item.precio * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between text-slate-600">
                        <span>Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-slate-600">
                        <span>Envío</span>
                        <span className={shipping === 0 ? 'text-green-600 font-bold' : ''}>
                          {shipping === 0 ? 'GRATIS' : `$${shipping.toFixed(2)}`}
                        </span>
                      </div>
                      <div className="flex justify-between text-slate-600">
                        <span>Impuestos</span>
                        <span>${tax.toFixed(2)}</span>
                      </div>
                      <div className="border-t border-slate-200 pt-2">
                        <div className="flex justify-between font-bold text-lg text-slate-800">
                          <span>Total</span>
                          <span>${total.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Trust Badges */}
                    <div className="mt-6 pt-4 border-t border-slate-200">
                      <div className="flex items-center justify-around text-slate-600">
                        <div className="text-center">
                          <Shield className="w-6 h-6 text-green-500 mx-auto mb-1" />
                          <span className="text-xs">Seguro</span>
                        </div>
                        <div className="text-center">
                          <Truck className="w-6 h-6 text-blue-500 mx-auto mb-1" />
                          <span className="text-xs">Envío Rápido</span>
                        </div>
                        <div className="text-center">
                          <Clock className="w-6 h-6 text-amber-500 mx-auto mb-1" />
                          <span className="text-xs">Soporte 24/7</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}