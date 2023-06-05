'use client'
import { SessionProvider } from 'next-auth/react'
import React, { ReactNode } from 'react'

export default function AuthContext({children}: {children: ReactNode}) {
  return (
    <SessionProvider>{children}</SessionProvider>
  )
}
