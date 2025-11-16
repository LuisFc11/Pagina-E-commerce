import { useState, useEffect } from 'react';
import Header from './components/Header';
import Inicio from './components/Inicio';
import CategoryFilter from './components/CategoryFilter';
import ProductCard from './components/ProductCard';
import Cart from './components/Carrito';
import Checkout from './components/Checkout';
import ChatBot from './components/ChatBot';
import About from './components/Nosotros';
import Services from './components/Servicios';
import Contact from './components/Contact';
import { Product, Category } from './lib/supabase.ts';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentSection, setCurrentSection] = useState('inicio');

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const catResponse = await fetch('http://localhost:4000/api/categories');
        if (!catResponse.ok) throw new Error('Error fetching categorías');
        const catData = await catResponse.json();
        const mappedCats = catData.map((cat: any) => ({
          id: cat._id.toString(),
          name: cat.name,
          description: cat.description,
          image_url: cat.image_url,
        }));
        setCategories(mappedCats);

        const prodResponse = await fetch('http://localhost:4000/api/products');
        if (!prodResponse.ok) throw new Error('Error fetching productos');
        const prodData = await prodResponse.json();
        const mappedProds = prodData.map((prod: any) => ({
          id: prod._id.toString(),
          nombre: prod.nombre,
          descripcion: prod.descripcion,
          precio: prod.precio,
          stock: prod.stock,
          categoria: prod.categoria,
          imagen: prod.imagen,
          featured: prod.featured,
        }));
        setProducts(mappedProds);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredProducts = selectedCategory
    ? products.filter((p) => p.categoria === selectedCategory)
    : products;

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const renderSection = () => {
    switch (currentSection) {
      case 'nosotros':
        return <About />;
      case 'productos':
        if (loading) return <div className="text-center py-10">Cargando productos desde backend...</div>;
        if (error) return <div className="text-center py-10 text-red-600">Error: {error}</div>;
        return (
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />

            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                {selectedCategory
                  ? categories.find((c) => c.id === selectedCategory)?.name
                  : 'Todos los Productos'}
              </h2>
              <p className="text-gray-600 mt-1">
                {filteredProducts.length} productos disponibles
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </main>
        );
      case 'servicios':
        return <Services />;
      case 'contacto':
        return <Contact />;
      case 'inicio':
      default:
        return (
          <Inicio
            onExploreProducts={() => setCurrentSection('productos')}
            onViewOffers={() => setCurrentSection('productos')}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        onCartClick={() => setIsCartOpen(true)}
        currentSection={currentSection}
        onSectionChange={setCurrentSection}
      />

      {renderSection()}

      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onCheckout={handleCheckout}
      />

      <Checkout
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />

      <ChatBot />
    </div>
  );
}

export default App;
