import { NextResponse } from 'next/server'
import { getRepository } from '@/lib/data/repository'
import { ApiResponse } from '@/types/ApiResponse'
import { validateUserId, validateAmount, validateReason, ValidationError } from '@/lib/validation'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { studentId, amount, reason, memo, teacherId, schoolId } = body

    validateUserId(studentId)
    validateAmount(amount)
    validateReason(reason)

    const repository = getRepository()
    const student = repository.getUser(studentId)

    if (!student) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'Student not found',
      }
      return NextResponse.json(response, { status: 404 })
    }

    const updatedUser = repository.updateUserBalance(studentId, amount)
    repository.addMoneyLog({
      userId: studentId,
      schoolId: student.schoolId,
      amount,
      reason,
      memo: memo || null,
      teacherId: teacherId || 'unknown',
    })

    const response: ApiResponse<{ newBalance: number }> = {
      success: true,
      data: {
        newBalance: updatedUser?.moneyBalance || 0,
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
