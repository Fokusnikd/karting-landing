import { AnimatePresence, motion } from 'motion/react'
import { useId, useState } from 'react'
import type { FormEvent } from 'react'
import { formats, timeSlots } from '../data'
import type { FormatId } from '../data'
import { motionTokens, springs } from '../lib/motion'
import { Icon } from './Icon'
import { Container, SectionHeading, buttonPrimary } from './ui'

export type BookingChoice = { format: FormatId; racers: number }
type Field = 'time' | 'name' | 'phone' | 'consent'

const rub = new Intl.NumberFormat('ru-RU')
const weekday = new Intl.DateTimeFormat('ru-RU', { weekday: 'short' })
const dayMonth = new Intl.DateTimeFormat('ru-RU', { day: 'numeric', month: 'short' })
const MAX_RACERS = 12

// Formats input as +7 (XXX) XXX-XX-XX. Separators are added together with the next digit,
// so backspace never gets stuck on a bracket or dash.
function formatPhone(raw: string) {
  let digits = raw.replace(/\D/g, '')
  if (!digits) return ''
  if (digits.startsWith('8')) digits = `7${digits.slice(1)}`
  if (!digits.startsWith('7')) digits = `7${digits}`
  const rest = digits.slice(1, 11)
  let result = '+7'
  if (rest.length > 0) result += ` (${rest.slice(0, 3)}`
  if (rest.length > 3) result += `) ${rest.slice(3, 6)}`
  if (rest.length > 6) result += `-${rest.slice(6, 8)}`
  if (rest.length > 8) result += `-${rest.slice(8, 10)}`
  return result
}

// The next 7 days, counted once when the page loads
const days = Array.from({ length: 7 }, (_, i) => {
  const date = new Date()
  date.setDate(date.getDate() + i)
  return { weekday: i === 0 ? 'сегодня' : weekday.format(date), label: dayMonth.format(date).replace('.', '') }
})

// Deterministic "taken" slots so the schedule looks lived-in without a backend
const isBusy = (day: number, slot: number) => (day * 3 + slot) % 5 === 1

const fieldClass =
  'w-full rounded-xl border-2 border-chalk/10 bg-asphalt px-4 py-3.5 outline-none transition focus:border-volt aria-[invalid=true]:border-signal'

