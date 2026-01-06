import React from "react";
import MainLayout from "../components/Layouts/MainLayout";
import Card from "../components/Elements/Card";
import { floodStatus } from "../data/data.jsx";

const MapPage = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <Card
            title="Peta Pemantauan Banjir Real-Time"
            desc={
                <div className="relative">
                {/* Peta Asli menggunakan Iframe Google Maps */}
                <div className="w-full h-[500px] bg-slate-200 rounded-xl overflow-hidden border border-gray-100">
                    <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126748.56347862248!2d110.3470241!3d-6.9591024!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e708b495037a341%3A0x3027a7635843440!2sSemarang%2C%20Kota%20Semarang%2C%20Jawa%20Tengah!5e0!3m2!1sid!2sid!4v1704545000000!5m2!1sid!2sid"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
                
                {/* Floating Legend - Tetap Dipertahankan agar terlihat profesional */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-xl border border-blue-100 z-10">
                    <h4 className="font-bold text-xs mb-3 uppercase text-slate-800 tracking-wider">Status Wilayah</h4>
                    <div className="space-y-3">
                    <div className="flex items-center gap-3 text-xs font-medium">
                        <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></span> 
                        <span>Bahaya (&gt;70cm)</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs font-medium">
                        <span className="w-3 h-3 bg-yellow-500 rounded-full"></span> 
                        <span>Waspada (30-70cm)</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs font-medium">
                        <span className="w-3 h-3 bg-green-500 rounded-full"></span> 
                        <span>Aman (&lt;30cm)</span>
                    </div>
                    </div>
                </div>
                </div>
            }
        />
      </div>
    </MainLayout>
  );
};

export default MapPage;