import prisma from "../libs/prisma.db"

export const getMessages = async (id: string) => {
  try {
    const messages = await prisma.message.findMany({
      where: {
        conversationId: id
      },
      include: {
        seen: true,
        sender: true
      },
      orderBy : {
        createdAt: 'asc'
      }
    })
    return messages
  } catch (e) {
    return []
  }
}
