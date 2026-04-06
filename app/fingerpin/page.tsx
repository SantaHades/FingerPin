"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Check, X, Zap, Target, Gift, TrendingUp, Shield, Leaf, Users, Clock, ArrowRight, ChevronDown, ChevronUp, Receipt, Smartphone, Server, MousePointer, Award, BarChart3, DollarSign, Building2, ShoppingCart, Brain, Lock, Sparkles, Menu, X as CloseIcon, Play } from "lucide-react"
import { Dialog, DialogContent } from "@/components/ui/dialog"

function Badge({ icon, text, variant = "default" }: { icon: React.ReactNode; text: string; variant?: "default" | "primary" | "success" }) {
  const variants = {
    default: "bg-white text-[#37322F] border-[rgba(2,6,23,0.08)]",
    primary: "bg-[#0066FF]/10 text-[#0066FF] border-[#0066FF]/20",
    success: "bg-emerald-50 text-emerald-600 border-emerald-200"
  }
  return (
    <div className={`px-[14px] py-[6px] shadow-[0px_0px_0px_4px_rgba(55,50,47,0.05)] overflow-hidden rounded-[90px] flex justify-start items-center gap-[8px] border shadow-xs ${variants[variant]}`}>
      <div className="w-[14px] h-[14px] relative overflow-hidden flex items-center justify-center">{icon}</div>
      <div className="text-center flex justify-center flex-col text-xs font-medium leading-3 font-sans">{text}</div>
    </div>
  )
}

function StatCard({ value, label, icon }: { value: string; label: string; icon: React.ReactNode }) {
  return (
    <div className="flex-1 p-6 bg-white rounded-2xl border border-[rgba(55,50,47,0.08)] flex flex-col items-center gap-3 hover:shadow-lg transition-shadow">
      <div className="w-12 h-12 rounded-full bg-[#0066FF]/10 flex items-center justify-center text-[#0066FF]">{icon}</div>
      <div className="text-center">
        <div className="text-3xl md:text-4xl font-bold text-[#37322F] font-sans">{value}</div>
        <div className="text-sm text-[#605A57] mt-1">{label}</div>
      </div>
    </div>
  )
}

function ProblemCard({ number, title, description }: { number: string; title: string; description: string }) {
  return (
    <div className="flex-1 p-6 bg-white/50 rounded-xl border border-[rgba(55,50,47,0.08)] hover:bg-white hover:shadow-md transition-all">
      <div className="w-10 h-10 rounded-full bg-[#FF6B6B]/10 flex items-center justify-center mb-4">
        <span className="text-[#FF6B6B] font-bold text-lg">{number}</span>
      </div>
      <h4 className="text-lg font-semibold text-[#37322F] mb-2">{title}</h4>
      <p className="text-sm text-[#605A57] leading-relaxed">{description}</p>
    </div>
  )
}

function FlowStep({ step, title, description, icon, isLast = false }: { step: number; title: string; description: string; icon: React.ReactNode; isLast?: boolean }) {
  return (
    <div className="flex flex-col items-center text-center relative">
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#0066FF] to-[#0052CC] flex items-center justify-center text-white shadow-lg mb-4">{icon}</div>
      <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#37322F] text-white text-xs font-bold flex items-center justify-center">{step}</div>
      <h4 className="text-base font-semibold text-[#37322F] mb-2">{title}</h4>
      <p className="text-sm text-[#605A57] leading-relaxed max-w-[140px]">{description}</p>
      {!isLast && <div className="hidden lg:block absolute top-8 -right-8 w-8"><ArrowRight className="w-5 h-5 text-[#0066FF]/30" /></div>}
    </div>
  )
}

