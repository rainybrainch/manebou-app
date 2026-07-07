import { NextResponse } from 'next/server'
import { getRepository } from '@/lib/data/repository'
import { ApiResponse } from '@/types/ApiResponse'
import { validateUserId, ValidationError } from '@/lib/validation'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'userId is required',
      }
      return NextResponse.json(response, { status: 400 })
    }

    validateUserId(userId)

    const repository = getRepository()
    const user = repository.getUser(userId)

    if (!user) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'User not found',
      }
      return NextResponse.json(response, { status: 404 })
    }

    const logs = repository.getMoneyLogs(userId).slice(0, 10)

    const response: ApiResponse<{
      user: typeof user
      moneyBalance: number
      logs: typeof logs
    }> = {
      success: true,
      data: {
        user,
        moneyBalance: user.moneyBalance,
        logs,
      },
    }
    return NextResponse.json(response)
  } catch (error) {
    if (error instanceof ValidationError) {
      const response: ApiResponse<null> = {
        success: false,
        error: error.message,
      }
      return NextResponse.json(response, { status: 400 })
    }

    const response: ApiResponse<null> = {
      success: false,
      error: 'Internal server error',
    }
    return NextResponse.json(response, { status: 500 })
  }
}
