import React from "react";
import { PreConfiguredPages } from '../../../components/universal';

/**
 * Refactored Manager Applicants Page
 * 
 * Now uses the universal page system with manager-specific applicants configuration.
 * Reduced from ~85 lines to ~5 lines while maintaining all functionality including:
 * - Tab navigation (Pending, In Review, Accepted, Denied)
 * - Skills and project filtering  
 * - Compatibility mode
 * - Special handling for denied applicants
 * - All modal management
 */
export const ManagerApplicantsPage = () => {
  return <PreConfiguredPages.ManagerApplicants />;
};

// Alternative approach with custom configuration
export const ManagerApplicantsPageCustom = () => {
  const { createCompleteUniversalPage } = require('../../../components/universal');
  
  const ManagerApplicants = createCompleteUniversalPage('applicants', 'manager', {
    // Additional customizations for manager applicants
    additionalOptions: {
      // Custom data parameters
      dataParams: {
        includeMatchScores: true,
        includeDenialReasons: true
      },
      
      // Custom header options
      headerOptions: {
        customButtons: [
          // Add any manager-specific filter buttons
          {
            label: "Advanced Filters",
            type: "secondary",
            icon: "bi-funnel-fill",
            action: "advancedFilters"
          }
        ]
      }
    },
    
    // Custom components if needed
    customComponents: {
      // Override specific components for manager use case
    },
    
    // Custom modals if needed
    customModals: {
      // Add manager-specific modals
    }
  });
  
  return <ManagerApplicants />;
};

export default ManagerApplicantsPage;
