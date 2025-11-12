/**
 * FoodWagen Home Page - Figma Design
 * Main page with navigation, hero, featured meals, and footer
 */

'use client';

import React from 'react';
import { useMeals, useCreateMeal, useUpdateMeal, useDeleteMeal } from '@/lib/hooks';
import { useFoodWagenStore } from '@/lib/store';
import { applyAllFilters } from '@/lib/utils';
import { CreateMealData, UpdateMealData } from '@/types/meal';
import { Navigation } from '@/components/layout/Navigation';
import { Hero } from '@/components/layout/Hero';
import { FeaturedMeals } from '@/components/FeaturedMeals';
import { Footer } from '@/components/layout/Footer';
import { AddMealModal } from '@/components/AddMealModal';
import { EditMealModal } from '@/components/EditMealModal';
import { DeleteMealModal } from '@/components/DeleteMealModal';
import { Spinner } from '@/components/Spinner';
import { MealGridSkeleton } from '@/components/MealCardSkeleton';

export default function Home() {
  // Fetch meals data
  const { data: meals = [], isLoading, error } = useMeals();

  // Mutations
  const createMealMutation = useCreateMeal();
  const updateMealMutation = useUpdateMeal();
  const deleteMealMutation = useDeleteMeal();

  // Global state
  const modals = useFoodWagenStore((state) => state.modals);
  const selectedMeal = useFoodWagenStore((state) => state.selectedMeal);
  const searchFilter = useFoodWagenStore((state) => state.searchFilter);
  const openAddModal = useFoodWagenStore((state) => state.openAddModal);
  const openEditModal = useFoodWagenStore((state) => state.openEditModal);
  const openDeleteModal = useFoodWagenStore((state) => state.openDeleteModal);
  const closeAllModals = useFoodWagenStore((state) => state.closeAllModals);

  // Apply filters to meals
  const filteredMeals = applyAllFilters(
    meals,
    searchFilter.searchQuery,
    searchFilter.selectedStatus,
    searchFilter.minRating
  );

  // Handle meal creation
  const handleCreateMeal = async (data: CreateMealData) => {
    try {
      await createMealMutation.mutateAsync(data);
      closeAllModals();
    } catch (error) {
      console.error('Failed to create meal:', error);
    }
  };

  // Handle meal update
  const handleUpdateMeal = async (id: string, data: UpdateMealData) => {
    try {
      await updateMealMutation.mutateAsync({ id, data });
      closeAllModals();
    } catch (error) {
      console.error('Failed to update meal:', error);
    }
  };

  // Handle meal deletion
  const handleDeleteMeal = async (id: string) => {
    try {
      await deleteMealMutation.mutateAsync(id);
      closeAllModals();
    } catch (error) {
      console.error('Failed to delete meal:', error);
    }
  };

  // Handle search from hero
  const handleSearch = (query: string) => {
    useFoodWagenStore.getState().setSearchQuery(query);
  };

  // State for visible meals count
  const [visibleCount, setVisibleCount] = React.useState(8);

  // Handle load more
  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 8);
  };

  // Get visible meals
  const visibleMeals = filteredMeals.slice(0, visibleCount);

  return (
    <>
      {/* Navigation */}
      <Navigation onAddMealClick={openAddModal} />

      {/* Hero Section */}
      <Hero onSearch={handleSearch} />

      {/* Featured Meals Section */}
      <main>
        {isLoading && (
          <MealGridSkeleton count={6} />
        )}

        {error && (
          <div className="food-flex-center" style={{ padding: '80px 0' }}>
            <p className="food-text-error">
              Failed to load meals. Please try again later.
            </p>
          </div>
        )}

        {!isLoading && !error && filteredMeals.length === 0 && (
          <div className="food-flex-center" style={{ padding: '80px 0' }}>
            <p className="food-text-body">
              No meals found. {meals.length === 0 ? 'Add your first meal!' : 'Try adjusting your search.'}
            </p>
          </div>
        )}

        {!isLoading && !error && filteredMeals.length > 0 && (
          <FeaturedMeals
            meals={visibleMeals}
            onEdit={openEditModal}
            onDelete={openDeleteModal}
            onLoadMore={handleLoadMore}
            hasMore={visibleCount < filteredMeals.length}
          />
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals */}
      <AddMealModal
        isOpen={modals.isAddModalOpen}
        onClose={closeAllModals}
        onSubmit={handleCreateMeal}
        isLoading={createMealMutation.isPending}
      />

      <EditMealModal
        isOpen={modals.isEditModalOpen}
        meal={selectedMeal}
        onClose={closeAllModals}
        onSubmit={handleUpdateMeal}
        isLoading={updateMealMutation.isPending}
      />

      <DeleteMealModal
        isOpen={modals.isDeleteModalOpen}
        meal={selectedMeal}
        onClose={closeAllModals}
        onConfirm={handleDeleteMeal}
        isLoading={deleteMealMutation.isPending}
      />

      {/* Full Page Loading Spinner for API Operations */}
      {(createMealMutation.isPending || updateMealMutation.isPending || deleteMealMutation.isPending) && (
        <Spinner 
          fullPage 
          size="large" 
          message={
            createMealMutation.isPending ? 'Adding meal...' :
            updateMealMutation.isPending ? 'Updating meal...' :
            'Deleting meal...'
          } 
        />
      )}
    </>
  );
}
