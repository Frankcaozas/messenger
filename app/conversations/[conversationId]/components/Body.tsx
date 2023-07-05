'use client'
import { FullMessage } from '@/app/types';
import React, { useEffect, useRef, useState } from 'react';
import MessageBox from './MessageBox';
import useConversation from '@/app/hooks/useConversation';
import axios from 'axios';
import { pusherClient } from '@/app/libs/pusher';
import { MsgChannel } from '@/app/libs/const';

const Body = ({
  initialMessages
}: {
  initialMessages: FullMessage[]
}) => {
  const bottomRef = useRef<HTMLDivElement>(null)
  const [msgs, setMsgs] = useState(initialMessages)
  const { conversationId } = useConversation()

  useEffect(() => {
    axios.post(`/api/conversations/${conversationId}/seen`)
  }, [conversationId])

  useEffect(() => {
    pusherClient.subscribe(conversationId)
    bottomRef.current?.scrollIntoView()

    const newMsgHandler = (msg: FullMessage) => {
      axios.post(`/api/conversations/${conversationId}/seen`)
      setMsgs((msgs) => {

        if (msgs.filter(val => val.id === msg.id).length) {
          return msgs
        }
        return [...msgs, msg]
      })
      bottomRef.current?.scrollIntoView()
    }

    const updateMsg = (newMsg: FullMessage) => {
      setMsgs(msgs => {
        return msgs.map(cur => {
          if(cur.id === newMsg.id){
            return newMsg
          }
          return cur
        })
      })
    }
    pusherClient.bind(MsgChannel.NEW, newMsgHandler)
    pusherClient.bind(MsgChannel.UPDATE, updateMsg)
    return () => {
      pusherClient.unsubscribe(conversationId)
      pusherClient.unbind(MsgChannel.NEW, newMsgHandler)
      pusherClient.unbind(MsgChannel.UPDATE, updateMsg)
    }
  }, [conversationId])

  return (
    <div className='flex-1 overflow-y-auto'>
      {msgs.map((msg, idx) => (
        <MessageBox
          isLast={idx === msgs.length - 1}
          key={msg.id}
          data={msg}
        />
      ))}
      <div className='pt-24' ref={bottomRef}></div>
    </div>
  );
};

export default Body; 