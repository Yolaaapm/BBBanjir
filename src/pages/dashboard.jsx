import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import MainLayout from "../components/Layouts/MainLayout";
import Card from "../components/Elements/Card";
import Button from "../components/Elements/Button"; 
import Icon from "../components/Elements/Icon";
import { AuthContext } from "../context/authContext"; 

const DashboardPage = () => {
  // Pastikan reports memiliki default array [] untuk menghindari error .length
  const { user, reports = [], totalDonationAmount, deleteReport } = useContext(AuthContext); 
  const [showReportModal, setShowReportModal] = useState(false);
  
  // 1. Logika Hitung Status yang Aman (Menggunakan optional chaining dan null check)
  // Kita asumsikan tinggi air diambil dari field 'debit' yang ada di AuthContext
  const getLevel = (report) => {
    // Mencari angka dari field 'debit' (misal: "120 CM" -> 120)
    const match = report?.debit?.match(/\d+/);
    return match ? parseInt(match[0]) : 0;
  };

  const amanCount = reports.filter(r => getLevel(r) > 0 && getLevel(r) < 30).length;
  const siagaCount = reports.filter(r => getLevel(r) >= 30 && getLevel(r) < 70).length;
  const bahayaCount = reports.filter(r => getLevel(r) >= 70).length;

  const targetAmount = 100000000; 
  const donationProgress = (totalDonationAmount / targetAmount) * 100;

  // Laporan Terbaru
  const latestReport = reports.length > 0 ? reports[0] : null;

  const stats = [
    { id: 1, label: "Total Laporan", value: reports.length, color: "bg-blue-600", icon: <Icon.TotalReport />, clickable: true },
    { id: 2, label: "Status Aman", value: amanCount, color: "bg-green-600", icon: <Icon.Aman /> }, 
    { id: 3, label: "Status Waspada", value: siagaCount, color: "bg-orange-500", icon: <Icon.Siaga /> },
    { id: 4, label: "Status Bahaya", value: bahayaCount, color: "bg-red-600", icon: <Icon.Bahaya /> }, 
  ];

  const days = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
  const chartData = days.map((day, index) => ({
    day, 
    val: Math.min(reports.length * (index + 1) * 2, 180) 
  }));

  return (
    <MainLayout>
      <div className="space-y-6">
        
        {/* STATISTIK CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((item) => (
            <div 
              key={item.id} 
              onClick={() => item.clickable && setShowReportModal(true)}
              className={`${item.color} p-6 rounded-2xl text-white flex items-center justify-between shadow-sm cursor-pointer transition-transform hover:scale-[1.02]`}
            >
              <div className="space-y-1">
                <p className="text-[10px] font-bold opacity-80 uppercase tracking-widest">{item.label}</p>
                <p className="text-4xl font-black">{item.value}</p>
              </div>
              <div className="p-3 bg-white/20 rounded-xl text-3xl">{item.icon}</div>
            </div>
          ))}
        </div>

        {/* MODAL DETAIL LAPORAN */}
        {showReportModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[999] p-4">
            <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in duration-300">
              <div className="bg-blue-600 p-6 text-white flex justify-between items-center">
                <h3 className="font-bold text-xl flex items-center gap-2">Detail Laporan</h3>
                <button onClick={() => setShowReportModal(false)} className="text-2xl">✕</button>
              </div>
              <div className="p-6 space-y-4 max-h-[400px] overflow-y-auto">
                {reports.length > 0 ? reports.map((report) => (
                  <div key={report.id} className="p-4 bg-slate-50 border-l-4 border-blue-500 rounded-r-xl flex justify-between items-center">
                    <div>
                      <p className="font-bold text-blue-600 uppercase text-xs">{report.lokasi}</p>
                      <p className="text-slate-600 text-sm">{report.deskripsi}</p>
                      <p className="text-[10px] text-slate-400">{report.reporter} • {report.date}</p>
                    </div>
                    {user?.role === "admin" && (
                       <button onClick={() => deleteReport(report.id)} className="text-red-500 font-bold text-xs">Hapus</button>
                    )}
                  </div>
                )) : <p className="text-center py-10 text-slate-400">Belum ada laporan.</p>}
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            
            {/* ALERT BANNER */}
            {latestReport && getLevel(latestReport) >= 70 && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-xl flex items-center gap-4 shadow-sm animate-pulse">
                <div className="text-red-500 font-bold">⚠️</div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-red-800 uppercase">PERINGATAN BAHAYA: {latestReport.lokasi}</p>
                  <p className="text-xs text-red-600 font-medium">Ketinggian air mencapai {latestReport.debit}. Harap waspada!</p>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card title="Grafik Pelaporan" desc={
                  <div className="h-48 flex items-end justify-between px-4 pb-2">
                    {chartData.map((d, i) => (
                      <div key={i} className="flex flex-col items-center gap-2 w-full">
                        <div className="bg-blue-500 w-8 rounded-t-md transition-all duration-1000" style={{ height: `${d.val}px` }}></div>
                        <span className="text-[10px] font-bold text-gray-400 uppercase">{d.day}</span>
                      </div>
                    ))}
                  </div>
                }/>

                <Card title="Monitoring Terbaru" desc={
                  <div className="space-y-3">
                    {reports.slice(0, 3).map((item) => (
                      <div key={item.id} className="text-sm p-2 border-b border-slate-50">
                        <div className="flex justify-between">
                          <span className="font-bold text-slate-700">{item.lokasi}</span>
                          <span className="text-blue-600 font-bold">{item.debit}</span>
                        </div>
                        <p className="text-[10px] text-slate-400 truncate">{item.deskripsi}</p>
                      </div>
                    ))}
                  </div>
                }/>
            </div>

            {/* PETA */}
            <Card title="Peta Lokasi Banjir" desc={
              <div className="w-full h-80 bg-slate-100 rounded-2xl overflow-hidden border border-slate-100">
                <iframe
                  src={`https://maps.google.com/maps?q=${latestReport ? encodeURIComponent(latestReport.lokasi) : "Semarang"}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                  width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy">
                </iframe>
              </div>
            }/>
          </div>

          <div className="space-y-6">
            <Card title="Donasi Terkumpul" desc={
              <div className="space-y-4">
                <div className="text-3xl font-black text-slate-800">Rp {totalDonationAmount.toLocaleString("id-ID")}</div>
                <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
                  <div className="bg-green-500 h-full" style={{ width: `${Math.min(donationProgress, 100)}%` }}></div>
                </div>
                <Link to="/donation">
                  <Button variant="bg-blue-600 w-full text-white py-3 mt-2 rounded-xl text-xs font-bold uppercase">Bantu Sekarang</Button>
                </Link>
              </div>
            }/>

            <div className="bg-slate-900 rounded-2xl p-6 text-white">
              <h3 className="font-bold mb-4">Akses Cepat</h3>
              <div className="grid grid-cols-2 gap-3">
                <Link to="/report" className="p-4 bg-slate-800 rounded-xl text-center hover:bg-blue-600 transition-all">
                  <div className="text-[10px] font-bold uppercase">Kelola</div>
                </Link>
                <Link to="/map" className="p-4 bg-slate-800 rounded-xl text-center hover:bg-blue-600 transition-all">
                  <div className="text-[10px] font-bold uppercase">Peta</div>
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </MainLayout>
  );
};

export default DashboardPage;