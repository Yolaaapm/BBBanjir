import React from "react";
import { Link } from "react-router-dom";
import MainLayout from "../components/Layouts/MainLayout";
import Card from "../components/Elements/Card";
import Button from "../components/Elements/Button"; 
import { floodStatus, donationData, recentReports } from "../data/data.jsx";
import Icon from "../components/Elements/Icon";

const DashboardPage = () => {
  const donationProgress = (donationData.presentAmount / donationData.targetAmount) * 100;

  return (
    <MainLayout>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Kolom Utama */}
        <div className="lg:col-span-2 space-y-6">
          {/* Status Alert Banner */}
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-xl flex items-center gap-4">
            <div className="text-red-500"><Icon.Report /></div>
            <div>
              <p className="text-sm font-bold text-red-800">Peringatan: Ketinggian air di Genuk mencapai 85cm.</p>
              <p className="text-xs text-red-600">Terakhir diperbarui: 10 menit yang lalu</p>
            </div>
          </div>

          <Card 
            title="Monitoring Wilayah" 
            desc={
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {floodStatus.map((item) => (
                  <div key={item.id} className="p-4 border rounded-xl hover:border-blue-300 transition-colors">
                    <div className="flex justify-between mb-2">
                      <span className="font-bold text-slate-700">{item.name}</span>
                      <span className={`text-xs font-bold px-2 py-1 rounded ${item.status === 'Bahaya' ? 'bg-red-100 text-red-600' : 'bg-yellow-100 text-yellow-600'}`}>
                        {item.status}
                      </span>
                    </div>
                    <div className="text-2xl font-bold text-blue-600">{item.waterLevel}</div>
                    <p className="text-[10px] text-gray-400 mt-2 italic">{item.description}</p>
                  </div>
                ))}
              </div>
            } 
          />
        </div>

        {/* Kolom Samping */}
        <div className="space-y-6">
          <Card 
            title="Donasi Terkumpul" 
            desc={
              <div>
                <div className="text-2xl font-bold mb-1">Rp {donationData.presentAmount.toLocaleString("id-ID")}</div>
                <div className="w-full bg-gray-200 h-2 rounded-full mb-4">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: `${donationProgress}%` }}></div>
                </div>
                <Link to="/donation">
                  <Button variant="bg-blue-600 w-full text-xs py-2">Lihat Detail Donasi</Button>
                </Link>
              </div>
            } 
          />

          <div className="bg-slate-800 rounded-2xl p-6 text-white">
            <h3 className="font-bold mb-4 flex items-center gap-2"><Icon.Map /> Menu Cepat</h3>
            <div className="grid grid-cols-2 gap-2">
              <Link to="/report" className="p-3 bg-slate-700 rounded-xl text-center hover:bg-slate-600 transition">
                <div className="text-xs">Lapor</div>
              </Link>
              <Link to="/map" className="p-3 bg-slate-700 rounded-xl text-center hover:bg-slate-600 transition">
                <div className="text-xs">Peta</div>
              </Link>
            </div>
          </div>
        </div>

      </div>
    </MainLayout>
  );
};

export default DashboardPage;