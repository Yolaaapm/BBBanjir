import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import MainLayout from "../components/Layouts/MainLayout";
import Card from "../components/Elements/Card";
import Button from "../components/Elements/Button"; 
import Icon from "../components/Elements/Icon";
import { AuthContext } from "../context/authContext"; // Sinkronisasi Global

const DashboardPage = () => {
  // Ambil user, reports, donasi, dan fungsi hapus dari Context
  const { user, reports, totalDonationAmount, deleteReport } = useContext(AuthContext); 
  const [showReportModal, setShowReportModal] = useState(false);
  
  // 1. Logika Sinkronisasi Status Berdasarkan Tinggi Air di Laporan
  const amanCount = reports.filter(r => {
    const level = parseInt(r.description.match(/\d+/)) || 0;
    return level > 0 && level < 30;
  }).length;

  const siagaCount = reports.filter(r => {
    const level = parseInt(r.description.match(/\d+/)) || 0;
    return level >= 30 && level < 70;
  }).length;

  const bahayaCount = reports.filter(r => {
    const level = parseInt(r.description.match(/\d+/)) || 0;
    return level >= 70;
  }).length;

  const targetAmount = 100000000; 
  const donationProgress = (totalDonationAmount / targetAmount) * 100;

  // Laporan Terbaru untuk Petunjuk Peta
  const latestReport = reports.length > 0 ? reports[reports.length - 1] : null;

  // 2. Data Statistik Atas (4 Kolom)
  const stats = [
    { id: 1, label: "Total Laporan", value: reports.length, color: "bg-blue-600", icon: <Icon.TotalReport />, clickable: true },
    { id: 2, label: "Status Aman", value: amanCount, color: "bg-green-600", icon: <Icon.Aman /> }, 
    { id: 3, label: "Status Waspada", value: siagaCount, color: "bg-orange-500", icon: <Icon.Siaga /> },
    { id: 4, label: "Status Bahaya", value: bahayaCount, color: "bg-red-600", icon: <Icon.Bahaya /> }, 
  ];

  const days = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
  const chartData = days.map((day, index) => {
    const count = reports.length * (index + 1) * 5; 
    return { day, val: Math.min(count, 180) }; 
  });

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
                <h3 className="font-bold text-xl flex items-center gap-2"><Icon.TotalReport /> Detail Laporan</h3>
                <button onClick={() => setShowReportModal(false)} className="text-2xl hover:rotate-90 transition-transform">✕</button>
              </div>
              <div className="p-6 space-y-4 max-h-[400px] overflow-y-auto">
                {reports.length > 0 ? reports.map((report) => (
                  <div key={report.id} className="p-4 bg-slate-50 border-l-4 border-blue-500 rounded-r-xl flex justify-between items-start">
                    <div className="space-y-1">
                      <p className="font-bold text-blue-600 uppercase text-xs">{report.location}</p>
                      <p className="text-slate-600 text-sm">{report.description}</p>
                      <p className="text-[10px] text-slate-400 font-medium">{report.date}</p>
                    </div>
                    <button 
                      onClick={() => {
                        if(window.confirm(`Hapus laporan di ${report.location}?`)) deleteReport(report.id);
                      }}
                      className="text-slate-300 hover:text-red-500 p-2 transition-colors"
                    >
                      <Icon.Logout />
                    </button>
                  </div>
                )) : <p className="text-center py-10 text-slate-400 font-medium">Belum ada laporan masuk.</p>}
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            
            {/* ALERT BANNER */}
            {reports.length > 0 && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-xl flex items-center gap-4 shadow-sm animate-pulse">
                <div className="text-red-500"><Icon.Bahaya /></div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-red-800 uppercase tracking-tight">Laporan Terbaru: {reports[reports.length-1].location}</p>
                  <p className="text-xs text-red-600 font-medium">{reports[reports.length-1].description}</p>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card title="Grafik Statistik" desc={
                  <div className="w-full">
                    <div className="relative h-48 w-full border-l border-b border-gray-100 flex items-end">
                      <svg className="w-full h-full overflow-visible z-10" viewBox="0 0 700 200">
                        <path d={`M 50 ${200 - chartData[0].val} L 150 ${200 - chartData[1].val} L 250 ${200 - chartData[2].val} L 350 ${200 - chartData[3].val} L 450 ${200 - chartData[4].val} L 550 ${200 - chartData[5].val} L 650 ${200 - chartData[6].val}`} fill="none" stroke="#3b82f6" strokeWidth="4" strokeLinecap="round" />
                        {chartData.map((d, i) => <circle key={i} cx={50 + (i * 100)} cy={200 - d.val} r="6" fill="#60a5fa" stroke="white" strokeWidth="2" />)}
                      </svg>
                    </div>
                    <div className="flex justify-between px-2 mt-4 text-[10px] font-bold text-gray-400 uppercase">
                      {chartData.map((d, i) => <span key={i}>{d.day}</span>)}
                    </div>
                  </div>
                }/>

                <Card title="Monitoring Wilayah" desc={
                  <div className="space-y-4">
                    {reports.length > 0 ? reports.slice(-2).map((item) => {
                      const level = parseInt(item.description.match(/\d+/)) || 0;
                      const isBahaya = level >= 70;
                      const isWaspada = level >= 30 && level < 70;
                      return (
                        <div key={item.id} className={`p-4 border-l-4 rounded-r-xl ${isBahaya ? 'border-red-500 bg-red-50' : isWaspada ? 'border-orange-500 bg-orange-50' : 'border-green-500 bg-green-50'}`}>
                          <div className="flex justify-between mb-2">
                            <span className="font-bold text-slate-700 uppercase text-[10px]">{item.location}</span>
                            <span className={`text-[8px] font-extrabold px-2 py-0.5 rounded-full uppercase ${isBahaya ? 'bg-red-600 text-white' : isWaspada ? 'bg-orange-500 text-white' : 'bg-green-600 text-white'}`}>
                              {isBahaya ? 'Bahaya' : isWaspada ? 'Waspada' : 'Aman'}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-600 italic leading-tight">{item.description}</p>
                        </div>
                      )
                    }) : <p className="text-xs text-slate-400 py-4 text-center">Menunggu laporan...</p>}
                  </div>
                }/>
            </div>

            {/* PETA LOKASI BANJIR DENGAN PETUNJUK LOKASI */}
            <Card title="Peta Lokasi Banjir" desc={
              <div className="relative">
                <div className="w-full h-96 bg-slate-100 rounded-2xl overflow-hidden shadow-inner border border-slate-100">
                  <iframe
                    src={`https://maps.google.com/maps?q=${
                      latestReport 
                      ? encodeURIComponent(latestReport.location + " " + (parseInt(latestReport.description.match(/\d+/)) >= 70 ? "BAHAYA" : parseInt(latestReport.description.match(/\d+/)) >= 30 ? "WASPADA" : "AMAN"))
                      : "Semarang"
                    }&t=&z=14&ie=UTF8&iwloc=&output=embed`}
                    width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy">
                  </iframe>
                </div>

                {/* Panel Petunjuk Lokasi Terbaru */}
                {latestReport && (
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-blue-50 max-w-xs">
                    <h4 className="font-black text-[9px] text-blue-600 uppercase tracking-widest mb-1">Lokasi Terfokus</h4>
                    <p className="font-bold text-slate-800 uppercase text-sm">{latestReport.location}</p>
                    <p className="text-[10px] text-slate-500 italic mt-1 leading-tight">"{latestReport.description}"</p>
                  </div>
                )}
              </div>
            }/>
          </div>

          <div className="space-y-6">
            {/* DONASI TERKUMPUL */}
            <Card title="Donasi Terkumpul" desc={
              <div className="space-y-4">
                <div className="text-2xl font-black text-slate-800">Rp {(totalDonationAmount || 0).toLocaleString("id-ID")}</div>
                <div className="w-1/4 bg-gray-200 h-2 rounded-full overflow-hidden">
                  <div className="bg-green-500 h-full transition-all duration-700" style={{ width: `${Math.min(donationProgress, 100)}%` }}></div>
                </div>
                <Link to="/donation" className="block pt-2">
                  <Button variant="bg-blue-600 w-full py-3 rounded-xl text-white font-bold text-xs uppercase tracking-widest shadow-lg shadow-blue-100">Lihat Detail Donasi</Button>
                </Link>
              </div>
            }/>

            {/* MENU CEPAT & TOMBOL HISTORI KHUSUS ADMIN */}
            <div className="bg-defaultBlack rounded-2xl p-6 text-white shadow-xl">
              <h3 className="font-bold mb-4 flex items-center gap-2"><Icon.Map /> Menu Cepat</h3>
              <div className="grid grid-cols-2 gap-2 mb-4">
                <Link to="/report" className="p-3 bg-special-bg3 rounded-xl text-center hover:bg-primary transition-all group">
                  <div className="text-[10px] font-bold uppercase group-hover:scale-110 transition-transform">Lapor</div>
                </Link>
                <Link to="/map" className="p-3 bg-special-bg3 rounded-xl text-center hover:bg-primary transition-all group">
                  <div className="text-[10px] font-bold uppercase group-hover:scale-110 transition-transform">Peta</div>
                </Link>
              </div>

              {/* HANYA MUNCUL UNTUK ADMIN */}
              {user?.role === "admin" && (
                <Link to="/history" className="block p-3 bg-red-600 text-white rounded-xl font-black text-[10px] text-center uppercase tracking-widest hover:bg-red-700 transition-all shadow-lg shadow-red-900/20">
                  Buka Histori Admin
                </Link>
              )}
            </div>
          </div>

        </div>
      </div>
    </MainLayout>
  );
};

export default DashboardPage;