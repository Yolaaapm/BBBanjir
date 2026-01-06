import React, { useState } from "react";
import MainLayout from "../components/Layouts/MainLayout";
import Card from "../components/Elements/Card";
import Icon from "../components/Elements/Icon";
import Button from "../components/Elements/Button"; 

const ReportPage = () => {
  const [status, setStatus] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("Laporan berhasil dikirim!");
  };

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto">
        <Card
          title="Formulir Pelaporan Banjir"
          desc={
            <form onSubmit={handleSubmit} className="space-y-6">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Gunakan Input yang ada di folder Elements Anda */}
                  <div className="flex flex-col gap-2">
                    <label className="font-bold">Lokasi</label>
                    <input type="text" className="border p-2 rounded-xl" placeholder="Masukkan Lokasi" required />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-bold">Tinggi Air (cm)</label>
                    <input type="number" className="border p-2 rounded-xl" placeholder="0" required />
                  </div>
               </div>
               <Button type="submit" variant="bg-blue-600 w-full">Kirim Laporan</Button>
            </form>
          }
        />
      </div>
    </MainLayout>
  );
};

export default ReportPage;