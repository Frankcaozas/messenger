import getCurrentUser from './getCurrentUser'
import prisma from '../libs/prisma.db'
export const getConversationById = async (id: string) => {
  try {
    const curUser = await getCurrentUser()

    if (!curUser?.email) return null

    const conversation = await prisma.conversation.findUnique({
      where: {
        id: id
      },
      include: {
        users: true,
      },
    })
    return conversation
  } catch (e) {
    return null
  }
}
