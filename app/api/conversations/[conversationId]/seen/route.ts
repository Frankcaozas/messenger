import { MsgChannel } from "./../../../../types/index";
import getCurrentUser from '@/app/actions/getCurrentUser'
import prisma from '@/app/libs/prisma.db'
import { pusherServer } from '@/app/libs/pusher'
import { NextResponse } from 'next/server'

export async function POST(
  request: Request,
  { params }: { params: { conversationId: string } }
) {
  try {
    const curUser = await getCurrentUser()
    const conversationId = params.conversationId

    if (!curUser?.id || !curUser.email)
      return new NextResponse('Unauthorized', { status: 401 })

    const conversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        users: true,
        messages: {
          include: {
            seen: true,
          },
        },
      },
    })
    //没有last msg直接返回conversation
    const lastMsg = conversation?.messages[conversation.messages.length - 1]
    if (!lastMsg) return NextResponse.json(conversation)
    //update msg with seen
    const updatedLastMessage = await prisma.message.update({
      where: {
        id: lastMsg.id,
      },
      data: {
        seen: {
          connect: {
            id: curUser.id,
          },
        },
      },
      include: {
        seen: true,
        sender: true,
      },
    })

    await pusherServer.trigger(curUser.email, 'conversation:update', {
      id: conversationId,
      message: [updatedLastMessage],
    })
    //如果是自己的发的不用更新msg的seen
    if (lastMsg.seenIds.includes(curUser.id))
      return NextResponse.json(conversation)

    await pusherServer.trigger(
      conversationId,
      MsgChannel.,
      updatedLastMessage
    )

    return NextResponse.json(updatedLastMessage)
  } catch (e) {
    return new NextResponse('Internal Error', { status: 500 })
  }
}
