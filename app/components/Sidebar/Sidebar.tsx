import getCurrentUser from '@/app/actions/getCurrentUser'
import type { ReactNode } from 'react'
import DektopSidebar from './DektopSidebar'
import MobileFooter from './MobileFooter'

async function Sidebar({ children }:
  { children: ReactNode },
) {
  const user = await getCurrentUser()
  return (
    <div className="h-full">
      <DektopSidebar currentUser={user!} />
      <MobileFooter />
      <main className="lg:pl-20 h-full">
        {children}
      </main>
    </div>
  )
}

export default Sidebar
