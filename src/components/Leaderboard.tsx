import { motion, useInView } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { pilots } from '../data'
import { motionTokens, springs } from '../lib/motion'
import { formatLap } from '../lib/track'
import { Container, SectionHeading } from './ui'

type Pilot = (typeof pilots)[number]

const LAP_FLOOR = 40.5
const byTime = (a: Pilot, b: Pilot) => a.time - b.time
const initialBoard = [...pilots].sort(byTime)

// Simulated live timing: every few seconds someone sets a faster lap and the rows re-order
export function Leaderboard() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { amount: 0.3 })
  const [board, setBoard] = useState(initialBoard)
  const [improved, setImproved] = useState<number | null>(null)
  const boardRef = useRef(board)

  useEffect(() => {
    boardRef.current = board
  }, [board])

  useEffect(() => {
    if (!inView) return
    const id = window.setInterval(() => {
      const current = boardRef.current
      const pilot = current[1 + Math.floor(Math.random() * (current.length - 1))]
      const time = Number((pilot.time - (0.15 + Math.random() * 0.45)).toFixed(3))
      if (time < LAP_FLOOR) {
        setBoard(initialBoard)
        setImproved(null)
        return
      }
      setBoard(current.map((p) => (p.id === pilot.id ? { ...p, time } : p)).sort(byTime))
      setImproved(pilot.id)
    }, motionTokens.loop.leaderboard * 1000)
    return () => window.clearInterval(id)
  }, [inView])

  const leader = board[0].time

  return (
    <section id="leaderboard" className="bg-carbon py-16 lg:py-24" aria-labelledby="leaderboard-title">
      <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <SectionHeading
            id="leaderboard-title"
            eyebrow="Рекорды недели"
            title="Таблица лучших кругов"
            intro="Обновляется после каждого заезда. Попадите в восьмёрку — и ваше имя увидит весь клуб."
          />
          <p className="mt-6 inline-flex items-center gap-2 rounded-full bg-signal/15 px-3 py-1.5 text-sm font-bold text-signal">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full rounded-full bg-signal opacity-75 motion-safe:animate-ping" />
              <span className="relative inline-flex size-2 rounded-full bg-signal" />
            </span>
            LIVE · демо-данные
          </p>
        </div>

        <div ref={ref}>
          <ol className="grid gap-2" aria-live="off">
            {board.map((pilot, index) => {
              const gap = pilot.time - leader
              return (
                <motion.li
                  key={pilot.id}
                  layout
                  transition={springs.gentle}
                  className={`grid grid-cols-[2.25rem_1fr_auto] items-center gap-3 rounded-xl px-4 py-3 transition-colors sm:grid-cols-[2.5rem_1fr_7rem_5.5rem] sm:gap-4 ${
                    pilot.id === improved ? 'bg-volt/15 ring-1 ring-volt/60' : 'bg-asphalt'
                  }`}
                >
                  <span className={`font-display text-xl ${index === 0 ? 'text-volt' : 'text-mist'}`}>{index + 1}</span>
                  <span className="min-w-0">
                    <span className="flex items-baseline gap-2">
                      <span className="truncate font-semibold">{pilot.name}</span>
                      <span className="text-xs text-mist">карт №{pilot.kart}</span>
                    </span>
                    <span className="mt-1.5 block h-1 overflow-hidden rounded-full bg-steel">
                      <motion.span
                        className="block h-full origin-left rounded-full bg-volt"
                        initial={false}
                        animate={{ scaleX: Math.max(0.08, 1 - gap / 3) }}
                        transition={springs.snappy}
                      />
                    </span>
                  </span>
                  <span className="text-right font-display tabular-nums">{formatLap(pilot.time)}</span>
                  <span className="hidden text-right text-sm tabular-nums text-mist sm:block">
                    {index === 0 ? 'лидер' : `+${gap.toFixed(3)}`}
                  </span>
                </motion.li>
              )
            })}
          </ol>
        </div>
      </Container>
    </section>
  )
}
