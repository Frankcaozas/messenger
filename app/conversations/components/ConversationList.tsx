'use client'
import GroupChatModal from '@/app/components/modals/GroupChatModal';
import useConversation from '@/app/hooks/useConversation';
import { ConversationChannel } from '@/app/libs/const';
import { pusherClient } from '@/app/libs/pusher';
import { FullConversation } from '@/app/types';
import { User } from '@prisma/client';
import clsx from 'clsx';
import { useSession } from 'next-auth/react';
import { useEffect, useMemo, useState } from 'react';
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
  const session = useSession()
  const conversationChannel = useMemo(() => {
    return session.data?.user?.email
  }, [session.data?.user?.email])

  useEffect(() => {
    if (!conversationChannel) return

    const newConversation = (c: FullConversation) => {
      setItems(cur => {
        if (cur.find(curConver => {
          return curConver.id = c.id
        }))
          return cur
        return [...cur, c]
      })
    }
    const update = (newConversation: FullConversation) => {
      setItems((cur) => cur.map(conversation => {
        if (conversation.id === newConversation.id) {

          return {
            ...conversation,
            messages: newConversation.messages
          }
        }
        return conversation
      }))
    }
    const deleteConversation = (conversation: FullConversation) => {
      console.log(conversation)
      setItems(cur => cur.filter(c => c.id !== conversation.id))
    }


    pusherClient.subscribe(conversationChannel)
    pusherClient.bind(ConversationChannel.NEW, newConversation)
    pusherClient.bind(ConversationChannel.UPDATE, update)
    pusherClient.bind(ConversationChannel.DELETE, deleteConversation)
    return () => {
      pusherClient.unsubscribe(conversationChannel)
      pusherClient.unbind(ConversationChannel.NEW, newConversation)
      pusherClient.unbind(ConversationChannel.UPDATE, update)
      pusherClient.unbind(ConversationChannel.DELETE, deleteConversation)
    }
  }, [conversationChannel])

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
              Conversations
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