function ComparisonRow({ feature, googleAds, fingerpin }: { feature: string; googleAds: string | boolean; fingerpin: string | boolean }) {
  return (
    <div className="grid grid-cols-3 gap-4 py-4 border-b border-[rgba(55,50,47,0.08)] last:border-b-0">
      <div className="font-medium text-[#37322F] text-sm md:text-base">{feature}</div>
      <div className="text-center">{typeof googleAds === "boolean" ? (googleAds ? <Check className="w-5 h-5 text-green-500 mx-auto" /> : <X className="w-5 h-5 text-red-400 mx-auto" />) : (<span className="text-[#605A57] text-xs md:text-sm">{googleAds}</span>)}</div>
      <div className="text-center">{typeof fingerpin === "boolean" ? (fingerpin ? <Check className="w-5 h-5 text-green-500 mx-auto" /> : <X className="w-5 h-5 text-red-400 mx-auto" />) : (<span className="text-[#0066FF] font-semibold text-xs md:text-sm">{fingerpin}</span>)}</div>
    </div>
  )
}

function RevenueCard({ title, clicks, revenue, annual, isHighlighted = false }: { title: string; clicks: string; revenue: string; annual: string; isHighlighted?: boolean }) {
  return (
    <div className={`flex-1 p-6 rounded-2xl border ${isHighlighted ? "bg-gradient-to-br from-[#0066FF] to-[#0052CC] text-white border-transparent shadow-xl md:scale-105" : "bg-white border-[rgba(55,50,47,0.08)]"} transition-all hover:shadow-lg`}>
      <div className={`text-sm font-medium mb-4 ${isHighlighted ? "text-white/80" : "text-[#605A57]"}`}>{title}</div>
      <div className="space-y-3">
        <div><div className={`text-xs ${isHighlighted ? "text-white/60" : "text-[#828387]"}`}>월 광고 클릭</div><div className={`text-xl font-bold ${isHighlighted ? "text-white" : "text-[#37322F]"}`}>{clicks}</div></div>
        <div><div className={`text-xs ${isHighlighted ? "text-white/60" : "text-[#828387]"}`}>월 유통업체 수익</div><div className={`text-xl font-bold ${isHighlighted ? "text-white" : "text-[#37322F]"}`}>{revenue}</div></div>
        <div className="pt-3 border-t border-current/10"><div className={`text-xs ${isHighlighted ? "text-white/60" : "text-[#828387]"}`}>연간 순수익</div><div className={`text-2xl font-bold ${isHighlighted ? "text-white" : "text-[#0066FF]"}`}>{annual}</div></div>
      </div>
    </div>
  )
}

function ESGCard({ letter, title, description, icon }: { letter: string; title: string; description: string; icon: React.ReactNode }) {
  const colors: Record<string, { bg: string; text: string; iconColor: string }> = {
    E: { bg: "bg-emerald-50", text: "text-emerald-600", iconColor: "text-emerald-500" },
    S: { bg: "bg-blue-50", text: "text-blue-600", iconColor: "text-blue-500" },
    G: { bg: "bg-purple-50", text: "text-purple-600", iconColor: "text-purple-500" }
  }
  return (
    <div className="flex-1 p-6 bg-white rounded-2xl border border-[rgba(55,50,47,0.08)] hover:shadow-lg transition-all">
      <div className={`w-12 h-12 rounded-xl ${colors[letter].bg} flex items-center justify-center mb-4`}><span className={`text-2xl font-bold ${colors[letter].text}`}>{letter}</span></div>
      <div className="flex items-center gap-2 mb-2"><div className={colors[letter].iconColor}>{icon}</div><h4 className="text-lg font-semibold text-[#37322F]">{title}</h4></div>
      <p className="text-sm text-[#605A57] leading-relaxed">{description}</p>
    </div>
  )
}

function FAQItem({ question, answer, isOpen, onClick }: { question: string; answer: string; isOpen: boolean; onClick: () => void }) {
  return (
    <div className="border-b border-[rgba(55,50,47,0.08)] last:border-b-0">
      <button className="w-full py-5 flex items-center justify-between text-left hover:bg-gray-50/50 transition-colors" onClick={onClick}>
        <span className="font-medium text-[#37322F] pr-4">{question}</span>
        {isOpen ? <ChevronUp className="w-5 h-5 text-[#605A57] flex-shrink-0" /> : <ChevronDown className="w-5 h-5 text-[#605A57] flex-shrink-0" />}
      </button>
      {isOpen && <div className="pb-5 pr-8"><p className="text-[#605A57] leading-relaxed">{answer}</p></div>}
    </div>
  )
}

