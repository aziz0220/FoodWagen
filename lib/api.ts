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
    return data;
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
    return data;
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
    return data;
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
    return data;
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
