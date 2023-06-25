import getCurrentUser from '@/app/actions/getCurrentUser'
import prisma from '@/app/libs/prisma.db'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { members, name, userId, isGroup } = await request.json()
    const currentUser = await getCurrentUser()
    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse('Unauthorized', { status: 400 })
    }

    if (isGroup && (!members || members.length < 2 || !name)) {
      return new NextResponse('Invalid data', { status: 400 })
    }

    if (isGroup) {
      const newGroupConversations = await prisma.conversation.create({
        data: {
          isGroup,
          name,
          users: {
            connect: [
              ...members.map((member: { value: string }) => ({
                id: member.value,
              })),
              {
                id: currentUser.id,
              },
            ],
          },
        },
        include: {
          users: true,
        },
      })

      return NextResponse.json(newGroupConversations)
    }

    const exsitingConversation = await prisma.conversation.findMany({
      where: {
        OR: [
          {
            userIds: {
              equals: [userId, currentUser.id],
            },
          },
          {
            userIds: {
              equals: [currentUser.id, userId],
            },
          },
        ],
      },
    })
    const singleConver = exsitingConversation[0]
    if (singleConver) return NextResponse.json(singleConver)

    const newConversation = await prisma.conversation.create({
      data: {
        users: {
          connect: [{ id: userId }, { id: currentUser.id }],
        },
      },
      include: {
        users: true,
      },
    })

    return NextResponse.json(newConversation)
  } catch (e) {
    return new NextResponse('Internal Error', { status: 500 })
  }
}