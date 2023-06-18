'use client'
import EmptyState from '@/app/components/EmptyState';
import useConversation from '@/app/hooks/useConversation';
import clsx from 'clsx';

const Page = () => {
  const {isOpen} = useConversation()
  return (
    <div
      className={clsx(
        'lg:pl-80 h-full lg:block',
        isOpen ? 'block' : 'hidden'
      )}
    >
      <EmptyState/>
    </div>
  );
};

export default Page;