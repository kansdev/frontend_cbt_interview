import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { simpanJawabanInterview } from "../services/cbtServices";

// Komponen
const CekPeserta = () => {
    // Menangkap :id_siswa dari URL rute App.jsx
    const { user_id } = useParams(); 
    const [ peserta, setPeserta ] = useState(null);
    const [ loading, setLoading ] = useState(false);
    const [error, setError] = useState(null);
    const [kategoriPertanyaan, setKategoriPertanyaan] = useState([]);
    const navigate = useNavigate();

    const handleSubmitWawancara = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            // Tulis logika simpan nilai wawancara ke API Laravel Anda di sini nanti
            console.log("Menyimpan penilaian untuk siswa ID:", user_id);
            alert("Penilaian berhasil disimpan!");
            // navigate('/'); // Kembali ke halaman utama setelah selesai
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchDataDetail = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`https://cbt.kansdev.my.id/api/wawancara/${user_id}`); // 👈 Tembak API
                
                if (response.status && response.data.status === "success") {
                    setPeserta(response.data.data); // 👈 Simpan data ke state
                }
            } catch (err) {
                console.error("Gagal memuat data:", err);
                setError(err.message || "Data siswa tidak ditemukan.");
            } finally {
                setLoading(false);
            }
        }

        if (user_id) {
            fetchDataDetail();
        }
    }, [user_id]) 
    
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
    
    // Render form
    return (
        <>  
            <form onSubmit={handleSubmitWawancara}>        
                <div className="card shadow-sm mb-4 bg-light border-start border-info border-4">
                    <div className="card-body">
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
                                <span id="disp_jurusan2" className="badge bg-light text-dark border"> {peserta?.jurusan_pertama || "-"}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {kategoriPertanyaan.map((kategori) => (
                    <div className="card shadow-sm mb-4" key={kategori.kode}>
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
                                                    <input className="form-check-input" type="radio" name={`${kategori.kode}_skor`} id={`${kategori.kode}_${skor}`} value={skor} required />
                                                    <label className="form-check-label" htmlFor={`${kategori.kode}_${skor}`}>{skor}</label>
                                                </div>
                                            )}
                                        </div>                            
                                    </div>
                                </div>                            
                            )}
                            <textarea className="form-control mb-2" name="deskripsi_1" rows="5" placeholder="Tulis deskripsi singkat jawaban..."></textarea> 
                        </div>
                    </div> 
                    
                ))}
                
                <div className="card shadow-sm mb-4">
                    <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                        <h5 class="mb-0 fw-bold">Catatan dan Kesimpulan</h5>
                    </div>
                    <div className="card-body">
                        <div className="mb-4">
                            <label className="form-label fw-semibold">Catatan Khusus Wawancara</label>
                            <textarea className="form-control mb-2" name="catatan" rows="2" placeholder="Tulis deskripsi singkat jawaban..."></textarea>
                        </div>
                        <div className="mb-4">
                            <label className="form-label fw-semibold">Kesimpulan</label>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="k1_skor_5" id="k1_skor_5" value="5" required />
                                <label className="form-check-label fw-bold" htmlFor="k1_skor_5">Sangat Direkomendasikan</label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="k1_skor_4" id="k1_skor_4" value="4" required />
                                <label className="form-check-label fw-bold" htmlFor="k1_skor_4">Direkomendasikan</label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="k1_skor_3" id="k1_skor_3" value="3" required />
                                <label className="form-check-label fw-bold" htmlFor="k1_skor_3">Butuh Pertimbangan</label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="k1_skor_2" id="k1_skor_2" value="2" required />
                                <label className="form-check-label fw-bold" htmlFor="k1_skor_2">Tidak Direkomendasikan</label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="k1_skor_1" id="k1_skor_1" value="1" required />
                                <label className="form-check-label fw-bold" htmlFor="k1_skor_1">Sangat Tidak Direkomendasikan</label>
                            </div>
                            
                        </div>        
                    </div>
                </div>

                <div className="d-flex gap-3 justify-content-end mb-5">
                    <button type="button" className="btn btn-outline-secondary px-4">Batal</button>
                    <button type="submit" className="btn btn-success px-5 shadow-sm">Simpan Wawancara</button>
                </div>  

            </form>
        </>
    );
}

export default CekPeserta;


    