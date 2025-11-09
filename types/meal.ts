/**
 * Type definitions for FoodWagen Application
 * Based on A2SV Challenge Technical Specifications
 */

/**
 * Restaurant status enum
 * Must be exactly "Open Now" or "Closed" as per API requirements
 */
export type RestaurantStatus = "Open Now" | "Closed";

/**
 * Restaurant interface
 * Represents a restaurant entity with name, logo, and operational status
 */
export interface Restaurant {
  /** Restaurant name */
  restaurant_name: string;
  
  /** URL to restaurant logo image */
  restaurant_logo: string;
  
  /** Current operational status - must be "Open Now" or "Closed" */
  restaurant_status: RestaurantStatus;
}

/**
 * Meal interface
 * Represents a complete meal entity with all required and optional fields
 * Field names must match API exactly: food_name, food_rating, etc.
 */
export interface Meal {
  /** Unique identifier for the meal */
  id?: string;
  
  /** Name of the food item - REQUIRED field */
  food_name: string;
  
  /** Rating of the food (0-5 scale) - REQUIRED field */
  food_rating: number;
  
  /** URL to food image - REQUIRED field */
  food_image: string;
  
  /** Price of the food item - OPTIONAL field */
  food_price?: number;
  
  /** Restaurant information - REQUIRED field */
  restaurant_name: string;
  
  /** URL to restaurant logo - REQUIRED field */
  restaurant_logo: string;
  
  /** Restaurant operational status - REQUIRED field */
  restaurant_status: RestaurantStatus;
  
  /** Timestamp of creation */
  createdAt?: string;
  
  /** Timestamp of last update */
  updatedAt?: string;
}

/**
 * Form data for creating a new meal
 * All fields are required for creation
 */
export interface CreateMealData {
  food_name: string;
  food_rating: number;
  food_image: string;
  restaurant_name: string;
  restaurant_logo: string;
  restaurant_status: RestaurantStatus;
}

/**
 * Form data for updating an existing meal
 * All fields are optional for partial updates
 */
export interface UpdateMealData {
  food_name?: string;
  food_rating?: number;
  food_image?: string;
  restaurant_name?: string;
  restaurant_logo?: string;
  restaurant_status?: RestaurantStatus;
}

/**
 * API Response wrapper
 * Generic type for API responses with data and optional metadata
 */
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

/**
 * Error response from API
 */
export interface ApiError {
  message: string;
  statusCode?: number;
  errors?: Record<string, string[]>;
}

/**
 * Search and filter state
 * Used for managing search and filter UI state
 */
export interface SearchFilterState {
  searchQuery: string;
  selectedStatus: RestaurantStatus | "all";
  minRating: number;
}

/**
 * Modal state
 * Manages which modal is open and selected meal data
 */
export interface ModalState {
  isAddModalOpen: boolean;
  isEditModalOpen: boolean;
  isDeleteModalOpen: boolean;
  selectedMeal: Meal | null;
}
