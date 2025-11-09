/**
 * API Client for FoodWagen Application
 * Handles all HTTP requests to the A2SV API
 */

import { Meal, CreateMealData, UpdateMealData, ApiResponse } from '@/types/meal';

/**
 * Base API URL - Update this with your actual A2SV API endpoint
 */
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://a2sv-backend.onrender.com/api';

/**
 * API Client class with all CRUD operations
 */
class MealApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  /**
   * Fetch all meals
   * GET /meals
   */
  async getAllMeals(): Promise<Meal[]> {
    const response = await fetch(`${this.baseUrl}/meals`, {
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
    return data.data || data;
  }

  /**
   * Fetch a single meal by ID
   * GET /meals/:id
   */
  async getMealById(id: string): Promise<Meal> {
    const response = await fetch(`${this.baseUrl}/meals/${id}`, {
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
    return data.data || data;
  }

  /**
   * Create a new meal
   * POST /meals
   */
  async createMeal(mealData: CreateMealData): Promise<Meal> {
    const response = await fetch(`${this.baseUrl}/meals`, {
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
    return data.data || data;
  }

  /**
   * Update an existing meal
   * PUT /meals/:id
   */
  async updateMeal(id: string, mealData: UpdateMealData): Promise<Meal> {
    const response = await fetch(`${this.baseUrl}/meals/${id}`, {
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
    return data.data || data;
  }

  /**
   * Delete a meal
   * DELETE /meals/:id
   */
  async deleteMeal(id: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/meals/${id}`, {
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
