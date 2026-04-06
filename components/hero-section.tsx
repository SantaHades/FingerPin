"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Play } from "lucide-react"

export function HeroSection() {
  const [isVideoOpen, setIsVideoOpen] = useState(false)

  return (
    <>
      <section className="relative pt-[216px] pb-16">
        <div className="max-w-[1060px] mx-auto px-4">
          <div className="flex flex-col items-center gap-12">
            {/* Hero Content */}
            <div className="max-w-[937px] flex flex-col items-center gap-3">
              <div className="flex flex-col items-center gap-6">
                <h1 className="max-w-[748px] text-center text-[#37322f] text-5xl md:text-[80px] font-normal leading-tight md:leading-[96px] font-serif">
                  Effortless custom contract billing by Brillance
                </h1>
                <p className="max-w-[506px] text-center text-[#37322f]/80 text-lg font-medium leading-7">
                  Streamline your billing process with seamless automation for every custom contract, tailored by
                  Brillance.
                </p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button className="h-10 px-12 bg-[#37322f] hover:bg-[#37322f]/90 text-white rounded-full font-medium text-sm shadow-[0px_0px_0px_2.5px_rgba(255,255,255,0.08)_inset]">
                Start for free
              </Button>
              <Button
                onClick={() => setIsVideoOpen(true)}
                variant="outline"
                className="h-10 px-8 border border-[#37322f]/20 hover:border-[#37322f]/40 text-[#37322f] rounded-full font-medium text-sm flex items-center gap-2"
              >
                <Play className="w-4 h-4 fill-current" />
                데모영상보기
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      <Dialog open={isVideoOpen} onOpenChange={setIsVideoOpen}>
        <DialogContent className="max-w-3xl w-full aspect-video p-0 border-0">
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/YHD97dRLyds"
            title="Demo Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded-lg"
          />
        </DialogContent>
      </Dialog>
    </>
  )
}
