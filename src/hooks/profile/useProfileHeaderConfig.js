import useHeaderConfig from '../useHeaderConfig';

/**
 * Hook for configuring the SearchHeader for the Profile page
 * 
 * @param {Object} props - Props from the profile page
 * @returns {Object} Header configuration for SearchHeader component
 */
export const useProfileHeaderConfig = (props) => {
  const {
    searchTerm,
    setSearchTerm,
    handleCVClick,
    handleEditClick,
    handleSkillsClick,
    handleAddCertificateClick,
    handleBack
  } = props;

  const customButtons = [
    {
      label: "Back",
      type: "secondary",
      icon: "bi-arrow-left",
      onClick: handleBack
    },
    {
      label: "CV",
      type: "secondary",
      icon: "bi-file-earmark-text",
      onClick: handleCVClick
    },
    {
      label: "Edit Profile",
      type: "primary",
      icon: "bi-pencil-fill",
      onClick: handleEditClick
    }
  ];

  const filterButtons = [
    {
      label: "Skills",
      onClick: handleSkillsClick,
      type: 'secondary',
      variant: 'default'
    },
    {
      label: "Add Certificate",
      onClick: handleAddCertificateClick,
      type: 'primary',
      variant: 'default'
    }
  ];

  return useHeaderConfig({
    searchTerm,
    setSearchTerm,
    activeFilters: {},
    onRemoveFilter: () => {},
    onClearFilters: () => {},
    customButtons,
    filterButtons,
    placeholder: "Search profile content...",
    searchName: "searchProfile",
    viewToggle: false // Profile page doesn't need view toggle
  });
};

export default useProfileHeaderConfig;