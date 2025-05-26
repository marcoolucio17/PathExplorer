import useHeaderConfig from '../useHeaderConfig';

/**
 * Hook for configuring the SearchHeader for the Applicants page
 * 
 * @param {Object} props - Props from the applicants page
 * @returns {Object} Header configuration for SearchHeader component
 */
export const useApplicantsHeaderConfig = (props) => {
  const {
    viewMode,
    toggleViewMode,
    searchTerm,
    setSearchTerm,
    getActiveFilters,
    filterStates,
    openModal,
    handleClearFilters,
    setSortOption,
    toggleCompatibility,
    showCompatibility,
    compatibilityLoading,
    projectOptions
  } = props;

  const customButtons = [
    {
      label: "Filter By",
      type: "secondary",
      icon: "bi-funnel",
      hasDropdown: true,
      isFilterButton: true,
      dropdownItems: [
        { 
          label: 'Projects', 
          icon: 'bi-folder',
          subMenu: true,
          options: [
            { label: 'All Projects', value: 'All Projects' },
            ...(projectOptions.slice(0, 4).map(project => ({ 
              label: project, 
              value: project 
            }))),
            { label: 'More Options...', action: 'modal', icon: 'bi-three-dots' }
          ]
        },
        { 
          label: 'Skills', 
          action: 'skills', 
          icon: 'bi-tools'
        }
      ],
      onDropdownItemClick: (item) => {
        if (item.action === 'modal') {
          openModal('projectFilter');
        } else if (item.action === 'skills') {
          openModal('skillsFilter');
        } else if (item.value) {
          filterStates.setSelectedProject(item.value);
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
        { label: 'Experience (Low to High)', value: 'exp_asc', icon: 'bi-sort-numeric-down' },
        { label: 'Experience (High to Low)', value: 'exp_desc', icon: 'bi-sort-numeric-down-alt' },
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
      isActive: showCompatibility,
      isLoading: compatibilityLoading
    }
  ];

  // Handle removing filters
  const handleRemoveFilter = (filterType, value) => {
    if (filterType === 'projects') {
      filterStates.setSelectedProject('All Projects');
    } else if (filterType === 'skills') {
      filterStates.setSelectedSkills(prev => 
        prev.filter(skill => skill !== value)
      );
    }
  };

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
    searchName: "searchApplicants"
  });
};

export default useApplicantsHeaderConfig;
