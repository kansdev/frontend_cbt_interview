import axios from "axios";

const API_URL = 'https://cbt.smknusantara1kotang.sch.id/api'
// const API_URL = 'http://127.0.0.1:8000/api'

// Skrip baru 
export const getDataPesertaInterview = async (nomor_pendaftaran) => {
    console.log("MASUK FUNCTION", nomor_pendaftaran);
    const res = await axios.post(`${API_URL}/wawancara/cek/${nomor_pendaftaran}`);
    console.log("RESPONSE INTERVIEW", res);
    return res.data;
}

export const simpanJawabanInterview = async (dataNilai) => {
    const response = await axios.post(`${API_URL}/wawancara/simpan`, dataNilai);
    console.log(response.data);
    return response.data;
}

export const getHasilWawancara = async (idPewawancara) => {
    const response = await axios.get(
        `${API_URL}/wawancara/hasil/pewawancara/${idPewawancara}`
    );
    console.log(response.data);
    return response.data;
}