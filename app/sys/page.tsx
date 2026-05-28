"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { Mail, Phone, Globe, MapPin, Copy, Check, ExternalLink, Download, Maximize2, RotateCw, X, UserPlus } from "lucide-react"

export default function SysPage() {
  const [copiedText, setCopiedText] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isMobileRotated, setIsMobileRotated] = useState(true) // Rotate 90deg by default on mobile modal for readability
  const cardRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleCopy = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedText(label)
      setTimeout(() => setCopiedText(null), 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  const handleSaveContact = () => {
    const vcard = [
      "BEGIN:VCARD",
      "VERSION:3.0",
      "N:손;용석;Sohn;YongSeog;",
      "FN:손용석 Sohn YongSeog",
      "ORG:(주)산타하데스",
      "TITLE:CEO / 대표이사",
      "TEL;TYPE=CELL,VOICE:010-3717-9717",
      "EMAIL;TYPE=PREF,INTERNET:sys@santahades.com",
      "URL:https://www.santahades.com",
      "ADR;TYPE=WORK:;;경기도 용인시 기흥구 공세로 150-29, B01-H306호;;;;",
      "END:VCARD"
    ].join("\r\n");

    const blob = new Blob(["\uFEFF" + vcard], { type: "text/vcard;charset=utf-8;" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "손용석_연락처.vcf");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }

  // 3D Card Tilt Effect (Only on desktop)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // Disable 3D tilt if we are on a touch device
    if (window.matchMedia("(pointer: coarse)").matches) return

    const el = cardRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const xc = rect.width / 2
    const yc = rect.height / 2
    const tiltX = (yc - y) / 20
    const tiltY = (x - xc) / 20

    el.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`
    
    const glareX = (x / rect.width) * 100
    const glareY = (y / rect.height) * 100
    el.style.setProperty("--glare-x", `${glareX}%`)
    el.style.setProperty("--glare-y", `${glareY}%`)
    el.style.setProperty("--glare-opacity", "0.15")
  }

  const handleMouseLeave = () => {
    const el = cardRef.current
    if (!el) return
    el.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)"
    el.style.setProperty("--glare-opacity", "0")
  }

  // Prevent scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isModalOpen])

  return (
    <main 
      ref={containerRef}
      className="min-h-screen bg-[#03070C] text-[#F3F4F6] flex flex-col items-center justify-center p-4 relative overflow-x-hidden font-sans select-none selection:bg-[#00E5FF]/20 selection:text-[#00E5FF]"
    >
      {/* Dynamic glow backgrounds */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#00E5FF]/5 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none z-0" />
      
      {/* Cyber Grid Pattern Background */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, #00E5FF 1px, transparent 1px),
            linear-gradient(to bottom, #00E5FF 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px"
        }}
      />

      <div className="max-w-4xl w-full flex flex-col md:flex-row items-center gap-8 md:gap-12 z-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
        
        {/* Left Side: Interactive 3D Business Card */}
        <div className="flex-1 flex flex-col items-center justify-center w-full">
          <div 
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={() => setIsModalOpen(true)}
            className="group relative w-full aspect-[1.62] rounded-xl overflow-hidden shadow-[0_0_50px_rgba(0,229,255,0.12)] border border-[#00E5FF]/20 cursor-pointer transition-all duration-300 ease-out bg-[#070D14] hover:border-[#00E5FF]/40"
            style={{
              transformStyle: "preserve-3d",
              backgroundImage: "radial-gradient(circle at var(--glare-x, 50%) var(--glare-y, 50%), rgba(255, 255, 255, var(--glare-opacity, 0)) 0%, transparent 60%)",
            }}
          >
            {/* The Image */}
            <Image
              src="/sys.png"
              alt="SantaHades Business Card"
              fill
              priority
              className="object-cover pointer-events-none transition-transform duration-500 group-hover:scale-[1.01]"
              sizes="(max-w-760px) 100vw, 450px"
            />
            
            {/* Hover overlay with zoom icon */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
              <div className="p-3 rounded-full bg-[#00E5FF]/10 border border-[#00E5FF]/30 text-[#00E5FF] scale-90 group-hover:scale-100 transition-all duration-300 shadow-[0_0_15px_rgba(0,229,255,0.3)]">
                <Maximize2 className="h-5 w-5" />
              </div>
            </div>
            
            {/* Subtle glow border effect inside */}
            <div className="absolute inset-0 border border-transparent rounded-xl pointer-events-none transition-all duration-300" />
          </div>

          <p className="text-xs text-gray-500 mt-4 text-center select-none flex items-center gap-2">
            <span className="hidden md:inline">💡 카드를 클릭하면 크게 보거나 회전할 수 있습니다.</span>
            <span className="md:hidden">💡 명함을 터치하면 크게 보기 및 회전 모드가 열립니다.</span>
          </p>
        </div>

        {/* Right Side: Information & Quick Action Panel */}
        <div className="flex-1 w-full space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#00E5FF] animate-pulse" />
              <span className="text-xs tracking-[0.2em] font-semibold text-[#00E5FF]">VERIFIED ORIGINAL</span>
            </div>
            
            <div className="flex flex-col gap-1">
              <div className="flex items-baseline gap-3">
                <h1 className="text-3xl font-bold tracking-tight">손용석</h1>
                <span className="text-lg font-medium text-[#00E5FF]">Sohn YongSeog</span>
              </div>
              <span className="text-sm font-medium text-gray-400">CEO / 대표이사</span>
            </div>
            <p className="text-lg font-semibold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              (주)산타하데스
            </p>
          </div>

          {/* Contact Details List */}
          <div className="bg-[#0A1017]/80 backdrop-blur-md border border-white/5 rounded-xl p-5 space-y-4 shadow-xl">
            
            {/* Website */}
            <div className="flex items-center justify-between group">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-white/5 border border-white/5 text-gray-400 group-hover:text-[#00E5FF] group-hover:bg-[#00E5FF]/10 group-hover:border-[#00E5FF]/20 transition-all duration-300">
                  <Globe className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Website</p>
                  <a 
                    href="https://www.santahades.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-sm font-medium hover:text-[#00E5FF] transition-colors flex items-center gap-1"
                  >
                    www.santahades.com
                    <ExternalLink className="h-3 w-3 opacity-50 group-hover:opacity-100 transition-opacity" />
                  </a>
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center justify-between group">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-white/5 border border-white/5 text-gray-400 group-hover:text-[#00E5FF] group-hover:bg-[#00E5FF]/10 group-hover:border-[#00E5FF]/20 transition-all duration-300">
                  <Mail className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Email</p>
                  <a 
                    href="mailto:sys@santahades.com" 
                    className="text-sm font-medium hover:text-[#00E5FF] transition-colors"
                  >
                    sys@santahades.com
                  </a>
                </div>
              </div>
              <button 
                onClick={() => handleCopy("sys@santahades.com", "email")}
                className="p-1.5 rounded-md hover:bg-white/5 text-gray-400 hover:text-white transition-all active:scale-95 cursor-pointer"
                title="이메일 복사"
              >
                {copiedText === "email" ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
              </button>
            </div>

            {/* Phone */}
            <div className="flex items-center justify-between group">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-white/5 border border-white/5 text-gray-400 group-hover:text-[#00E5FF] group-hover:bg-[#00E5FF]/10 group-hover:border-[#00E5FF]/20 transition-all duration-300">
                  <Phone className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Mobile</p>
                  <a 
                    href="tel:010-3717-9717" 
                    className="text-sm font-medium hover:text-[#00E5FF] transition-colors"
                  >
                    010-3717-9717
                  </a>
                </div>
              </div>
              <button 
                onClick={() => handleCopy("010-3717-9717", "phone")}
                className="p-1.5 rounded-md hover:bg-white/5 text-gray-400 hover:text-white transition-all active:scale-95 cursor-pointer"
                title="연락처 복사"
              >
                {copiedText === "phone" ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
              </button>
            </div>

            {/* Address */}
            <div className="flex items-center justify-between group">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-white/5 border border-white/5 text-gray-400 group-hover:text-[#00E5FF] group-hover:bg-[#00E5FF]/10 group-hover:border-[#00E5FF]/20 transition-all duration-300">
                  <MapPin className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Address</p>
                  <p className="text-sm font-medium text-gray-300 leading-snug">
                    경기도 용인시 기흥구 공세로 150-29, B01-H306호
                  </p>
                </div>
              </div>
              <button 
                onClick={() => handleCopy("경기도 용인시 기흥구 공세로 150-29, B01-H306호", "address")}
                className="p-1.5 rounded-md hover:bg-white/5 text-gray-400 hover:text-white transition-all active:scale-95 shrink-0 cursor-pointer"
                title="주소 복사"
              >
                {copiedText === "address" ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
              </button>
            </div>

          </div>

          {/* Action buttons */}
          <div className="space-y-3">
            <button 
              onClick={handleSaveContact}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-[#00E5FF] text-black font-semibold text-sm hover:bg-[#00D0EB] active:scale-[0.98] transition-all cursor-pointer shadow-[0_0_20px_rgba(0,229,255,0.3)] hover:shadow-[0_0_25px_rgba(0,229,255,0.5)]"
            >
              <UserPlus className="h-4 w-4" />
              휴대폰 연락처에 등록
            </button>
            <div className="flex gap-3">
              <a 
                href="/sys.png" 
                download="SantaHades_Card.png"
                className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white text-black font-semibold text-sm hover:bg-gray-200 active:scale-[0.98] transition-all cursor-pointer"
              >
                <Download className="h-4 w-4" />
                이미지 다운로드
              </a>
              <a 
                href="/sys.png" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white/5 border border-white/10 font-semibold text-sm hover:bg-white/10 active:scale-[0.98] transition-all cursor-pointer"
              >
                <ExternalLink className="h-4 w-4" />
                원본 보기
              </a>
            </div>
          </div>

          {/* Toast Notification Alert */}
          {copiedText && (
            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 bg-emerald-500 text-white rounded-lg shadow-lg text-xs font-semibold tracking-wide animate-in fade-in slide-in-from-bottom-2 duration-300 flex items-center gap-1.5 z-50">
              <Check className="h-3.5 w-3.5" />
              클립보드에 복사되었습니다.
            </div>
          )}

        </div>

      </div>

      {/* Fullscreen Mobile-optimized Zoom & Rotate Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/95 z-50 flex flex-col justify-between p-6 animate-in fade-in duration-300">
          
          {/* Header Action Bar */}
          <div className="flex items-center justify-between w-full z-10">
            <h3 className="text-sm font-semibold tracking-wider text-gray-400">명함 자세히 보기</h3>
            <div className="flex items-center gap-3">
              {/* Rotation toggle button (visible on mobile) */}
              <button 
                onClick={() => setIsMobileRotated(!isMobileRotated)}
                className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 text-white transition-all cursor-pointer flex items-center gap-1.5 text-xs font-medium"
                title="명함 회전하기"
              >
                <RotateCw className="h-4 w-4" />
                <span className="hidden sm:inline">회전</span>
              </button>
              
              {/* Close Button */}
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 text-white transition-all cursor-pointer"
                title="닫기"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Main Visual Workspace for Card */}
          <div className="flex-1 flex items-center justify-center relative overflow-hidden my-4">
            <div 
              onClick={() => setIsMobileRotated(!isMobileRotated)}
              className={`relative transition-all duration-500 ease-out cursor-pointer ${
                isMobileRotated 
                  ? "w-[90vh] max-w-[550px] aspect-[1.62] rotate-90 sm:rotate-0 sm:scale-100 scale-[1.35] xs:scale-[1.5]" 
                  : "w-full max-w-[650px] aspect-[1.62] rotate-0 scale-100"
              }`}
            >
              <Image
                src="/sys.png"
                alt="SantaHades Business Card Zoomed"
                fill
                priority
                className="object-contain"
                sizes="100vw"
              />
            </div>
          </div>

          {/* Footer Guide Text */}
          <div className="text-center z-10">
            <p className="text-xs text-gray-400 select-none">
              {isMobileRotated 
                ? "💡 모바일 화면에 맞춰 세로로 회전된 상태입니다. 휴대폰을 가로로 눕혀서 더 크게 보시려면 우측 상단 '회전' 버튼을 누르거나 명함을 터치하세요." 
                : "💡 원본 방향 상태입니다. 화면에 꽉 차게 세로로 보시려면 우측 상단 '회전' 버튼을 누르거나 명함을 터치하세요."
              }
            </p>
          </div>

        </div>
      )}
    </main>
  )
}
