import getCurrentUser from './getCurrentUser'

export const getConversationById = async (id: string) => {
  try {
    const curUser = await getCurrentUser()

    if (!curUser?.email) return null

    const conversation = prisma?.conversation.findUnique({
      where: {
        id,
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
