'use client'
import Avatar from '@/app/components/Avartar';
import AvatarGroup from '@/app/components/GroupAvatar';
import useOtherUser from '@/app/hooks/useOtherUser';
import { Conversation, User } from '@prisma/client';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { HiChevronLeft, HiEllipsisHorizontal } from 'react-icons/hi2';
import ProfileDrawer from './ProfileDrawer';
import activeListStore from '@/app/store/activeList';

const Header = ({
  conversation
}: {
  conversation: Conversation & { users: User[] }
}) => {
  const otherUser = useOtherUser(conversation)
  const { members } = activeListStore()
  const isActive = members.indexOf(otherUser?.email!) !== -1
  //状态本文，群聊显示几个成员， 聊天显示在线状态
  const statusText = useMemo(() => {
    if (conversation.isGroup) {
      return `${conversation.users.length} 位成员`
    }
    return isActive ? '在线' : '离线'
  }, [conversation, isActive])
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <ProfileDrawer
        data={conversation}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
      <div className='
      bg-white  
        flex 
        border-b-[1px] 
        sm:px-4 
        py-3 
        px-4 
        lg:px-6 
        justify-between 
        items-center 
        shadow-sm
    '>
        <div className="flex gap-3 items-center">
          <Link
            href="/conversations"
            className="
            lg:hidden 
            block 
            text-sky-500 
            hover:text-sky-600 
            transition 
            cursor-pointer
          "
          >
            <HiChevronLeft size={32} />
          </Link>
          {
            conversation.isGroup ? <AvatarGroup users={conversation.users} /> : <Avatar user={otherUser} />
          }

          <div className='flex flex-col'>
            <div>
              {conversation.name || otherUser.name}
            </div>
            <div className='text-sm font-light text-neutral-500'>
              {statusText}
            </div>
          </div>
        </div>

        <HiEllipsisHorizontal
          size={32}
          onClick={() => {
            setIsOpen(v => !v)
          }}
          className='
          text-sky-500
          hover:text-sky-500
          cursor-pointer
          transition
        '/>
      </div>
    </>
  );
};

export default Header;