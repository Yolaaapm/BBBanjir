import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import Button from "../components/Elements/Button";

const SignInPage = () => {
  const { login, setUser } = useContext(AuthContext); // Tambahkan setUser jika ingin simulasi google login
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    
    // Pastikan rute "/dashboard" sudah terdaftar di App.jsx Anda
    if (login(email, password)) {
      navigate("/"); // Diarahkan ke rute utama yang menampilkan Dashboard
    } else {
      setError("Email atau password salah.");
    }
  };

  // Fungsi Login Google dengan simulasi data user
  const handleGoogleLogin = () => {
    const googleUser = {
      name: "User Google",
      role: "masyarakat",
      email: "user@google.com"
    };
    
    // Simpan ke localStorage dan state agar sinkron
    localStorage.setItem("user_data", JSON.stringify(googleUser));
    window.location.href = "/"; // Redirect langsung ke root untuk menghindari 404 rute dashboard
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-50 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-slate-800 italic">ByeByeBanjir</h1>
          <p className="text-slate-400 text-sm font-medium mt-2">Silakan masuk ke akun Anda</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-xl text-xs font-bold mb-4 border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex flex-col gap-2">
            <label className="font-bold text-xs text-slate-700 uppercase tracking-widest">Email</label>
            <input
              type="email"
              className="border border-slate-200 p-4 rounded-2xl focus:ring-2 ring-blue-500 outline-none transition-all"
              placeholder="admin@banjir.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-bold text-xs text-slate-700 uppercase tracking-widest">Password</label>
            <input
              type="password"
              className="border border-slate-200 p-4 rounded-2xl focus:ring-2 ring-blue-500 outline-none transition-all"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button type="submit" variant="bg-blue-600 w-full py-4 rounded-2xl font-black uppercase tracking-widest shadow-lg shadow-blue-100">
            Login
          </Button>

          <div className="relative flex items-center py-2">
            <div className="flex-grow border-t border-slate-200"></div>
            <span className="flex-shrink mx-4 text-slate-400 text-[10px] font-bold uppercase tracking-widest">Atau</span>
            <div className="flex-grow border-t border-slate-200"></div>
          </div>

          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full py-4 border-2 border-slate-100 rounded-2xl font-bold text-slate-600 text-sm flex items-center justify-center gap-3 hover:bg-slate-50 transition-all active:scale-[0.98]"
          >
            <svg width="20" height="20" viewBox="0 0 48 48">
              <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.64,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
              <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
              <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
              <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.251-2.22,4.147-4.082,5.571l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
            </svg>
            Sign in with Google
          </button>
        </form>

        <p className="text-center mt-8 text-sm text-slate-400 font-medium">
          Belum punya akun?{" "}
          <Link to="/register" className="text-blue-600 font-bold hover:underline">
            Daftar Sekarang
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignInPage;