import React, { useState, useContext } from "react";
import MainLayout from "../components/Layouts/MainLayout";
import Card from "../components/Elements/Card";
import Button from "../components/Elements/Button";
import { AuthContext } from "../context/authContext";

const DonationPage = () => {
  const { user, addDonation, totalDonationAmount } = useContext(AuthContext);
  
  const targetAmount = 100000000; 
  const [selectedAmount, setSelectedAmount] = useState(0);
  const [customAmount, setCustomAmount] = useState("");
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const progress = (totalDonationAmount / targetAmount) * 100;

  const handleDonationSubmit = (e) => {
    e.preventDefault();
    const finalAmount = customAmount ? parseInt(customAmount) : selectedAmount;

    if (finalAmount <= 0) {
      alert("Silakan pilih atau masukkan nominal donasi yang valid.");
      return;
    }

    // Konfirmasi Donasi
    const confirmDonation = window.confirm(
      `Apakah Anda yakin ingin berdonasi sebesar Rp ${finalAmount.toLocaleString("id-ID")}?`
    );

    if (confirmDonation) {
      setIsLoading(true);
      
      // Simulasi loading proses transaksi
      setTimeout(() => {
        addDonation(finalAmount, user?.name || "Masyarakat"); 
        
        setStatus(`Terima kasih ${user?.name || "Dermawan"}! Donasi sebesar Rp ${finalAmount.toLocaleString("id-ID")} berhasil diproses.`);
        
        setSelectedAmount(0);
        setCustomAmount("");
        setIsLoading(false);

        // Scroll ke atas agar notifikasi terlihat
        window.scrollTo({ top: 0, behavior: 'smooth' });

        setTimeout(() => setStatus(""), 5000);
      }, 1500);
    }
  };

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto space-y-6 pb-10">
        {/* Notifikasi Berhasil */}
        {status && (
          <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-xl shadow-md animate-in fade-in slide-in-from-top duration-500">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-bold text-green-800 uppercase tracking-tight">{status}</p>
              </div>
            </div>
          </div>
        )}

        <Card
          title="Donasi Kemanusiaan Banjir"
          desc={
            <div className="p-4">
              <div className="flex flex-col md:flex-row justify-between items-end mb-6">
                <div className="w-full md:w-auto">
                  <h3 className="text-gray-500 text-xs uppercase font-black tracking-widest mb-1">Dana Terkumpul</h3>
                  <div className="text-4xl md:text-5xl font-black text-slate-800">
                    <span className="text-2xl mr-1 text-slate-400">Rp</span>
                    {totalDonationAmount.toLocaleString("id-ID")}
                  </div>
                </div>
                <div className="text-right mt-4 md:mt-0 w-full md:w-auto">
                  <span className="text-blue-600 font-black text-2xl">{Math.min(progress, 100).toFixed(1)}%</span>
                  <p className="text-gray-400 text-[10px] font-bold uppercase tracking-tighter">Target: Rp {targetAmount.toLocaleString("id-ID")}</p>
                </div>
              </div>

              {/* Progress Bar Dinamis */}
              <div className="w-full bg-slate-100 rounded-full h-5 mb-8 overflow-hidden shadow-inner p-1">
                <div 
                  className="bg-gradient-to-r from-green-400 to-green-600 h-full rounded-full transition-all duration-1000 ease-out shadow-lg" 
                  style={{ width: `${Math.min(progress, 100)}%` }}
                ></div>
              </div>

              <form onSubmit={handleDonationSubmit} className="space-y-8">
                {/* Pilihan Nominal Cepat */}
                <div>
                  <label className="block font-black text-slate-600 uppercase text-xs tracking-widest mb-4 text-center">Pilih Nominal Cepat</label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[20000, 50000, 100000].map((amount) => (
                      <button 
                        key={amount} 
                        type="button"
                        disabled={isLoading}
                        onClick={() => {
                          setSelectedAmount(amount);
                          setCustomAmount("");
                        }}
                        className={`group relative border-2 p-5 rounded-2xl transition-all duration-300 font-black text-xl overflow-hidden ${
                          selectedAmount === amount 
                          ? "bg-blue-600 border-blue-600 text-white shadow-xl scale-105" 
                          : "border-slate-100 text-slate-400 hover:border-blue-400 hover:text-blue-600 bg-white"
                        }`}
                      >
                        <span className="relative z-10">Rp {amount.toLocaleString("id-ID")}</span>
                        {selectedAmount === amount && (
                           <div className="absolute inset-0 bg-white/10 animate-pulse"></div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="relative flex items-center py-2">
                    <div className="flex-grow border-t border-slate-200"></div>
                    <span className="flex-shrink mx-4 text-slate-400 text-[10px] font-bold uppercase tracking-widest">Atau</span>
                    <div className="flex-grow border-t border-slate-200"></div>
                </div>

                {/* Input Nominal Kustom */}
                <div className="flex flex-col gap-3">
                  <label className="font-black text-slate-600 uppercase text-xs tracking-widest">Masukkan Nominal Lain</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <span className="text-slate-400 font-bold">Rp</span>
                    </div>
                    <input 
                      type="number" 
                      disabled={isLoading}
                      className="w-full border-2 border-slate-100 p-5 pl-12 rounded-2xl focus:ring-4 ring-blue-50 focus:border-blue-500 outline-none font-black text-2xl transition-all bg-slate-50 focus:bg-white"
                      placeholder="0"
                      value={customAmount}
                      onChange={(e) => {
                        setCustomAmount(e.target.value);
                        setSelectedAmount(0);
                      }}
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  disabled={isLoading}
                  variant={`${isLoading ? "bg-slate-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"} w-full text-lg py-6 rounded-2xl font-black shadow-2xl shadow-blue-200 uppercase tracking-widest flex items-center justify-center gap-3 transition-all`}
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sedang Memproses...
                    </>
                  ) : (
                    "Proses Donasi Sekarang"
                  )}
                </Button>
                <p className="text-center text-slate-400 text-[10px] font-bold uppercase tracking-tighter">Setiap rupiah sangat berarti bagi mereka yang terdampak.</p>
              </form>
            </div>
          }
        />
      </div>
    </MainLayout>
  );
};

export default DonationPage;