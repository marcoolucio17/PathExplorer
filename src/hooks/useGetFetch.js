import React, { useEffect,useState } from 'react';

export const useGetFetch = ({rutaApi}) => {

    const [data,setData] = useState([]);
    const [error,setError] = useState(null);
    useEffect(() => {
    
        const fetchData = async () => {

            const url = `http://localhost:5000/api/${rutaApi}`;
    
            try {
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }}
                );
            
                if (!response.ok) {
                //Cambiar mensaje de error
                    throw new Error("Error");
                }

                const info = await response.json();
                if (info) {
                    setData(info);
                }

            
            } catch (err) {
                console.error('Error fetching data:', err);
            }
        };
        fetchData();
    },[rutaApi]);
    
    return {data,error};
}

export default useGetFetch;
