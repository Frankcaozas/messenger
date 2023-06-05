import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import prisma from '../../libs/prisma.db'
export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json()

    if (!name || !email || !password)
      return new NextResponse('Missing Credentials', { status: 400 })
    const salt = await bcrypt.genSalt(12)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await prisma.user.create({
      data: {
        email,
        name,
        hashedPassword,
      },
    })

    return NextResponse.json(user)
  } catch (error) {
    console.log('REGISTER ',error)
    return new NextResponse('Internal Error', {status: 500})
  }
}
