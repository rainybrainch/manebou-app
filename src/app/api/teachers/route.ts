import { NextResponse } from 'next/server'
import { getRepository } from '@/lib/data/repository'
import { ApiResponse } from '@/types/ApiResponse'
import { validateSchoolId, ValidationError } from '@/lib/validation'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const schoolId = searchParams.get('schoolId')

    const repository = getRepository()
    let teachers
    if (schoolId) {
      validateSchoolId(schoolId)
      teachers = repository.getTeachersBySchool(schoolId)
    } else {
      teachers = []
    }

    const response: ApiResponse<typeof teachers> = {
      success: true,
      data: teachers,
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

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const repository = getRepository()
    const teacher = repository.createUser({
      ...body,
      role: 'teacher',
    })

    const response: ApiResponse<typeof teacher> = {
      success: true,
      data: teacher,
    }
    return NextResponse.json(response, { status: 201 })
  } catch (error) {
    const response: ApiResponse<null> = {
      success: false,
      error: 'Internal server error',
    }
    return NextResponse.json(response, { status: 500 })
  }
}
