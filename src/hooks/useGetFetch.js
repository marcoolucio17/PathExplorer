import React, { useEffect,useState, useCallback } from 'react';
import axios from 'axios';
import axiosRetry from 'axios-retry';


const axiosInstance = axios.create();
//installe npm install axios-retry
axiosRetry(axiosInstance, {
    retries: 3, // Número de reintentos
    retryDelay: (retryCount) => {
        return retryCount * 2000; 
    },
    shouldResetTimeout: true, 

});

export const useGetFetch = ({rutaApi,pnombre}) => {

    const [data,setData] = useState([]);  
    const [error,setError] = useState(null);
    
    useEffect(() => {
        const fetchData = async () => {
            const url = pnombre ? `http://localhost:5000/api/${rutaApi}?projectName=${pnombre}` : `http://localhost:5000/api/${rutaApi}`;
            try {
                const response = await axiosInstance.get(url)
                .then(response => setData(response.data))
                .catch(err => setError(err));
            } catch (error) {
                setError(error);
            }
        };  
        fetchData();

    }, [rutaApi, pnombre]);

    return { data, error };
}

export default useGetFetch;
