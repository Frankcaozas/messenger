import Sidebar from '@/app/components/Sidebar/Sidebar';
import { ReactNode } from 'react';
import ConversationList from './components/ConversationList';
import { getConversations } from '@/app/actions/getConversations';
import getUsers from '../actions/getUsers';

const layout = async({
  children
}:{
  children: ReactNode
}) => {
  const conversations = await getConversations()
  const users = await getUsers()
  return (
    //@ts-expect-error
    <Sidebar>
      <div className='h-full'>
        <ConversationList
          users={users}
          initialItems={conversations}
        />
        {children}
      </div>
    </Sidebar>  
  );
};

export default layout;