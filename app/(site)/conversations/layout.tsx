import Sidebar from '@/app/components/Sidebar/Sidebar';
import { ReactNode } from 'react';
import ConversationList from './components/ConversationList';
import { getConversations } from '@/app/actions/getConversations';

const layout = async({
  children
}:{
  children: ReactNode
}) => {
  const conversations = await getConversations()
  return (
    //@ts-expect-error
    <Sidebar>
      <div className='h-full'>
        <ConversationList
          initialItems={conversations}
        />
        {children}
      </div>
    </Sidebar>  
  );
};

export default layout;