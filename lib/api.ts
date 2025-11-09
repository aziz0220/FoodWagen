/**
 * API Client for FoodWagen Application
 * Handles all HTTP requests to the A2SV API
 */

import { Meal, CreateMealData, UpdateMealData, ApiResponse } from '@/types/meal';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://6852821e0594059b23cdd834.mockapi.io';

class MealApiClient {
  private baseUrl: string;

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
    return {
      id: item.id,
      food_name: item.food_name || item.name || 'Unknown',
      food_rating: typeof item.food_rating === 'number' ? item.food_rating : (typeof item.rating === 'number' ? item.rating : 0),
      food_image: item.food_image || item.image || item.avatar || '',
      food_price: item.food_price || (8 + Math.random() * 32), // Random price 8-40 if not provided
      restaurant_name: item.restaurant_name || item.name || 'Unknown',
      restaurant_logo: item.restaurant_logo || item.logo || item.avatar || '',
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
