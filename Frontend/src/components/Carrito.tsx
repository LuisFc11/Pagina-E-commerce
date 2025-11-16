import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, Shield, Truck, Zap, Sparkles } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useState, useEffect } from 'react';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: () => void;
}

export default function Cart({ isOpen, onClose, onCheckout }: CartProps) {
  const { cart, removeFromCart, updateQuantity, getCartTotal, getCartCount } = useCart();
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setIsClosing(false);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(onClose, 300);
  };

  const subtotal = getCartTotal();
  const freeShippingThreshold = 100;
  const shipping = subtotal > freeShippingThreshold ? 0 : 12.99;
  const remainingForFreeShipping = freeShippingThreshold - subtotal;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  if (!isOpen && !isClosing) return null;

  return (
    <div className={`fixed inset-0 z-[100] overflow-hidden transition-all duration-300 ${
      isOpen && !isClosing ? 'opacity-100' : 'opacity-0 pointer-events-none'
    }`}>
      
      {/* Backdrop elegante */}
      <div 
        className={`absolute inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity duration-300 ${
          isOpen && !isClosing ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={handleClose}
      />

      {/* Cart Panel - Tamaño normal w-96 */}
      <div className={`absolute right-0 top-0 h-full w-96 bg-white shadow-2xl flex flex-col transform transition-transform duration-300 ${
        isOpen && !isClosing ? 'translate-x-0' : 'translate-x-full'
      }`}>
        
        {/* Header Elegante */}
        <div className="bg-slate-900 text-white p-6 flex items-center justify-between border-b border-slate-700">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <ShoppingBag className="w-6 h-6 text-white" />
              </div>
              {cart.length > 0 && (
                <div className="absolute -top-2 -right-2 bg-amber-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center animate-pulse">
                  {getCartCount()}
                </div>
              )}
            </div>
            <div>
              <h2 className="text-xl font-bold">Mi Carrito</h2>
              <p className="text-slate-300 text-sm">
                {cart.length === 0 ? 'Tu carrito está vacío' : `${getCartCount()} productos agregados`}
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="w-10 h-10 bg-slate-800 hover:bg-slate-700 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        {cart.length > 0 && subtotal < freeShippingThreshold && (
          <div className="px-6 pt-4">
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-slate-700 font-medium flex items-center">
                  <Truck className="w-4 h-4 mr-2 text-blue-500" />
                  ¡Faltan ${remainingForFreeShipping.toFixed(2)} para envío gratis!
                </span>
                <span className="text-blue-600 font-bold">
                  {((subtotal / freeShippingThreshold) * 100).toFixed(0)}%
                </span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-700 ease-out"
                  style={{ width: `${Math.min((subtotal / freeShippingThreshold) * 100, 100)}%` }}
                ></div>
              </div>
            </div>
          </div>
        )}

        {/* Cart Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center p-6">
              <div className="w-24 h-24 bg-slate-100 rounded-2xl flex items-center justify-center mb-6">
                <ShoppingBag className="w-10 h-10 text-slate-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-700 mb-3">
                Carrito Vacío
              </h3>
              <p className="text-slate-500 text-sm mb-6">
                Agrega productos increíbles a tu carrito
              </p>
              <button
                onClick={handleClose}
                className="bg-blue-600 text-white px-8 py-3 rounded-xl font-medium hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Explorar Productos
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={`${item.id}-${item.quantity}`}
                  className="group bg-white border border-slate-200 rounded-xl p-4 hover:shadow-lg transition-all duration-200"
                >
                  <div className="flex gap-4">
                    {/* Product Image */}
                    <div className="relative">
                      <div className="w-20 h-20 bg-slate-100 rounded-lg overflow-hidden">
                        <img
                          src={item.imagen}
                          alt={item.nombre}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                        />
                      </div>
                      <div className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center shadow-sm">
                        {item.quantity}
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-slate-800 mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors">
                        {item.nombre}
                      </h3>
                      <p className="text-blue-600 font-bold text-lg mb-3">
                        ${item.precio.toFixed(2)}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        {/* Quantity Controls */}
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center bg-slate-100 rounded-lg">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-2 hover:bg-slate-200 rounded-l-lg transition-colors"
                              disabled={item.quantity <= 1}
                            >
                              <Minus className={`w-4 h-4 ${item.quantity <= 1 ? 'text-slate-400' : 'text-slate-600'}`} />
                            </button>
                            <span className="px-3 font-bold text-slate-800 text-sm min-w-8 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              disabled={item.quantity >= (item.stock || 99)}
                              className="p-2 hover:bg-slate-200 rounded-r-lg transition-colors"
                            >
                              <Plus className={`w-4 h-4 ${item.quantity >= (item.stock || 99) ? 'text-slate-400' : 'text-slate-600'}`} />
                            </button>
                          </div>
                          
                          {/* Remove Button */}
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Item Total */}
                        <span className="font-bold text-slate-800">
                          ${(item.precio * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="bg-slate-50 border-t border-slate-200 p-6 space-y-4">
            {/* Trust Badges */}
            <div className="flex items-center justify-around text-slate-600">
              <div className="flex flex-col items-center">
                <Shield className="w-5 h-5 text-green-500 mb-1" />
                <span className="text-xs">Seguro</span>
              </div>
              <div className="flex flex-col items-center">
                <Zap className="w-5 h-5 text-blue-500 mb-1" />
                <span className="text-xs">Rápido</span>
              </div>
              <div className="flex flex-col items-center">
                <Sparkles className="w-5 h-5 text-amber-500 mb-1" />
                <span className="text-xs">Premium</span>
              </div>
            </div>

            {/* Order Summary */}
            <div className="space-y-3 bg-white rounded-lg p-4 border border-slate-200">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>
                <span className="font-semibold">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Envío</span>
                <span className={`font-semibold ${shipping === 0 ? 'text-green-600' : ''}`}>
                  {shipping === 0 ? 'Gratis' : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Impuestos</span>
                <span className="font-semibold">${tax.toFixed(2)}</span>
              </div>
              <div className="border-t border-slate-200 pt-3">
                <div className="flex justify-between font-bold text-slate-800 text-lg">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={onCheckout}
              className="group w-full bg-slate-900 text-white py-4 rounded-xl font-semibold hover:bg-slate-800 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
            >
              <span>Finalizar Compra</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Continue Shopping */}
            <button
              onClick={handleClose}
              className="w-full text-slate-500 hover:text-slate-700 py-2 text-sm transition-colors text-center"
            >
              ← Seguir comprando
            </button>
          </div>
        )}
      </div>
    </div>
  );
}