import { useState } from 'react';

/**
 * A hook for managing multiple modal states
 * 
 * @param {Object} initialModals - An object with modal names as keys and boolean values
 * @returns {Object} Modal state and control functions
 * 
 * @example
 * const { modals, openModal, closeModal, toggleModal } = useModalControl({
 *   filter: false,
 *   details: false
 * });
 * 
 * // Using modal state
 * const isFilterOpen = modals.filter;
 * 
 * // Open a modal
 * openModal('filter');
 * 
 * // Close a modal
 * closeModal('filter');
 * 
 * // Toggle a modal
 * toggleModal('filter');
 */
export const useModalControl = (initialModals = {}) => {
  const [modals, setModals] = useState(initialModals);

  const openModal = (modalName) => {
    console.log('Opening modal:', modalName);
    setModals(prev => {
      const newState = { ...prev, [modalName]: true };
      console.log('New modal state:', newState);
      return newState;
    });
  };

  const closeModal = (modalName) => {
    console.log('Closing modal:', modalName);
    setModals(prev => {
      const newState = { ...prev, [modalName]: false };
      console.log('New modal state after close:', newState);
      return newState;
    });
  };

  const toggleModal = (modalName) => {
    setModals(prev => ({ ...prev, [modalName]: !prev[modalName] }));
  };

  return {
    modals,
    openModal,
    closeModal,
    toggleModal
  };
};

export default useModalControl;
