// NASCAR-style tri-oval in a 520×420 viewBox, driven clockwise: a convex loop, so every corner is a right-hander.
// Front stretch with a dogleg at the top, tight turns 1–2 on the right, back straight, long sweeping turns 3–4.
export const TRACK_PATH =
  'M173 59.6 L194 54.9 A300 300 0 0 1 326 54.9 L382.1 67.5 A105 105 0 0 1 464 170 L464 261 A105 105 0 0 1 359 366 L206 366 A150 150 0 0 1 56 216 L56 205.9 A150 150 0 0 1 173 59.6 Z'

export const TRACK_VIEWBOX = '0 0 520 420'

// 41.236 → "0:41.236"
export function formatLap(seconds: number) {
  const minutes = Math.floor(seconds / 60)
  const rest = (seconds - minutes * 60).toFixed(3).padStart(6, '0')
  return `${minutes}:${rest}`
}