export default function FingerPinLandingPage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(0)
  const [isVisible, setIsVisible] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isVideoOpen, setIsVideoOpen] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleDownloadPdf = () => {
    fetch("/FingerPin_전자영수증_키워드_클릭_광고_제안서.pdf")
      .then(res => res.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = "FingerPin_전자영수증_키워드_클릭_광고_제안서.pdf"
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        window.URL.revokeObjectURL(url)
      })
  }

  const faqData = [
    { question: "FingerPin 도입에 별도 시스템 개발이 필요한가요?", answer: "아니요, FingerPin은 기존 POS 및 전자영수증 시스템과 API 연동만으로 즉시 도입 가능합니다. 별도의 앱 설치나 시스템 개발 없이 빠르게 서비스를 시작할 수 있습니다." },
    { question: "광고 수익은 어떻게 배분되나요?", answer: "광고주가 지불하는 CPC 비용 중 일정 비율이 유통업체에 수익으로 배분됩니다. 월별 정산을 통해 투명하게 수익을 확인하실 수 있습니다." },
    { question: "고객 개인정보는 안전한가요?", answer: "FingerPin은 구매 데이터를 익명화하여 처리하며, 개인정보보호법을 완벽히 준수합니다. 고객의 개인정보는 수집하지 않고 구매 패턴만 분석합니다." },
    { question: "어떤 종류의 광고가 노출되나요?", answer: "고객의 실제 구매 데이터를 기반으로 광고주가 공개입찰로 구매한 키워드에 맵핑된 광고만 노출됩니다. 스팸성 광고나 부적절한 콘텐츠는 철저히 차단됩니다." },
    { question: "도입 후 효과를 얼마나 빨리 볼 수 있나요?", answer: "도입 즉시 광고 노출이 시작되며, 일반적으로 1개월 내에 유의미한 클릭 데이터와 수익을 확인하실 수 있습니다." }
  ]

  return (
    <div className="min-h-screen bg-[#FAFAF9] font-sans">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-[rgba(55,50,47,0.08)]">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0066FF] to-[#0052CC] flex items-center justify-center">
              <Receipt className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-[#37322F]">FingerPin</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#solution" className="text-sm text-[#605A57] hover:text-[#37322F] transition-colors">솔루션</a>
            <a href="#benefits" className="text-sm text-[#605A57] hover:text-[#37322F] transition-colors">기대효과</a>
            <a href="#pricing" className="text-sm text-[#605A57] hover:text-[#37322F] transition-colors">수익모델</a>
            <a href="#faq" className="text-sm text-[#605A57] hover:text-[#37322F] transition-colors">FAQ</a>
          </nav>
          <div className="hidden md:flex items-center gap-4">
            <a href="mailto:timson@daum.net?subject=[FingerPin] 도입 문의" className="px-5 py-2.5 bg-[#0066FF] text-white text-sm font-medium rounded-lg hover:bg-[#0052CC] transition-colors shadow-sm">도입 문의</a>
          </div>
          <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <CloseIcon className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-[rgba(55,50,47,0.08)] px-4 py-4">
            <nav className="flex flex-col gap-4">
              <a href="#solution" className="text-sm text-[#605A57]" onClick={() => setMobileMenuOpen(false)}>솔루션</a>
              <a href="#benefits" className="text-sm text-[#605A57]" onClick={() => setMobileMenuOpen(false)}>기대효과</a>
              <a href="#pricing" className="text-sm text-[#605A57]" onClick={() => setMobileMenuOpen(false)}>수익모델</a>
              <a href="#faq" className="text-sm text-[#605A57]" onClick={() => setMobileMenuOpen(false)}>FAQ</a>
              <a href="mailto:timson@daum.net?subject=[FingerPin] 도입 문의" className="w-full px-5 py-2.5 bg-[#0066FF] text-white text-sm font-medium rounded-lg text-center">도입 문의</a>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 md:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0066FF]/5 to-transparent pointer-events-none" />
        <div className={`max-w-5xl mx-auto relative z-10 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            {/* 텍스트 영역 */}
            <div className="flex-1 text-center lg:text-left">
              <div className="flex justify-center lg:justify-start mb-6">
                <Badge icon={<Sparkles className="w-3.5 h-3.5" />} text="리테일 미디어 혁신" variant="primary" />
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#37322F] mb-6 leading-tight text-balance">
                전자영수증이<br className="md:hidden" /> <span className="text-[#0066FF]">광고 매체</span>가 됩니다
              </h1>
              <p className="text-lg md:text-xl text-[#605A57] mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed text-pretty">
                구매 직후 가장 높은 관심을 가진 순간,<br />
                나노타겟팅 키워드 광고로 새로운 수익을 창출하세요
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button onClick={handleDownloadPdf} className="px-8 py-4 bg-white text-[#37322F] font-medium rounded-xl border border-[rgba(55,50,47,0.15)] hover:border-[#0066FF] hover:text-[#0066FF] transition-all">
                  서비스 소개서 다운로드
                </button>
                <button 
                  onClick={() => setIsVideoOpen(true)}
                  className="px-8 py-4 bg-[#0066FF] text-white font-medium rounded-xl border border-[#0066FF] hover:bg-[#0052CC] transition-all flex items-center justify-center gap-2"
                >
                  <Play className="w-4 h-4 fill-current" />
                  데모영상보기
                </button>
              </div>
            </div>
            {/* 데모 이미지 영역 */}
            <div className={`flex-shrink-0 relative transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
              <div className="absolute -inset-4 bg-gradient-to-br from-[#0066FF]/20 via-[#0066FF]/10 to-transparent rounded-[2rem] blur-2xl" />
              <div className="relative">
                <img
                  src="/hero-demo.jpg"
                  alt="FingerPin 영수증 키워드 광고 데모 - 스마트폰에서 전자영수증과 맞춤 광고가 표시되는 화면"
                  className="w-[280px] md:w-[320px] lg:w-[360px] h-auto rounded-2xl shadow-2xl border border-white/50"
                  style={{ filter: "drop-shadow(0 25px 50px rgba(0, 102, 255, 0.15))" }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 md:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <StatCard value="CTR 8%" label="평균 클릭률" icon={<MousePointer className="w-6 h-6" />} />
            <StatCard value="1.2억" label="연간 예상 수익" icon={<TrendingUp className="w-6 h-6" />} />
            <StatCard value="30초" label="골든타임 활용" icon={<Clock className="w-6 h-6" />} />
            <StatCard value="100%" label="종이영수증 절감" icon={<Leaf className="w-6 h-6" />} />
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section id="solution" className="py-20 px-4 md:px-8 bg-gradient-to-b from-[#FAFAF9] to-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <Badge icon={<X className="w-3.5 h-3.5 text-[#FF6B6B]" />} text="기존 리테일 미디어의 한계" />
            <h2 className="text-3xl md:text-4xl font-bold text-[#37322F] mt-6 mb-4">왜 기존 광고는 효과가 없을까요?</h2>
            <p className="text-[#605A57] max-w-2xl mx-auto">리테일 미디어 시장은 급성장하지만, 기존 방식에는 명확한 한계가 있습니다</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <ProblemCard number="1" title="불분명한 타겟팅" description="넓은 범위의 타겟팅으로 실제 구매 의향이 있는 고객에게 도달하기 어렵습니다" />
            <ProblemCard number="2" title="광고 피로도" description="무분별한 팝업과 배너로 고객 경험이 저하되고 광고 효과가 감소합니다" />
            <ProblemCard number="3" title="측정의 어려움" description="실제 구매 전환과 광고 효과를 정확히 측정하기 어렵습니다" />
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 px-4 md:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <Badge icon={<Target className="w-3.5 h-3.5" />} text="FingerPin 솔루션" variant="primary" />
            <h2 className="text-3xl md:text-4xl font-bold text-[#37322F] mt-6 mb-4">나노타겟팅으로 정확한 고객에게</h2>
            <p className="text-[#605A57] max-w-2xl mx-auto">실제 구매 데이터 기반으로 가장 관련성 높은 광고만 노출합니다</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <div className="flex gap-4 p-5 bg-[#FAFAF9] rounded-xl">
                <div className="w-12 h-12 rounded-xl bg-[#0066FF]/10 flex items-center justify-center flex-shrink-0">
                  <Brain className="w-6 h-6 text-[#0066FF]" />
                </div>
                <div>
                  <h4 className="font-semibold text-[#37322F] mb-1">구매 기반 타겟팅</h4>
                  <p className="text-sm text-[#605A57]">실제 구매 품목과 카테고리를 분석하여 관련 광고만 매칭</p>
                </div>
              </div>
              <div className="flex gap-4 p-5 bg-[#FAFAF9] rounded-xl">
                <div className="w-12 h-12 rounded-xl bg-[#0066FF]/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-[#0066FF]" />
                </div>
                <div>
                  <h4 className="font-semibold text-[#37322F] mb-1">골든타임 활용</h4>
                  <p className="text-sm text-[#605A57]">구매 직후 30초, 고객 관심도가 가장 높은 순간 노출</p>
                </div>
              </div>
              <div className="flex gap-4 p-5 bg-[#FAFAF9] rounded-xl">
                <div className="w-12 h-12 rounded-xl bg-[#0066FF]/10 flex items-center justify-center flex-shrink-0">
                  <Gift className="w-6 h-6 text-[#0066FF]" />
                </div>
                <div>
                  <h4 className="font-semibold text-[#37322F] mb-1">혜택 기반 광고</h4>
                  <p className="text-sm text-[#605A57]">쿠폰, 적립금 등 실질적 혜택과 함께 자연스러운 광고 경험</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-[#0066FF]/5 to-[#0066FF]/10 rounded-2xl p-8 border border-[#0066FF]/10">
                <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
                  <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                    <Receipt className="w-5 h-5 text-[#0066FF]" />
                    <span className="font-medium text-[#37322F]">전자영수증</span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between"><span className="text-[#605A57]">코카콜라 500ml</span><span className="text-[#37322F]">1,800원</span></div>
                    <div className="flex justify-between"><span className="text-[#605A57]">새우깡</span><span className="text-[#37322F]">1,500원</span></div>
                    <div className="flex justify-between"><span className="text-[#605A57]">삼각김밥</span><span className="text-[#37322F]">1,200원</span></div>
                  </div>
                  <div className="pt-4 border-t border-gray-100">
                    <div className="bg-gradient-to-r from-[#0066FF]/10 to-[#0066FF]/5 rounded-lg p-4 border border-[#0066FF]/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Sparkles className="w-4 h-4 text-[#0066FF]" />
                        <span className="text-xs font-medium text-[#0066FF]">맞춤 추천</span>
                      </div>
                      <p className="text-sm font-medium text-[#37322F]">펩시 제로 500ml 20% 할인</p>
                      <p className="text-xs text-[#605A57] mt-1">지금 클릭하면 쿠폰 즉시 발급!</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Flow Section */}
      <section className="py-20 px-4 md:px-8 bg-[#FAFAF9]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge icon={<Zap className="w-3.5 h-3.5" />} text="서비스 Flow" variant="primary" />
            <h2 className="text-3xl md:text-4xl font-bold text-[#37322F] mt-6 mb-4">간단한 5단계로 작동합니다</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-4">
            <FlowStep step={1} title="구매 완료" description="고객 결제 완료" icon={<ShoppingCart className="w-7 h-7" />} />
            <FlowStep step={2} title="영수증 발급" description="전자영수증 자동 생성" icon={<Receipt className="w-7 h-7" />} />
            <FlowStep step={3} title="키워드 매칭" description="구매 품목 분석" icon={<Target className="w-7 h-7" />} />
            <FlowStep step={4} title="광고 노출" description="맞춤 광고 표시" icon={<Smartphone className="w-7 h-7" />} />
            <FlowStep step={5} title="수익 창출" description="클릭당 수익 발생" icon={<DollarSign className="w-7 h-7" />} isLast />
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section id="benefits" className="py-20 px-4 md:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Badge icon={<BarChart3 className="w-3.5 h-3.5" />} text="비교 분석" variant="primary" />
            <h2 className="text-3xl md:text-4xl font-bold text-[#37322F] mt-6 mb-4">FingerPin vs 기존 광고</h2>
          </div>
          <div className="bg-white rounded-2xl border border-[rgba(55,50,47,0.08)] p-6 md:p-8 shadow-sm">
            <div className="grid grid-cols-3 gap-4 pb-4 border-b-2 border-[#37322F]">
              <div className="font-bold text-[#37322F]">비교 항목</div>
              <div className="text-center font-bold text-[#605A57]">기존 광고</div>
              <div className="text-center font-bold text-[#0066FF]">FingerPin</div>
            </div>
            <ComparisonRow feature="타겟팅 정확도" googleAds="관심사 기반" fingerpin="실구매 기반" />
            <ComparisonRow feature="평균 CTR" googleAds="0.5~2%" fingerpin="5~8%" />
            <ComparisonRow feature="광고 맥락" googleAds="랜덤 노출" fingerpin="구매 맥락" />
            <ComparisonRow feature="고객 경험" googleAds="광고 피로" fingerpin="혜택 제공" />
            <ComparisonRow feature="개인정보 수집" googleAds={true} fingerpin={false} />
            <ComparisonRow feature="도입 복잡도" googleAds="SDK 설치 필요" fingerpin="API 연동만" />
          </div>
        </div>
      </section>

      {/* Revenue Section */}
      <section id="pricing" className="py-20 px-4 md:px-8 bg-gradient-to-b from-[#FAFAF9] to-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <Badge icon={<TrendingUp className="w-3.5 h-3.5" />} text="수익 시뮬레이션" variant="success" />
            <h2 className="text-3xl md:text-4xl font-bold text-[#37322F] mt-6 mb-4">예상 수익을 확인하세요</h2>
            <p className="text-[#605A57]">일 영수증 발급 건수 기준 (CPC 100원, CTR 5% 가정)</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <RevenueCard title="소형 매장 (1,000건/일)" clicks="1,500회" revenue="150,000원" annual="1,800만원" />
            <RevenueCard title="중형 매장 (10,000건/일)" clicks="15,000회" revenue="1,500,000원" annual="1.8억원" isHighlighted />
            <RevenueCard title="대형 유통 (100,000건/일)" clicks="150,000회" revenue="15,000,000원" annual="18억원" />
          </div>
          <p className="text-center text-sm text-[#828387] mt-8">* 실제 수익은 업종, 광고주 현황 등에 따라 달라질 수 있습니다</p>
        </div>
      </section>

      {/* ESG Section */}
      <section className="py-20 px-4 md:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <Badge icon={<Leaf className="w-3.5 h-3.5" />} text="ESG 혁신" variant="success" />
            <h2 className="text-3xl md:text-4xl font-bold text-[#37322F] mt-6 mb-4">환경과 사회에 기여합니다</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <ESGCard letter="E" title="환경 (Environment)" description="종이 영수증 100% 절감으로 연간 수십만 그루의 나무를 보호합니다" icon={<Leaf className="w-5 h-5" />} />
            <ESGCard letter="S" title="사회 (Social)" description="고객에게 실질적 혜택을 제공하고 더 나은 쇼핑 경험을 만듭니다" icon={<Users className="w-5 h-5" />} />
            <ESGCard letter="G" title="지배구조 (Governance)" description="투명한 데이터 처리와 개인정보보호법 100% 준수" icon={<Shield className="w-5 h-5" />} />
          </div>
        </div>
      </section>

      {/* Easy Integration Section */}
      <section className="py-20 px-4 md:px-8 bg-[#FAFAF9]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <Badge icon={<Server className="w-3.5 h-3.5" />} text="간편한 도입" variant="primary" />
            <h2 className="text-3xl md:text-4xl font-bold text-[#37322F] mt-6 mb-4">복잡한 개발 없이 바로 시작</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-white rounded-2xl border border-[rgba(55,50,47,0.08)] text-center">
              <div className="w-16 h-16 rounded-full bg-[#0066FF]/10 flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-[#0066FF]" />
              </div>
              <h4 className="font-semibold text-[#37322F] mb-2">별도 앱 불필요</h4>
              <p className="text-sm text-[#605A57]">고객이 별도 앱을 설치할 필요 없이 기존 전자영수증에서 바로 작동</p>
            </div>
            <div className="p-6 bg-white rounded-2xl border border-[rgba(55,50,47,0.08)] text-center">
              <div className="w-16 h-16 rounded-full bg-[#0066FF]/10 flex items-center justify-center mx-auto mb-4">
                <Server className="w-8 h-8 text-[#0066FF]" />
              </div>
              <h4 className="font-semibold text-[#37322F] mb-2">API 연동만</h4>
              <p className="text-sm text-[#605A57]">기존 POS 시스템에 간단한 API 연동으로 즉시 서비스 시작</p>
            </div>
            <div className="p-6 bg-white rounded-2xl border border-[rgba(55,50,47,0.08)] text-center">
              <div className="w-16 h-16 rounded-full bg-[#0066FF]/10 flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-[#0066FF]" />
              </div>
              <h4 className="font-semibold text-[#37322F] mb-2">전담 지원</h4>
              <p className="text-sm text-[#605A57]">도입부터 운영까지 전담 매니저가 밀착 지원</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 px-4 md:px-8 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <Badge icon={<Building2 className="w-3.5 h-3.5" />} text="자주 묻는 질문" />
            <h2 className="text-3xl md:text-4xl font-bold text-[#37322F] mt-6 mb-4">궁금한 점이 있으신가요?</h2>
          </div>
          <div className="bg-white rounded-2xl border border-[rgba(55,50,47,0.08)] p-6 md:p-8">
            {faqData.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={openFAQ === index}
                onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 md:px-8 bg-gradient-to-br from-[#0066FF] to-[#0052CC]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">지금 바로 새로운 수익을 시작하세요</h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">FingerPin과 함께라면 전자영수증이 강력한 수익 채널이 됩니다.  도입 문의를 통해 예상 수익을 확인해 보세요.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={handleDownloadPdf} className="px-8 py-4 bg-transparent text-white font-medium rounded-xl border-2 border-white/30 hover:border-white/60 transition-all">
              서비스 소개서 다운로드
            </button>
            <button 
              onClick={() => setIsVideoOpen(true)}
              className="px-8 py-4 bg-white text-[#0066FF] font-medium rounded-xl hover:bg-white/90 transition-all flex items-center justify-center gap-2"
            >
              <Play className="w-4 h-4 fill-current" />
              데모영상보기
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 md:px-8 bg-[#37322F]">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                  <Receipt className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">FingerPin</span>
              </div>
              <p className="text-white/60 text-sm max-w-xs">전자영수증 키워드 광고 플랫폼으로 리테일 미디어의 새로운 가능성을 열어갑니다.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h4 className="text-white font-medium mb-3">서비스</h4>
                <ul className="space-y-2 text-white/60 text-sm">
                  <li><a href="#" className="hover:text-white transition-colors">솔루션 소개</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">수익 시뮬레이션</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">도입 사례</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-medium mb-3">회사</h4>
                <ul className="space-y-2 text-white/60 text-sm">
                  <li><a href="#" className="hover:text-white transition-colors">회사 소개</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">채용</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">블로그</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-medium mb-3">문의</h4>
                <ul className="space-y-2 text-white/60 text-sm">
                  <li><a href="mailto:timson@daum.net?subject=[FingerPin] 도입 문의" className="hover:text-white transition-colors">도입 문의</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">파트너십</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">고객 지원</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/40 text-sm">&copy; 2026 FingerPin. All rights reserved.</p>
            <div className="flex gap-6 text-white/40 text-sm">
              <a href="#" className="hover:text-white transition-colors">개인정보처리방침</a>
              <a href="#" className="hover:text-white transition-colors">이용약관</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Video Modal */}
      <Dialog open={isVideoOpen} onOpenChange={setIsVideoOpen}>
        <DialogContent className="max-w-3xl w-full aspect-video p-0 border-0">
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/YHD97dRLyds"
            title="FingerPin 데모 영상"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded-lg"
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}
