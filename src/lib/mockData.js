export const peakHoursData = [
  { time: "08:00 AM", load: 22 },
  { time: "09:00 AM", load: 32 },
  { time: "10:00 AM", load: 48 },
  { time: "11:00 AM", load: 75 },
  { time: "12:00 PM", load: 92 },
  { time: "01:00 PM", load: 70 },
  { time: "02:00 PM", load: 55 },
  { time: "03:00 PM", load: 60 },
  { time: "04:00 PM", load: 35 },
];

export const averageDensity = [
  { day: "Monday", percent: 68 },
  { day: "Tuesday", percent: 72 },
  { day: "Wednesday", percent: 85 },
  { day: "Thursday", percent: 42, lowest: true },
  { day: "Friday", percent: 60 },
];

export const keyInsights = {
  waitTimeSaved: "12 mins",
  mostVisited: { name: "Kantin Borju", loyalty: "8.4/10" },
  criticalPeak: {
    canteen: "Kantin Sipil",
    time: "12:15 PM",
    note: "Usually reaches 100% capacity at",
  },
};

export const canteenList = [
  { id: "borju", name: "Kantin Borju" },
  { id: "sipil", name: "Kantin Sipil" },
  { id: "gku",   name: "Kantin GKU Timur" },
];

export const canteenDetails = {
  borju: {
    name: "Kantin Borju",
    location: "Labtek V",
    hours: "08.00–17.00",
    inLine: 12,
    statusTone: "success",
    status: "Low Flow",
    waitMins: 8,
    histogram: [25, 35, 80, 45, 25],
    histogramActive: 2,
    menus: ["Menu Makan", "Daftar Menu", "Special"],
  },
  sipil: {
    name: "Kantin Sipil",
    location: "Gedung Sipil",
    hours: "08.00–16.00",
    inLine: 54,
    statusTone: "danger",
    status: "Peak Now",
    waitMins: 10,
    histogram: [55, 65, 90, 70, 60],
    histogramActive: 2,
    menus: ["Menu Makan", "Daftar Menu", "Minuman"],
  },
  gku: {
    name: "Kantin GKU Timur",
    location: "GKU Timur",
    hours: "08.00–17.00",
    inLine: 20,
    statusTone: "neutral",
    status: "Moderate",
    waitMins: 14,
    histogram: [10, 18, 35, 22, 12],
    histogramActive: 2,
    menus: ["Menu Makan", "Daftar Menu", "Snack"],
  },
};

export const profile = {
  name: "Matthew Sebastian Kurniawan",
  studentId: "18223096",
  major: "Information Systems and Technology - ITB",
};

export const initialPreferences = [
  { id: "sipil", name: "Kantin Sipil", icon: "utensils", enabled: true },
  { id: "gku", name: "Kantin GKU Timur", icon: "landmark", enabled: true },
];
