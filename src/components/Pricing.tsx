import { motion } from 'motion/react'
import type { Variants } from 'motion/react'
import { formats } from '../data'
import type { FormatId } from '../data'
import { motionTokens, springs } from '../lib/motion'
import { Icon } from './Icon'
import { Container, SectionHeading } from './ui'

const rub = new Intl.NumberFormat('ru-RU')

const list: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: motionTokens.stagger } },
}

const card: Variants = {
  hidden: { opacity: 0, y: motionTokens.distance.xl },
  show: { opacity: 1, y: 0, transition: springs.gentle },
}

export function Pricing({ onSelect }: { onSelect: (format: FormatId) => void }) {
  return (
    <section id="pricing" className="py-16 lg:py-24" aria-labelledby="pricing-title">
      <Container>
        <SectionHeading
          id="pricing-title"
          eyebrow="Тарифы"
          title="Выберите свой заезд"
          intro="Экипировка, инструктаж и хронометраж уже в цене. Платите только за время на трассе."
        />
        <motion.ul
          className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
          variants={list}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {formats.map((format) => (
            <motion.li
              key={format.id}
              variants={card}
              whileHover={{ y: -motionTokens.distance.sm }}
              className={`relative flex flex-col rounded-2xl p-6 ${
                format.featured ? 'bg-volt text-asphalt' : 'border border-chalk/10 bg-carbon'
              }`}
            >
              {format.featured && (
                <span className="absolute -top-3 right-5 rounded-full bg-signal px-3 py-1 text-xs font-bold uppercase tracking-wide text-chalk">
                  Хит
                </span>
              )}
              <h3 className="font-display text-2xl uppercase">{format.name}</h3>
              <p className={`mt-1 flex items-center gap-2 text-sm font-semibold ${format.featured ? '' : 'text-mist'}`}>
                <Icon name="timer" className="size-4" />
                {format.duration}
              </p>
              <p className="mt-6 font-display text-4xl">
                {format.perGroup && <span className="text-xl">от </span>}
                {rub.format(format.price)}&nbsp;₽
              </p>
              <p className={`text-sm ${format.featured ? '' : 'text-mist'}`}>
                {format.perGroup ? 'за группу' : 'за пилота'}
              </p>
              <ul className="mt-6 grid flex-1 content-start gap-2.5">
                {format.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-[15px]">
                    <Icon
                      name="check"
                      className={`mt-0.5 size-4 shrink-0 ${format.featured ? 'text-asphalt' : 'text-volt'}`}
                    />
                    {feature}
                  </li>
                ))}
              </ul>
              <motion.button
                type="button"
                onClick={() => onSelect(format.id)}
                whileTap={{ scale: motionTokens.scale.press }}
                className={`mt-8 rounded-xl px-4 py-3 font-display text-sm uppercase tracking-wide transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 ${
                  format.featured
                    ? 'bg-asphalt text-volt hover:bg-carbon focus-visible:outline-asphalt'
                    : 'bg-chalk/10 hover:bg-chalk/20 focus-visible:outline-volt'
                }`}
              >
                Выбрать
              </motion.button>
            </motion.li>
          ))}
        </motion.ul>
      </Container>
    </section>
  )
}
