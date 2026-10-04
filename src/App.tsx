import { MotionConfig } from 'motion/react'
import { useState } from 'react'
import { Booking } from './components/Booking'
import type { BookingChoice } from './components/Booking'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Leaderboard } from './components/Leaderboard'
import { Pricing } from './components/Pricing'
import { Steps } from './components/Steps'
import { TrackScroll } from './components/TrackScroll'
import { Marquee } from './components/ui'
import { tickerItems } from './data'
import type { FormatId } from './data'

export default function App() {
  const [booking, setBooking] = useState<BookingChoice>({ format: 'race', racers: 2 })

  // Choosing a tariff pre-selects it in the booking form and scrolls there
  const selectFormat = (format: FormatId) => {
    setBooking((current) => ({ ...current, format }))
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    document.getElementById('booking')?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' })
  }

  return (
    // "user" turns off transform and layout animations for people who prefer reduced motion
    <MotionConfig reducedMotion="user">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-xl focus:bg-volt focus:px-5 focus:py-3 focus:font-semibold focus:text-asphalt"
      >
        Перейти к содержанию
      </a>
      <Header />
      <main id="main">
        <Hero />
        <Marquee items={tickerItems} />
        <Pricing onSelect={selectFormat} />
        <TrackScroll />
        <Steps />
        <Leaderboard />
        <Booking value={booking} onChange={setBooking} />
      </main>
      <Footer />
    </MotionConfig>
  )
}
