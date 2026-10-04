import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { club, navItems } from '../data'
import { motionTokens } from '../lib/motion'
import { Icon } from './Icon'
import { Container, Logo, buttonPrimary, buttonPrimarySmall } from './ui'

export function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open])

  const close = () => setOpen(false)

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors ${
        scrolled || open ? 'bg-asphalt/85 shadow-[0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-md' : ''
      }`}
    >
      <Container className="flex h-18 items-center justify-between gap-4">
        <a href="#top" aria-label="Поворот направо — на главную" onClick={close}>
          <Logo />
        </a>

        <nav aria-label="Основная навигация" className="hidden lg:block">
          <ul className="flex items-center gap-8 text-[15px] font-semibold">
            {navItems.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="text-mist transition hover:text-chalk">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <a href={club.phoneHref} className="hidden items-center gap-2 font-semibold md:flex">
            <Icon name="phone" className="size-5 text-volt" />
            {club.phone}
          </a>
          <a href="#booking" className={`${buttonPrimarySmall} max-sm:hidden`}>
            Записаться
          </a>
          <button
            type="button"
            className="grid size-11 place-items-center rounded-xl border-2 border-chalk/15 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
            onClick={() => setOpen((v) => !v)}
          >
            <Icon name={open ? 'close' : 'menu'} className="size-5" />
          </button>
        </div>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            aria-label="Мобильная навигация"
            className="border-t border-chalk/10 lg:hidden"
            initial={{ opacity: 0, y: -motionTokens.distance.sm }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -motionTokens.distance.sm }}
            transition={{ duration: motionTokens.duration.fast, ease: motionTokens.easing.smooth }}
          >
            <Container className="py-4">
              <ul className="grid gap-1">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={close}
                      className="block rounded-xl px-3 py-3 font-display text-lg uppercase transition hover:bg-carbon"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="mt-4 grid gap-3 border-t border-chalk/10 pt-4 sm:hidden">
                <a href="#booking" onClick={close} className={buttonPrimary}>
                  Записаться на заезд
                </a>
                <a href={club.phoneHref} className="py-2 text-center font-semibold">
                  {club.phone}
                </a>
              </div>
            </Container>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
