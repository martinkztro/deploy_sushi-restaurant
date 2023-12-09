import axios from 'axios';

const deleteData = async (endpoint, id) => {
    try {
        await axios.delete(`https://restaurante-api-production.up.railway.app/api/${endpoint}/${id}`);
    } catch (error) {
        console.error('Error al eliminar datos:', error);
        throw error;
    }
};

export default deleteData;
