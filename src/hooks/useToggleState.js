import { useState } from 'react';

/**
 * A hook for managing toggle state with optional loading state
 * 
 * @param {boolean} initialState - Initial state of the toggle
 * @param {number} loadingDelay - Delay in milliseconds for loading state (0 for no loading)
 * @returns {Object} Toggle state, loading state, and control functions
 * 
 * @example
 * const { state, isLoading, toggle, setState } = useToggleState(false, 1500);
 * 
 * // Toggle with loading
 * toggle();
 * 
 * // Check states
 * const isActive = state;
 * const showLoadingIndicator = isLoading;
 * 
 * // Directly set state
 * setState(true);
 */
export const useToggleState = (initialState = false, loadingDelay = 0) => {
  const [state, setState] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);

  const toggle = () => {
    if (isLoading) return;
    
    const newState = !state;
    
    if (newState && loadingDelay > 0) {
      setIsLoading(true);
      setState(newState);
      
      setTimeout(() => {
        setIsLoading(false);
      }, loadingDelay);
    } else {
      setState(newState);
    }
  };

  return {
    state,
    isLoading,
    toggle,
    setState
  };
};

export default useToggleState;
