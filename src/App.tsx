import { useState } from "react";
import { analyze, AnalyzeResult } from "./utils";
import { AnimatePresence } from "motion/react";

const SectionTitle = ({ title }: { title: string }) => (
  <div className="font-display text-[13px] tracking-[3px] text-[#5a6a80] uppercase mb-5 flex items-center gap-3 after:content-[''] after:flex-1 after:h-px after:bg-[#1e2d4a]">
    {title}
  </div>
);

const ModelCard = ({ name, desc }: { name: string; desc: string }) => (
  <div className="bg-[#111827] border border-[#1e2d4a] rounded-[12px] p-4 flex items-center gap-3 transition-colors hover:border-[#0070d1]">
    <div className="text-[22px]">🎮</div>
    <div>
      <div className="font-display text-[11px] font-bold text-[#00e5ff]">{name}</div>
      <div className="text-[12px] text-[#5a6a80] mt-0.5">{desc}</div>
    </div>
  </div>
);

const StepCard = ({ num, title, desc }: { num: string; title: string; desc: React.ReactNode }) => (
  <div className="bg-[#111827] border border-[#1e2d4a] rounded-[14px] p-4 sm:p-5 text-center h-full flex flex-col">
    <div className="w-9 h-9 bg-[#0070d1] rounded-full flex items-center justify-center font-display text-[14px] font-bold mx-auto mb-3 shadow-[0_0_16px_rgba(0,112,209,0.4)] text-white shrink-0">
      {num}
    </div>
    <div className="text-[12px] sm:text-[13px] text-[#5a6a80] leading-[1.6] flex-1">
      <strong className="text-[#e8eef8] block mb-1 text-[13px] sm:text-[14px]">{title}</strong>
      {desc}
    </div>
  </div>
);

