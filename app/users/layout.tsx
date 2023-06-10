import type { ReactNode } from 'react'
import Sidebar from '../components/Sidebar/Sidebar'

async function UsersLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    // @ts-expect-error Server Component
    <Sidebar>
      <div className='h-full'>
        {children}
      </div>
    </Sidebar>
  )
}

export default UsersLayout
