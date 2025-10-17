import { useState, useEffect } from 'react';
import { mockUsers } from '../data/mockData';

// Mock favorites hook - replace with Firebase in production
export const useFavorites = () => {
  const [favorites, setFavorites] = useState([]);

  // In a real app, this would connect to Firebase
  useEffect(() => {
    // Simulate loading favorites
    const userFavorites = mockUsers['user1'].favorites;
    setFavorites(userFavorites);
  }, []);

  const addToFavorites = async (recipeId) => {
    setFavorites(prev => [...prev, recipeId]);
  };

  const removeFromFavorites = async (recipeId) => {
    setFavorites(prev => prev.filter(id => id !== recipeId));
  };

  const isFavorite = (recipeId) => {
    return favorites.includes(recipeId);
  };

  return {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite
  };
};