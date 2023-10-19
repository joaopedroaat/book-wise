'use client'

import { HTMLProps, ReactNode, useRef, useEffect } from 'react'

interface MarqueeTextProps extends HTMLProps<HTMLHeadingElement> {
  children: ReactNode
}

export function MarqueeText({ children, ...props }: MarqueeTextProps) {
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (textRef.current) {
      const hasOverflow =
        textRef.current.scrollWidth > textRef.current.clientWidth
      if (hasOverflow) {
        textRef.current.classList.add('animate-marquee')
      } else {
        textRef.current.classList.remove('animate-marquee')
      }
    }
  }, [children])

  return (
    <h1 ref={textRef} {...props}>
      {children}
    </h1>
  )
}

export default MarqueeText