export function Booking({ value, onChange }: { value: BookingChoice; onChange: (value: BookingChoice) => void }) {
  const id = useId()
  const [day, setDay] = useState(0)
  const [time, setTime] = useState<string | null>(null)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [consent, setConsent] = useState(false)
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({})
  const [sent, setSent] = useState(false)

  const format = formats.find((f) => f.id === value.format) ?? formats[0]
  const total = format.perGroup ? format.price : format.price * value.racers
  const fieldId = (field: string) => `${id}-${field}`

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const found: Partial<Record<Field, string>> = {}
    if (!time) found.time = 'Выберите время заезда'
    if (name.trim().length < 2) found.name = 'Как к вам обращаться?'
    if (phone.replace(/\D/g, '').length !== 11) found.phone = 'Введите номер полностью'
    if (!consent) found.consent = 'Нужно согласие на обработку данных'
    setErrors(found)
    const firstInvalid = (Object.keys(found) as Field[])[0]
    if (firstInvalid) {
      document.getElementById(fieldId(firstInvalid))?.focus()
      return
    }
    setSent(true)
  }

  const reset = () => {
    setTime(null)
    setName('')
    setPhone('')
    setConsent(false)
    setErrors({})
    setSent(false)
  }

  return (
    <section id="booking" className="py-16 lg:py-24" aria-labelledby="booking-title">
      <Container>
        <div className="overflow-hidden rounded-3xl border border-chalk/10 bg-carbon">
          <div aria-hidden="true" className="checkered h-3.5 opacity-90" />
          <div className="grid gap-10 p-5 sm:p-10 lg:grid-cols-[0.8fr_1.2fr] lg:p-12">
            <div>
              <SectionHeading
                id="booking-title"
                eyebrow="Запись"
                title="Займите место на стартовой решётке"
                intro="Выберите формат, день и время — администратор подтвердит бронь звонком."
              />
              <dl className="mt-8 grid gap-3 rounded-2xl bg-asphalt p-5">
                <div className="flex justify-between gap-4">
                  <dt className="text-mist">Формат</dt>
                  <dd className="font-semibold">{format.name}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-mist">Пилотов</dt>
                  <dd className="font-semibold">{value.racers}</dd>
                </div>
                <div className="flex items-baseline justify-between gap-4 border-t border-chalk/10 pt-3">
                  <dt className="text-mist">Итого</dt>
                  <dd className="relative overflow-hidden font-display text-3xl text-volt">
                    <AnimatePresence mode="popLayout" initial={false}>
                      <motion.span
                        key={total}
                        className="block"
                        initial={{ y: motionTokens.distance.lg, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -motionTokens.distance.lg, opacity: 0 }}
                        transition={springs.snappy}
                      >
                        {format.perGroup && 'от '}
                        {rub.format(total)}&nbsp;₽
                      </motion.span>
                    </AnimatePresence>
                  </dd>
                </div>
              </dl>
            </div>

            <AnimatePresence mode="wait" initial={false}>
              {sent ? (
                <motion.div
                  key="sent"
                  role="status"
                  className="grid place-items-center rounded-2xl bg-asphalt p-8 text-center"
                  initial={{ opacity: 0, scale: motionTokens.scale.subtle }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={springs.gentle}
                >
                  <motion.span
                    className="grid size-20 place-items-center rounded-2xl bg-volt text-asphalt"
                    animate={{ rotate: [0, -10, 10, -6, 0] }}
                    transition={{ duration: motionTokens.duration.crawl, delay: motionTokens.duration.normal }}
                  >
                    <Icon name="flag" className="size-10" />
                  </motion.span>
                  <h3 className="mt-6 font-display text-2xl uppercase">{name.trim()}, вы в стартовом списке!</h3>
                  <p className="mt-3 text-mist">
                    {format.name}, {days[day].label}, {time}. Администратор перезвонит в течение 15 минут.
                  </p>
                  <p className="mt-2 text-sm text-mist">Это демо-сайт: заявка никуда не отправлена.</p>
                  <button type="button" onClick={reset} className="mt-8 font-semibold text-volt underline-offset-4 hover:underline">
                    Записать ещё одного пилота
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  noValidate
                  onSubmit={onSubmit}
                  className="grid gap-6"
                  exit={{ opacity: 0, y: -motionTokens.distance.md }}
                  transition={{ duration: motionTokens.duration.fast }}
                >
                  <fieldset>
                    <legend className="mb-3 font-semibold">Формат</legend>
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                      {formats.map((f) => (
                        <button
                          key={f.id}
                          type="button"
                          aria-pressed={f.id === value.format}
                          onClick={() => onChange({ ...value, format: f.id })}
                          className={`rounded-xl border-2 px-3 py-2.5 text-sm font-semibold transition ${
                            f.id === value.format ? 'border-volt bg-volt/10' : 'border-chalk/10 hover:border-chalk/30'
                          }`}
                        >
                          {f.name}
                        </button>
                      ))}
                    </div>
                  </fieldset>

                  <fieldset>
                    <legend className="mb-3 font-semibold">День</legend>
                    <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-7 sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden">
                      {days.map((d, index) => (
                        <button
                          key={d.label}
                          type="button"
                          aria-pressed={index === day}
                          onClick={() => {
                            setDay(index)
                            setTime(null)
                          }}
                          className={`shrink-0 rounded-xl border-2 px-3 py-2 text-center transition ${
                            index === day ? 'border-volt bg-volt text-asphalt' : 'border-chalk/10 hover:border-chalk/30'
                          }`}
                        >
                          <span className="block text-xs font-semibold uppercase">{d.weekday}</span>
                          <span className="block font-display">{d.label}</span>
                        </button>
                      ))}
                    </div>
                  </fieldset>

                  <fieldset>
                    <legend id={fieldId('time')} tabIndex={-1} className="mb-3 font-semibold outline-none">
                      Время
                    </legend>
                    <div className="grid grid-cols-4 gap-2 sm:grid-cols-7">
                      {timeSlots.map((slot, index) => {
                        const busy = isBusy(day, index)
                        return (
                          <button
                            key={slot}
                            type="button"
                            disabled={busy}
                            aria-pressed={slot === time}
                            onClick={() => setTime(slot)}
                            className={`rounded-xl border-2 py-2.5 text-sm font-semibold tabular-nums transition ${
                              busy
                                ? 'cursor-not-allowed border-transparent text-mist/40 line-through'
                                : slot === time
                                  ? 'border-volt bg-volt/10'
                                  : 'border-chalk/10 hover:border-chalk/30'
                            }`}
                          >
                            {slot}
                          </button>
                        )
                      })}
                    </div>
                    {errors.time && <p className="mt-2 text-sm font-semibold text-signal">{errors.time}</p>}
                  </fieldset>

                  <div className="flex items-center justify-between gap-4 rounded-xl border-2 border-chalk/10 px-4 py-2">
                    <span className="font-semibold">Пилотов</span>
                    <div className="flex items-center gap-4">
                      <button
                        type="button"
                        aria-label="Меньше пилотов"
                        disabled={value.racers <= 1}
                        onClick={() => onChange({ ...value, racers: value.racers - 1 })}
                        className="grid size-9 place-items-center rounded-lg bg-steel transition hover:bg-chalk/20 disabled:opacity-40"
                      >
                        <Icon name="minus" className="size-4" />
                      </button>
                      <span className="w-6 text-center font-display text-xl tabular-nums" aria-live="polite">
                        {value.racers}
                      </span>
                      <button
                        type="button"
                        aria-label="Больше пилотов"
                        disabled={value.racers >= MAX_RACERS}
                        onClick={() => onChange({ ...value, racers: value.racers + 1 })}
                        className="grid size-9 place-items-center rounded-lg bg-steel transition hover:bg-chalk/20 disabled:opacity-40"
                      >
                        <Icon name="plus" className="size-4" />
                      </button>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor={fieldId('name')} className="mb-2 block font-semibold">
                        Имя
                      </label>
                      <input
                        id={fieldId('name')}
                        className={fieldClass}
                        autoComplete="given-name"
                        placeholder="Как к вам обращаться"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        aria-invalid={Boolean(errors.name)}
                        aria-describedby={errors.name ? fieldId('name-error') : undefined}
                      />
                      {errors.name && (
                        <p id={fieldId('name-error')} className="mt-2 text-sm font-semibold text-signal">
                          {errors.name}
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor={fieldId('phone')} className="mb-2 block font-semibold">
                        Телефон
                      </label>
                      <input
                        id={fieldId('phone')}
                        className={fieldClass}
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        placeholder="+7 (___) ___-__-__"
                        value={phone}
                        onChange={(e) => setPhone(formatPhone(e.target.value))}
                        aria-invalid={Boolean(errors.phone)}
                        aria-describedby={errors.phone ? fieldId('phone-error') : undefined}
                      />
                      {errors.phone && (
                        <p id={fieldId('phone-error')} className="mt-2 text-sm font-semibold text-signal">
                          {errors.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="flex cursor-pointer items-start gap-3 text-sm text-mist">
                      <input
                        id={fieldId('consent')}
                        type="checkbox"
                        checked={consent}
                        onChange={(e) => setConsent(e.target.checked)}
                        className="mt-0.5 size-5 shrink-0 accent-volt"
                        aria-invalid={Boolean(errors.consent)}
                        aria-describedby={errors.consent ? fieldId('consent-error') : undefined}
                      />
                      Согласен на обработку персональных данных
                    </label>
                    {errors.consent && (
                      <p id={fieldId('consent-error')} className="mt-2 text-sm font-semibold text-signal">
                        {errors.consent}
                      </p>
                    )}
                  </div>

                  <motion.button type="submit" className={buttonPrimary} whileTap={{ scale: motionTokens.scale.press }}>
                    Забронировать
                    <Icon name="arrowRight" className="size-5" />
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </section>
  )
}
