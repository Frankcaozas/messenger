import { getServerSession } from 'next-auth'
import { authOption } from '../api/auth/[...nextauth]/route'

const getSession = async () => {
  return await getServerSession(authOption)
}

export default getSession
