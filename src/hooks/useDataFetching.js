import { useState, useEffect } from 'react';
import { useGetFetch } from './useGetFetch';

/**
 * A hook for fetching multiple data sources with fallback generators
 * 
 * @param {Object} configs - Object with keys as data names and values as fetch configs
 * @param {Object} fallbackGenerators - Object with functions to generate fallback data
 * @returns {Object} Object with raw API results and processed state data
 * 
 * @example
 * const { data } = useDataFetching(
 *   {
 *     users: { rutaApi: 'users', nombre: searchTerm },
 *     skills: { rutaApi: 'skills', nombre: '' }
 *   },
 *   {
 *     users: () => generateDummyUsers(10),
 *     skills: () => generateDummySkills(20)
 *   }
 * );
 * 
 * // Access data
 * const usersList = data.users;
 * const skillsList = data.skills;
 */
export const useDataFetching = (configs, fallbackGenerators = {}) => {
  // Create state objects for each data type
  const stateObjects = {};
  Object.keys(configs).forEach(key => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [stateData, setStateData] = useState([]);
    stateObjects[key] = { data: stateData, setData: setStateData };
  });
  
  // Fetch data for each config
  const fetchResults = {};
  Object.entries(configs).forEach(([key, config]) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const result = useGetFetch(config);
    fetchResults[key] = result;
    
    // Set up effect to update state with fetch results or fallback
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      // Use API data if available
      if (result.data && result.data.length > 0) {
        stateObjects[key].setData(result.data);
      } 
      // Use fallback data if API failed or returned empty data
      else if (fallbackGenerators[key]) {
        console.log(`Using fallback data for ${key}`);
        const fallbackData = fallbackGenerators[key]();
        stateObjects[key].setData(fallbackData);
      }
      // Log an error if neither data nor fallback is available
      else if (result.error) {
        console.error(`Error fetching ${key} data:`, result.error);
      }
    }, [result.data, result.error, key]);
  });
  
  // Prepare return data
  const data = {};
  Object.keys(stateObjects).forEach(key => {
    data[key] = stateObjects[key].data;
  });
  
  // Add setter functions to return data
  const setters = {};
  Object.keys(stateObjects).forEach(key => {
    setters[`set${key.charAt(0).toUpperCase() + key.slice(1)}`] = stateObjects[key].setData;
  });
  
  return {
    rawData: fetchResults,
    data,
    ...setters
  };
};

export default useDataFetching;