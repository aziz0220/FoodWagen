/**
 * Zustand Store for FoodWagen Application
 * Manages global state for meals, modals, search, and filters
 */

import { create } from 'zustand';
import { Meal, ModalState, SearchFilterState, RestaurantStatus } from '@/types/meal';

/**
 * Combined application state interface
 */
interface FoodWagenState {
  // Modal State
  modals: ModalState;
  
  // Search and Filter State
  searchFilter: SearchFilterState;
  
  // Selected Meal for Edit/Delete
  selectedMeal: Meal | null;
  
  // Actions - Modal Management
  openAddModal: () => void;
  openEditModal: (meal: Meal) => void;
  openDeleteModal: (meal: Meal) => void;
  closeAllModals: () => void;
  
  // Actions - Search and Filter
  setSearchQuery: (query: string) => void;
  setSelectedStatus: (status: RestaurantStatus | "all") => void;
  setMinRating: (rating: number) => void;
  resetFilters: () => void;
  
  // Actions - Selected Meal
  setSelectedMeal: (meal: Meal | null) => void;
}

/**
 * Initial modal state
 */
const initialModalState: ModalState = {
  isAddModalOpen: false,
  isEditModalOpen: false,
  isDeleteModalOpen: false,
  selectedMeal: null,
};

/**
 * Initial search/filter state
 */
const initialSearchFilterState: SearchFilterState = {
  searchQuery: '',
  selectedStatus: 'all',
  minRating: 0,
};

/**
 * Zustand store hook
 * Provides global state management for the entire application
 */
export const useFoodWagenStore = create<FoodWagenState>((set) => ({
  // Initial State
  modals: initialModalState,
  searchFilter: initialSearchFilterState,
  selectedMeal: null,

  // Modal Actions
  openAddModal: () =>
    set((state) => ({
      modals: {
        ...state.modals,
        isAddModalOpen: true,
        isEditModalOpen: false,
        isDeleteModalOpen: false,
      },
      selectedMeal: null,
    })),

  openEditModal: (meal: Meal) =>
    set((state) => ({
      modals: {
        ...state.modals,
        isAddModalOpen: false,
        isEditModalOpen: true,
        isDeleteModalOpen: false,
      },
      selectedMeal: meal,
    })),

  openDeleteModal: (meal: Meal) =>
    set((state) => ({
      modals: {
        ...state.modals,
        isAddModalOpen: false,
        isEditModalOpen: false,
        isDeleteModalOpen: true,
      },
      selectedMeal: meal,
    })),

  closeAllModals: () =>
    set(() => ({
      modals: initialModalState,
      selectedMeal: null,
    })),

  // Search and Filter Actions
  setSearchQuery: (query: string) =>
    set((state) => ({
      searchFilter: {
        ...state.searchFilter,
        searchQuery: query,
      },
    })),

  setSelectedStatus: (status: RestaurantStatus | "all") =>
    set((state) => ({
      searchFilter: {
        ...state.searchFilter,
        selectedStatus: status,
      },
    })),

  setMinRating: (rating: number) =>
    set((state) => ({
      searchFilter: {
        ...state.searchFilter,
        minRating: rating,
      },
    })),

  resetFilters: () =>
    set(() => ({
      searchFilter: initialSearchFilterState,
    })),

  // Selected Meal Actions
  setSelectedMeal: (meal: Meal | null) =>
    set(() => ({
      selectedMeal: meal,
    })),
}));
