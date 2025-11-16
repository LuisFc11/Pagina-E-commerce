import { Category } from '../lib/supabase';
import { Filter, Sparkles } from 'lucide-react';

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string | null;
  onSelectCategory: (categoryId: string | null) => void;
}

export default function CategoryFilter({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategoryFilterProps) {
  return (
    <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-2xl shadow-lg border border-slate-200 p-6 mb-8">
      <div className="flex items-center space-x-3 mb-6">
        <div className="bg-white p-2 rounded-lg shadow-sm">
          <Sparkles className="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-800">Explorar Categorías</h2>
          <p className="text-slate-600 text-sm">Descubre nuestra selección premium</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => onSelectCategory(null)}
          className={`group relative px-6 py-3 rounded-full font-semibold transition-all duration-300 overflow-hidden ${
            selectedCategory === null
              ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg'
              : 'bg-white text-slate-700 shadow-md hover:shadow-lg hover:bg-blue-50'
          }`}
        >
          <span className="relative z-10">Todos los Productos</span>
          {selectedCategory === null && (
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700"></div>
          )}
        </button>

        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onSelectCategory(category.id)}
            className={`group relative px-6 py-3 rounded-full font-semibold transition-all duration-300 overflow-hidden ${
              selectedCategory === category.id
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg'
                : 'bg-white text-slate-700 shadow-md hover:shadow-lg hover:bg-amber-50'
            }`}
          >
            <span className="relative z-10">{category.name}</span>
            {selectedCategory === category.id && (
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-amber-600"></div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}