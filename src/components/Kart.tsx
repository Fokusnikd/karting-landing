import { TRACK_PATH } from '../lib/track'

// Top-down kart drawn around (0, 0), nose pointing to +x so SVG `rotate="auto"` works
export function KartSprite({ body = '#ffd400', helmet = '#f4f4f1' }: { body?: string; helmet?: string }) {
  return (
    <g>
      <rect x="-14" y="-11" width="7" height="4.5" rx="1.5" fill="#050506" />
      <rect x="-14" y="6.5" width="7" height="4.5" rx="1.5" fill="#050506" />
      <rect x="6" y="-10" width="6" height="4" rx="1.5" fill="#050506" />
      <rect x="6" y="6" width="6" height="4" rx="1.5" fill="#050506" />
      <path d="M-12 -6 H6 L14 -3 V3 L6 6 H-12 Z" fill={body} />
      <rect x="13" y="-4" width="3" height="8" rx="1.5" fill="#050506" />
      <circle cx="-3" cy="0" r="4" fill={helmet} stroke="#050506" strokeWidth="1.2" />
      <path d="M-0.5 -2.2 H1.6 V2.2 H-0.5" fill="#050506" />
    </g>
  )
}

// Asphalt with red/white kerbs, dashed centre line and chequered start line
export function TrackBase({ idPrefix }: { idPrefix: string }) {
  const checker = `${idPrefix}-checker`
  return (
    <g>
      <defs>
        <pattern id={checker} width="6" height="6" patternUnits="userSpaceOnUse">
          <rect width="6" height="6" fill="#0d0e10" />
          <rect width="3" height="3" fill="#f4f4f1" />
          <rect x="3" y="3" width="3" height="3" fill="#f4f4f1" />
        </pattern>
      </defs>
      <path d={TRACK_PATH} fill="#121417" />
      <path d={TRACK_PATH} fill="none" stroke="#f4f4f1" strokeWidth={46} strokeLinejoin="round" />
      <path d={TRACK_PATH} fill="none" stroke="#ff3b30" strokeWidth={46} strokeDasharray="10 10" strokeLinejoin="round" />
      <path d={TRACK_PATH} fill="none" stroke="#2a2d33" strokeWidth={38} strokeLinejoin="round" />
      <path d={TRACK_PATH} fill="none" stroke="#f4f4f1" strokeOpacity={0.3} strokeWidth={2} strokeDasharray="8 12" />
      <rect x="178" y="38" width="12" height="38" fill={`url(#${checker})`} transform="rotate(-12.7 184 57)" />
    </g>
  )
}
