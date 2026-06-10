import axios from 'axios';

// URL API untuk ujian
const API_URL = 'https://cbt.kansdev.my.id/api';
// const API_URL = 'http://127.0.0.1:8000/api';

export const handleLoginPewawancara = async (nip) => {
    try {
        const response = await axios.post(`${API_URL}/wawancara/login/${nip}`, {
            nip
        });

        localStorage.setItem('pewawancara', JSON.stringify(response.data.data));
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error("Network Error");
    }
}