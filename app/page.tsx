/**
 * FoodWagen Home Page
 * Main page with meals grid, search, filter, and modal management
 */

'use client';

import React from 'react';
import { useMeals, useCreateMeal, useUpdateMeal, useDeleteMeal } from '@/lib/hooks';
import { useFoodWagenStore } from '@/lib/store';
import { applyAllFilters } from '@/lib/utils';
import { CreateMealData, UpdateMealData } from '@/types/meal';
import { MealCard } from '@/components/MealCard';
import { AddMealModal } from '@/components/AddMealModal';
import { EditMealModal } from '@/components/EditMealModal';
import { DeleteMealModal } from '@/components/DeleteMealModal';
import { Button } from '@/components/Button';

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

  return (
    <main className="food-container">
      {/* Hero Section */}
      <section style={{ padding: '48px 0', textAlign: 'center' }}>
        <h1 className="food-text-hero" style={{ marginBottom: '24px' }}>
          Discover Amazing Meals
        </h1>
        <Button
          variant="primary"
          onClick={openAddModal}
          data-testid="add-meal-button"
          style={{ margin: '0 auto' }}
        >
          Add New Meal
        </Button>
      </section>

      {/* Meals Grid */}
      <section className="food-content" style={{ paddingBottom: '48px' }}>
        {isLoading && (
          <div className="food-flex-center" style={{ padding: '48px 0' }}>
            <p className="food-text-body">Loading meals...</p>
          </div>
        )}

        {error && (
          <div className="food-flex-center" style={{ padding: '48px 0' }}>
            <p className="food-text-error">
              Failed to load meals. Please try again later.
            </p>
          </div>
        )}

        {!isLoading && !error && filteredMeals.length === 0 && (
          <div className="food-flex-center" style={{ padding: '48px 0' }}>
            <p className="food-text-body">
              No meals found. {meals.length === 0 ? 'Add your first meal!' : 'Try adjusting your filters.'}
            </p>
          </div>
        )}

        {!isLoading && !error && filteredMeals.length > 0 && (
          <div className="food-grid" data-testid="meals-grid">
            {filteredMeals.map((meal) => (
              <MealCard
                key={meal.id}
                meal={meal}
                onEdit={openEditModal}
                onDelete={openDeleteModal}
                data-testid={`meal-card-${meal.id}`}
              />
            ))}
          </div>
        )}
      </section>

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
    </main>
  );
}
