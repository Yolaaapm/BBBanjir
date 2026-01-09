import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  // 1. Inisialisasi State User
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user_data");
    const token = localStorage.getItem("token");

    if (token) {
      try {
        return jwtDecode(token);
      } catch (err) {
        localStorage.removeItem("token");
      }
    }
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // 2. Inisialisasi State Laporan (Mendukung data Koordinat)
  const [reports, setReports] = useState(() => {
    const savedReports = localStorage.getItem("flood_reports");
    return savedReports ? JSON.parse(savedReports) : [];
  });

  const [donations, setDonations] = useState(() => {
    const savedDonations = localStorage.getItem("flood_donations");
    return savedDonations ? JSON.parse(savedDonations) : [];
  });

  // Sinkronisasi ke LocalStorage
  useEffect(() => {
    localStorage.setItem("flood_reports", JSON.stringify(reports));
  }, [reports]);

  useEffect(() => {
    localStorage.setItem("flood_donations", JSON.stringify(donations));
  }, [donations]);

  // 5. Fungsi Manajemen Laporan (Mendukung Koordinat Peta)
  const addReport = (newReport, reporterName) => {
    const timestamp = Date.now();
    
    const reportData = {
      ...newReport,
      id: `${timestamp}-${Math.random().toString(36).substr(2, 9)}`,
      reporter: reporterName || "Anonim",
      date: new Date().toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
      createdAt: timestamp 
    };

    setReports((prevReports) => {
      // Proteksi Double Submit berdasarkan lokasi dan waktu
      const isDuplicate = prevReports.some(r => 
        r.lokasi === reportData.lokasi && 
        (timestamp - r.createdAt) < 2000 
      );

      if (isDuplicate) return prevReports;
      return [reportData, ...prevReports];
    });
  };

  const deleteReport = (id) => {
    setReports((prevReports) => prevReports.filter((report) => report.id !== id));
  };

  const addDonation = (amount, donorName) => {
    const donationData = {
      id: Date.now(),
      amount: parseInt(amount),
      donor: donorName || "Anonim",
      date: new Date().toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    };
    setDonations((prev) => [donationData, ...prev]);
  };

  const totalDonationAmount = donations.reduce((acc, curr) => acc + curr.amount, 0);

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