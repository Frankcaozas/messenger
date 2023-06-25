import Avatar from '@/app/components/Avartar';
import { FullMessage } from '@/app/types';
import clsx from 'clsx';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import { useSession } from 'next-auth/react';
import Image from 'next/image';


const MessageBox = ({
  isLast,
  data
}: {
  isLast: boolean
  data: FullMessage
}) => {

  const session = useSession()
  const isOwn = session.data?.user?.email === data.sender.email

  const seenList = (data.seen || [])
    .filter((user) => user.email !== data?.sender?.email)
    .map((user) => user.name)
    .join(', ')

  const container = clsx('flex gap-3 p-4', isOwn && 'justify-end')
  const avatar = clsx(isOwn && 'order-2');
  const body = clsx('flex flex-col gap-2', isOwn && 'items-end')
  const message = clsx(
    'text-sm w-fit overflow-hidden',
    isOwn ? 'bg-sky-500 text-white' : 'bg-gray-100',
    data.image ? 'rounded-md p-0' : 'rounded-full py-2 px-3'
  )
  console.log(seenList.length > 0)
  console.log(isLast)
  console.log(isOwn)
  return (
    <div className={container}>
      <div className={avatar} >
        <Avatar user={data.sender} />
      </div>
      <div className={body} >
        <div className={'flex items-center gap-1'}>
          <div className='text-gray-500 text-sm'>
            {data.sender.name}
          </div>
          <div className='text-xs text-gray-400'>
            {format(new Date(data.createdAt), 'PPpp', { locale: zhCN })}
          </div>
        </div>
        <div className={message}>
          {data.image ? (
            <Image
              alt='Image'
              height={288}
              width={288}
              src={data.image}
              className='
            object-cover
            cursor-pointer
            hover:scale-110
            transition
            translate'
            />
          ) : (
            <div>{data.body}</div>
          )}
        </div>
        {isLast && isOwn && seenList.length > 0 && (
          <div
            className="
          text-xs 
          font-light 
          text-gray-500
          "
          >
            {`${seenList}已读`}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageBox;