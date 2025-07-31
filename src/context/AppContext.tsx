import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Product, CartItem, User } from '../types';
import { products } from '../data/products';

interface AppState {
  products: Product[];
  cart: CartItem[];
  user: User | null;
  wishlist: string[];
  searchQuery: string;
  selectedCategory: string;
  recommendations: Product[];
}

type AppAction =
  | { type: 'ADD_TO_CART'; payload: Product }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_CART_QUANTITY'; payload: { productId: string; quantity: number } }
  | { type: 'ADD_TO_WISHLIST'; payload: string }
  | { type: 'REMOVE_FROM_WISHLIST'; payload: string }
  | { type: 'SET_SEARCH_QUERY'; payload: string }
  | { type: 'SET_CATEGORY'; payload: string }
  | { type: 'SET_USER'; payload: User }
  | { type: 'ADD_TO_VIEW_HISTORY'; payload: string }
  | { type: 'UPDATE_RECOMMENDATIONS'; payload: Product[] }
  | { type: 'CLEAR_CART' };

const initialState: AppState = {
  products,
  cart: [],
  user: {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    preferences: ['Electronics', 'Sports'],
    viewHistory: [],
    purchaseHistory: []
  },
  wishlist: [],
  searchQuery: '',
  selectedCategory: 'all',
  recommendations: []
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItem = state.cart.find(item => item.product.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.product.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      }
      return {
        ...state,
        cart: [...state.cart, { product: action.payload, quantity: 1 }]
      };

    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => item.product.id !== action.payload)
      };

    case 'UPDATE_CART_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(item =>
          item.product.id === action.payload.productId
            ? { ...item, quantity: action.payload.quantity }
            : item
        ).filter(item => item.quantity > 0)
      };

    case 'ADD_TO_WISHLIST':
      if (state.wishlist.includes(action.payload)) return state;
      return {
        ...state,
        wishlist: [...state.wishlist, action.payload]
      };

    case 'REMOVE_FROM_WISHLIST':
      return {
        ...state,
        wishlist: state.wishlist.filter(id => id !== action.payload)
      };

    case 'SET_SEARCH_QUERY':
      return {
        ...state,
        searchQuery: action.payload
      };

    case 'SET_CATEGORY':
      return {
        ...state,
        selectedCategory: action.payload
      };

    case 'SET_USER':
      return {
        ...state,
        user: action.payload
      };

    case 'ADD_TO_VIEW_HISTORY':
      if (!state.user) return state;
      const updatedHistory = [action.payload, ...state.user.viewHistory.filter(id => id !== action.payload)].slice(0, 20);
      return {
        ...state,
        user: {
          ...state.user,
          viewHistory: updatedHistory
        }
      };

    case 'UPDATE_RECOMMENDATIONS':
      return {
        ...state,
        recommendations: action.payload
      };

    case 'CLEAR_CART':
      return {
        ...state,
        cart: []
      };

    default:
      return state;
  }
}

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Generate recommendations based on user behavior
  useEffect(() => {
    if (state.user) {
      const generateRecommendations = () => {
        const viewedProducts = state.user!.viewHistory.map(id => 
          state.products.find(p => p.id === id)
        ).filter(Boolean) as Product[];

        const viewedCategories = viewedProducts.map(p => p.category);
        const viewedTags = viewedProducts.flatMap(p => p.tags);

        const recommended = state.products
          .filter(product => !state.user!.viewHistory.includes(product.id))
          .map(product => ({
            product,
            score: calculateRecommendationScore(product, viewedCategories, viewedTags, state.user!.preferences)
          }))
          .sort((a, b) => b.score - a.score)
          .slice(0, 6)
          .map(item => item.product);

        dispatch({ type: 'UPDATE_RECOMMENDATIONS', payload: recommended });
      };

      generateRecommendations();
    }
  }, [state.user?.viewHistory, state.products]);

  const calculateRecommendationScore = (
    product: Product,
    viewedCategories: string[],
    viewedTags: string[],
    preferences: string[]
  ): number => {
    let score = 0;

    // Category matching
    if (viewedCategories.includes(product.category)) score += 3;
    if (preferences.includes(product.category)) score += 2;

    // Tag matching
    const matchingTags = product.tags.filter(tag => viewedTags.includes(tag));
    score += matchingTags.length * 1.5;

    // Rating boost
    score += product.rating * 0.5;

    // Stock availability
    if (product.inStock) score += 1;

    return score;
  };

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};