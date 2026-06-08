import axios from "axios";

const API_URL = 'https://cbt.kansdev.my.id/api'

export const getPertanyaanInterview = async () => {
    const response = await axios.get(`${API_URL}/pertanyaan/${id}`);
    return response.data;
}

export const simpanJawabanInterview = async () => {
    const response = await axios.post(`${API_URL}/simpan`, dataNilai);
    return response.data;
}

export default getPertanyaanInterview