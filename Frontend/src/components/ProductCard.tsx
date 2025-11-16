// frontend/src/components/ProductCard.tsx
import { ShoppingCart, Heart } from 'lucide-react';
import { Product } from '../lib/supabase'; // Asegúrate de usar types.ts
import { useCart } from '../contexts/CartContext';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Fallback si price es undefined o null
  const safePrice = product.precio ?? 0; // Usa 0 como default, o maneja con un mensaje

  return (
    <div className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-slate-100 overflow-hidden">
      {/* Image */}
      <div className="relative h-56 bg-slate-100 overflow-hidden">
        <img
          src={product.imagen}
          alt={product.nombre}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col space-y-2">
          {product.featured && (
            <span className="bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded">
              Destacado
            </span>
          )}
          {product.stock === 0 && (
            <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
              Agotado
            </span>
          )}
        </div>

        {/* Wishlist */}
        <button
          onClick={() => setIsWishlisted(!isWishlisted)}
          className={`absolute top-3 right-3 p-2 rounded-lg transition-colors ${
            isWishlisted ? 'bg-red-500 text-white' : 'bg-white/90 text-slate-600 hover:bg-white'
          }`}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-semibold text-slate-800 mb-2 line-clamp-2">
          {product.nombre}
        </h3>
        <p className="text-slate-600 text-sm mb-4 line-clamp-2">
          {product.descripcion}
        </p>

        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold text-blue-600">
            ${safePrice.toFixed(2)} {/* Usa safePrice para evitar undefined */}
          </span>
          <span className="text-sm text-slate-500">
            {product.stock} disponibles
          </span>
        </div>

        <button
          onClick={() => addToCart(product)}
          disabled={product.stock === 0}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          <ShoppingCart className="w-4 h-4" />
          <span>{product.stock > 0 ? 'Agregar al Carrito' : 'Agotado'}</span>
        </button>
      </div>
    </div>
  );
}