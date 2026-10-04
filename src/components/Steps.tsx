import { motion } from 'motion/react'
import { steps } from '../data'
import { motionTokens } from '../lib/motion'
import { Icon } from './Icon'
import { Container, Reveal, SectionHeading } from './ui'

export function Steps() {
  return (
    <section className="py-16 lg:py-24" aria-labelledby="steps-title">
      <Container>
        <SectionHeading id="steps-title" eyebrow="Как проходит заезд" title="От двери до финиша — 4 шага" />
        <div className="relative mt-14">
          <motion.div
            aria-hidden="true"
            className="absolute top-7 right-[12%] left-[12%] hidden h-0.5 origin-left bg-[repeating-linear-gradient(90deg,#ffd400_0_14px,transparent_14px_24px)] lg:block"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: motionTokens.duration.crawl, ease: motionTokens.easing.smooth }}
          />
          <ol className="relative grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <li key={step.title}>
                <Reveal delay={index * motionTokens.stagger * 2} className="lg:text-center">
                  <span className="relative inline-grid size-14 place-items-center rounded-2xl bg-volt text-asphalt">
                    <Icon name={step.icon} className="size-7" />
                    <span className="absolute -top-2 -right-2 grid size-6 place-items-center rounded-full bg-asphalt font-display text-xs text-volt ring-2 ring-volt">
                      {index + 1}
                    </span>
                  </span>
                  <h3 className="mt-5 font-display text-xl uppercase">{step.title}</h3>
                  <p className="mt-2 text-mist">{step.text}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  )
}
