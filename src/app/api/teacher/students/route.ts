import { auth } from '@/lib/auth'
import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET(request: Request) {
  try {
    const session = await auth()

    if (!session?.user?.id || session.user.role !== 'teacher') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // 同じ学校の生徒を取得
    const students = await prisma.user.findMany({
      where: {
        schoolId: session.user.schoolId as string,
        role: 'student',
      },
      orderBy: { fullName: 'asc' },
      select: {
        id: true,
        fullName: true,
        email: true,
        moneyBalance: true,
      },
    })

    return NextResponse.json({
      students,
      total: students.length,
    })
  } catch (error) {
    console.error('Students API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
