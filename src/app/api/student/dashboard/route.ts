import { auth } from '@/lib/auth'
import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET(request: Request) {
  try {
    const session = await auth()

    if (!session?.user?.id || session.user.role !== 'student') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // ユーザー情報を取得
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // 最近のマネログを取得（5件）
    const recentLogs = await prisma.moneyLog.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: 'desc' },
      take: 5,
    })

    return NextResponse.json({
      moneyBalance: user.moneyBalance,
      recentLogs: recentLogs.map((log) => ({
        id: log.id,
        amount: log.amount,
        reason: log.reason,
        createdAt: log.createdAt.toISOString(),
      })),
    })
  } catch (error) {
    console.error('Dashboard API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
