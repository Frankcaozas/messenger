import { ReactNode } from 'react';
import Sidebar from '../components/Sidebar/Sidebar';

const UsersLayout = async ({
  children
}: {
  children: ReactNode
}) => {
  return (
    //@ts-expect-error Server Component
    <Sidebar>
      <div className='h-full'>
        {children}
      </div>
    </Sidebar>
  );
};

export default UsersLayout;