'use client'
import { FullMessage } from '@/app/types';
import React, { useRef, useState } from 'react';
import MessageBox from './MessageBox';

const Body = ({
  initialMessages
}:{
  initialMessages: FullMessage[]
}) => {
  const bottomRef = useRef(null)
  const [msgs, setMsgs] = useState(initialMessages)
  return (
    <div className='flex-1 overflow-y-auto'>
      {msgs.map((msg, idx) => (
         <MessageBox 
          isLast={idx === msgs.length}
          key={msg.id}
          data={msg}
         />
      ))}
      <div className='pt-24' ref={bottomRef}></div>
    </div>
  );
};

export default Body; 