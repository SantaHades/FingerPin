import { NextResponse } from "next/server"

export async function GET() {
  const vcard = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    "N:손용석 Sohn YongSeog;;;;",
    "FN:손용석 Sohn YongSeog",
    "ORG:(주)산타하데스",
    "TITLE:CEO / 대표이사",
    "TEL;TYPE=CELL,VOICE:010-3717-9717",
    "EMAIL;TYPE=PREF,INTERNET:sys@santahades.com",
    "URL:https://www.santahades.com",
    "ADR;TYPE=WORK:;;경기도 용인시 기흥구 공세로 150-29, B01-H306호;;;;",
    "END:VCARD"
  ].join("\r\n")

  const encoder = new TextEncoder()
  const data = encoder.encode(vcard)

  return new Response(data, {
    headers: {
      "Content-Type": "text/vcard; charset=utf-8",
      "Content-Disposition": 'attachment; filename="sys_contact.vcf"',
    },
  })
}
