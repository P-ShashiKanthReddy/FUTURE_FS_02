import React, { useState } from 'react';
import { AppProvider } from './context/AppContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductGrid } from './components/ProductGrid';
import { Recommendations } from './components/Recommendations';
import { Cart } from './components/Cart';
import { ProductModal } from './components/ProductModal';
import { Product } from './types';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);

  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
    setIsProductModalOpen(true);
  };

  const handleCloseProductModal = () => {
    setIsProductModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <AppProvider>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Hero />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Products</h2>
            <p className="text-gray-600">Discover our latest and most popular items</p>
          </div>
          
          <ProductGrid onViewDetails={handleViewDetails} />
        </main>

        <Recommendations onViewDetails={handleViewDetails} />

        <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        
        <ProductModal
          product={selectedProduct}
          isOpen={isProductModalOpen}
          onClose={handleCloseProductModal}
        />

        {/* Floating Cart Button */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors z-40"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m2.6 8L6 21l-1.5-8m2.5 8v4a2 2 0 002 2h10a2 2 0 002-2v-4" />
          </svg>
        </button>
      </div>
    </AppProvider>
  );
}

export default App;