import type { ReactNode } from 'react'

// Line icon set: 24×24 grid, 2px stroke, round caps
const paths = {
  arrowRight: <path d="M5 12h14M13 6l6 6-6 6" />,
  turnRight: <path d="M6 20v-7a4 4 0 0 1 4-4h9M15 5l4 4-4 4" />,
  check: <path d="M5 12.5l4.5 4.5L19 7.5" />,
  phone: (
    <path d="M5.5 4h3l1.5 4.25-2 1.25a11 11 0 0 0 6.5 6.5l1.25-2L20 15.5v3a1.5 1.5 0 0 1-1.6 1.5C10.6 19.5 4.5 13.4 4 5.6A1.5 1.5 0 0 1 5.5 4z" />
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  mapPin: (
    <>
      <path d="M12 21s-6.5-5.8-6.5-11a6.5 6.5 0 0 1 13 0c0 5.2-6.5 11-6.5 11z" />
      <circle cx="12" cy="10" r="2.25" />
    </>
  ),
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6L6 18" />,
  plus: <path d="M12 5v14M5 12h14" />,
  minus: <path d="M5 12h14" />,
  chevronDown: <path d="M6 9l6 6 6-6" />,
  bolt: <path d="M13 3L5 13.5h6L10 21l8-10.5h-6L13 3z" />,
  users: (
    <>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M3 20c.6-3.2 3-5 6-5s5.4 1.8 6 5M16 4.6a3.5 3.5 0 0 1 0 6.8M18 15.2c1.7.6 2.7 2.2 3 4.8" />
    </>
  ),
  trophy: (
    <path d="M8 4h8v5a4 4 0 0 1-8 0V4zM8 6H5a3 3 0 0 0 3 4M16 6h3a3 3 0 0 1-3 4M12 13v4M8.5 20h7M10 17h4" />
  ),
  helmet: (
    <>
      <path d="M4 16.5a8 8 0 0 1 16 0V18H4v-1.5z" />
      <path d="M11 12.5h8.6M8 18v2h8v-2" />
    </>
  ),
  flag: <path d="M5 21V4h12l-2 4 2 4H5" />,
  timer: (
    <>
      <circle cx="12" cy="13.5" r="7.5" />
      <path d="M12 9.5v4l2.5 1.5M9.5 3h5M12 3v3" />
    </>
  ),
} satisfies Record<string, ReactNode>

export type IconName = keyof typeof paths

export function Icon({ name, className = 'size-6' }: { name: IconName; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  )
}
