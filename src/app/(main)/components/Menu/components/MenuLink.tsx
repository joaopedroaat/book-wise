'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'

type MenuLinkProps = {
  href: string
  children: ReactNode
}

export function MenuLink({ href, children }: MenuLinkProps) {
  const path = usePathname()
  const active = path.includes(href)

  return (
    <Link
      className={`text-lg flex items-center gap-3 relative after:absolute after:w-1 after:h-full after:bg-green-100 after:rounded after:-left-4 ${
        active ? 'text-gray-100' : 'text-gray-400 after:hidden'
      }`}
      href={href}
    >
      {children}
    </Link>
  )
}
