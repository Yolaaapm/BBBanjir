import React, { useContext } from "react";
import MainLayout from "../components/Layouts/MainLayout";
import Card from "../components/Elements/Card";
import { AuthContext } from "../context/authContext";

const ProfilePage = () => {
  const { user } = useContext(AuthContext);

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        <Card
          title="Profil Pengguna"
          desc={
            <div className="space-y-6">
              <div className="flex flex-col items-center py-6 border-b border-gray-100">
                <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center text-white text-3xl font-bold mb-4 shadow-lg shadow-blue-100">
                  {user?.name?.charAt(0) || "U"}
                </div>
                <h2 className="text-xl font-bold text-slate-800 uppercase">{user?.name}</h2>
                <span className="px-3 py-1 bg-blue-50 text-primary text-xs font-bold rounded-full mt-1 uppercase tracking-widest">
                  {user?.role}
                </span>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-xs text-gray-400 font-bold uppercase mb-1">Email Aktif</p>
                  <p className="text-slate-700 font-medium">{user?.email}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-xs text-gray-400 font-bold uppercase mb-1">Status Keanggotaan</p>
                  <p className="text-slate-700 font-medium">Aktif Terverifikasi</p>
                </div>
              </div>
            </div>
          }
        />
      </div>
    </MainLayout>
  );
};

export default ProfilePage;