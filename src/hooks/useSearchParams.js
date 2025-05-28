import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

/**
 * 
 * @param {string} initialTerm - Initial search term
 * @returns {[string, function]} - Search term and setter function
 */
const useSearchParams = (initialTerm = '') => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState(initialTerm);
  
  //parse search param from URL on initial load
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchFromURL = params.get('search') || '';
    if (searchFromURL && searchFromURL !== searchTerm) {
      setSearchTerm(searchFromURL);
    }
  }, []);
  
  //update URL when search term changes
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (searchTerm) {
      params.set('search', searchTerm);
    } else {
      params.delete('search');
    }
    navigate(`${location.pathname}?${params.toString()}`, { replace: true });
  }, [searchTerm, navigate, location.pathname]);
  
  //update search term when URL changes
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