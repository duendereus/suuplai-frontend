'use client'

import Link from 'next/link'
import Image from 'next/image'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  linkTo?: string
}

// Width drives the size — height scales proportionally (original PNG: 160×107 → ratio ~1.5:1)
const sizeMap = {
  sm: { width: 120, height: 80 },
  md: { width: 160, height: 107 },
  lg: { width: 200, height: 134 },
}

export function Logo({ size = 'md', linkTo = '/' }: LogoProps) {
  const { height, width } = sizeMap[size]

  return (
    <Link
      href={linkTo}
      className="inline-flex items-center hover:opacity-85 transition-opacity duration-200"
      aria-label="Suuplai — ir al inicio"
    >
      <Image
        src="/images/suuplai-logo-transparent.png"
        alt="Suuplai"
        width={width}
        height={height}
        priority
        style={{ objectFit: 'contain' }}
      />
    </Link>
  )
}
