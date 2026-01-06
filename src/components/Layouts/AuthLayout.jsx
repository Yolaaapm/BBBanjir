import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Elements/Logo";

const AuthLayout = (props) => {
  const { children, title, type } = props;

  return (
    <div className="flex justify-center min-h-screen items-center bg-gray-50 font-poppins">
      <div className="flex w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden m-4">
        
        {/* Sisi Kiri: Informasi Branding (Hidden on Mobile) */}
        <div className="hidden md:flex md:w-1/2 bg-blue-600 p-12 text-white flex-col justify-between">
          <div>
            <Logo variant="white" />
            <p className="mt-4 text-blue-100 text-lg">
              Sistem Cerdas Deteksi & Respon Banjir Wilayah Jawa Tengah.
            </p>
          </div>
          
          <div>
            <blockquote className="text-xl italic font-light border-l-4 border-blue-300 pl-4">
              "Bersama mewujudkan lingkungan yang tanggap bencana dan transparan."
            </blockquote>
            <p className="mt-4 text-sm text-blue-200">© 2026 ByeByeFlood Team - Kelompok 01</p>
          </div>
        </div>

        {/* Sisi Kanan: Form */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-800 mb-2">{title}</h1>
            <p className="text-gray-500 text-sm">
              Silakan masukkan detail akun Anda untuk mengakses sistem.
            </p>
          </div>

          {/* Form Content (SignIn / SignUp) */}
          {children}

          <div className="mt-8 text-center text-sm">
            <p className="text-gray-600">
              {type === "login"
                ? "Belum punya akun? "
                : "Sudah memiliki akun? "}
              
              <Link
                to={type === "login" ? "/register" : "/login"}
                className="font-bold text-blue-600 hover:underline"
              >
                {type === "login" ? "Daftar di sini" : "Login sekarang"}
              </Link>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AuthLayout;