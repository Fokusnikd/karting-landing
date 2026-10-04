import { motion, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'
import { heroStats } from '../data'
import { motionTokens, pressable, springs } from '../lib/motion'
import { TRACK_PATH, TRACK_VIEWBOX } from '../lib/track'
import { Icon } from './Icon'
import { KartSprite, TrackBase } from './Kart'
import { Container, Counter, buttonGhost, buttonPrimary } from './ui'

const headline = [
  [{ text: 'Жми' }, { text: 'на' }, { text: 'газ.' }],
  [{ text: 'Поворачивай' }],
  [{ text: 'направо.', accent: true }],
]

export function Hero() {
  let wordIndex = 0

  return (
    <section id="top" className="relative overflow-hidden pt-28 pb-12 sm:pt-32 lg:pt-36 lg:pb-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(115deg,transparent_0_26px,rgba(255,255,255,0.035)_26px_28px)] [mask-image:linear-gradient(90deg,transparent,#000_35%,#000_65%,transparent)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 right-[-10%] size-[34rem] rounded-full bg-volt/10 blur-3xl"
      />

      <Container className="relative grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <motion.p
            className="inline-flex items-center gap-2 rounded-full border border-chalk/15 bg-carbon px-4 py-2 text-sm font-semibold"
            initial={{ opacity: 0, y: motionTokens.distance.sm }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: motionTokens.duration.normal, ease: motionTokens.easing.smooth }}
          >
            <span className="size-2 rounded-full bg-volt" />
            Крытый картодром в Москве
          </motion.p>

          <h1 className="mt-6 font-display text-[2.5rem] uppercase leading-[0.95] sm:text-6xl lg:text-[4.1rem]">
            {headline.map((line, lineIndex) => (
              <span key={lineIndex} className="block">
                {line.map((word, i) => {
                  const delay = wordIndex++ * motionTokens.stagger
                  return (
                    <motion.span
                      key={word.text}
                      className={`inline-block ${'accent' in word ? 'text-volt' : ''}`}
                      initial={{ opacity: 0, x: -motionTokens.distance.xl, skewX: -14 }}
                      animate={{ opacity: 1, x: 0, skewX: 0 }}
                      transition={{ ...springs.snappy, delay }}
                    >
                      {word.text}
                      {i < line.length - 1 && ' '}
                    </motion.span>
                  )
                })}
              </span>
            ))}
          </h1>

          <motion.p
            className="mt-6 max-w-xl text-lg text-mist"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: motionTokens.duration.slow, delay: 0.4 }}
          >
            820 метров трассы, электронный хронометраж и карты, которые разгоняются до 60 км/ч. От регистрации до старта —
            15 минут.
          </motion.p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <motion.a href="#booking" className={buttonPrimary} {...pressable}>
              Забронировать заезд
              <Icon name="arrowRight" className="size-5" />
            </motion.a>
            <motion.a href="#pricing" className={buttonGhost} {...pressable}>
              Тарифы
            </motion.a>
          </div>

          <dl className="mt-12 grid max-w-xl grid-cols-3 gap-4 border-t border-chalk/10 pt-8">
            {heroStats.map((stat) => (
              <div key={stat.label} className="flex flex-col-reverse justify-end">
                <dt className="mt-1 text-sm text-mist">{stat.label}</dt>
                <dd className="font-display text-2xl whitespace-nowrap text-chalk sm:text-4xl">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <HeroTrack />
      </Container>
    </section>
  )
}

const karts = [
  { body: '#ffd400', helmet: '#f4f4f1', begin: '0s', still: 'translate(250 48)' },
  { body: '#ff3b30', helmet: '#ffd400', begin: '-2.6s', still: 'translate(464 215) rotate(90)' },
  { body: '#f4f4f1', helmet: '#ff3b30', begin: '-4.9s', still: 'translate(280 366) rotate(180)' },
]

function HeroTrack() {
  const reduce = useReducedMotion()

  return (
    <motion.div
      className="relative mx-auto w-full max-w-lg lg:max-w-none"
      initial={{ opacity: 0, rotate: -6, scale: 0.92 }}
      animate={{ opacity: 1, rotate: 0, scale: 1 }}
      transition={{ ...springs.gentle, delay: 0.2 }}
    >
      <svg viewBox={TRACK_VIEWBOX} className="w-full" role="img" aria-label="Схема трассы-овала: карты едут по часовой стрелке, только направо">
        <TrackBase idPrefix="hero" />
        <motion.path
          d={TRACK_PATH}
          fill="none"
          stroke="#ffd400"
          strokeWidth={3}
          strokeLinecap="round"
          initial={{ pathLength: 0.16, pathOffset: 0 }}
          animate={reduce ? undefined : { pathOffset: 1 }}
          transition={{ duration: motionTokens.loop.trail, ease: 'linear', repeat: Infinity }}
        />
        {karts.map((kart) =>
          reduce ? (
            <g key={kart.body} transform={kart.still}>
              <KartSprite body={kart.body} helmet={kart.helmet} />
            </g>
          ) : (
            <g key={kart.body}>
              <animateMotion
                dur={`${motionTokens.loop.lap}s`}
                begin={kart.begin}
                repeatCount="indefinite"
                rotate="auto"
                path={TRACK_PATH}
              />
              <KartSprite body={kart.body} helmet={kart.helmet} />
            </g>
          ),
        )}
      </svg>

      <FloatingChip className="right-[2%] top-[4%]" delay={0}>
        <Icon name="turnRight" className="size-4 text-volt" />
        Поворот направо
      </FloatingChip>
      <FloatingChip className="bottom-[2%] right-[2%]" delay={1}>
        <Icon name="turnRight" className="size-4 text-volt" />
        Опять направо
      </FloatingChip>
      <FloatingChip className="left-[12%] top-[46%]" delay={2}>
        <Icon name="turnRight" className="size-4 text-volt" />
        Да, опять направо
      </FloatingChip>
    </motion.div>
  )
}

function FloatingChip({ children, className, delay }: { children: ReactNode; className: string; delay: number }) {
  return (
    <motion.span
      className={`absolute flex items-center gap-2 rounded-full border border-chalk/15 bg-carbon/90 px-3 py-1.5 text-sm font-semibold shadow-lg backdrop-blur ${className}`}
      animate={{ y: [0, -motionTokens.distance.sm, 0] }}
      transition={{ duration: motionTokens.loop.float, repeat: Infinity, ease: 'easeInOut', delay }}
    >
      {children}
    </motion.span>
  )
}
