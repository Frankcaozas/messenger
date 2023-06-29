import getCurrentUser from '@/app/actions/getCurrentUser'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const curUser = await getCurrentUser()
    if (!curUser?.email || !curUser?.id)
      return new NextResponse('Unathorized', { status: 401 })
    const body = await request.json()
    const { name, image } = body
    const updatedUser = await prisma?.user.update({
      where: {
        id: curUser.id,
      },
      data: {
        name,
        image,
      },
    })
    return NextResponse.json(updatedUser)
  } catch (e) {
    return new NextResponse('Internal Error', { status: 500 })
  }
}
