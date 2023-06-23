export const getMessages = async (id: string) => {
  try {
    const message = prisma?.message.findMany({
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
    return message
  } catch (e) {
    return []
  }
}
