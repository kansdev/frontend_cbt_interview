import React, { useState } from "react";
import { Navigate, useNavigate } from 'react-router-dom';
import ApiCekPeserta from '../services/apiServices';

// Komponen
const CekPeserta = () => {
    const [nomorPendaftaran, setNomorPendaftaran] = useState("");    
    const { peserta, setPeserta } = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    
    const handleCariPeserta = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            // 1. Ambil data dari API Laravel
            const response = await ApiCekPeserta(nomorPendaftaran);
            
            if (response.status === 'success') {
                console.log("Data ditemukan:", response.data);
                
                // 2. Berpindah ke rute wawancara membawa user_id dari Laravel
                navigate(`/wawancara/peserta/${response.data.nomorPendaftaran}`); 
            } else {
                setError("Gagal mengambil data peserta.");
            }
        } catch(error) {
            console.error("Error : ", error);
            setError(error.message || "Nomor pendaftaran tidak ditemukan.");
        } finally {
            setLoading(false);
        }        
    }

    if (loading) {
        return (
            <div className='container'>
                <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
                    <div className="text-center p-5 shadow bg-white rounded">
                        <h2 className="fw-bold">Sedang Memuat Data Peserta...</h2>
                        <div className="spinner-border text-primary" role="status"></div>
                    </div>
                </div>                
            </div>
        )
    }
    
    return (
        <>
            <div className="text-center mb-5 mt-5">
                <h2 className="fw-bold">SISTEM PENILAIAN WAWANCARA PPDB</h2>
                <p className="text-muted">Silakan masukkan nomor registrasi untuk memulai wawancara.</p>
            </div>
            <div className="row justify-content-center mb-4" id="bagianCari">
                <div className="col-md-6">
                    <div className="card shadow-sm">
                        <div className="card-header bg-dark text-white fw-bold text-center">
                            Cari Data Calon Siswa
                        </div>
                        <div className="card-body p-4">
                            {error && (
                                <div className="alert alert-danger text-center" role="alert">
                                    {error}
                                </div>
                            )}
                            <form onSubmit={handleCariPeserta} className="mb-2">
                                <div className="mb-3">
                                    <label htmlFor="no_registrasi" className="form-label fw-semibold">Nomor Registrasi / Pendaftaran</label>
                                    <input type="text" className="form-control form-control-lg text-center" id="no_registrasi" required value={nomorPendaftaran} onChange={(e) => setNomorPendaftaran(e.target.value)} disabled={loading} />
                                </div>
                                <button type="submit" className="btn btn-primary btn-lg w-100" >
                                    Cari & Mulai Wawancara
                                </button>
                            </form>
                            <button type="submit" className="btn btn-success btn-lg w-100" >
                                Hasil Wawancara
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CekPeserta;