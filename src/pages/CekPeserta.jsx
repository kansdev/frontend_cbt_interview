import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from 'react-router-dom';
import { ApiCekPeserta, getDetailPeserta } from '../services/apiServices';
import { getDataPesertaInterview, getHasilWawancara } from '../services/cbtServices';

// Komponen
const CekPeserta = () => {
    const [nomorPendaftaran, setNomorPendaftaran] = useState("");    
    const [pewawancara_id, setPewawancaraId] = useState("");    
    const [peserta, setPeserta] = useState(null);
    const [wawancara, setWawancara] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    
    const handleCariPeserta = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await ApiCekPeserta(nomorPendaftaran);                             
            if (response.status !== 'success') {
                alert("Failed : " + response.message);
                setError("Gagal mengambil data peserta.");     
                return;           
            }

            const res = await getDataPesertaInterview(nomorPendaftaran); 
            console.log("RES:", res);           
            if(res?.status === 'sudah_interview') {
                console.log(res.message);
                alert("Peserta ini sudah wawancara");
                return;
            }

            navigate(`/wawancara/peserta/${response.data.nomor_pendaftaran}`); 
        } catch(error) {
            console.error("Error : ", error);
            setError(error.message || "Nomor pendaftaran tidak ditemukan.");
        } finally {
            setLoading(false);
        }        
    }

    // Get data berdasarkan pewawanacara ID
    useEffect(() => {
        const fetchDataWawancara = async () => {
            try {
                const dataPewawancara = JSON.parse(localStorage.getItem('pewawancara'));
                const response = await getHasilWawancara(dataPewawancara.id);
                console.log(response);
                if (response.status === 'success') {
                    setWawancara(response.data);
                }
            } catch (error) {
                return error.response ? error.response : new Error('API Network Error');
            }
        }
        fetchDataWawancara();
    }, []);

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
                            {/* {error && (
                                <div className="alert alert-danger text-center" role="alert">
                                    {error}
                                </div>
                            )} */}
                            <form onSubmit={handleCariPeserta} className="mb-2">
                                <div className="mb-3">
                                    <label htmlFor="no_registrasi" className="form-label fw-semibold">Nomor Registrasi / Pendaftaran</label>
                                    <input type="text" className="form-control form-control-lg text-center" id="no_registrasi" required value={nomorPendaftaran} onChange={(e) => setNomorPendaftaran(e.target.value)} disabled={loading} />
                                </div>
                                <button type="submit" className="btn btn-primary btn-lg w-100" >
                                    Cari & Mulai Wawancara
                                </button>
                            </form>
                            <button type="submit" className="btn btn-success btn-lg w-100" data-bs-toggle="modal" data-bs-target="#modalHasilWawancara">
                                Hasil Wawancara
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="modalHasilWawancara">
                <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-body">
                            <table className="table table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>Nomor Pendaftar</th>
                                        <th>Nama Peserta</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {wawancara.map((item, index) => (
                                        <tr key={item.id}>
                                            <td>{index + 1}</td>
                                            <td>{item.nomor_pendaftaran}</td>
                                            <td>{item.nama}</td>
                                            <td>
                                                <span className="badge bg-success">
                                                    Sudah Wawancara
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary btn-sm" data-bs-dismiss="modal">Tutup</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CekPeserta;