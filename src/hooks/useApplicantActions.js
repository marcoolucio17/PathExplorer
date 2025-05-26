import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Custom hook for managing applicant actions (view, approve, deny, appeal)
 * @param {Array} applicants - The current applicants array
 * @param {Function} setApplicants - Function to update applicants
 * @returns {Object} - Actions and states for applicant management
 */
const useApplicantActions = (applicants, setApplicants) => {
  const navigate = useNavigate();
  const [denialReasonModalOpen, setDenialReasonModalOpen] = useState(false);
  const [selectedDeniedApplicant, setSelectedDeniedApplicant] = useState(null);
  
  // View applicant details
  const handleViewApplicant = (applicantId) => {
    // If viewing a denied applicant, show the denial reason modal
    const applicant = applicants.find(app => app.id === applicantId);
    if (applicant && applicant.status === 'Denied') {
      setSelectedDeniedApplicant(applicant);
      setDenialReasonModalOpen(true);
    } else {
      navigate(`/manager/applicants/${applicantId}`);
    }
  };
  
  // Handle accepting an applicant
  const handleApproveApplicant = (applicantId) => {
    setApplicants(prevApplicants => 
      prevApplicants.map(app => 
        app.id === applicantId ? { ...app, status: 'Approved' } : app
      )
    );
  };
  
  // Handle accepting a denied applicant
  const handleAcceptDeniedApplicant = (applicant) => {
    setApplicants(prevApplicants => 
      prevApplicants.map(app => 
        app.id === applicant.id ? { ...app, status: 'In Review' } : app
      )
    );
    setDenialReasonModalOpen(false);
  };
  
  // Handle denying an applicant
  const handleDenyApplicant = (applicantId, reason) => {
    setApplicants(prevApplicants => 
      prevApplicants.map(app => 
        app.id === applicantId ? { ...app, status: 'Denied', denialReason: reason } : app
      )
    );
  };
  
  // Handle appeal for a denied applicant
  const handleAppealDeniedApplicant = (applicant, appealReason) => {
    console.log(`Appeal submitted for ${applicant.name}: ${appealReason}`);
    setDenialReasonModalOpen(false);
    
    // In a real app, you would make an API call to submit the appeal
    // and potentially change the status back to "In Review" or a new "Appeal" status
  };
  
  // Close the denial reason modal
  const closeDenialModal = () => {
    setDenialReasonModalOpen(false);
    setSelectedDeniedApplicant(null);
  };
  
  return {
    denialReasonModalOpen,
    selectedDeniedApplicant,
    handleViewApplicant,
    handleApproveApplicant,
    handleAcceptDeniedApplicant,
    handleDenyApplicant,
    handleAppealDeniedApplicant,
    closeDenialModal
  };
};

export default useApplicantActions;