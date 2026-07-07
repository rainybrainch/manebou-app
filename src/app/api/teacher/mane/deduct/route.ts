import { auth } from '@/lib/auth'
import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    const session = await auth()

    if (!session?.user?.id || session.user.role !== 'teacher') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { studentId, amount, reason, memo } = body

    if (!studentId || !amount || amount <= 0) {
      return NextResponse.json(
        { error: 'Invalid parameters' },
        { status: 400 }
      )
    }

    // トランザクションで更新
    const result = await prisma.$transaction(async (tx) => {
      // ユーザーのマネ残高を更新（減算）
      const user = await tx.user.update({
        where: { id: studentId },
        data: { moneyBalance: { decrement: amount } },
      })

      // マネログを作成（負数で記録）
      await tx.moneyLog.create({
        data: {
          userId: studentId,
          schoolId: session.user.schoolId as string,
          amount: -amount,
          reason,
          memo,
          teacherId: session.user.id,
        },
      })

      return user
    })

    return NextResponse.json({
      success: true,
      newBalance: result.moneyBalance,
    })
  } catch (error) {
    console.error('Mane deduct API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
