import { createContext, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // 1. Cek apakah ada data user di localStorage saat halaman direfresh
    const savedUser = localStorage.getItem("user_data");
    const token = localStorage.getItem("token");

    if (token) {
      try {
        return jwtDecode(token);
      } catch (err) {
        console.error("Invalid token", err);
        localStorage.removeItem("token");
      }
    }
    
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (email, password) => {
    let userData = null;

    // 2. Logika Role Admin (BPBD) sesuai dokumen SKPL
    if (email === "admin@banjir.com" && password === "admin123") {
      userData = { 
        name: "Admin", 
        role: "admin", 
        email: email 
      };
    } 
    // 3. Logika Role Masyarakat Dinamis (Bisa email & password apa saja)
    else if (email && password.length >= 5) { 
      // Mengambil nama depan dari email (contoh: budi@mail.com -> Budi)
      const nameFromEmail = email.split('@')[0];
      const capitalizedName = nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1);

      userData = { 
        name: capitalizedName, 
        role: "masyarakat", 
        email: email 
      };
    }

    // 4. Jika login berhasil, simpan ke state dan localStorage
    if (userData) {
      setUser(userData);
      localStorage.setItem("user_data", JSON.stringify(userData));
      // localStorage.setItem("token", "dummy-token-uas"); // Opsional jika butuh dummy token
      return true;
    }

    return false;
  };

  const logout = () => {
    // 5. Bersihkan semua data saat logout
    setUser(null);
    localStorage.removeItem("user_data");
    localStorage.removeItem("token");
    window.location.href = "/login"; // Redirect ke halaman login
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};