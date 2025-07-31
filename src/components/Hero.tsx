import React from 'react';
import { ShoppingBag, Zap, Shield, Truck } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <div className="relative bg-gradient-to-r from-blue-600 to-purple-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Smart Shopping,
            <br />
            <span className="text-yellow-300">Smarter Choices</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Discover products tailored to your preferences with our intelligent recommendation system
          </p>
          <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors">
            Start Shopping
          </button>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <Zap className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">AI-Powered Recommendations</h3>
                <p className="text-gray-600">Personalized suggestions based on your interests</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="bg-green-100 p-3 rounded-full">
                <Shield className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Secure Shopping</h3>
                <p className="text-gray-600">Your data and payments are always protected</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="bg-purple-100 p-3 rounded-full">
                <Truck className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Fast Delivery</h3>
                <p className="text-gray-600">Quick and reliable shipping to your door</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};