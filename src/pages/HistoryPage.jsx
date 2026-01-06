import React, { useContext } from "react";
import MainLayout from "../components/Layouts/MainLayout";
import Card from "../components/Elements/Card";
import { AuthContext } from "../context/authContext"; 
import { Navigate } from "react-router-dom";

const HistoryPage = () => {
  const { user, reports, donations } = useContext(AuthContext); 

  if (!user || user.role !== "admin") {
    return <Navigate to="/dashboard" />;
  }

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Judul Diperbarui: Hanya Admin */}
        <h1 className="text-2xl font-black text-slate-800 uppercase tracking-tighter">
          Panel Histori Admin
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* TABEL RIWAYAT LAPORAN */}
          <Card
            title="Riwayat Laporan Masuk"
            desc={
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-black">
                    <tr>
                      <th className="p-4">Tanggal</th>
                      <th className="p-4">Pelapor</th>
                      <th className="p-4">Lokasi</th>
                      <th className="p-4">Keterangan</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {reports.length > 0 ? reports.map((report) => (
                      <tr key={report.id} className="hover:bg-slate-50 transition-colors">
                        <td className="p-4 font-medium text-slate-400">{report.date}</td>
                        <td className="p-4 font-bold text-slate-700 capitalize">{report.reporter}</td>
                        <td className="p-4 font-bold text-blue-600 uppercase">{report.location}</td>
                        <td className="p-4 text-slate-600 italic">{report.description}</td>
                      </tr>
                    )) : (
                      <tr><td colSpan="4" className="p-10 text-center text-slate-400 italic">Belum ada laporan.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            }
          />

          {/* TABEL RIWAYAT DONASI */}
          <Card
            title="Riwayat Donatur"
            desc={
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-black">
                    <tr>
                      <th className="p-4">Donatur</th>
                      <th className="p-4">Nominal</th>
                      <th className="p-4">Tanggal</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {donations.length > 0 ? donations.map((don) => (
                      <tr key={don.id} className="hover:bg-slate-50 transition-colors">
                        <td className="p-4 font-bold text-slate-700 capitalize">{don.donor}</td>
                        <td className="p-4 font-black text-green-600">Rp {don.amount.toLocaleString("id-ID")}</td>
                        <td className="p-4 text-slate-400">{don.date}</td>
                      </tr>
                    )) : (
                      <tr><td colSpan="3" className="p-10 text-center text-slate-400 italic">Belum ada donasi.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            }
          />
        </div>
      </div>
    </MainLayout>
  );
};

export default HistoryPage;