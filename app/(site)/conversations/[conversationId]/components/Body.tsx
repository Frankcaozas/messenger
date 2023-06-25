'use client'
import { FullMessage } from '@/app/types';
import React, { useEffect, useRef, useState } from 'react';
import MessageBox from './MessageBox';
import useConversation from '@/app/hooks/useConversation';
import axios from 'axios';

const Body = ({
  initialMessages
}:{
  initialMessages: FullMessage[]
}) => {
  const bottomRef = useRef(null)
  const [msgs, setMsgs] = useState(initialMessages)
  const {conversationId} = useConversation()

  useEffect(()=>{
    axios.post(`api/messages/${conversationId}/seen`)
  }, [conversationId])

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