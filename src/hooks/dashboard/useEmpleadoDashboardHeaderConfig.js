import useHeaderConfig from '../useHeaderConfig';

/**
 * 
 * 
 * 
 * @param {Object} props - Props from the dashboard page
 * @returns {Object} Header configuration for SearchHeader component
 */
export const useEmpleadoDashboardHeaderConfig = (props) => {
  const {
    viewMode,
    toggleViewMode,
    searchTerm,
    setSearchTerm,
    getActiveFilters,
    handleClearFilters,
    toggleSkillsFilterModal,
    setSortOption,
    toggleCompatibility,
    showCompatibility,
    handleRemoveFilter
  } = props;

  // Employee version - only Filter By and Sort By buttons (no "View Applicants" or "New Project")
  const customButtons = [
    {
      label: "Filter By",
      type: "secondary",
      icon: "bi-funnel",
      hasDropdown: true,
      isFilterButton: true,
      dropdownItems: [
        { 
          label: 'Skills', 
          action: 'skills', 
          icon: 'bi-tools'
        }
      ],
      onDropdownItemClick: (item) => {
        if (item.action === 'skills') {
          toggleSkillsFilterModal();
        }
      }
    },
    {
      label: "Sort By",
      type: "secondary",
      icon: "bi-sort-down",
      hasDropdown: true,
      isFilterButton: true,
      dropdownItems: [
        { label: 'Name (A to Z)', value: 'name_asc', icon: 'bi-sort-alpha-down' },
        { label: 'Name (Z to A)', value: 'name_desc', icon: 'bi-sort-alpha-down-alt' },
        { label: 'Newest First', value: 'date_desc', icon: 'bi-calendar-date' },
        { label: 'Oldest First', value: 'date_asc', icon: 'bi-calendar2-date' },
        { label: 'Compatibility (High to Low)', value: 'match_desc', icon: 'bi-star-fill' },
        { label: 'Compatibility (Low to High)', value: 'match_asc', icon: 'bi-star' }
      ],
      onDropdownItemClick: (item) => {
        setSortOption(item.value);
      }
    }
  ];

  const filterButtons = [
    {
      label: "Compatibility",
      onClick: toggleCompatibility,
      type: 'primary',
      variant: 'compatibility',
      isActive: showCompatibility
    }
  ];

  return useHeaderConfig({
    viewMode,
    toggleViewMode,
    searchTerm,
    setSearchTerm,
    activeFilters: getActiveFilters(),
    onRemoveFilter: handleRemoveFilter,
    onClearFilters: handleClearFilters,
    customButtons,
    filterButtons,
    placeholder: "Search by Name...",
    searchName: "searchProjects"
  });
};

export default useEmpleadoDashboardHeaderConfig;