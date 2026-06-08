import axios from 'axios';

// URL API untuk ujian
const API_URL = 'https://spmb.smknusantara1kotang.sch.id/api';

// Fungsi mengecek peserta berdasarkan NISN dan gelombang
export const ApiCekPeserta = async (nomorPendaftaran) => {
    try {
        const response = await axios({
            method: 'POST',
            url: `${API_URL}/data-registrasi/${nomorPendaftaran}`,
            data: {
                nomor_pendaftaran: nomorPendaftaran,
            },
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            }
        });
        localStorage.setItem('peserta', JSON.stringify(response.data.data));
        return response.data;
    } catch (error) {
        // Lempar error yang lebih spesifik jika ada response dari server atau jaringan error
        throw error.response ? error.response.data : new Error('API Network Error');
    }
}

// Fungsi baru untuk mengambil detail berdasarkan ID
export const getDetailPeserta = async (nomorPendaftaran) => {
    try {
        const response = await axios.get(`${API_URL}/wawancara/peserta/${nomorPendaftaran}`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error("Network Error");
    }
};

export default ApiCekPeserta;