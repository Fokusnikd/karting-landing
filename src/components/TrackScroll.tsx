import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { pilots, sectors } from '../data'
import { motionTokens } from '../lib/motion'
import { TRACK_PATH, TRACK_VIEWBOX, formatLap } from '../lib/track'
import { KartSprite, TrackBase } from './Kart'
import { Container, SectionHeading } from './ui'

const recordLap = pilots[0].time

// Scroll-driven lap: the racing line draws and the kart drives as the page scrolls
export function TrackScroll() {
  const sectionRef = useRef<HTMLElement>(null)
  const pathRef = useRef<SVGPathElement>(null)
  const kartRef = useRef<SVGGElement>(null)
  const reduce = useReducedMotion()
  const [active, setActive] = useState(0)
  const [markers, setMarkers] = useState<{ x: number; y: number }[]>([])

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] })
  const lapTime = useTransform(scrollYProgress, (v) => formatLap(v * recordLap))

  const placeKart = (progress: number) => {
    const path = pathRef.current
    const kart = kartRef.current
    if (!path || !kart) return
    const total = path.getTotalLength()
    const at = Math.min(Math.max(progress, 0), 0.999) * total
    const point = path.getPointAtLength(at)
    const ahead = path.getPointAtLength((at + 2) % total)
    const angle = (Math.atan2(ahead.y - point.y, ahead.x - point.x) * 180) / Math.PI
    kart.setAttribute('transform', `translate(${point.x} ${point.y}) rotate(${angle})`)
  }

  useEffect(() => {
    const path = pathRef.current
    if (!path) return
    const total = path.getTotalLength()
    setMarkers(sectors.map((sector) => path.getPointAtLength(sector.at * total)))
    placeKart(reduce ? sectors[0].at : scrollYProgress.get())
    // placeKart only touches refs, so it is safe to leave out of the deps
  }, [reduce, scrollYProgress])

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    if (reduce) return
    placeKart(v)
    setActive(Math.max(0, sectors.findLastIndex((sector) => v >= sector.at - 0.02)))
  })

  return (
    <section
      id="track"
      ref={sectionRef}
      aria-labelledby="track-title"
      className={reduce ? 'py-16 lg:py-24' : 'relative h-[280vh]'}
    >
      <div className={reduce ? '' : 'sticky top-0 flex h-svh items-center overflow-hidden pt-16'}>
        <Container className="grid items-center gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
          <div>
            <SectionHeading
              id="track-title"
              eyebrow="Трасса"
              title="Один круг за 41 секунду"
              intro="Листайте вниз — и проедьте круг вместе с рекордсменом клуба."
            />
            <ol className="mt-6 grid gap-2 lg:mt-10">
              {sectors.map((sector, index) => {
                const isActive = reduce || index === active
                return (
                  <motion.li
                    key={sector.name}
                    animate={{ opacity: isActive ? 1 : 0.35 }}
                    transition={{ duration: motionTokens.duration.fast }}
                    className={`${index === active ? 'block' : 'hidden lg:block'} rounded-xl border-l-4 py-2 pl-4 ${
                      isActive ? 'border-volt' : 'border-chalk/10'
                    }`}
                  >
                    <p className="font-display uppercase">
                      <span className="text-volt">{index + 1}.</span> {sector.name}
                    </p>
                    <p className="mt-1 text-sm text-mist">{sector.text}</p>
                  </motion.li>
                )
              })}
            </ol>
          </div>

          <div className="relative">
            <svg
              viewBox={TRACK_VIEWBOX}
              className="mx-auto max-h-[44svh] w-full lg:max-h-[72svh]"
              role="img"
              aria-label="Трасса с четырьмя секторами"
            >
              <TrackBase idPrefix="scroll" />
              <path ref={pathRef} d={TRACK_PATH} fill="none" stroke="none" />
              <motion.path
                d={TRACK_PATH}
                fill="none"
                stroke="#ffd400"
                strokeWidth={4}
                strokeLinecap="round"
                style={{ pathLength: reduce ? 1 : scrollYProgress }}
              />
              {markers.map((point, index) => (
                <g key={index} transform={`translate(${point.x} ${point.y})`}>
                  <circle r="13" fill={index <= active || reduce ? '#ffd400' : '#24272d'} stroke="#0d0e10" strokeWidth="3" />
                  <text
                    y="5"
                    textAnchor="middle"
                    fontFamily="Russo One, sans-serif"
                    fontSize="14"
                    fill={index <= active || reduce ? '#0d0e10' : '#f4f4f1'}
                  >
                    {index + 1}
                  </text>
                </g>
              ))}
              <g ref={kartRef}>
                <g transform="scale(1.4)">
                  <KartSprite />
                </g>
              </g>
            </svg>

            {!reduce && (
              <div className="mt-3 inline-block rounded-xl border border-chalk/10 bg-carbon/90 px-4 py-2 backdrop-blur lg:absolute lg:top-0 lg:left-0 lg:mt-0">
                <p className="text-xs font-semibold uppercase tracking-wider text-mist">Время круга</p>
                <motion.p className="font-display text-2xl tabular-nums text-volt">{lapTime}</motion.p>
              </div>
            )}
          </div>
        </Container>
      </div>
    </section>
  )
}
