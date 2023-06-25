import getCurrentUser from '@/app/actions/getCurrentUser'
import prisma from '@/app/libs/prisma.db'
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
    const lastMsg = conversation?.messages[conversation.messages.length-1]
    if(!lastMsg) return NextResponse.json(conversation)

    const updatedMessage = await prisma.message.update({
      where: {
        id: lastMsg.id
      },
      data: {
        seen: {
          connect: {
            id: curUser.id
          }
        }
      },
      include: {
        seen: true,
        sender: true
      }
    })
    return NextResponse.json(updatedMessage)

  } catch (e) {
    return new NextResponse('Internal Error', { status: 500 })
  }
}
