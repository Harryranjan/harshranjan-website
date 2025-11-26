import { useState, useEffect, useCallback } from "react";
import api from "../utils/api";

/**
 * Universal CRUD Hook for Resource Management
 * Handles fetching, creating, updating, deleting resources with pagination, search, and filters
 *
 * @param {string} endpoint - API endpoint (e.g., 'blog', 'pages', 'forms')
 * @param {object} options - Configuration options
 * @returns {object} CRUD operations and state
 */
export const useCRUDResource = (endpoint, options = {}) => {
  const {
    initialPage = 1,
    initialLimit = 10,
    initialFilters = {},
    transformData = (data) => data, // Transform API response
    onSuccess = null, // Callback after successful operations
    onError = null, // Callback after errors
  } = options;

  // State
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: initialPage,
    totalPages: 1,
    totalItems: 0,
    limit: initialLimit,
  });
  const [filters, setFilters] = useState(initialFilters);
  const [searchQuery, setSearchQuery] = useState("");

  /**
   * Fetch items from API
   */
  const fetchItems = useCallback(
    async (page = pagination.currentPage, limit = pagination.limit) => {
      try {
        setLoading(true);
        setError(null);

        // Build query params
        const params = new URLSearchParams({
          page: page.toString(),
          limit: limit.toString(),
        });

        // Add search query
        if (searchQuery) {
          params.append("search", searchQuery);
        }

        // Add filters
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== null && value !== undefined && value !== "") {
            params.append(key, value);
          }
        });

        const response = await api.get(`/${endpoint}?${params.toString()}`);

        // Handle different API response structures
        let itemsData, paginationData;

        if (response.data.posts) {
          // Blog API structure
          itemsData = response.data.posts;
          paginationData = {
            currentPage: response.data.currentPage || page,
            totalPages: response.data.totalPages || 1,
            totalItems: response.data.totalPosts || 0,
            limit: limit,
          };
        } else if (response.data.forms) {
          // Forms API structure
          itemsData = response.data.forms;
          paginationData = {
            currentPage: response.data.currentPage || page,
            totalPages: response.data.totalPages || 1,
            totalItems: response.data.totalForms || 0,
            limit: limit,
          };
        } else if (Array.isArray(response.data)) {
          // Simple array response
          itemsData = response.data;
          paginationData = {
            currentPage: 1,
            totalPages: 1,
            totalItems: response.data.length,
            limit: response.data.length,
          };
        } else if (response.data.data) {
          // Generic data wrapper
          itemsData = response.data.data;
          paginationData = response.data.pagination || {
            currentPage: page,
            totalPages: 1,
            totalItems: itemsData.length,
            limit: limit,
          };
        } else {
          // Fallback
          itemsData = [];
          paginationData = pagination;
        }

        setItems(transformData(itemsData));
        setPagination(paginationData);
      } catch (err) {
        const errorMessage =
          err.response?.data?.message || err.message || "Failed to fetch items";
        setError(errorMessage);
        if (onError) onError(err);
      } finally {
        setLoading(false);
      }
    },
    [
      endpoint,
      pagination.currentPage,
      pagination.limit,
      filters,
      searchQuery,
      transformData,
      onError,
    ]
  );

  /**
   * Create new item
   */
  const createItem = async (data) => {
    try {
      setLoading(true);
      const response = await api.post(`/${endpoint}`, data);

      if (onSuccess) onSuccess("create", response.data);

      // Refresh list
      await fetchItems(1);

      return { success: true, data: response.data };
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Failed to create item";
      setError(errorMessage);
      if (onError) onError(err);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Update existing item
   */
  const updateItem = async (id, data) => {
    try {
      setLoading(true);
      const response = await api.put(`/${endpoint}/${id}`, data);

      if (onSuccess) onSuccess("update", response.data);

      // Update item in list
      setItems((prevItems) =>
        prevItems.map((item) =>
          item.id === id ? { ...item, ...response.data } : item
        )
      );

      return { success: true, data: response.data };
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Failed to update item";
      setError(errorMessage);
      if (onError) onError(err);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Delete item
   */
  const deleteItem = async (id) => {
    try {
      setLoading(true);
      await api.delete(`/${endpoint}/${id}`);

      if (onSuccess) onSuccess("delete", { id });

      // Remove item from list
      setItems((prevItems) => prevItems.filter((item) => item.id !== id));

      // Adjust pagination
      setPagination((prev) => ({
        ...prev,
        totalItems: prev.totalItems - 1,
      }));

      return { success: true };
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Failed to delete item";
      setError(errorMessage);
      if (onError) onError(err);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Bulk delete items
   */
  const bulkDelete = async (ids) => {
    try {
      setLoading(true);
      await Promise.all(ids.map((id) => api.delete(`/${endpoint}/${id}`)));

      if (onSuccess) onSuccess("bulkDelete", { ids });

      // Remove items from list
      setItems((prevItems) =>
        prevItems.filter((item) => !ids.includes(item.id))
      );

      // Adjust pagination
      setPagination((prev) => ({
        ...prev,
        totalItems: prev.totalItems - ids.length,
      }));

      return { success: true };
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Failed to delete items";
      setError(errorMessage);
      if (onError) onError(err);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Refresh current page
   */
  const refresh = useCallback(() => {
    fetchItems(pagination.currentPage, pagination.limit);
  }, [fetchItems, pagination.currentPage, pagination.limit]);

  /**
   * Change page
   */
  const goToPage = (page) => {
    setPagination((prev) => ({ ...prev, currentPage: page }));
  };

  /**
   * Change items per page
   */
  const changeLimit = (newLimit) => {
    setPagination((prev) => ({ ...prev, limit: newLimit, currentPage: 1 }));
  };

  /**
   * Update filters
   */
  const updateFilters = (newFilters) => {
    setFilters(newFilters);
    setPagination((prev) => ({ ...prev, currentPage: 1 }));
  };

  /**
   * Update search query
   */
  const updateSearch = (query) => {
    setSearchQuery(query);
    setPagination((prev) => ({ ...prev, currentPage: 1 }));
  };

  /**
   * Clear all filters and search
   */
  const clearFilters = () => {
    setFilters(initialFilters);
    setSearchQuery("");
    setPagination((prev) => ({ ...prev, currentPage: 1 }));
  };

  // Fetch items on mount and when dependencies change
  useEffect(() => {
    fetchItems(pagination.currentPage, pagination.limit);
  }, [fetchItems, pagination.currentPage, pagination.limit]);

  return {
    // Data
    items,
    loading,
    error,
    pagination,
    filters,
    searchQuery,

    // CRUD operations
    createItem,
    updateItem,
    deleteItem,
    bulkDelete,

    // Navigation & Filtering
    goToPage,
    changeLimit,
    updateFilters,
    updateSearch,
    clearFilters,
    refresh,

    // Utilities
    setItems, // Manual override if needed
    setError, // Clear errors manually
  };
};

export default useCRUDResource;
