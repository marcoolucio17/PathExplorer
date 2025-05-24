import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

/**
 * Custom hook for managing search parameters in URL
 * @param {string} initialTerm - Initial search term
 * @returns {[string, function]} - Search term and setter function
 */
const useSearchParams = (initialTerm = '') => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState(initialTerm);
  
  // Parse search param from URL on initial load
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchFromURL = params.get('search') || '';
    if (searchFromURL && searchFromURL !== searchTerm) {
      setSearchTerm(searchFromURL);
    }
  }, []);
  
  // Update URL when search term changes
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (searchTerm) {
      params.set('search', searchTerm);
    } else {
      params.delete('search');
    }
    navigate(`${location.pathname}?${params.toString()}`, { replace: true });
  }, [searchTerm, navigate, location.pathname]);
  
  // Update search term when URL changes (for back/forward navigation)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchFromURL = params.get('search') || '';
    if (searchFromURL !== searchTerm) {
      setSearchTerm(searchFromURL);
    }
  }, [location.search]);
  
  return [searchTerm, setSearchTerm];
};

export default useSearchParams;