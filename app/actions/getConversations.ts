import prisma from '../libs/prisma.db'
import getCurrentUser from './getCurrentUser'

export const getConversations = async () => {
  const curUser = await getCurrentUser()

  if (!curUser?.id) return []

  try {
    const conversations = await prisma.conversation.findMany({
      orderBy: {
        lastMessageAt: 'desc',
      },
      where: {
        userIds: {
          has: curUser.id,
        },
      },
      include: {
        users: true,
        messages: {
          include: {
            sender: true,
            seen: true,
          },
        },
      },
    })
    return conversations
  } catch (e) {
    return []
  }
}
