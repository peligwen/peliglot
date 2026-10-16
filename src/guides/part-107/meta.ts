import type { GuideMeta, CategoryColors } from '../../types/guide';

export const guidesMeta: GuideMeta[] = [
  { id: 1, title: "How the Test Works", subtitle: "60 questions, 70%, five areas", cat: "The Test", color: "#37474F", icon: "🎯" },
  { id: 2, title: "Registration & Marking", subtitle: "Part 48, the 0.55 lb line, labels", cat: "Regulations", color: "#C62828", icon: "🏷️" },
  { id: 3, title: "Your Remote Pilot Certificate", subtitle: "Eligibility, recency, ramp checks", cat: "Regulations", color: "#B71C1C", icon: "🪪" },
  { id: 4, title: "Operating Limits", subtitle: "400 ft, 87 knots, 3 SM, clouds", cat: "Regulations", color: "#C62828", icon: "📏" },
  { id: 5, title: "Flying Over People & Vehicles", subtitle: "Categories 1–4, sustained flight", cat: "Regulations", color: "#B71C1C", icon: "🚶" },
  { id: 6, title: "Remote ID", subtitle: "Part 89: standard, module, FRIA", cat: "Regulations", color: "#C62828", icon: "📡" },
  { id: 7, title: "Waivers & Authorizations", subtitle: "What 107.205 lets you bend", cat: "Regulations", color: "#B71C1C", icon: "📝" },
  { id: 8, title: "Accidents & Emergencies", subtitle: "107.9, 107.21, the 10-day report", cat: "Regulations", color: "#C62828", icon: "🚨" },
  { id: 9, title: "Airspace Classes", subtitle: "A through G, who needs permission", cat: "Airspace", color: "#1565C0", icon: "🗺️" },
  { id: 10, title: "Reading the Sectional", subtitle: "Symbols, colors, airport data", cat: "Airspace", color: "#0D47A1", icon: "🧭" },
  { id: 11, title: "Lat/Long, Zulu & Chart Math", subtitle: "Coordinates, MSL vs AGL, UTC", cat: "Airspace", color: "#1565C0", icon: "📐" },
  { id: 12, title: "Special Use Airspace & TFRs", subtitle: "Prohibited, restricted, MOAs, stadiums", cat: "Airspace", color: "#0D47A1", icon: "⛔" },
  { id: 13, title: "NOTAMs & LAANC", subtitle: "Grid ceilings, DroneZone, timing", cat: "Airspace", color: "#1565C0", icon: "🛂" },
  { id: 14, title: "The Chart Supplement", subtitle: "Tower hours, frequencies, remarks", cat: "Airspace", color: "#0D47A1", icon: "📖" },
  { id: 15, title: "The Atmosphere & Wind", subtitle: "Pressure, lapse rate, highs & lows", cat: "Weather", color: "#00838F", icon: "🌬️" },
  { id: 16, title: "Stability, Moisture & Clouds", subtitle: "Dew point, cloud families, bases", cat: "Weather", color: "#006064", icon: "☁️" },
  { id: 17, title: "Fog & Fronts", subtitle: "Six fogs, four fronts", cat: "Weather", color: "#00838F", icon: "🌫️" },
  { id: 18, title: "Thunderstorms, Shear & Icing", subtitle: "Stages, microbursts, wake turbulence", cat: "Weather", color: "#006064", icon: "⛈️" },
  { id: 19, title: "Decoding METARs", subtitle: "Wind, visibility, sky, temp, altimeter", cat: "Weather", color: "#00838F", icon: "📋" },
  { id: 20, title: "TAFs & Forecast Products", subtitle: "FM, TEMPO, AIRMETs, SIGMETs", cat: "Weather", color: "#006064", icon: "🔮" },
  { id: 21, title: "Density Altitude", subtitle: "Hot, high, humid = weak", cat: "Weather", color: "#00838F", icon: "🌡️" },
  { id: 22, title: "Weight, Balance & CG", subtitle: "Moments, arms, payload", cat: "Loading & Performance", color: "#EF6C00", icon: "⚖️" },
  { id: 23, title: "Load Factor & Maneuvering", subtitle: "Bank angle, G, stall speed", cat: "Loading & Performance", color: "#E65100", icon: "🔄" },
  { id: 24, title: "Batteries & Maintenance", subtitle: "LiPo care, preflight, 107.49", cat: "Loading & Performance", color: "#EF6C00", icon: "🔋" },
  { id: 25, title: "Crew Roles & CRM", subtitle: "RPIC, visual observer, who may fly", cat: "Operations", color: "#2E7D32", icon: "👥" },
  { id: 26, title: "ADM & Hazardous Attitudes", subtitle: "DECIDE, PAVE, IMSAFE, antidotes", cat: "Operations", color: "#1B5E20", icon: "🧠" },
  { id: 27, title: "Physiology & Vision", subtitle: "Alcohol, fatigue, night vision", cat: "Operations", color: "#2E7D32", icon: "👁️" },
  { id: 28, title: "Airport Operations", subtitle: "Runways, patterns, wind indicators", cat: "Operations", color: "#1B5E20", icon: "🛫" },
  { id: 29, title: "Radio Phraseology", subtitle: "CTAF, phonetics, listening in", cat: "Operations", color: "#2E7D32", icon: "📻" },
  { id: 30, title: "Emergencies & Lost Link", subtitle: "RTH, flyaways, interference", cat: "Operations", color: "#1B5E20", icon: "🆘" },
  { id: 31, title: "Night Operations", subtitle: "Civil twilight, anti-collision lights", cat: "Operations", color: "#2E7D32", icon: "🌙" },
  { id: 32, title: "Sectional Chart Workout", subtitle: "A practice figure, six questions", cat: "Test Prep", color: "#6A1B9A", icon: "🔍" },
  { id: 33, title: "Practice Exam", subtitle: "60 questions, 2 hours, 70% to pass", cat: "Test Prep", color: "#4A148C", icon: "🏁" },
  { id: 34, title: "Exam Day & After", subtitle: "FTN, PSI, IACRA, recurrent training", cat: "Test Prep", color: "#6A1B9A", icon: "🎓" },
];

export const categories: string[] = [
  "The Test", "Regulations", "Airspace", "Weather", "Loading & Performance", "Operations", "Test Prep",
];

export const catColors: CategoryColors = {
  "The Test": "#37474F",
  "Regulations": "#C62828",
  "Airspace": "#1565C0",
  "Weather": "#00838F",
  "Loading & Performance": "#EF6C00",
  "Operations": "#2E7D32",
  "Test Prep": "#6A1B9A",
};
