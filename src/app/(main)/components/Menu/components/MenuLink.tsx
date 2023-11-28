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
  const active =
    path.includes(href) ||
    (href.split('/').includes('profile') && path.split('/').includes('profile'))

  return (
    <Link
      className={`flex items-center gap-2 md:gap-4 relative after:absolute after:w-1 after:h-full after:bg-green-100 after:rounded after:-left-4 after:hidden ${
        active ? 'text-gray-100 md:after:block' : 'text-gray-400'
      }`}
      href={href}
    >
      {children}
    </Link>
  )
}
