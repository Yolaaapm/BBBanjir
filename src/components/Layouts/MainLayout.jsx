import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Icon from "../Elements/Icon";
import Logo from "../Elements/Logo";
import { AuthContext } from "../../context/authContext";
import { ThemeContext } from "../../context/themeContext";

const MainLayout = (props) => {
  const { children } = props;
  const location = useLocation();
  const { user, logout } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  
  // State untuk mengontrol buka/tutup dropdown profile di header
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  // Daftar menu lengkap dengan hak akses (roles) sesuai dokumen SKPL
  const menu = [
    { id: 1, name: "Dashboard", icon: <Icon.Overview />, link: "/", roles: ["admin", "masyarakat"] },
    { id: 2, name: "Lapor Banjir", icon: <Icon.Report />, link: "/report", roles: ["masyarakat"] },
    { id: 3, name: "Donasi", icon: <Icon.Donation />, link: "/donation", roles: ["masyarakat"] },
    { id: 4, name: "Peta Banjir", icon: <Icon.Map />, link: "/map", roles: ["admin", "masyarakat"] },
    { id: 5, name: "Kelola Laporan", icon: <Icon.Setting />, link: "/manage-reports", roles: ["admin"] },
  ];

  // Filter menu: Hanya menampilkan menu yang boleh diakses oleh role user saat ini
  const filteredMenu = menu.filter((item) => item.roles.includes(user?.role));

  return (
    <div className={`flex min-h-screen w-full ${theme.name} bg-special-mainBg`}>
      {/* Sidebar Statis di Sisi Kiri */}
      <aside className="w-64 bg-defaultBlack text-white flex flex-col fixed h-full z-20">
        <div className="p-8">
          <Logo variant="white" />
        </div>
        
        <nav className="flex-1 px-4 space-y-2">
          {filteredMenu.map((item) => (
            <Link
              key={item.id}
              to={item.link}
              className={`flex items-center gap-4 p-3 rounded-xl transition-all ${
                location.pathname === item.link
                  ? "bg-primary text-white"
                  : "text-gray-03 hover:bg-special-bg3 hover:text-white"
              }`}
            >
              {item.icon}
              <span className="font-poppins text-sm font-medium">{item.name}</span>
            </Link>
          ))}
        </nav>

        {/* Tombol Logout Utama di Sidebar */}
        <div className="p-6 border-t border-special-bg3">
          <button 
            onClick={logout} 
            className="flex items-center gap-4 p-3 w-full text-gray-03 hover:text-special-red transition-colors font-poppins text-sm font-medium"
          >
            <Icon.Logout />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Area Konten Utama */}
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        <header className="h-20 bg-white border-b border-gray-05 px-8 flex items-center justify-between sticky top-0 z-10">
          <div>
            <h1 className="text-xl font-bold text-defaultBlack">
              {menu.find((m) => m.link === location.pathname)?.name || "ByeByeBanjir"}
            </h1>
            <p className="text-[10px] text-gray-02 uppercase tracking-widest font-bold">{user?.role}</p>
          </div>

          <div className="flex items-center gap-4 relative">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-defaultBlack uppercase">{user?.name || "User"}</p>
              <p className="text-[10px] text-gray-02">6 Jan 2026</p>
            </div>
            
            {/* Tombol Avatar untuk memicu Dropdown */}
            <button 
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold hover:ring-4 ring-blue-100 transition-all focus:outline-none"
            >
              {user?.name?.charAt(0) || "U"}
            </button>

            {/* Dropdown Menu Profile + Setting (Tanpa tombol Logout ganda) */}
            {showProfileMenu && (
              <div className="absolute right-0 top-12 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-30">
                <div className="px-4 py-2 border-b border-gray-50 mb-1">
                  <p className="text-[9px] text-gray-400 uppercase font-bold">Email Aktif</p>
                  <p className="text-[10px] font-medium truncate text-primary">{user?.email}</p>
                </div>
                
                <Link 
                  to="/profile" 
                  className="flex items-center gap-3 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
                  onClick={() => setShowProfileMenu(false)}
                >
                  <Icon.Profile /> 
                  <span>Profile</span>
                </Link>
                <Link 
                  to="/settings" 
                  className="flex items-center gap-3 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
                  onClick={() => setShowProfileMenu(false)}
                >
                  <Icon.Setting /> <span>Settings</span>
                </Link>
              </div>
            )}
          </div>
        </header>

        {/* Tempat merender konten halaman (Dashboard, Report, dll) */}
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;