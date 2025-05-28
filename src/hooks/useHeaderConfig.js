/**
 * 
 * 
 * @param {Object} options - Configuration options
 * @param {string} options.viewMode - Current view mode ('grid' or 'list')
 * @param {Function} options.toggleViewMode - Function to toggle view mode
 * @param {string} options.searchTerm - Current search term
 * @param {Function} options.setSearchTerm - Function to update search term
 * @param {Object} options.activeFilters - Active filters configuration
 * @param {Function} options.onRemoveFilter - Function to remove a filter
 * @param {Function} options.onClearFilters - Function to clear all filters
 * @param {Array} options.customButtons - Custom buttons configuration
 * @param {Array} options.filterButtons - Filter buttons configuration
 * @returns {Object} Header configuration object
 */
export const useHeaderConfig = ({
  viewMode,
  toggleViewMode,
  searchTerm,
  setSearchTerm,
  activeFilters = {},
  onRemoveFilter,
  onClearFilters,
  customButtons = [],
  filterButtons = [],
  placeholder = "Search...",
  searchName = "search"
}) => {
  return {
    searchTerm,
    setSearchTerm,
    placeholder,
    searchName,
    labelText: "",
    viewToggle: true,
    viewMode,
    setViewMode: toggleViewMode,
    activeFilters,
    onRemoveFilter,
    onClearFilters,
    customButtons,
    filterButtons
  };
};

export default useHeaderConfig;
