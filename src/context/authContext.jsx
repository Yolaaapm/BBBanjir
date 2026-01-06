import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  // 1. Inisialisasi State User dari LocalStorage
  const [user, setUser] = useState(() => {
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

  // 2. Inisialisasi State Laporan Global
  const [reports, setReports] = useState(() => {
    const savedReports = localStorage.getItem("flood_reports");
    return savedReports ? JSON.parse(savedReports) : [];
  });

  // 3. Inisialisasi State Donasi Global
  const [donations, setDonations] = useState(() => {
    const savedDonations = localStorage.getItem("flood_donations");
    return savedDonations ? JSON.parse(savedDonations) : [];
  });

  // 4. Efek Sinkronisasi ke LocalStorage
  useEffect(() => {
    localStorage.setItem("flood_reports", JSON.stringify(reports));
    localStorage.setItem("flood_donations", JSON.stringify(donations));
  }, [reports, donations]);

  // 5. Fungsi Manajemen Laporan (Mencatat Pelapor)
  const addReport = (newReport, reporterName) => {
    const reportData = {
      ...newReport,
      id: Date.now(),
      reporter: reporterName || "Anonim", // Mencatat siapa yang melapor
      date: new Date().toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    };
    setReports((prevReports) => [...prevReports, reportData]);
  };

  // 6. Fungsi Hapus Laporan
  const deleteReport = (id) => {
    setReports((prevReports) => prevReports.filter((report) => report.id !== id));
  };

  // 7. Fungsi Manajemen Donasi (Mencatat Nama Donatur)
  const addDonation = (amount, donorName) => {
    const donationData = {
      id: Date.now(),
      amount: parseInt(amount),
      donor: donorName || "Anonim", // Mencatat siapa yang berdonasi
      date: new Date().toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    };
    setDonations((prev) => [...prev, donationData]);
  };

  // Hitung total nominal donasi secara real-time
  const totalDonationAmount = donations.reduce((acc, curr) => acc + curr.amount, 0);

  // 8. Logika Login
  const login = (email, password) => {
    let userData = null;

    if (email === "admin@banjir.com" && password === "admin123") {
      userData = { name: "Admin", role: "admin", email: email };
    } 
    else if (email && password.length >= 5) { 
      const nameFromEmail = email.split('@')[0];
      const capitalizedName = nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1);
      userData = { name: capitalizedName, role: "masyarakat", email: email };
    }

    if (userData) {
      setUser(userData);
      localStorage.setItem("user_data", JSON.stringify(userData));
      return true;
    }
    return false;
  };

  // 9. Logika Logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user_data");
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider value={{ 
      user, login, logout, 
      reports, addReport, deleteReport, 
      donations, addDonation, totalDonationAmount 
    }}>
      {children}
    </AuthContext.Provider>
  );
};