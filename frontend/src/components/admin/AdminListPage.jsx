import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DataTable from '../ui/DataTable';
import FilterBar from '../ui/FilterBar';
import EmptyState from '../ui/EmptyState';
import ConfirmationModal from '../ui/ConfirmationModal';
import { useCRUDResource } from '../../hooks/useCRUDResource';

/**
 * Universal Admin List Page Component
 * Handles listing, filtering, pagination, and actions for any resource
 * 
 * @param {object} props - Configuration for the list page
 */
const AdminListPage = ({
  // Resource Configuration
  resource, // { name: 'Blog Posts', singular: 'Blog Post', endpoint: 'blog' }
  
  // Table Configuration
  columns, // Array of column definitions for DataTable
  
  // Actions
  actions = {}, // { create: '/admin/blog/create', edit: (id) => `/admin/blog/edit/${id}`, view: (id) => `/admin/blog/${id}` }
  bulkActions = [], // Array of bulk action configs
  rowActions = [], // Array of row action configs (edit, delete, etc.)
  
  // Filtering
  filterConfig = [], // Array of filter field configs for FilterBar
  searchPlaceholder = 'Search...',
  
  // Empty State
  emptyState = {},
  
  // Custom Hooks
  useCRUDOptions = {}, // Options to pass to useCRUDResource hook
  
  // Custom Renderers
  renderCustomActions = null, // Function to render custom action buttons
  transformData = null, // Function to transform fetched data
  
  // Callbacks
  onItemDeleted = null,
  onBulkAction = null,
}) => {
  const {
    items,
    loading,
    error,
    pagination,
    deleteItem,
    bulkDelete,
    goToPage,
    updateFilters,
    updateSearch,
    clearFilters,
    refresh,
  } = useCRUDResource(resource.endpoint, {
    ...useCRUDOptions,
    transformData,
    onSuccess: (action, data) => {
      if (action === 'delete' && onItemDeleted) {
        onItemDeleted(data);
      }
    },
  });

  // Selection state for bulk actions
  const [selectedItems, setSelectedItems] = useState([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [bulkDeleteModalOpen, setBulkDeleteModalOpen] = useState(false);

  /**
   * Handle delete single item
   */
  const handleDeleteClick = (item) => {
    setItemToDelete(item);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (itemToDelete) {
      const result = await deleteItem(itemToDelete.id);
      if (result.success) {
        setDeleteModalOpen(false);
        setItemToDelete(null);
      }
    }
  };

  /**
   * Handle bulk delete
   */
  const handleBulkDeleteClick = () => {
    if (selectedItems.length > 0) {
      setBulkDeleteModalOpen(true);
    }
  };

  const handleBulkDeleteConfirm = async () => {
    const result = await bulkDelete(selectedItems);
    if (result.success) {
      setSelectedItems([]);
      setBulkDeleteModalOpen(false);
    }
  };

  /**
   * Handle bulk action
   */
  const handleBulkAction = async (actionType) => {
    if (onBulkAction) {
      await onBulkAction(actionType, selectedItems);
      setSelectedItems([]);
    }
  };

  /**
   * Build default row actions
   */
  const defaultRowActions = [
    actions.view && {
      label: 'View',
      icon: 'eye',
      onClick: (item) => window.location.href = actions.view(item.id),
      variant: 'secondary',
    },
    actions.edit && {
      label: 'Edit',
      icon: 'edit',
      onClick: (item) => window.location.href = actions.edit(item.id),
      variant: 'primary',
    },
    {
      label: 'Delete',
      icon: 'trash',
      onClick: handleDeleteClick,
      variant: 'danger',
    },
  ].filter(Boolean);

  const allRowActions = [...defaultRowActions, ...rowActions];

  /**
   * Build bulk actions menu
   */
  const defaultBulkActions = [
    {
      label: `Delete (${selectedItems.length})`,
      icon: 'trash',
      onClick: handleBulkDeleteClick,
      variant: 'danger',
      disabled: selectedItems.length === 0,
    },
  ];

  const allBulkActions = [...defaultBulkActions, ...bulkActions];

  /**
   * Error State
   */
  if (error && !loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 text-red-800 px-6 py-4 rounded-lg">
          <h3 className="font-semibold mb-2">Error Loading {resource.name}</h3>
          <p>{error}</p>
          <button
            onClick={refresh}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  /**
   * Empty State
   */
  if (!loading && items.length === 0 && !Object.keys(filters || {}).length && !searchQuery) {
    return (
      <div className="container mx-auto px-4 py-8">
        <EmptyState
          title={emptyState.title || `No ${resource.name} Yet`}
          description={emptyState.description || `Get started by creating your first ${resource.singular.toLowerCase()}.`}
          icon={emptyState.icon || 'inbox'}
          action={
            actions.create && {
              label: emptyState.actionLabel || `Create ${resource.singular}`,
              onClick: () => window.location.href = actions.create,
            }
          }
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{resource.name}</h1>
          <p className="text-gray-600 mt-1">
            {pagination.totalItems} {pagination.totalItems === 1 ? resource.singular.toLowerCase() : resource.name.toLowerCase()}
          </p>
        </div>
        
        <div className="flex gap-3">
          {renderCustomActions && renderCustomActions()}
          
          {actions.create && (
            <Link
              to={actions.create}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Create {resource.singular}
            </Link>
          )}
        </div>
      </div>

      {/* Filters */}
      {filterConfig.length > 0 && (
        <div className="mb-6">
          <FilterBar
            filters={filterConfig}
            onFilterChange={updateFilters}
            onSearch={updateSearch}
            onClearFilters={clearFilters}
            searchPlaceholder={searchPlaceholder}
          />
        </div>
      )}

      {/* Bulk Actions */}
      {selectedItems.length > 0 && (
        <div className="mb-4 bg-blue-50 border border-blue-200 rounded-lg px-4 py-3 flex items-center justify-between">
          <span className="text-blue-900 font-medium">
            {selectedItems.length} item{selectedItems.length !== 1 ? 's' : ''} selected
          </span>
          <div className="flex gap-2">
            {allBulkActions.map((action, index) => (
              <button
                key={index}
                onClick={action.onClick}
                disabled={action.disabled}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  action.variant === 'danger'
                    ? 'bg-red-600 text-white hover:bg-red-700 disabled:bg-red-300'
                    : 'bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-300'
                }`}
              >
                {action.label}
              </button>
            ))}
            <button
              onClick={() => setSelectedItems([])}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
            >
              Clear Selection
            </button>
          </div>
        </div>
      )}

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={items}
        loading={loading}
        pagination={pagination}
        onPageChange={goToPage}
        selectable={bulkActions.length > 0 || allBulkActions.length > 0}
        selectedRows={selectedItems}
        onSelectionChange={setSelectedItems}
        actions={allRowActions}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        title={`Delete ${resource.singular}`}
        message={`Are you sure you want to delete "${itemToDelete?.title || itemToDelete?.name || 'this item'}"? This action cannot be undone.`}
        confirmLabel="Delete"
        cancelLabel="Cancel"
        variant="danger"
      />

      {/* Bulk Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={bulkDeleteModalOpen}
        onClose={() => setBulkDeleteModalOpen(false)}
        onConfirm={handleBulkDeleteConfirm}
        title={`Delete ${selectedItems.length} ${selectedItems.length === 1 ? resource.singular : resource.name}`}
        message={`Are you sure you want to delete ${selectedItems.length} ${selectedItems.length === 1 ? resource.singular.toLowerCase() : resource.name.toLowerCase()}? This action cannot be undone.`}
        confirmLabel={`Delete ${selectedItems.length} Item${selectedItems.length !== 1 ? 's' : ''}`}
        cancelLabel="Cancel"
        variant="danger"
      />
    </div>
  );
};

export default AdminListPage;
