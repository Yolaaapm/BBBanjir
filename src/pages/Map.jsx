import React, { useContext } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import MainLayout from "../components/Layouts/MainLayout";
import Card from "../components/Elements/Card";
import { AuthContext } from "../context/authContext";

// --- FIX ICON AGAR TERLIHAT MODERN ---
const createCustomIcon = (color) => {
  return new L.DivIcon({
    html: `<div style="background-color: ${color}; width: 14px; height: 14px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 10px rgba(0,0,0,0.3);"></div>`,
    className: "custom-marker",
    iconSize: [14, 14],
    iconAnchor: [7, 7],
  });
};

const MapPage = () => {
  const { reports = [] } = useContext(AuthContext);
  const centerPosition = [-6.966667, 110.416664]; // Fokus Semarang

  return (
    <MainLayout>
      <div className="space-y-6">
        <Card
          title="Peta Pemantauan Banjir Real-Time"
          desc={
            <div className="relative group">
              {/* Peta dengan Style Google Maps-like (CartoDB Voyager) */}
              <div className="w-full h-[600px] bg-slate-200 rounded-[30px] overflow-hidden border-4 border-white shadow-2xl z-0">
                <MapContainer
                  center={centerPosition}
                  zoom={13}
                  scrollWheelZoom={true}
                  style={{ height: "100%", width: "100%" }}
                >
                  {/* TILE LAYER: Menggunakan CartoDB Voyager agar mirip Google Maps (Clean & Detail) */}
                  <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                    attribution='&copy; <a href="https://carto.com/">CARTO</a>'
                  />

                  {reports.map((report, index) => {
                    if (report.koordinat?.lat && report.koordinat?.lng) {
                      const markerColor = 
                        report.status === "Bahaya" ? "#ef4444" : 
                        report.status === "Siaga" ? "#f97316" : "#22c55e";

                      return (
                        <Marker
                          key={report.id || index}
                          position={[report.koordinat.lat, report.koordinat.lng]}
                          icon={createCustomIcon(markerColor)}
                        >
                          <Popup className="custom-popup">
                            <div className="p-2 font-sans">
                              <div className="flex items-center gap-2 mb-2">
                                <span className={`w-2 h-2 rounded-full`} style={{backgroundColor: markerColor}}></span>
                                <h4 className="font-black uppercase text-[10px] tracking-widest text-slate-400">Laporan Masuk</h4>
                              </div>
                              <h3 className="font-bold text-slate-800 text-sm mb-1">{report.lokasi}</h3>
                              <p className="text-xs text-slate-600 mb-2 italic">"{report.deskripsi}"</p>
                              <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                                <p className="text-[10px] font-bold text-slate-500 uppercase">Ketinggian Air</p>
                                <p className="text-sm font-black text-blue-600">{report.debit}</p>
                              </div>
                            </div>
                          </Popup>
                        </Marker>
                      );
                    }
                    return null;
                  })}
                </MapContainer>
              </div>

              {/* Legend yang lebih estetik */}
              <div className="absolute top-6 right-6 bg-white/80 backdrop-blur-md p-5 rounded-[24px] shadow-2xl border border-white/50 z-[1000] w-48">
                <h4 className="font-black text-[10px] mb-4 uppercase text-slate-500 tracking-[0.2em]">Indikator Air</h4>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-3 h-3 bg-red-500 rounded-full ring-4 ring-red-100 animate-pulse"></div>
                    <span className="text-xs font-bold text-slate-700">Bahaya</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-3 h-3 bg-orange-500 rounded-full ring-4 ring-orange-100"></div>
                    <span className="text-xs font-bold text-slate-700">Siaga</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-3 h-3 bg-green-500 rounded-full ring-4 ring-green-100"></div>
                    <span className="text-xs font-bold text-slate-700">Aman</span>
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