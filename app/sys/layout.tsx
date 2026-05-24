import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "손용석",
  description: "(주)산타하데스 대표이사 손용석의 디지털 명함",
}

export default function SysLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
