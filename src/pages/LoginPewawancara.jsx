import React, {useEffect, useState} from "react";
import { Navigate, useNavigate, useLocation } from 'react-router-dom';
import handleLoginPewawancara from '../services/loginServices';

const LoginPewawancara = () => {
    const navigate = useNavigate();
    const [nip, setNip] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [pewawancara, setPewawancara] = useState(null);
    const location = useLocation();
    const routeError = location.state?.error;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        
        try {
            const response = await handleLoginPewawancara(nip);
            if (response.status === 'success') {
                console.log("Login berhasil:", JSON.stringify(response.data));
                // localStorage.setItem('pewawancara', JSON.stringify(response.data));
                navigate('/wawancara'); // Redirect ke halaman cek peserta setelah login sukses
            }            
        } catch (error) {
            console.error(error);
            setError("Login gagal. Periksa NIP dan coba lagi.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
            <div className="text-center p-5 shadow bg-white rounded">
                <h2 className="fw-bold mb-4">Login Pewawancara</h2>
                {(error || routeError)  && <div className="alert alert-danger">{error || routeError}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Masukkan NIP"
                            value={nip}
                            onChange={(e) => setNip(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default LoginPewawancara;
