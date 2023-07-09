'use client'
import { usePathname } from 'next/navigation'
import Link, { LinkProps } from 'next/link'
import React, { PropsWithChildren } from 'react'

const ActiveLink = ({ children, ...props }: PropsWithChildren<LinkProps>) => {
  const pathname = usePathname()

  return (
    <Link className={pathname === props.href ? 'active' : ''} {...props}>
      {children}
    </Link>
  )
}

export default ActiveLink
