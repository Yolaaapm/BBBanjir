import React, { useState, useContext } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import MainLayout from "../components/Layouts/MainLayout";
import Card from "../components/Elements/Card";
import Button from "../components/Elements/Button";
import { AuthContext } from "../context/authContext";

// --- CUSTOM PIN MERAH (Gaya Google Maps) ---
const googleIcon = new L.DivIcon({
  html: `<div style="position: relative;">
            <div style="background-color: #EA4335; width: 22px; height: 22px; border-radius: 50%; border: 3px solid white; box-shadow: 0 4px 10px rgba(0,0,0,0.3);"></div>
            <div style="position: absolute; top: 18px; left: 8px; width: 6px; height: 6px; background-color: #EA4335; transform: rotate(45deg); border-right: 3px solid white; border-bottom: 3px solid white;"></div>
         </div>`,
  className: "custom-google-marker",
  iconSize: [22, 22],
  iconAnchor: [11, 26],
});

const Kelola_Laporan = () => {
    const { user, reports = [], addReport, deleteReport } = useContext(AuthContext);

    // State untuk Modal Peta
    const [selectedCoord, setSelectedCoord] = useState(null);

    const [formData, setFormData] = useState({
        lokasi: "",
        debit: "",
        deskripsi: "",
    });
    
    const [statusMsg, setStatusMsg] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.lokasi || !formData.debit) {
            alert("Lokasi dan Debit air wajib diisi!");
            return;
        }

        if (isSubmitting) return;

        try {
            setIsSubmitting(true);

            const newReportData = {
                lokasi: formData.lokasi,          
                debit: formData.debit + " CM",    
                status: parseInt(formData.debit) > 100 ? "Bahaya" : parseInt(formData.debit) > 50 ? "Siaga" : "Aman",
                deskripsi: formData.deskripsi || "-", 
            };

            await addReport(newReportData, user?.name);
            
            setStatusMsg("Laporan berhasil terkirim!");
            setFormData({ lokasi: "", debit: "", deskripsi: "" });
            
            setTimeout(() => {
                setStatusMsg("");
                setIsSubmitting(false);
            }, 2000);

        } catch (error) {
            console.error("Gagal mengirim laporan:", error);
            setIsSubmitting(false);
        }
    };

    const displayReports = user?.role === "admin"
        ? reports
        : reports.filter((item) => item.reporter === user?.name);

    return (
        <MainLayout>
            <div className="max-w-6xl mx-auto space-y-8 pb-10 px-4">
                
                {/* MODAL PETA PREMIUM - GOOGLE MAPS STYLE */}
                {selectedCoord && (
                    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4 transition-all">
                        <div className="bg-white w-full max-w-2xl rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/20 animate-in zoom-in duration-300">
                            {/* Header Modal */}
                            <div className="p-6 flex justify-between items-center border-b">
                                <div>
                                    <h3 className="font-black text-slate-800 uppercase tracking-tight">Lokasi Kejadian</h3>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                                        Koordinat: {selectedCoord.lat.toFixed(5)}, {selectedCoord.lng.toFixed(5)}
                                    </p>
                                </div>
                                <button 
                                    onClick={() => setSelectedCoord(null)} 
                                    className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-red-500 hover:text-white transition-all font-bold"
                                >
                                    ✕
                                </button>
                            </div>

                            {/* Area Map Google */}
                            <div className="h-[400px] w-full relative">
                                <MapContainer center={selectedCoord} zoom={16} style={{ height: "100%", width: "100%" }}>
                                    {/* GOOGLE MAPS ROADMAP TILE */}
                                    <TileLayer 
                                        url="https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
                                        attribution='&copy; Google Maps'
                                    />
                                    <Marker position={selectedCoord} icon={googleIcon} />
                                </MapContainer>
                                
                                {/* Badge Overlay */}
                                <div className="absolute bottom-6 left-6 z-[500]">
                                    <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl shadow-xl border border-white text-[10px] font-black text-slate-700 uppercase tracking-widest">
                                        Google Maps View
                                    </div>
                                </div>
                            </div>

                            {/* Footer Modal */}
                            <div className="p-4 bg-slate-50">
                                <button 
                                    onClick={() => setSelectedCoord(null)}
                                    className="w-full bg-slate-800 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-slate-700 transition-all shadow-lg"
                                >
                                    Tutup Pratinjau
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                
                {/* Form Input (Khusus Masyarakat) */}
                {user?.role !== "admin" && (
                    <Card title="Input Laporan Banjir Baru">
                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
                            <div className="flex flex-col gap-2">
                                <label className="font-black text-[10px] uppercase tracking-widest text-slate-500">Lokasi Kejadian</label>
                                <input 
                                    name="lokasi"
                                    value={formData.lokasi}
                                    onChange={handleChange}
                                    placeholder="Contoh: Jl. Gajah Mada"
                                    className="w-full border-2 border-slate-100 p-4 rounded-xl focus:border-blue-500 outline-none transition-all bg-slate-50"
                                    required
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="font-black text-[10px] uppercase tracking-widest text-slate-500">Ketinggian Air (CM)</label>
                                <input 
                                    name="debit"
                                    type="number"
                                    value={formData.debit}
                                    onChange={handleChange}
                                    placeholder="Contoh: 80"
                                    className="w-full border-2 border-slate-100 p-4 rounded-xl focus:border-blue-500 outline-none transition-all bg-slate-50"
                                    required
                                />
                            </div>
                            <div className="flex flex-col gap-2 md:col-span-2">
                                <label className="font-black text-[10px] uppercase tracking-widest text-slate-500">Deskripsi Situasi</label>
                                <textarea 
                                    name="deskripsi"
                                    value={formData.deskripsi}
                                    onChange={handleChange}
                                    placeholder="Contoh: Air meluap ke jalan raya"
                                    className="w-full border-2 border-slate-100 p-4 rounded-xl focus:border-blue-500 outline-none transition-all bg-slate-50 h-24"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <Button 
                                    type="submit" 
                                    disabled={isSubmitting}
                                    variant={`${isSubmitting ? "bg-slate-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"} w-full text-white py-4 rounded-xl font-black uppercase tracking-widest shadow-lg transition-all`}
                                >
                                    {isSubmitting ? "Sedang Mengirim..." : "Kirim Laporan"}
                                </Button>
                                {statusMsg && <p className="text-green-600 font-bold text-center mt-4 animate-bounce">{statusMsg}</p>}
                            </div>
                        </form>
                    </Card>
                )}

                {/* Tabel Laporan */}
                <div className="bg-slate-200 rounded-[40px] p-6 md:p-10 shadow-inner">
                    <div className="flex justify-between items-center mb-8 px-4">
                        <h2 className="text-2xl md:text-3xl font-black text-slate-800 uppercase tracking-tighter text-center w-full">
                            {user?.role === "admin" ? "Manajemen Laporan Masuk" : "Riwayat Laporan Saya"}
                        </h2>
                    </div>

                    <div className="overflow-x-auto rounded-3xl border border-slate-300 shadow-xl bg-white">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-slate-50 text-slate-600 text-xs uppercase tracking-widest">
                                    <th className="border-b border-r border-slate-200 p-4 w-16">No.</th>
                                    {user?.role === "admin" && <th className="border-b border-r border-slate-200 p-4">Pelapor</th>}
                                    <th className="border-b border-r border-slate-200 p-4 text-left">Lokasi</th>
                                    <th className="border-b border-r border-slate-200 p-4">Debit</th>
                                    <th className="border-b border-r border-slate-200 p-4">Status</th>
                                    <th className="border-b border-slate-200 p-4 text-left">Deskripsi</th>
                                    {user?.role === "admin" && <th className="border-b border-slate-200 p-4 text-center">Aksi</th>}
                                </tr>
                            </thead>
                            <tbody className="text-sm">
                                {displayReports.length > 0 ? (
                                    displayReports.map((report, index) => (
                                        <tr key={report.id || index} className="text-center hover:bg-slate-50 transition-colors border-b border-slate-100">
                                            <td className="p-4 border-r border-slate-100 font-mono text-slate-400">
                                                {String(index + 1).padStart(3, '0')}
                                            </td>
                                            {user?.role === "admin" && (
                                                <td className="p-4 border-r border-slate-100 font-bold text-blue-600">
                                                    {report.reporter || "Anonim"}
                                                </td>
                                            )}
                                            
                                            <td className="p-4 border-r border-slate-100 text-left">
                                                <div className="font-semibold uppercase text-xs mb-1">
                                                    {report.lokasi || report.location || "Lokasi Kosong"}
                                                </div>
                                                {/* TOMBOL LIHAT PETA GOOGLE */}
                                                {(report.koordinat || report.coordinate) && (
                                                    <button 
                                                        onClick={() => setSelectedCoord(report.koordinat || report.coordinate)}
                                                        className="text-[10px] font-black text-blue-600 hover:text-blue-800 flex items-center gap-1 uppercase tracking-tighter transition-all"
                                                    >
                                                        <span className="text-lg">📍</span> Lihat di Peta
                                                    </button>
                                                )}
                                            </td>

                                            <td className="p-4 border-r border-slate-100 font-medium">
                                                {report.debit || report.waterLevel || "-"}
                                            </td>

                                            <td className="p-4 border-r border-slate-100">
                                                <span className={`px-3 py-1 rounded-full font-bold text-[10px] uppercase ${
                                                    report.status === "Bahaya" ? "bg-red-500 text-white" : 
                                                    report.status === "Siaga" ? "bg-orange-500 text-white" : "bg-green-500 text-white"
                                                }`}>
                                                    {report.status || "Aman"}
                                                </span>
                                            </td>

                                            <td className="p-4 text-left text-slate-600 italic">
                                                {report.deskripsi || report.description || "-"}
                                            </td>

                                            {user?.role === "admin" && (
                                                <td className="p-4 text-center">
                                                    <button 
                                                        onClick={() => { if(window.confirm("Hapus laporan ini secara permanen?")) deleteReport(report.id) }}
                                                        className="bg-red-100 text-red-600 px-3 py-1.5 rounded-lg hover:bg-red-600 hover:text-white transition-all font-bold text-xs"
                                                    >
                                                        Hapus
                                                    </button>
                                                </td>
                                            )}
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={user?.role === "admin" ? 7 : 5} className="p-20 text-center text-slate-400 italic font-medium">
                                            Belum ada data laporan.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default Kelola_Laporan;