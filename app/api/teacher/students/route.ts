import { NextResponse } from 'next/server'
import { getRepository } from '@/lib/data/repository'
import { ApiResponse } from '@/types/ApiResponse'
import { validateSchoolId, ValidationError } from '@/lib/validation'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const schoolId = searchParams.get('schoolId')

    if (!schoolId) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'schoolId is required',
      }
      return NextResponse.json(response, { status: 400 })
    }

    validateSchoolId(schoolId)

    const repository = getRepository()
    const students = repository.getStudentsBySchool(schoolId)

    const response: ApiResponse<typeof students> = {
      success: true,
      data: students,
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
