import { club, faq, navItems } from '../data'
import { Icon } from './Icon'
import type { IconName } from './Icon'
import { Container, Logo, Reveal, SectionHeading } from './ui'

const contacts: { icon: IconName; label: string; value: string; href?: string }[] = [
  { icon: 'mapPin', label: 'Адрес', value: club.address },
  { icon: 'clock', label: 'Часы работы', value: club.hours },
  { icon: 'phone', label: 'Телефон', value: club.phone, href: club.phoneHref },
]

export function Footer() {
  return (
    <>
      <section id="faq" className="py-16 lg:py-24" aria-labelledby="faq-title">
        <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading id="faq-title" eyebrow="Вопросы" title="Перед первым заездом" />
          <div className="grid gap-3">
            {faq.map((item) => (
              <details
                key={item.q}
                className="group rounded-2xl border border-chalk/10 bg-carbon px-6 open:border-volt/50"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-lg font-semibold [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <Icon name="chevronDown" className="size-5 shrink-0 text-volt transition group-open:rotate-180" />
                </summary>
                <p className="pb-6 text-mist">{item.a}</p>
              </details>
            ))}
          </div>
        </Container>
      </section>

      <section id="contacts" className="pb-16 lg:pb-24" aria-labelledby="contacts-title">
        <Container>
          <Reveal className="grid gap-6 rounded-3xl bg-volt p-6 text-asphalt sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <h2 id="contacts-title" className="font-display text-3xl uppercase sm:text-4xl">
                Ждём на старте
              </h2>
              <ul className="mt-6 grid gap-4 sm:grid-cols-3">
                {contacts.map((item) => (
                  <li key={item.label} className="flex items-start gap-3">
                    <Icon name={item.icon} className="mt-0.5 size-5 shrink-0" />
                    <span>
                      <span className="block text-sm font-semibold opacity-70">{item.label}</span>
                      {item.href ? (
                        <a href={item.href} className="font-semibold underline-offset-4 hover:underline">
                          {item.value}
                        </a>
                      ) : (
                        <span className="font-semibold">{item.value}</span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <a
              href="#booking"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-asphalt px-6 py-4 font-display uppercase tracking-wide text-volt transition-colors hover:bg-carbon focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-asphalt"
            >
              Записаться
              <Icon name="arrowRight" className="size-5" />
            </a>
          </Reveal>
        </Container>
      </section>

      <footer className="border-t border-chalk/10 py-10">
        <Container className="grid gap-6 md:grid-cols-[auto_1fr] md:items-center">
          <Logo />
          <nav aria-label="Навигация в подвале" className="md:justify-self-end">
            <ul className="flex flex-wrap gap-x-6 gap-y-3 font-semibold text-mist">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="hover:text-chalk">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <p className="text-sm text-mist md:col-span-2">
            © 2026 «{club.name}». Демо-проект для портфолио: клуб вымышленный, имена и время кругов придуманы, заявки
            никуда не отправляются.
          </p>
        </Container>
      </footer>
    </>
  )
}
