import type { ReactNode } from 'react'
import getUsers from '../actions/getUsers'
import Sidebar from '../components/Sidebar/Sidebar'
import UserList from './components/UserList'

async function UsersLayout({
  children,
}: {
  children: ReactNode
}) {
  const users = await getUsers()

  return (
    // @ts-expect-error Server Component
    <Sidebar>
      <div className='h-full'>
        <UserList items={users}/>
        {children}
      </div>
    </Sidebar>
  )
}

export default UsersLayout
