import { useRouter } from 'next/router'
import Link, { LinkProps } from 'next/link'
import React, { PropsWithChildren, useState, useEffect } from 'react'

// https://github.com/vercel/next.js/blob/canary/examples/active-class-name/components/ActiveLink.tsx
const ActiveLink = ({ children, ...props }: PropsWithChildren<LinkProps>) => {
  const { asPath, isReady } = useRouter()
  const [computedClassName, setComputedClassName] = useState('')

  useEffect(() => {
    if (isReady) {
      const linkPathname = new URL((props.as || props.href) as string, location.href).pathname
      const activePathname = new URL(asPath, location.href).pathname

      const newClassName = linkPathname === activePathname ? 'active' : ''
      if (newClassName !== computedClassName) {
        setComputedClassName(newClassName)
      }
    }
  }, [asPath, isReady, props.as, props.href, computedClassName])

  return (
    <Link className={computedClassName} {...props}>
      {children}
    </Link>
  )
}

export default ActiveLink
