import getCurrentUser from '@/app/actions/getCurrentUser'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const curUser = await getCurrentUser()
    if (!curUser?.email || !curUser.id)
      return new NextResponse('Unauthorized', { status: 401 })
    const body = await request.json()
    const { conversationId, message, image } = body
    const newMsg = await prisma?.message.create({
      data: {
        body: message,
        image: image,
        conversation: {
          connect: {
            id: conversationId,
          },
        },
        sender: {
          connect: {
            id: curUser.id,
          },
        },
        seen: {
          connect: {
            id: curUser.id,
          },
        },
      },
      include: {
        sender: true,
        seen: true,
      },
    })
    const updatedConversation = await prisma?.conversation.update({
      where: {
        id: conversationId,
      },
      data: {
        lastMessageAt: new Date(),
        messages: {
          connect: {
            id: newMsg?.id,
          },
        },
      },
      include: {
        users: true,
        messages: {
          include: {
            seen: true
          }
        }
      }
    })
    return NextResponse.json(newMsg)
  } catch (e) {
    console.log(e, 'Message error')
    return new NextResponse('Internal Error', { status: 500 })
  }
}
