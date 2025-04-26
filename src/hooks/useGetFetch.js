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

export const useGetFetch = ({rutaApi,nombre,condicion1}) => {

    const [data,setData] = useState([]);  
    const [error,setError] = useState(null);
    
    useEffect(() => {
        const fetchData = async () => {
            let url =`http://localhost:5000/api/${rutaApi}`;
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
                setError(error);
            }
        };  
        fetchData();
    }, [rutaApi, nombre,condicion1]);

    return { data, error };
}

export default useGetFetch;
