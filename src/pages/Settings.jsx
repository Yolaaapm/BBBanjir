import React, { useContext } from "react";
import MainLayout from "../components/Layouts/MainLayout";
import Card from "../components/Elements/Card";
import { ThemeContext } from "../context/themeContext";
import Button from "../components/Elements/Button";

const SettingsPage = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  const themes = [
    { name: "theme-blue", color: "bg-blue-500", label: "Biru (Standar)" },
    { name: "theme-green", color: "bg-green-500", label: "Hijau" },
    { name: "theme-purple", color: "bg-purple-500", label: "Ungu" },
  ];

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        <Card
          title="Pengaturan Aplikasi"
          desc={
            <div className="space-y-8">
              <div>
                <h3 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">
                   Tema Aplikasi
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {themes.map((t) => (
                    <button
                      key={t.name}
                      onClick={() => setTheme({ name: t.name })}
                      className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
                        theme.name === t.name ? "border-primary bg-blue-50" : "border-gray-100 hover:border-gray-200"
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-full ${t.color}`}></div>
                      <span className="text-xs font-medium text-slate-600">{t.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-gray-100">
                <Button variant="bg-primary w-full">Simpan Perubahan</Button>
              </div>
            </div>
          }
        />
      </div>
    </MainLayout>
  );
};

export default SettingsPage;