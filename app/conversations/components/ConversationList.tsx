'use client'
import GroupChatModal from '@/app/components/modals/GroupChatModal';
import useConversation from '@/app/hooks/useConversation';
import { FullConversation } from '@/app/types';
import { User } from '@prisma/client';
import clsx from 'clsx';
import { useState } from 'react';
import { MdOutlineGroupAdd } from 'react-icons/md';
import ConversationBox from './ConversationBox';


const ConversationList = ({
  initialItems,
  users
}: {
  users: User[],
  initialItems: FullConversation[]
}) => {
  const [items, setItems] = useState<FullConversation[]>(initialItems)
  const { isOpen, conversationId } = useConversation()
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      {<GroupChatModal isOpen={isModalOpen}
        users={users}
        onClose={() => setIsModalOpen(false)}
      />}
      <aside className={clsx(`
        fixed 
        inset-y-0 
        pb-20
        lg:pb-0
        lg:left-20 
        lg:w-80 
        lg:block
        overflow-y-auto 
        border-r 
        border-gray-200 
      `, isOpen ? 'hidden' : 'block w-full left-0')}>
        <div className="px-5">
          <div className="flex justify-between mb-4 pt-4">
            <div className="text-2xl font-bold text-neutral-800">
              Messages
            </div>
            <div
              onClick={() => setIsModalOpen(true)} 
              className="
                rounded-full 
                p-2 
                bg-gray-100 
                text-gray-600 
                cursor-pointer 
                hover:opacity-75 
                transition
              "
            >
              <MdOutlineGroupAdd size={20} />
            </div>
          </div>
          {items.map((item) => (
            <ConversationBox
              key={item.id}
              data={item}
              selected={conversationId === item.id}
            />
          ))}
        </div>
      </aside>
    </>
  );
};

export default ConversationList;