export default function App() {
  const [inputVal, setInputVal] = useState("");
  const [result, setResult] = useState<AnalyzeResult | "ERR" | "ERR_PREFIX" | "ERR_EMPTY" | null>(null);

  const handleCheck = () => {
    if (!inputVal.trim()) {
      setResult("ERR_EMPTY");
      return;
    }
    const txt = inputVal.toUpperCase().replace(/\s/g, "").trim();
    if (!txt.startsWith("S0")) {
      setResult("ERR_PREFIX");
      return;
    }
    
    const res = analyze(txt);
    if (res === "ERR" || res === null) {
      setResult("ERR");
      return;
    }
    
    setResult(res);
  };

  return (
    <div dir="ltr" className="min-h-[100dvh] flex flex-col font-sans relative selection:bg-[#0070d1]/30">
      
      {/* Background Shapes */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden text-white/[0.015] font-display font-black">
        <div className="absolute top-[10%] left-[5%] text-[120px] float-1">PS5</div>
        <div className="absolute top-[50%] right-[5%] text-[80px] float-2">JB</div>
        <div className="absolute bottom-[15%] left-[20%] text-[60px] float-3">AZ</div>
      </div>

      {/* Header */}
      <header className="relative z-10 text-center pt-[60px] px-5 pb-[30px] animate-fade-down">
        <div className="inline-flex items-center gap-4 sm:gap-5 flex-col sm:flex-row">
          <div className="w-28 h-28 sm:w-24 sm:h-24 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(0,229,255,0.3),inset_0_0_20px_rgba(0,112,209,0.4)] border-[3px] border-[#00e5ff]/40 shrink-0 relative group bg-[#060812] p-1 transition-transform duration-300 hover:scale-105">
             <div className="absolute inset-0 bg-gradient-to-tr from-[#0070d1]/20 to-[#00e5ff]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full z-10 pointer-events-none"></div>
             <img src="/logo.png" alt="PS5AZ Logo" className="w-full h-full object-cover rounded-full select-none" />
          </div>
          <div className="text-center sm:text-left">
            <h1 className="font-display text-[clamp(24px,5vw,36px)] font-black tracking-[2px] uppercase bg-clip-text text-transparent bg-gradient-to-br from-white via-[#00a8ff] to-[#00e5ff]">
              PS5AZ Jailbreak Checker
            </h1>
            <p className="text-[14px] sm:text-[15px] text-[#5a6a80] tracking-[1px] mt-2 animate-fade-down-delay">
              Instant Check · <span className="text-[#00e5ff]">Accurate</span> · Full Info
            </p>
          </div>
        </div>
      </header>

      {/* Main Checker Card */}
      <div className="relative z-10 max-w-[540px] mx-auto mb-10 px-5 animate-fade-up-1">
        <div className="bg-[#111827] border border-[#1e2d4a] rounded-[20px] py-8 px-7 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[2px] shimmer-bg"></div>
          
          <label className="text-[13px] text-[#5a6a80] uppercase tracking-[2px] mb-2.5 block text-left">
            🔍 Find your console
          </label>
          
          <div className="flex gap-2.5 mb-5 flex-col xs:flex-row shadow-lg">
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value.toUpperCase())}
              onKeyDown={(e) => e.key === "Enter" && handleCheck()}
              placeholder="S01-X44A or S01-F447..."
              className="flex-1 bg-[#0d1120] border-2 border-[#1e2d4a] rounded-xl py-3.5 px-[18px] font-display text-[16px] text-[#e8eef8] tracking-[2px] uppercase outline-none transition-colors duration-200 placeholder:text-[#5a6a80] placeholder:text-[13px] placeholder:tracking-[1px] focus:border-[#0070d1] focus:shadow-[0_0_0_3px_rgba(0,112,209,0.15)] text-left"
              dir="ltr"
              autoComplete="off"
              spellCheck="false"
            />
            <button
              onClick={handleCheck}
              className="bg-gradient-to-br from-[#0070d1] to-[#0055a0] text-white font-display font-bold text-[13px] tracking-[1px] py-3.5 px-[22px] rounded-xl shadow-[0_4px_20px_rgba(0,112,209,0.35)] transition-all hover:-translate-y-px hover:shadow-[0_6px_28px_rgba(0,170,255,0.45)] hover:from-[#00a8ff] hover:to-[#0070d1] active:translate-y-0 h-[52px] xs:h-auto cursor-pointer"
            >
              CHECK
            </button>
          </div>

          {/* Results Area */}
          <AnimatePresence mode="wait">
            {typeof result === "string" && (
              <div className="text-center p-5 text-[#ff3b5c] font-display text-[13px] bg-[#0d1120] border border-[#1e2d4a] rounded-[14px] mt-1 animate-fade-up-fast">
                {result === "ERR_EMPTY" && "⚠️ Enter a serial number first"}
                {result === "ERR_PREFIX" && "❌ The number must start with S0"}
                {result === "ERR" && "❌ Serial number not found or incorrect"}
                <p className="text-[#5a6a80] text-[13px] mt-2">Make sure you enter the number from the bottom of the box</p>
              </div>
            )}
            
            {result && typeof result === "object" && (
              <div className="bg-[#0d1120] border border-[#1e2d4a] rounded-[14px] py-[22px] px-5 mt-1 animate-fade-up-fast text-left">
                <div className="font-display text-[11px] tracking-[2px] text-[#00e5ff] uppercase mb-4 pb-2.5 border-b border-[#1e2d4a] text-left">
                  🎮 SCAN RESULT · PS5AZ CHECKER
                </div>
                
                {/* Status Badge */}
                <div className={`flex items-center gap-2 bg-[#111827] rounded-[10px] py-3 px-[18px] w-full mb-3.5 border ${result.status ? 'border-[#00ff88]/30 bg-[#00ff88]/5' : 'border-[#ff3b5c]/30 bg-[#ff3b5c]/5'}`}>
                  <div className={`w-2.5 h-2.5 rounded-full ${result.status ? 'bg-[#00ff88] shadow-[0_0_8px_#00ff88] animate-pulse' : 'bg-[#ff3b5c] shadow-[0_0_8px_#ff3b5c]'}`}></div>
                  <span className={`font-display text-[13px] font-bold ${result.status ? 'text-[#00ff88]' : 'text-[#ff3b5c]'}`}>
                    {result.status ? "SUPPORTED ✅" : "UNSUPPORTED ❌"}
                  </span>
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-[#111827] rounded-[10px] py-3 px-3.5 border border-[#1e2d4a]">
                    <div className="text-[10px] text-[#5a6a80] uppercase tracking-[1.5px] mb-1">📦 Serial</div>
                    <div className="font-display text-[12px] font-bold text-[#00e5ff] tracking-[2px] text-left">{result.serial}</div>
                  </div>
                  <div className="bg-[#111827] rounded-[10px] py-3 px-3.5 border border-[#1e2d4a]">
                    <div className="text-[10px] text-[#5a6a80] uppercase tracking-[1.5px] mb-1">🔢 Firmware</div>
                    <div className="font-display text-[14px] font-bold text-left flex items-center justify-start gap-1">
                        <span className="text-[#f5c518]">{result.fw}</span>
                    </div>
                  </div>
                  <div className="bg-[#111827] rounded-[10px] py-3 px-3.5 border border-[#1e2d4a]">
                    <div className="text-[10px] text-[#5a6a80] uppercase tracking-[1.5px] mb-1">🎮 Model</div>
                    <div className="font-display text-[12px] font-bold text-white text-left">{result.model}</div>
                  </div>
                  <div className="bg-[#111827] rounded-[10px] py-3 px-3.5 border border-[#1e2d4a]">
                    <div className="text-[10px] text-[#5a6a80] uppercase tracking-[1.5px] mb-1">🏳️ Made In</div>
                    <div className="font-display text-[12px] font-bold text-white text-left">{result.origin}</div>
                  </div>
                  <div className="col-span-2 bg-[#111827] rounded-[10px] py-3 px-3.5 border border-[#1e2d4a]">
                    <div className="text-[10px] text-[#5a6a80] uppercase tracking-[1.5px] mb-1">📅 Date of Production</div>
                    <div className="font-display text-[13px] font-bold text-white max-w-full truncate text-left">
                        {result.month} {result.year}
                    </div>
                  </div>
                </div>

                {/* Exploits Section */}
                <div className="bg-[#111827] border border-[#1e2d4a] rounded-[10px] p-3.5 mb-3.5">
                  <div className="text-[10px] text-[#5a6a80] uppercase tracking-[1.5px] mb-2.5">🔓 Exploit Availability</div>
                  {result.exploits.map((e, idx) => {
                    const isAvailable = e.val !== "❌" && e.val !== "🔒 (Private)";
                    const isPrivate = e.val === "🔒 (Private)";
                    const cls = isPrivate ? "text-[#f5c518]" : (isAvailable ? "text-[#00ff88]" : "text-[#ff3b5c]");
                    const label = isPrivate ? "🔒 Private" : (isAvailable ? "✅ Available" : "❌ N/A");

                    return (
                      <div key={idx} className="flex justify-between items-center py-1.5 border-b border-white/[0.04] text-[13px] last:border-0" dir="ltr">
                        <span className="text-[#5a6a80] flex-1 text-left">{e.name}</span>
                        <span className={`${cls}`}>{label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* How To */}
      <div className="relative z-10 max-w-[900px] mx-auto mb-12 sm:mb-16 px-5 animate-fade-up-2">
        <SectionTitle title="How to use?" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          <StepCard num="1" title="Check the Box" desc="Find the serial number at the bottom of the PS5 box" />
          <StepCard num="2" title="Copy Serial" desc={<span className="flex flex-col items-center gap-1.5 mt-1">Example:<code className="text-[#00e5ff] font-display text-[12px] px-2.5 py-1 bg-[#0d1120] rounded-md border border-[#1e2d4a] tracking-widest whitespace-nowrap" dir="ltr">S01-X44A</code></span>} />
          <StepCard num="3" title="Enter it here" desc="You will get the result instantly" />
          <StepCard num="4" title="Read Result" desc="Firmware, Model, Region, and Exploit availability" />
        </div>
      </div>

      {/* Models Database */}
      <div className="relative z-10 max-w-[900px] mx-auto mb-12 sm:mb-16 px-5 animate-fade-up-3">
        <SectionTitle title="Supported Models" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
          <ModelCard name="Fat" desc="CFI-10xx / First Gen" />
          <ModelCard name="Slim CFI-20" desc="X3 / X4 codes" />
          <ModelCard name="Slim CFI-21" desc="X5 codes" />
          <ModelCard name="Pro CFI-70" desc="X1 codes" />
          <ModelCard name="Pro CFI-71" desc="X25 codes" />
        </div>
      </div>

      {/* CTA section */}
      <div className="relative z-10 text-center max-w-[500px] mx-auto mb-12 sm:mb-16 px-5 animate-fade-up-4">
        <div className="bg-gradient-to-br from-[#0070d1]/15 to-[#00e5ff]/5 border border-[#0070d1]/40 rounded-[20px] py-8 px-6">
          <div className="font-display text-[18px] font-black mb-2.5 text-[#e8eef8]">🤖 Try the Telegram Bot</div>
          <div className="text-[14px] text-[#5a6a80] mb-5">Send the serial directly in Telegram and get the full result</div>
          <a
            href="https://t.me/PS5AZBOT"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-[10px] bg-gradient-to-br from-[#229ED9] to-[#1a7fc1] text-white py-3.5 px-7 rounded-[12px] font-display text-[13px] font-bold tracking-[1px] shadow-[0_4px_20px_rgba(34,158,217,0.35)] transition-all hover:-translate-y-[2px] hover:shadow-[0_8px_30px_rgba(34,158,217,0.5)]"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.833.94z"/>
            </svg>
            Open Bot
          </a>
        </div>
      </div>

      {/* Support section */}
      <div className="relative z-10 max-w-[500px] mx-auto mb-16 sm:mb-20 px-5 animate-fade-up-5 mt-12 sm:mt-16">
        <div className="relative rounded-[20px] p-[1px] overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-[#00e5ff]/20 via-[#0070d1]/10 to-transparent group-hover:from-[#00e5ff]/40 group-hover:to-[#0070d1]/20 transition-colors duration-500"></div>
          <div className="relative bg-[#060812]/90 backdrop-blur-xl rounded-[20px] p-6 sm:p-8 flex flex-col items-center border border-[#1e2d4a]/50">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#0070d1]/20 to-[#00e5ff]/20 border border-[#00e5ff]/30 flex items-center justify-center mb-4 text-[20px]">
              ☕
            </div>
            <div className="font-display text-[16px] xl:text-[18px] font-black mb-2 text-[#e8eef8] tracking-[1px] text-center">
              SUPPORT THE PROJECT
            </div>
            <div className="text-[13px] text-[#5a6a80] mb-6 text-center max-w-[90%]">
              If you found this tool helpful, consider supporting development.
            </div>
            
            <div className="w-full flex flex-col items-center justify-center gap-3">
              <a 
                href="https://ko-fi.com/vzzam"
                target="_blank"
                rel="noreferrer"
                className="bg-[#111827] hover:bg-[#1e2d4a]/80 border border-[#1e2d4a] text-[#e8eef8] font-bold py-3 px-6 rounded-xl transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 group w-full sm:w-auto hover:border-[#00e5ff]/50 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#0070d1]/10 to-[#00e5ff]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-70 group-hover:text-[#00e5ff] transition-colors"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
                <span className="uppercase tracking-[1px] text-[12px] sm:text-[13px] relative z-10 transition-colors">SUPPORT VIA KO-FI</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 text-center p-5 border-t border-[#1e2d4a] text-[12px] text-[#5a6a80] mt-auto">
        Made with ❤️ by <strong className="text-[#e8eef8]">AZZAM</strong> &nbsp;·&nbsp;
        Thanks to <a href="https://x.com/qtr_703?s=21" target="_blank" rel="noreferrer" className="text-[#00a8ff]">@qtr_703</a>
      </footer>

    </div>
  );
}
