import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { simpanJawabanInterview } from "../services/cbtServices";

// Komponen
const CekPeserta = () => {
    // Menangkap :id_siswa dari URL rute App.jsx
    const { user_id } = useParams(); 
    const { nomor_pendaftaran } = useParams(); 
    const [ peserta, setPeserta ] = useState(null);
    const [ loading, setLoading ] = useState(false);
    const [error, setError] = useState(null);
    const [kategoriPertanyaan, setKategoriPertanyaan] = useState([]);
    const [jawaban, setJawaban] = useState({});
    const [catatan, setCatatan] = useState("");
    const [kesimpulan, setKesimpulan] = useState("");
    const [deskripsi, setDeskripsi] = useState({});
    const [pewawancara, setPewawancara] = useState(null);
    const navigate = useNavigate();

    const handleSubmitWawancara = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const pewawancaraData = localStorage.getItem('pewawancara');
        const payload = {
            nomor_pendaftaran: peserta?.nomor_pendaftaran,
            user_id: peserta?.user_id,
            jawaban,
            catatan,
            deskripsi,
            kesimpulan,
            pewawancara: pewawancaraData ? JSON.parse(pewawancaraData) : null
        };
        console.log("Data pewawancara:", pewawancaraData ? JSON.parse(pewawancaraData) : null);
        console.log("Payload yang akan disimpan:", payload);

        // return;

        try {
            const response = await simpanJawabanInterview(payload);
            // localStorage.setItem('response', )
            console.log("Response dari API:", response);
            navigate(`/wawancara/selesai/${nomor_pendaftaran}`);
        } catch (error) {
            console.error("Error saat menyimpan jawaban:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const pewawancaraData = localStorage.getItem('pewawancara');
        if (!pewawancaraData) {
            navigate('/'); // Redirect ke halaman login jika data pewawancara tidak ada
        }
        setPewawancara(JSON.parse(pewawancaraData));
    }, [navigate]);

    useEffect(() => {
        const fetchDataDetail = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`https://spmb.smknusantara1kotang.sch.id/api/data-registrasi/interview/${nomor_pendaftaran}`); // 👈 Tembak API
                // const response = await axios.get(`http://127.0.0.1:8080/api/data-registrasi/interview/${nomor_pendaftaran}`); // 👈 Tembak API
                
                if (response.status && response.data.status === "success") {
                    console.log("Data peserta ditemukan:", response.data.data);
                    setPeserta(response.data.data); // 👈 Simpan data ke state
                }
            } catch (err) {
                console.error("Gagal memuat data:", err);
                setError(err.message || "Data siswa tidak ditemukan.");
            } finally {
                setLoading(false);
            }
        }

        if (user_id || nomor_pendaftaran) {
            fetchDataDetail();
        }
    }, [nomor_pendaftaran, user_id]); 

    const handleSkorChange = (kode, skor) => {
        setJawaban((prev) => ({
            ...prev,
            [kode]: skor
        }));
    }

    const handleDeskripsiChange = (kodeKategori, value) => {
        setDeskripsi((prev) => ({
            ...prev,
            [kodeKategori]: value
        }));
    }
    
    // Maping data form pertanyaan wawancara ke form yang ada di return
    useEffect(() => {
        const data = [
            {
                kode: "A",
                judul: "Aspek Komunikasi, Sikap dan Kepribadian",
                pertanyaan: [
                    { id: 1, kode: "a1", teks: "Kecakapan Bicara" },
                    { id: 2, kode: "a2", teks: "Penampilan" },
                    { id: 3, kode: "a3", teks: "Sopan santun & gestur tubuh" },
                    { id: 4, kode: "a4", teks: "Kepercayaan diri" },
                    { id: 5, kode: "a5", teks: "Berkelompok / Berorganisasi" }
                ]
            }, {
                kode: "B",
                judul: "Aspek Pengetahuan tentang Sekolah & Jurusan (Komitmen Belajar)",
                pertanyaan: [
                    { id: 1, kode: "b1", teks: "Alasan memilih SMK" },
                    { id: 2, kode: "b2", teks: "Pemahaman tentang SMK" },
                    { id: 3, kode: "b3", teks: "Pemahaman tentang jurusan" },
                    { id: 4, kode: "b4", teks: "Motivasi belajar di SMK" },
                    { id: 5, kode: "b5", teks: "Kesiapan untuk praktek kerja industri" }
                ]
            }, {
                kode: "C",
                judul: "Keseharian siswa di rumah & manajemen waktu",
                pertanyaan: [
                    { id: 1, kode: "c1", teks: "Kedisiplinan di rumah" },
                    { id: 2, kode: "c2", teks: "Manajemen waktu & penggunaan gadget" },
                ]
            }, {
                kode: "D",
                judul: "Riwayat kesehatan & kondisi fisik (K3LH)",
                pertanyaan: [
                    { id: 1, kode: "d1", teks: "Kondisi Fisik" },
                    { id: 2, kode: "d2", teks: "Kesiapan fisik untuk program produktif/praktik" },
                    { id: 3, kode: "d3", teks: "Kesediaan mengikuti peraturan sekolah" },
                ]
            }, {
                kode: "E",
                judul: "Pemahaman dan dukungan terhadap pilihan anak",
                pertanyaan: [
                    { id: 1, kode: "e1", teks: "Pandangan orang tua terhadap pilihan anak" },
                    { id: 2, kode: "e2", teks: "Pandangan orang tua terhadap SMK" },
                    { id: 3, kode: "e3", teks: "Dukungan terhadap pendidikan di rumah" },
                ]
            }, {
                kode: "F",
                judul: "Pola asuh dan keseharian di rumah",
                pertanyaan: [
                    { id: 1, kode: "f1", teks: "Pemahaman terhadap karakter anak" },
                    { id: 2, kode: "f2", teks: "Penerapan disiplin" }
                ]
            }, {
                kode: "G",
                judul: "Komitmen finansial & kerja sama dengan sekolah",
                pertanyaan: [
                    { id: 1, kode: "g1", teks: "Dukungan terhadap pembiayaan kegiatan sekolah" },
                    { id: 2, kode: "g2", teks: "Dukungan penerapan kedisiplinan di sekolah" },
                    { id: 3, kode: "g3", teks: "Kesediaan hadir di sekolah" }
                ]
            }, {
                kode: "H",
                judul: "Riwayat kesehatan anak",
                pertanyaan: [
                    { id: 1, kode: "h1", teks: "Pemahaman tentang kesehatan anak" }         
                ]
            } 
        ];

        setKategoriPertanyaan(data);
    }, [])

    if (loading) {
        return (
            <div className='container'>
                <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
                    <div className="text-center p-5 shadow bg-white rounded">
                        <h2 className="fw-bold">Sedang Menyimpan...</h2>
                        <div className="spinner-border text-primary" role="status"></div>
                    </div>
                </div>                
            </div>
        )
    }
    
    // Render form
    return (
        <>  
            <form onSubmit={handleSubmitWawancara}>        
                <div className="card shadow-sm mb-4 bg-light border-start border-info border-4">
                    <div className="card-body">
                        {/* Bagian Data Singkat Peserta Wawancara */}
                        <h5 className="card-title fw-bold text-info mb-3">Data Singkat Peserta Wawancara</h5>
                        <div className="row g-2 fs-6">
                            <div className="col-sm-3 fw-semibold">Nomor Registrasi</div>
                            <div className="col-sm-9">: 
                                <span id="disp_no_reg" className="fw-bold text-dark"> {peserta?.nomor_pendaftaran || "-"}</span>
                            </div>
                            <input type="hidden" name="hidden_no_reg" id="hidden_no_reg" /> 
                            <div className="col-sm-3 fw-semibold">Nama Calon Siswa</div>
                            <div className="col-sm-9">:
                                <span id="disp_nama"> {peserta?.nama_siswa || "-"}</span>
                            </div>

                            <div className="col-sm-3 fw-semibold">Pilihan Jurusan 1</div>
                            <div className="col-sm-9">: 
                                <span id="disp_jurusan1" className="badge bg-secondary"> {peserta?.jurusan_pertama || "-"}</span>
                            </div>

                            <div className="col-sm-3 fw-semibold">Pilihan Jurusan 2</div>
                            <div className="col-sm-9">: 
                                <span id="disp_jurusan2" className="badge bg-light text-dark border"> {peserta?.jurusan_kedua || "-"}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {kategoriPertanyaan.map((kategori) => (
                    <div className="card shadow-sm mb-4" key={kategori.kode}>
                        {/* Bagian Pertanyaan */}
                        <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                            <h5 className="mb-0 fw-bold">{kategori.kode}. {kategori.judul}</h5>
                            <span className="badge bg-light text-primary">Skor: 1 - 5</span>
                        </div>
                        <div className="card-body">
                            {kategori.pertanyaan.map((item) =>
                                <div className="mb-4 row" key={item.id}>
                                    <div className="col-md-4">
                                        <label className="form-label fw-semibold">{ item.id }. {item.teks}</label>                            
                                    </div>
                                    <div className="col-md-8">
                                        <span className="text-muted small me-2">Skor:</span>
                                        <div className="d-flex align-items-center gap-2">
                                            {[1, 2, 3, 4, 5].map((skor) => 
                                                <div className="form-check form-check-inline" key={skor}>
                                                    <input className="form-check-input" type="radio" id={`${item.kode}_${skor}`} name={ item.kode } value={skor} onChange={() => handleSkorChange(item.kode, skor)} />
                                                    <label className="form-check-label" htmlFor={`${item.kode}_${skor}`}>{skor}</label>
                                                </div>
                                            )}
                                        </div>                            
                                    </div>
                                </div>
                            )}
                            <textarea className="form-control mb-2" rows="5" placeholder="Tulis deskripsi singkat jawaban..." value={deskripsi[kategori.kode] || ""} onChange={(e) => handleDeskripsiChange(kategori.kode, e.target.value)}></textarea> 
                        </div>
                    </div> 
                    
                ))}
                {/* Bagian Catatan dan Kesimpulan */}
                <div className="card shadow-sm mb-4">
                    <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                        <h5 class="mb-0 fw-bold">Catatan dan Kesimpulan</h5>
                    </div>
                    <div className="card-body">
                        {/* Bagian Catatan Khusus Wawancara */}
                        <div className="mb-4">
                            <label className="form-label fw-semibold">Catatan Khusus Wawancara</label>
                            <textarea className="form-control mb-2" value={catatan} onChange={(e) => setCatatan(e.target.value)} rows="2" placeholder="Tulis deskripsi singkat jawaban..."></textarea>
                        </div>
                        {/* Bagian Kesimpulan */}
                        <div className="mb-4">
                            <label className="form-label fw-semibold">Kesimpulan</label>
                            {[
                                {value: 5, Label: "Sangat Direkomendasikan"},
                                {value: 4, Label: "Direkomendasikan"},
                                {value: 3, Label: "Butuh Pertimbangan"},
                                {value: 2, Label: "Tidak Direkomendasikan"},
                                {value: 1, Label: "Sangat Tidak Direkomendasikan"}
                            ].map((option) => (
                                <div className="form-check" key={option.value}>
                                    <input className="form-check-input" type="radio" name="kesimpulan" id={`k1_skor_${option.value}`} value={option.value} checked={kesimpulan === option.value.toString()} onChange={() => setKesimpulan(option.value.toString())} required />
                                    <label className="form-check-label fw-bold" htmlFor={`k1_skor_${option.value}`}>{option.Label}</label>
                                </div>
                            ))}                         
                        </div>        
                    </div>
                </div>

                <div className="d-flex gap-3 justify-content-end mb-5">
                    <button type="submit" className="btn btn-success px-5 shadow-sm" disabled={loading}onClick={handleSubmitWawancara}>
                        {loading ? "Menyimpan..." : "Simpan Hasil Wawancara"}
                    </button>
                </div>  

            </form>
        </>
    );
}

export default CekPeserta;