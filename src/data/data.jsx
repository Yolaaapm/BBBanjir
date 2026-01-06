import Icon from "../components/Elements/Icon";

export const floodStatus = [
  {
    id: 1,
    name: "Kecamatan Genuk",
    status: "Bahaya",
    waterLevel: "85cm",
    lastUpdate: "10 menit yang lalu",
    icon: <Icon.Report />,
  },
  {
    id: 2,
    name: "Semarang Utara",
    status: "Waspada",
    waterLevel: "40cm",
    lastUpdate: "30 menit yang lalu",
    icon: <Icon.WaterLevel />,
  }
];

export const donationData = {
  targetAmount: 50000000,
  presentAmount: 12500000,
};

export const recentReports = [
  {
    id: 1,
    location: "Jl. Kaligawe",
    reporter: "Budi Santoso",
    status: "Terverifikasi",
    level: "60cm",
  },
  {
    id: 2,
    location: "Krobokan",
    reporter: "Siti Aminah",
    status: "Pending",
    level: "20cm",
  }
];