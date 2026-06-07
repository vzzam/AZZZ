import { PS5_DB } from "./db";

export interface Exploit {
  name: string;
  val: string;
}

export interface AnalyzeResult {
  serial: string;
  fw: string;
  minV: number;
  model: string;
  origin: string;
  originRaw: string;
  date: string;
  status: boolean;
  exploits: Exploit[];
}

export function getExploits(v: number): Exploit[] {
  const exploits: Exploit[] = [];

  exploits.push({ name: "⏳ Lapse", val: v <= 10.01 ? "✅" : "❌" });
  exploits.push({ name: "💿 BD-JB", val: v <= 7.61 ? "✅" : (v <= 10.01 ? "🔒 (Private)" : "❌") });
  exploits.push({ name: "🎮 mast1c", val: v <= 13.20 ? "✅" : "❌" });
  exploits.push({ name: "🐍 Lua", val: v <= 13.20 ? "✅" : "❌" });
  exploits.push({ name: "☕ Y2JB", val: v <= 13.20 ? "✅" : "❌" });
  exploits.push({ name: "📺 Netflix", val: v <= 12.40 ? "✅" : "❌" });

  return exploits;
}

export function analyze(text: string): AnalyzeResult | "ERR" | null {
  text = text.toUpperCase().replace(/\s/g, "").trim();

  // strict filter: ignore if it does not start with S0
  if (!text.startsWith("S0")) {
    return null;
  }

  const match = text.match(/(S0[A-Z0-9-]{5,6})/);
  if (!match) return "ERR";

  const fullSer = match[1];

  // rule 2: extract first 8 chars ONLY
  const trimmedSer = fullSer.substring(0, 8);

  // 1. origin based on 4th character
  const char = trimmedSer.length > 4 ? trimmedSer[4] : "";
  const origins: Record<string, string> = {
    F: "China 🇨🇳",
    E: "China 🇨🇳",
    K: "Japan 🇯🇵",
    M: "Malaysia 🇲🇾",
    G: "Global 🌐",
  };
  const origin = origins[char] || "Unknown";

  // 2. convert to ref key
  let refKey = trimmedSer;
  if (/[A-Z]/.test(char)) {
    refKey = trimmedSer.substring(0, 4) + "X" + trimmedSer.substring(5);
  }

  // 3. FW DB Search
  let foundFw: string | null = null;
  const keys = Object.keys(PS5_DB).sort((a, b) => b.length - a.length);

  for (const k of keys) {
    if (refKey.startsWith(k) || trimmedSer.startsWith(k)) {
      foundFw = PS5_DB[k];
      break;
    }
  }

  if (!foundFw) return "ERR";

  let minV = 99.99;
  const fwSplit = String(foundFw).split("/")[0];
  const minVMatch = fwSplit.match(/(\d+\.\d+)/);
  if (minVMatch) minV = parseFloat(minVMatch[1]);

  // 4. Model detection
  let model = "Fat";
  if (refKey.includes("X4") || refKey.includes("X3")) model = "Slim (CFI-20)";
  else if (refKey.includes("X5")) model = "Slim (CFI-21)";
  else if (refKey.includes("X1")) model = "Pro (CFI-70)";
  else if (refKey.includes("X2")) {
    if (refKey.includes("X25")) model = "Pro (CFI-71)";
    else model = "Fat/Pro";
  }

  // 5. Production Date
  const yearChar = trimmedSer[trimmedSer.length - 2] || "";
  const prodYear = /[0-9]/.test(yearChar) ? `202${yearChar}` : "Unknown";

  const monthChar = trimmedSer[trimmedSer.length - 1] || "";
  const mMap: Record<string, string> = {
    "1": "January",
    "2": "February",
    "3": "March",
    "4": "April",
    "5": "May",
    "6": "June",
    "7": "July",
    "8": "August",
    "9": "September",
    A: "October",
    B: "November",
    C: "December",
  };
  const prodMonth = mMap[monthChar] || "Unknown";

  return {
    serial: trimmedSer,
    fw: foundFw,
    minV,
    model,
    origin,
    originRaw: char,
    date: `${prodMonth} ${prodYear}`,
    status: minV <= 11.00,
    exploits: getExploits(minV),
  };
}
