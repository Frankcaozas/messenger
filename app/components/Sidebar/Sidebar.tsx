import type { ReactNode } from 'react'
import DektopSidebar from './DektopSidebar'

async function Sidebar({ children }:
{ children: ReactNode },
) {
  return (
    <div className="h-full">
      <DektopSidebar/>
      {children}
    </div>
  )
}

export default Sidebar
