import axios from 'axios';

const useFetch = async (endpoint) => {
    try {
        const response = await axios.get(`http://localhost:8000/api/${endpoint}`);
        return response.data.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export default useFetch;
