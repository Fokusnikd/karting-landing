import { animate, motion, useInView, useMotionValue, useReducedMotion, useTransform } from 'motion/react'
import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'
import { motionTokens, springs } from '../lib/motion'
import { Icon } from './Icon'

const buttonBase =
  'inline-flex items-center justify-center gap-2 rounded-xl font-display uppercase tracking-wide transition-colors focus-visible:outline-2 focus-visible:outline-offset-4'

export const buttonPrimary = `${buttonBase} bg-volt px-6 py-4 text-asphalt hover:bg-volt-dark focus-visible:outline-volt`

export const buttonPrimarySmall = `${buttonBase} bg-volt px-4 py-2.5 text-sm text-asphalt hover:bg-volt-dark focus-visible:outline-volt`

export const buttonGhost = `${buttonBase} border-2 border-chalk/20 px-6 py-4 text-chalk hover:border-chalk/50 focus-visible:outline-chalk`

export function Container({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl px-4 sm:px-6 ${className}`}>{children}</div>
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  intro,
}: {
  id: string
  eyebrow: string
  title: string
  intro?: string
}) {
  return (
    <div className="max-w-2xl">
      <p className="flex items-center gap-3 text-sm font-bold uppercase tracking-[0.2em] text-volt">
        <span className="h-0.5 w-8 bg-volt" />
        {eyebrow}
      </p>
      <h2 id={id} className="mt-4 font-display text-[1.65rem] uppercase leading-tight break-words sm:text-[2rem] lg:text-5xl">
        {title}
      </h2>
      {intro && <p className="mt-5 text-base leading-relaxed text-mist sm:text-lg">{intro}</p>}
    </div>
  )
}

export function Logo() {
  return (
    <span className="flex items-center gap-3">
      <span className="grid size-10 place-items-center rounded-lg bg-volt text-asphalt">
        <Icon name="turnRight" className="size-6" />
      </span>
      <span className="font-display text-sm uppercase leading-tight">
        Поворот
        <br />
        <span className="text-volt">направо</span>
      </span>
    </span>
  )
}

// Fades content up once it scrolls into view
export function Reveal({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: motionTokens.distance.lg }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        y: { ...springs.gentle, delay },
        opacity: { duration: motionTokens.duration.normal, delay },
      }}
    >
      {children}
    </motion.div>
  )
}

// Counts up from zero the first time the number becomes visible
export function Counter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const reduce = useReducedMotion()
  const current = useMotionValue(0)
  const text = useTransform(current, (v) => `${Math.round(v).toLocaleString('ru-RU')}${suffix}`)

  useEffect(() => {
    if (!inView) return
    if (reduce) {
      current.set(value)
      return
    }
    const controls = animate(current, value, {
      duration: motionTokens.duration.crawl * 1.6,
      ease: motionTokens.easing.smooth,
    })
    return () => controls.stop()
  }, [inView, reduce, value, current])

  return <motion.span ref={ref}>{text}</motion.span>
}

export function Marquee({ items }: { items: string[] }) {
  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((item) => (
        <li key={item} className="flex items-center gap-6 px-6 font-display text-xl uppercase sm:text-2xl">
          {item}
          <Icon name="bolt" className="size-5" />
        </li>
      ))}
    </ul>
  )

  return (
    <div className="overflow-hidden py-8">
      <div className="-mx-[5%] -rotate-2 border-y-4 border-asphalt bg-volt py-3 text-asphalt">
        <div className="flex w-max motion-safe:animate-marquee">
          {row(false)}
          {row(true)}
        </div>
      </div>
    </div>
  )
}
