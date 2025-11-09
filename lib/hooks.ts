/**
 * React Query Hooks for FoodWagen Application
 * Provides hooks for data fetching with caching, loading states, and error handling
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { mealApi } from './api';
import { Meal, CreateMealData, UpdateMealData } from '@/types/meal';

/**
 * Query keys for React Query cache management
 */
export const queryKeys = {
  meals: ['meals'] as const,
  meal: (id: string) => ['meal', id] as const,
};

/**
 * Hook to fetch all meals
 * @returns Query result with meals data, loading state, and error
 */
export function useMeals() {
  return useQuery({
    queryKey: queryKeys.meals,
    queryFn: () => mealApi.getAllMeals(),
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes (formerly cacheTime)
  });
}

/**
 * Hook to fetch a single meal by ID
 * @param id - Meal ID
 * @returns Query result with meal data, loading state, and error
 */
export function useMeal(id: string) {
  return useQuery({
    queryKey: queryKeys.meal(id),
    queryFn: () => mealApi.getMealById(id),
    enabled: !!id, // Only run if ID is provided
    staleTime: 1000 * 60 * 5,
  });
}

/**
 * Hook to create a new meal
 * @returns Mutation result with mutate function, loading state, and error
 */
export function useCreateMeal() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (mealData: CreateMealData) => mealApi.createMeal(mealData),
    onSuccess: () => {
      // Invalidate meals query to refetch data
      queryClient.invalidateQueries({ queryKey: queryKeys.meals });
    },
  });
}

/**
 * Hook to update an existing meal
 * @returns Mutation result with mutate function, loading state, and error
 */
export function useUpdateMeal() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateMealData }) =>
      mealApi.updateMeal(id, data),
    onSuccess: (updatedMeal) => {
      // Invalidate meals query
      queryClient.invalidateQueries({ queryKey: queryKeys.meals });
      
      // Update single meal cache if exists
      if (updatedMeal.id) {
        queryClient.invalidateQueries({ queryKey: queryKeys.meal(updatedMeal.id) });
      }
    },
  });
}

/**
 * Hook to delete a meal
 * @returns Mutation result with mutate function, loading state, and error
 */
export function useDeleteMeal() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => mealApi.deleteMeal(id),
    onSuccess: () => {
      // Invalidate meals query to refetch data
      queryClient.invalidateQueries({ queryKey: queryKeys.meals });
    },
  });
}
