import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const SelesaiPeserta = () => {
    const [ nomor_pendaftaran ] = useParams();
    const [ pewawancara, setPewawancara ] = useState(null);
    const [ peserta, setPeserta ] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const pewawancara = localStorage.getItem('pewawancara');
        const peserta = localStorage.getItem('peserta');
        setPewawancara(pewawancara ? JSON.parse(pewawancara) : null);
        setPeserta(peserta ? JSON.parse(peserta) : null);
    }, []);

    const handleBack = () => {
        localStorage.removeItem('peserta');
        navigate('/wawancara');
    }

    return (
        <div className="container mt-5">
            <div className="text-center mb-2 mt-5">
                <h2 className="fw-bold">Wawancara Selesai</h2>
                <p>Pewawancara : <strong>{pewawancara?.nama || 'Tidak Diketahui'}</strong></p>
                <p>Peserta : <strong>{peserta?.nama_siswa || 'Tidak Diketahui'}</strong></p>
                <p>Data wawancara untuk peserta dengan nomor pendaftaran <strong>{ peserta?.nomor_pendaftaran || 'Tidak Diketahui' }</strong> telah berhasil disimpan.</p>
            </div>            
            <hr />
            <div className="text-center">
                <button className="btn btn-primary" onClick={handleBack}>
                    Kembali ke Halaman Cek Peserta
                </button>

            </div>
        </div>
    );
};

export default SelesaiPeserta;