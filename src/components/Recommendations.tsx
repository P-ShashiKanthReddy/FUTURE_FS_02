import React from 'react';
import { ProductCard } from './ProductCard';
import { useApp } from '../context/AppContext';
import { Product } from '../types';

interface RecommendationsProps {
  onViewDetails: (product: Product) => void;
}

export const Recommendations: React.FC<RecommendationsProps> = ({ onViewDetails }) => {
  const { state } = useApp();

  if (state.recommendations.length === 0) return null;

  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Recommended for You</h2>
          <p className="text-gray-600">Based on your browsing history and preferences</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {state.recommendations.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onViewDetails={onViewDetails}
            />
          ))}
        </div>
      </div>
    </div>
  );
};