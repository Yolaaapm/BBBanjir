import React, { useContext, useState } from "react";
import MainLayout from "../components/Layouts/MainLayout";
import Card from "../components/Elements/Card";
import { ThemeContext } from "../context/themeContext";
import { AuthContext } from "../context/authContext";
import Button from "../components/Elements/Button";

const SettingsPage = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const { reports } = useContext(AuthContext);

  // STATE LOKAL: Untuk menampung pilihan sebelum di-Simpan
  const [tempTheme, setTempTheme] = useState(theme.name);
  const [threshold, setThreshold] = useState({
    siaga: 50,
    bahaya: 100,
  });

  const themes = [
    { name: "theme-blue", color: "bg-[#1e90ff]", label: "Biru" },
    { name: "theme-green", color: "bg-[#299d91]", label: "Hijau" },
    { name: "theme-purple", color: "bg-[#6a5acd]", label: "Ungu" },
  ];

  const handleSaveAll = () => {
    // Mengeksekusi perubahan tema secara global
    setTheme({ name: tempTheme });
    alert(`PENGATURAN TERSIMPAN!\nTema aktif: ${tempTheme}\nThreshold: ${threshold.siaga}cm - ${threshold.bahaya}cm`);
  };

  const exportToCSV = () => {
    if (!reports || reports.length === 0) return alert("Data kosong!");
    const headers = "ID,Pelapor,Lokasi,Debit,Status\n";
    const rows = reports.map(r => `${r.id},${r.reporter},${r.lokasi},${r.debit},${r.status}`).join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `backup_banjir.csv`;
    a.click();
  };

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto space-y-8">
        <div>
          <h2 className="text-3xl font-black text-slate-800 uppercase tracking-tighter">PENGATURAN SISTEM</h2>
          <p className="text-slate-500 text-sm">Kelola identitas visual dan parameter deteksi banjir.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            
            <Card 
              title="Tampilan Visual" 
              desc={
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-2">
                  {themes.map((t) => (
                    <button
                      key={t.name}
                      type="button"
                      onClick={() => setTempTheme(t.name)}
                      // Menggunakan border-primary saat terpilih
                      className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-3 ${
                        tempTheme === t.name 
                        ? "border-primary bg-slate-50 ring-4 ring-slate-100" 
                        : "border-slate-100 bg-white hover:border-slate-200"
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-full shadow-md ${t.color}`}></div>
                      <span className={`text-[10px] font-black uppercase tracking-widest ${tempTheme === t.name ? "text-primary" : "text-slate-400"}`}>
                        {t.label}
                      </span>
                    </button>
                  ))}
                </div>
              } 
            />

            <Card 
              title="Parameter Deteksi" 
              desc={
                <div className="grid grid-cols-2 gap-6 p-2">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Siaga (cm)</label>
                    <input 
                      type="number" 
                      // Menggunakan ring-primary saat fokus
                      className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 ring-primary transition-all font-bold"
                      value={threshold.siaga}
                      onChange={(e) => setThreshold({...threshold, siaga: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Bahaya (cm)</label>
                    <input 
                      type="number" 
                      className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 ring-primary transition-all font-bold"
                      value={threshold.bahaya}
                      onChange={(e) => setThreshold({...threshold, bahaya: e.target.value})}
                    />
                  </div>
                </div>
              } 
            />
          </div>

          <div className="space-y-8">
            <Card 
              title="Aksi & Keamanan" 
              desc={
                <div className="space-y-4 p-2">
                  <button onClick={exportToCSV} className="w-full p-4 bg-slate-50 hover:bg-slate-100 rounded-2xl flex justify-between items-center transition-all group">
                    <div className="text-left">
                        <p className="text-sm font-bold text-slate-700">Backup Data</p>
                        <p className="text-[10px] text-slate-400">Export laporan ke .CSV</p>
                    </div>
                    <span className="text-xl group-hover:scale-125 transition-transform">📥</span>
                  </button>
                  <button className="w-full p-4 bg-red-50 hover:bg-red-100 rounded-2xl flex justify-between items-center transition-all text-red-600 group">
                    <div className="text-left">
                        <p className="text-sm font-bold">Reset Sistem</p>
                        <p className="text-[10px] text-red-400">Hapus database lokal</p>
                    </div>
                    <span className="text-xl group-hover:rotate-12 transition-transform">⚠️</span>
                  </button>
                </div>
              } 
            />

            <div className="px-2">
              <Button 
                // Menggunakan bg-primary agar warna tombol mengikuti tema yang sedang AKTIF
                variant="bg-primary w-full py-5 rounded-3xl font-black text-white uppercase tracking-widest shadow-2xl transition-all hover:brightness-110 active:scale-95"
                onClick={handleSaveAll}
              >
                Simpan Perubahan
              </Button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default SettingsPage;