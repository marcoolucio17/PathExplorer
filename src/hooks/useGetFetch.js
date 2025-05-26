import React, { useEffect,useState, useCallback } from 'react';
import axios from 'axios';
import axiosRetry from 'axios-retry';


const axiosInstance = axios.create();

// Add request interceptor to include authentication token
axiosInstance.interceptors.request.use(
    (config) => {
        // Try to get the token from localStorage
        const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
        
        // If token exists, add it to the headers
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

//installe npm install axios-retry
axiosRetry(axiosInstance, {
    retries: 3, // Número de reintentos
    retryDelay: (retryCount) => {
        return retryCount * 2000; 
    },
    shouldResetTimeout: true, 

});

export const useGetFetch = ({rutaApi,nombre,condicion1}) => {

    const [data,setData] = useState([]);  
    const [error,setError] = useState(null);
    
    useEffect(() => {
        const fetchData = async () => {
            let url =`https://pathexplorer-backend.onrender.com/api/${rutaApi}`;
            if (nombre !== '' && condicion1 === 'Skills' && rutaApi === 'projects') {
                url += `?projectName=${nombre}`;
            } else if (nombre === '' && condicion1 !== 'Skills' && rutaApi === 'projects') {
                url += `?skill=${condicion1}`;
            } else if (nombre !== '' && condicion1 !== 'Skills') {
                url = `projectName=${nombre}&skill=${condicion1}`;
            } 

            try {
                const response = await axiosInstance.get(url);
                setData(response.data)
            } catch (error) {
                console.error(`Error fetching ${rutaApi}:`, error);
                setError(error);
            }
        };  
        fetchData();
    }, [rutaApi, nombre,condicion1]);

    return { data, error };
}

export default useGetFetch;