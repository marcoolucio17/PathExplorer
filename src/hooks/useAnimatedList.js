import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Custom hook for managing animations and loading states for lists
 * @param {Array} data - The data array to animate
 * @param {number} delay - Delay between each item animation (ms)
 * @param {number} initialDelay - Initial delay before starting animations (ms)
 * @returns {Object} - Animation state and controls
 */
const useAnimatedList = (data = [], delay = 100, initialDelay = 300) => {
  const [isLoading, setIsLoading] = useState(true);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [visibleItems, setVisibleItems] = useState([]);
  const animationTimerRef = useRef(null);
  const dataRef = useRef(data);
  const isFirstRenderRef = useRef(true);

  // Update the ref when data changes
  useEffect(() => {
    dataRef.current = data;
  }, [data]);

  const clearAnimationTimers = useCallback(() => {
    if (animationTimerRef.current) {
      clearTimeout(animationTimerRef.current);
      animationTimerRef.current = null;
    }
    
    // Clear global animation timers if they exist
    if (window.tabAnimationTimer) {
      clearTimeout(window.tabAnimationTimer);
      window.tabAnimationTimer = null;
    }
    
    if (window.animationTimer) {
      clearTimeout(window.animationTimer);
      window.animationTimer = null;
    }
  }, []);

  const resetAnimation = useCallback(() => {
    clearAnimationTimers();
    setVisibleItems([]);
    setAnimationComplete(false);
  }, [clearAnimationTimers]);

  const triggerAnimationSequence = useCallback(() => {
    const items = dataRef.current;
    
    setIsLoading(true);
    resetAnimation();
    
    // Use a simple approach - immediately show all items after delay
    animationTimerRef.current = setTimeout(() => {
      setIsLoading(false);
      
      if (!items || items.length === 0) {
        setAnimationComplete(true);
        return;
      }
      
      // Simply show all items at once
      setVisibleItems(items);
      setAnimationComplete(true);
    }, initialDelay);
  }, [initialDelay, resetAnimation]);

  // Clean up timers when unmounting
  useEffect(() => {
    return () => clearAnimationTimers();
  }, [clearAnimationTimers]);

  // Run on initial load with a short delay to prevent flicker
  useEffect(() => {
    if (isFirstRenderRef.current) {
      isFirstRenderRef.current = false;
      
      // Set initial items immediately to prevent flicker
      setVisibleItems(data);
      
      // Then trigger proper animation sequence with a short delay
      setTimeout(() => {
        triggerAnimationSequence();
      }, 50);
      return;
    }
    
    // Check if the data has actually changed
    const hasDataChanged = 
      !dataRef.current ||
      !data ||
      dataRef.current.length !== data.length || 
      JSON.stringify(dataRef.current) !== JSON.stringify(data);
    
    if (hasDataChanged) {
      triggerAnimationSequence();
    }
  }, [data, triggerAnimationSequence]);

  return {
    isLoading,
    animationComplete,
    visibleItems,
    resetAnimation,
    triggerAnimationSequence,
    setIsLoading  // Export setIsLoading for external control
  };
};

export default useAnimatedList;