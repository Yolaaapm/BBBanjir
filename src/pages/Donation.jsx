import React from "react";
import MainLayout from "../components/Layouts/MainLayout";
import Card from "../components/Elements/Card";
import { donationData } from "../data/data.jsx";
import Button from "../components/Elements/Button";

const DonationPage = () => {
  const progress = (donationData.presentAmount / donationData.targetAmount) * 100;

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <Card
          title="Donasi Kemanusiaan Banjir"
          desc={
            <div className="p-4">
              <div className="flex flex-col md:flex-row justify-between items-end mb-6">
                <div>
                  <h3 className="text-gray-500 text-sm">Dana Terkumpul</h3>
                  <div className="text-4xl font-bold text-slate-800">
                    Rp {donationData.presentAmount.toLocaleString("id-ID")}
                  </div>
                </div>
                <div className="text-right mt-4 md:mt-0">
                  <span className="text-blue-600 font-bold">{progress.toFixed(1)}%</span>
                  <p className="text-gray-500 text-xs">Target: Rp {donationData.targetAmount.toLocaleString("id-ID")}</p>
                </div>
              </div>

              <div className="w-full bg-gray-100 rounded-full h-4 mb-8">
                <div 
                  className="bg-blue-600 h-4 rounded-full transition-all duration-1000" 
                  style={{ width: `${progress}%` }}
                ></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {[10000, 50000, 100000].map((amount) => (
                  <button key={amount} className="border-2 border-blue-100 p-4 rounded-xl hover:bg-blue-50 hover:border-blue-500 transition-all font-bold text-blue-600">
                    Rp {amount.toLocaleString("id-ID")}
                  </button>
                ))}
              </div>

              <Button variant="bg-blue-600 w-full text-lg py-4">Proses Donasi Sekarang</Button>
            </div>
          }
        />
      </div>
    </MainLayout>
  );
};

export default DonationPage;