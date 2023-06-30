'use client'
import Avatar from '@/app/components/Avartar';
import AvatarGroup from '@/app/components/GroupAvatar';
import useOtherUser from '@/app/hooks/useOtherUser';
import { FullConversation } from '@/app/types';
import clsx from 'clsx';
import { format } from 'date-fns';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';

const ConversationBox = ({
  data,
  selected
}: {
  data: FullConversation,
  selected?: boolean
}) => {
  const otherUser = useOtherUser(data)
  const router = useRouter()
  const session = useSession()

  const handleClick = useCallback(() => {
    router.push(`/conversations/${data.id}`)
  }, [router, data])

  const userEmail = useMemo(() => session.data?.user?.email,
    [session.data?.user?.email])

  const lastMsg = useMemo(() => {
    const msgs = data.messages || []
    return msgs[msgs.length - 1]
  }, [data.messages])



  const hasSeen = useMemo(() => {
    if (!lastMsg) {
      return false;
    }

    const seenArray = lastMsg.seen || [];

    if (!userEmail) {
      return false;
    }

    return seenArray
      .filter((user) => user.email === userEmail).length !== 0;
  }, [userEmail, lastMsg]);

  const lastMessageText = useMemo(() => {
    if (lastMsg?.image) {
      return 'Sent an image';
    }

    if (lastMsg?.body) {
      return lastMsg?.body
    }

    return 'Start a conversation';
  }, [lastMsg]);

  return (
    <div className={clsx(`
        w-full 
        relative 
        flex 
        items-center 
        space-x-3 
        p-3 
        hover:bg-neutral-100
        rounded-lg
        transition
        cursor-pointer
        `,
      selected ? 'bg-neutral-100' : 'bg-white'
    )}
      onClick={handleClick}
    >
      {data.isGroup ?
        <AvatarGroup users={data.users} />
        : <Avatar user={otherUser} />}


      <div className="min-w-0 flex-1">
        <div className="focus:outline-none">
          <span className="absolute inset-0" aria-hidden="true" />
          <div className="flex justify-between items-center mb-1">
            <p className="text-md font-medium text-gray-900">
              {data.name || otherUser.name}
            </p>
            {lastMsg?.createdAt && (
              <p
                className="
                  text-xs 
                  text-gray-400 
                  font-light
                "
              >
                {format(new Date(lastMsg.createdAt), 'p')}
              </p>
            )}
          </div>
          <p
            className={clsx(`
              truncate 
              text-sm
              `,
              hasSeen ? 'text-gray-500' : 'text-black font-medium'
            )}>
            {lastMessageText}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConversationBox;