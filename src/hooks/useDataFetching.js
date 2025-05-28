import { useState, useEffect } from 'react';
import { useGetFetch } from './useGetFetch';

//replace for useFetch i think -- dont use this one?

/**
 * 
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
  const stateObjects = {};
  Object.keys(configs).forEach(key => {

    const [stateData, setStateData] = useState([]);
    stateObjects[key] = { data: stateData, setData: setStateData };
  });
  
  const fetchResults = {};
  Object.entries(configs).forEach(([key, config]) => {
    const result = useGetFetch(config);
    fetchResults[key] = result;
    

    useEffect(() => {

      if (result.data && result.data.length > 0) {
        stateObjects[key].setData(result.data);
      } 

      else if (fallbackGenerators[key]) {
        console.log(`Using fallback data for ${key}`);
        const fallbackData = fallbackGenerators[key]();
        stateObjects[key].setData(fallbackData);
      }

      else if (result.error) {
        console.error(`Error fetching ${key} data:`, result.error);
      }
    }, [result.data, result.error, key]);
  });
  
  const data = {};
  Object.keys(stateObjects).forEach(key => {
    data[key] = stateObjects[key].data;
  });
  
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