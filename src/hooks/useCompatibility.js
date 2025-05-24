import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook for managing compatibility mode with loading state and match calculations
 * @param {Array} items - The items to calculate compatibility for
 * @param {Object} options - Additional options
 * @returns {Object} - Compatibility state, handlers, and calculation function
 */
const useCompatibility = (items = [], options = {}) => {
  const [showCompatibility, setShowCompatibility] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const matchPercentagesRef = useRef({});
  
  // Toggle compatibility view
  const toggleCompatibility = () => {
    // If already in loading state, don't do anything
    if (isLoading) return;
    
    // Toggle the compatibility state
    const newCompatibilityState = !showCompatibility;
    
    // Only show loading when turning compatibility ON
    if (newCompatibilityState) {
      // Set loading first
      setIsLoading(true);
      setShowCompatibility(true);
      
      // Clear match percentages cache to ensure fresh calculation
      matchPercentagesRef.current = {};
      
      // Simulate the time it takes to calculate compatibility scores
      setTimeout(() => {
        setIsLoading(false);
      }, options.loadingDelay || 1500);
    } else {
      // Immediately turn off compatibility without loading
      setShowCompatibility(false);
    }
  };
  
  // Calculate match percentages once when compatibility is turned on
  useEffect(() => {
    if (showCompatibility && !isLoading) {
      // Only recalculate if the cache is empty or we're explicitly requested to refresh
      if (Object.keys(matchPercentagesRef.current).length === 0) {
        const newPercentages = {};
        
        // Pre-calculate all percentages
        items.forEach(item => {
          if (item && item.id) {
            // In a real implementation, this would use a more sophisticated algorithm
            // to calculate the match based on skills, experience, etc.
            newPercentages[item.id] = Math.floor(Math.random() * 101); // Random 0-100 for demo
          }
        });
        
        matchPercentagesRef.current = newPercentages;
      }
    }
  }, [showCompatibility, isLoading, items]);
  
  // Calculate matching percentage (use cached values)
  const calculateMatchPercentage = (item) => {
    if (!item || !showCompatibility) return 0;
    
    // Use cached value if available
    if (matchPercentagesRef.current[item.id] !== undefined) {
      return matchPercentagesRef.current[item.id];
    }
    
    // Calculate and cache if not available
    const percentage = Math.floor(Math.random() * 101);
    matchPercentagesRef.current[item.id] = percentage;
    return percentage;
  };
  
  return {
    showCompatibility,
    isLoading,
    toggleCompatibility,
    calculateMatchPercentage
  };
};

export default useCompatibility;