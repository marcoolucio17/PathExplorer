import { useState, useEffect, useRef } from 'react';

/**
 *
 * @param {Array} items - The items to calculate compatibility for
 * @param {Object} options - Additional options
 * @returns {Object} - Compatibility state, handlers, and calculation function
 */
const useCompatibility = (items = [], options = {}) => {
  const [showCompatibility, setShowCompatibility] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const matchPercentagesRef = useRef({});
  
  //toggle compatibility view
  const toggleCompatibility = () => {
    //if it is already in loading state, don't do anything
    if (isLoading) return;
    
    const newCompatibilityState = !showCompatibility;
    
    if (newCompatibilityState) {
      setIsLoading(true);
      setShowCompatibility(true);
      
      matchPercentagesRef.current = {};

      setTimeout(() => {
        setIsLoading(false);
      }, options.loadingDelay || 1500);
    } else {

      setShowCompatibility(false);
    }
  };
  

  useEffect(() => {
    if (showCompatibility && !isLoading) {

      if (Object.keys(matchPercentagesRef.current).length === 0) {
        const newPercentages = {};
        
        // Pre-calculate all percentages
        items.forEach(item => {
          if (item && item.id) {

            newPercentages[item.id] = Math.floor(Math.random() * 101); 
          }
        });
        
        matchPercentagesRef.current = newPercentages;
      }
    }
  }, [showCompatibility, isLoading, items]);
  

  const calculateMatchPercentage = (item) => {
    if (!item || !showCompatibility) return 0;
    

    if (matchPercentagesRef.current[item.id] !== undefined) {
      return matchPercentagesRef.current[item.id];
    }
    

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