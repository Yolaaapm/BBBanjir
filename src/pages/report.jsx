import React, { useState, useContext } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import MainLayout from "../components/Layouts/MainLayout";
import Card from "../components/Elements/Card";
import Button from "../components/Elements/Button"; 
import { AuthContext } from "../context/authContext";

// --- CUSTOM GOOGLE PIN (Sama dengan halaman Kelola Laporan) ---
const googleIcon = new L.DivIcon({
  html: `<div style="position: relative;">
            <div style="background-color: #EA4335; width: 24px; height: 24px; border-radius: 50%; border: 3px solid white; box-shadow: 0 4px 10px rgba(0,0,0,0.3);"></div>
            <div style="position: absolute; top: 20px; left: 9px; width: 6px; height: 6px; background-color: #EA4335; transform: rotate(45deg); border-right: 3px solid white; border-bottom: 3px solid white;"></div>
         </div>`,
  className: "custom-google-marker",
  iconSize: [24, 24],
  iconAnchor: [12, 28],
});

// KOMPONEN PICKER: Menangani klik pada peta
const LocationPicker = ({ setCoordinate }) => {
  useMapEvents({
    click(e) {
      setCoordinate(e.latlng); // Update koordinat saat peta diklik
    },
  });
  return null;
};

const ReportPage = () => {
  const { user, addReport } = useContext(AuthContext);
  const [coordinate, setCoordinate] = useState({ lat: -6.966, lng: 110.416 });
  const [formData, setFormData] = useState({ location: "", waterLevel: "", description: "" });
  const [status, setStatus] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (addReport) {
      const reportData = {
        lokasi: formData.location,
        debit: formData.waterLevel + " CM",
        deskripsi: formData.description || "-",
        koordinat: coordinate,
        status: parseInt(formData.waterLevel) > 100 ? "Bahaya" : parseInt(formData.waterLevel) > 50 ? "Siaga" : "Aman"
      };

      addReport(reportData, user?.name || "Masyarakat Umum");
      setStatus("Laporan Anda berhasil terkirim ke sistem BPBD!");
      setFormData({ location: "", waterLevel: "", description: "" });
      setTimeout(() => setStatus(""), 4000);
    }
  };

  return (
    <MainLayout>
      <div className="max-w-5xl mx-auto p-4 space-y-6">
        
        {/* NOTIFIKASI SUKSES */}
        {status && (
          <div className="bg-green-600 text-white p-5 rounded-[2rem] shadow-2xl flex items-center justify-between animate-in fade-in zoom-in duration-300 border-b-4 border-green-800">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-2 rounded-full text-xl text-white">✓</div>
              <div>
                <p className="font-black uppercase tracking-tight text-sm">Laporan Berhasil!</p>
                <p className="text-xs font-medium opacity-90">{status}</p>
              </div>
            </div>
            <button onClick={() => setStatus("")} className="hover:bg-white/10 p-2 rounded-full transition-all font-bold">✕</button>
          </div>
        )}

        <Card title="Lapor Kejadian Banjir" desc={
          <form onSubmit={handleSubmit} className="space-y-6 p-2">
            <div className="flex items-center gap-2 bg-blue-50 p-4 rounded-2xl border border-blue-100">
                <span className="text-blue-500 text-xl">📍</span>
                <p className="text-blue-700 text-[11px] font-bold uppercase tracking-tight">
                    Ketuk pada peta Google di bawah untuk menandai lokasi banjir yang tepat
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* GOOGLE MAPS AREA */}
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Pilih Titik Lokasi (Google Maps)</label>
                <div className="h-96 rounded-[2.5rem] overflow-hidden border-4 border-white shadow-2xl z-0 relative group">
                  <MapContainer center={coordinate} zoom={13} style={{ height: "100%", width: "100%" }}>
                    {/* TILE LAYER GOOGLE MAPS */}
                    <TileLayer 
                        url="https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
                        attribution='&copy; Google Maps'
                    />
                    <LocationPicker setCoordinate={setCoordinate} />
                    <Marker position={coordinate} icon={googleIcon} />
                  </MapContainer>
                  
                  {/* Watermark/Overlay Label */}
                  <div className="absolute top-4 right-4 z-[500] bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full border border-slate-200 shadow-sm pointer-events-none">
                    <p className="text-[9px] font-black text-slate-500 uppercase tracking-tighter">Live Map View</p>
                  </div>
                </div>
                
                <div className="flex justify-between items-center bg-slate-100 p-3 rounded-2xl border border-slate-200">
                   <div className="flex gap-4 text-[10px] font-mono font-bold text-slate-500">
                      <span>LAT: {coordinate.lat.toFixed(6)}</span>
                      <span>LNG: {coordinate.lng.toFixed(6)}</span>
                   </div>
                   <span className="text-[9px] bg-slate-800 text-white px-2 py-0.5 rounded-md font-bold uppercase">GPS Active</span>
                </div>
              </div>

              {/* INPUT FORM DATA */}
              <div className="space-y-5">
                <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Detail Alamat</label>
                    <input 
                      className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-blue-500 focus:bg-white outline-none transition-all font-medium text-slate-800" 
                      placeholder="Misal: Perumahan Indah, Blok C, No. 4" 
                      value={formData.location} 
                      onChange={(e) => setFormData({...formData, location: e.target.value})} 
                      required 
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Estimasi Tinggi Air (CM)</label>
                    <div className="relative">
                        <input 
                          type="number" 
                          className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-blue-500 focus:bg-white outline-none transition-all font-black text-slate-800" 
                          placeholder="0" 
                          value={formData.waterLevel} 
                          onChange={(e) => setFormData({...formData, waterLevel: e.target.value})} 
                          required 
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 font-black text-slate-300">CM</span>
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Deskripsi Situasi</label>
                    <textarea 
                      className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl h-32 focus:border-blue-500 focus:bg-white outline-none transition-all resize-none text-slate-700 font-medium" 
                      placeholder="Gambarkan situasi saat ini (contoh: akses motor terputus, butuh perahu karet...)"
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                    />
                </div>
              </div>
            </div>

            <div className="pt-4">
                <Button type="submit" variant="bg-blue-600 w-full py-5 text-white font-black rounded-[2rem] shadow-xl shadow-blue-200 tracking-[0.15em] uppercase transition-all hover:bg-blue-700 hover:-translate-y-1 active:scale-95">
                  🚀 Kirim Laporan Banjir
                </Button>
                <p className="text-center text-[10px] text-slate-400 mt-6 font-bold uppercase tracking-widest">
                  Laporan Anda akan diproses secara real-time oleh tim BPBD Kota Semarang
                </p>
            </div>
          </form>
        } />
      </div>
    </MainLayout>
  );
};

export default ReportPage;