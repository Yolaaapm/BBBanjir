import React, { useState, useContext } from "react";
import MainLayout from "../components/Layouts/MainLayout";
import Card from "../components/Elements/Card";
import Button from "../components/Elements/Button"; 
import { AuthContext } from "../context/authContext"; // Mengambil identitas user dan fungsi simpan

const ReportPage = () => {
  // Ambil user untuk mendapatkan nama pelapor & addReport untuk menyimpan data
  const { user, addReport } = useContext(AuthContext);

  // State untuk form
  const [formData, setFormData] = useState({
    location: "",
    waterLevel: "",
    description: ""
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (formData.location && formData.waterLevel) {
      // 1. BUAT DATA TERPISAH (Jangan digabung dalam satu string)
      // Gunakan nama key "lokasi", "debit", dan "deskripsi" 
      // agar sesuai dengan kolom di tabel Kelola_Laporan
      const reportData = {
        lokasi: formData.location,
        debit: formData.waterLevel + " CM",
        deskripsi: formData.description || "-",
        status: parseInt(formData.waterLevel) > 100 ? "Bahaya" : parseInt(formData.waterLevel) > 50 ? "Siaga" : "Aman"
      };

      // 2. KIRIM KE CONTEXT
      addReport(reportData, user?.name || "Masyarakat Umum");

      setStatus("Laporan berhasil dikirim!");
      
      // Reset form
      setFormData({
        location: "",
        waterLevel: "",
        description: ""
      });

      setTimeout(() => setStatus(""), 4000);
    }
  };

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Notifikasi Berhasil dengan Nama User */}
        {status && (
          <div className="bg-green-100 border-l-4 border-green-500 p-4 rounded-r-xl text-green-700 font-bold animate-in fade-in slide-in-from-top duration-500">
            Halo {user?.name || "Warga"}, {status}
          </div>
        )}

        <Card
          title="Formulir Pelaporan Banjir"
          desc={
            <div className="p-2">
              <p className="text-slate-500 text-sm mb-6 italic">
                Laporkan kondisi banjir di sekitar Anda untuk membantu pemetaan real-time oleh BPBD.
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="font-bold text-xs text-slate-700 uppercase tracking-widest">Lokasi Kejadian</label>
                      <input 
                        name="location"
                        type="text" 
                        className="border border-slate-200 p-4 rounded-2xl focus:ring-2 ring-blue-500 outline-none transition-all font-medium text-slate-800" 
                        placeholder="Contoh: Jl. Kaligawe, Semarang" 
                        value={formData.location}
                        onChange={handleChange}
                        required 
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="font-bold text-xs text-slate-700 uppercase tracking-widest">Tinggi Air (cm)</label>
                      <input 
                        name="waterLevel"
                        type="number" 
                        className="border border-slate-200 p-4 rounded-2xl focus:ring-2 ring-blue-500 outline-none transition-all font-bold text-slate-800" 
                        placeholder="0" 
                        value={formData.waterLevel}
                        onChange={handleChange}
                        required 
                      />
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-bold text-xs text-slate-700 uppercase tracking-widest">Keterangan Tambahan (Opsional)</label>
                  <textarea 
                    name="description"
                    className="border border-slate-200 p-4 rounded-2xl h-40 focus:ring-2 ring-blue-500 outline-none transition-all resize-none text-slate-700" 
                    placeholder="Ceritakan kondisi detail (misal: arus deras, butuh evakuasi, atau akses jalan terputus)..."
                    value={formData.description}
                    onChange={handleChange}
                  ></textarea>
                </div>

                <div className="pt-2">
                  <Button type="submit" variant="bg-blue-600 w-full py-5 rounded-2xl font-black shadow-xl shadow-blue-100 uppercase tracking-widest text-lg">
                    Kirim Laporan Sekarang
                  </Button>
                  <p className="text-[10px] text-slate-400 text-center mt-4">
                    Pastikan data yang Anda kirimkan akurat. Pelaporan palsu dapat menghambat tim penyelamat.
                  </p>
                </div>
              </form>
            </div>
          }
        />
      </div>
    </MainLayout>
  );
};

export default ReportPage;