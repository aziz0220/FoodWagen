/**
 * API Client for FoodWagen Application
 * Handles all HTTP requests to the API
 */

import { Meal, CreateMealData, UpdateMealData} from '@/types/meal';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://6852821e0594059b23cdd834.mockapi.io';

class MealApiClient {
  private readonly baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async getAllMeals(): Promise<Meal[]> {
    const response = await fetch(`${this.baseUrl}/Food`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch meals: ${response.statusText}`);
    }

    const data = await response.json();
    return data.map(this.normalizeMealData);
  }

  private normalizeMealData(item: any): Meal {
    // Validate and fix image URLs - only accept external URLs
    const validateImageUrl = (url: string): string => {
      if (!url || url.trim() === '') return '';

      // Check if it's a valid URL with common image hosting domains
      try {
        const urlObj = new URL(url);
        const validDomains = ['unsplash.com', 'picsum.photos', 'images.pexels.com', 'cloudinary.com', 'imgur.com'];
        const isValidDomain = validDomains.some(domain => urlObj.hostname.includes(domain));

        // Accept if it's from a known image CDN or has image extension
        if (isValidDomain || url.match(/\.(jpg|jpeg|png|gif|webp)(\?.*)?$/i)) {
          return url;
        }
      } catch (e) {
        // Invalid URL
        return '';
      }

      return '';
    };

    const validateLogoUrl = (url: string): string => {
      if (!url || url.trim() === '') return '';

      try {
        const urlObj = new URL(url);
        const validDomains = ['unsplash.com', 'picsum.photos', 'images.pexels.com', 'cloudinary.com', 'imgur.com'];
        const isValidDomain = validDomains.some(domain => urlObj.hostname.includes(domain));

        if (isValidDomain || url.match(/\.(jpg|jpeg|png|gif|webp)(\?.*)?$/i)) {
          return url;
        }
      } catch (e) {
        return '';
      }

      return '';
    };

    // Try to get valid URLs, return empty string if invalid (UI layer will handle placeholders)
    const foodImage = validateImageUrl(item.food_image || item.image || '');
    const restaurantLogo = validateLogoUrl(item.restaurant_logo || item.logo || '');

    return {
      id: item.id,
      food_name: item.food_name || item.name || 'Unknown',
      food_rating: typeof item.food_rating === 'number' ? item.food_rating : (typeof item.rating === 'number' ? item.rating : 0),
      food_image: foodImage, // Empty string if invalid, UI layer handles placeholder
      food_price: item.food_price || item.Price || (8 + Math.random() * 32), // Random price 8-40 if not provided
      restaurant_name: item.restaurant_name || item.restaurantName || item.name || 'Unknown',
      restaurant_logo: restaurantLogo, // Empty string if invalid, UI layer handles placeholder
      restaurant_status: item.restaurant_status || (item.status === 'Closed' ? 'Closed' : item.open === false ? 'Closed' : 'Open Now'),
      createdAt: item.createdAt,
    };
  }

  async getMealById(id: string): Promise<Meal> {
    const response = await fetch(`${this.baseUrl}/Food/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch meal: ${response.statusText}`);
    }

    const data = await response.json();
    return this.normalizeMealData(data);
  }

  async createMeal(mealData: CreateMealData): Promise<Meal> {
    const response = await fetch(`${this.baseUrl}/Food`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(mealData),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: response.statusText }));
      throw new Error(error.message || 'Failed to create meal');
    }

    const data = await response.json();
    return this.normalizeMealData(data);
  }

  async updateMeal(id: string, mealData: UpdateMealData): Promise<Meal> {
    const response = await fetch(`${this.baseUrl}/Food/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(mealData),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: response.statusText }));
      throw new Error(error.message || 'Failed to update meal');
    }

    const data = await response.json();
    return this.normalizeMealData(data);
  }

  async deleteMeal(id: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/Food/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: response.statusText }));
      throw new Error(error.message || 'Failed to delete meal');
    }
  }
}

/**
 * Singleton instance of the API client
 */
export const mealApi = new MealApiClient(API_BASE_URL);
