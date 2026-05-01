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

export const mapPins = [
  { id: "borju", name: "Kantin Borju", x: 0.42, y: 0.45 },
  { id: "gkub", name: "Kantin GKUB 1", x: 0.55, y: 0.32 },
  { id: "sipil", name: "Kantin Sipil", x: 0.32, y: 0.58 },
  { id: "gku", name: "Kantin GKU Timur", x: 0.66, y: 0.62 },
  { id: "labtek", name: "Labtek V", x: 0.5, y: 0.74 },
];

export const mapDetail = {
  name: "Kantin Borju",
  location: "Labtek V",
  hours: "08.00-17.00",
  inLine: 12,
  status: "Low Flow",
  waitMins: 8,
  histogram: [25, 35, 80, 45, 25],
  histogramActive: 2,
  menus: ["Menu Makan", "Daftar Menu", "Special"],
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

export const initialNotifications = [
  { id: "crowd", title: "Crowd Level Alerts", enabled: true },
  { id: "peak", title: "Peak Hour Warnings", enabled: false },
];
