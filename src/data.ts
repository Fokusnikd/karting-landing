import type { IconName } from './components/Icon'

// Fictional club: every name, number and lap time on this page is demo content.
export const club = {
  name: 'Поворот направо',
  phone: '+7 (495) 000-00-00',
  phoneHref: 'tel:+74950000000',
  address: 'Москва, ул. Примерная, 12',
  hours: 'Ежедневно с 10:00 до 23:00',
}

export const navItems = [
  { label: 'Тарифы', href: '#pricing' },
  { label: 'Трасса', href: '#track' },
  { label: 'Рекорды', href: '#leaderboard' },
  { label: 'Вопросы', href: '#faq' },
  { label: 'Контакты', href: '#contacts' },
]

export const heroStats = [
  { value: 60, suffix: ' км/ч', label: 'максимальная скорость' },
  { value: 820, suffix: ' м', label: 'длина трассы' },
  { value: 3, suffix: '', label: 'поворота — и все направо' },
]

export const tickerItems = [
  'Заезды от 10 минут',
  'Дети от 7 лет',
  'Электронный хронометраж',
  'Корпоративы и дни рождения',
  'Крытая трасса — круглый год',
]

export type FormatId = 'race' | 'grandprix' | 'kids' | 'party'

export type Format = {
  id: FormatId
  name: string
  duration: string
  price: number
  perGroup?: boolean
  featured?: boolean
  features: string[]
}

export const formats: Format[] = [
  {
    id: 'race',
    name: 'Заезд',
    duration: '10 минут',
    price: 900,
    features: ['Инструктаж и экипировка', 'Электронный хронометраж', 'Время кругов на почту'],
  },
  {
    id: 'grandprix',
    name: 'Гран-при',
    duration: '35 минут',
    price: 2900,
    featured: true,
    features: ['Тренировка — 10 минут', 'Квалификация — 10 минут', 'Гонка со стартовой решёткой', 'Подиум и кубок победителю'],
  },
  {
    id: 'kids',
    name: 'Детский',
    duration: '8 минут',
    price: 700,
    features: ['Дети от 7 лет', 'Скорость до 25 км/ч', 'Отдельная сессия без взрослых'],
  },
  {
    id: 'party',
    name: 'Праздник',
    duration: 'от 2 часов',
    price: 15000,
    perGroup: true,
    features: ['До 12 пилотов', 'Гонка и награждение', 'Зона отдыха и пицца'],
  },
]

// `at` is the share of the lap where the sector starts
export const sectors = [
  { at: 0.02, name: 'Старт и прямая', text: 'Разгон до 60 км/ч. Как в NASCAR, только наоборот: дальше будут одни правые.' },
  { at: 0.18, name: 'Поворот направо', text: 'Тот самый, в честь которого назван клуб. Тормозите заранее и выходите на газ с апекса.' },
  { at: 0.37, name: 'Опять направо', text: 'Не ждали? Второй правый сразу за первым — и выход на обратную прямую.' },
  { at: 0.63, name: 'Да, опять направо', text: 'Налево здесь не поворачивают. Длинная дуга на выход к финишу — держите внешний радиус и не сбрасывайте газ.' },
]

export const steps: { icon: IconName; title: string; text: string }[] = [
  { icon: 'users', title: 'Регистрация', text: 'Приезжаете к своему времени и подписываете согласие — это 5 минут.' },
  { icon: 'helmet', title: 'Экипировка', text: 'Выдаём шлем, подшлемник и комбинезон нужного размера.' },
  { icon: 'flag', title: 'Заезд', text: 'Инструктор показывает траекторию, дальше — только вы, карт и трасса.' },
  { icon: 'trophy', title: 'Результаты', text: 'Время каждого круга приходит на почту, лучшие попадают в таблицу рекордов.' },
]

export const pilots = [
  { id: 1, name: 'Макс', kart: 7, time: 41.236 },
  { id: 2, name: 'Аня', kart: 12, time: 41.598 },
  { id: 3, name: 'Тимур', kart: 3, time: 41.904 },
  { id: 4, name: 'Лиза', kart: 21, time: 42.317 },
  { id: 5, name: 'Дима', kart: 9, time: 42.655 },
  { id: 6, name: 'Саша', kart: 15, time: 43.012 },
  { id: 7, name: 'Вика', kart: 4, time: 43.48 },
  { id: 8, name: 'Егор', kart: 18, time: 44.103 },
]

export const timeSlots = ['12:00', '13:30', '15:00', '16:30', '18:00', '19:30', '21:00']

export const faq = [
  {
    q: 'С какого возраста можно кататься?',
    a: 'Детские заезды — с 7 лет и ростом от 130 см, взрослые карты — с 14 лет. До 18 лет нужно согласие родителей.',
  },
  {
    q: 'В чём приехать?',
    a: 'В удобной закрытой обуви и одежде без длинных шарфов. Шлем, подшлемник и комбинезон выдаём на месте.',
  },
  {
    q: 'Это безопасно?',
    a: 'Трасса огорожена шинными барьерами, у картов стоит ограничитель скорости, а перед заездом инструктор проводит инструктаж.',
  },
  {
    q: 'Можно соревноваться с друзьями?',
    a: 'Да: выбирайте «Гран-при» — квалификация, гонка со стартовой решёткой и награждение победителей.',
  },
]
