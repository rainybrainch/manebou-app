import { NextResponse } from 'next/server'
import { getRepository } from '@/lib/data/repository'
import { ApiResponse } from '@/types/ApiResponse'
import { validateClassName, validateClassCode, validateSchoolId, ValidationError } from '@/lib/validation'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const schoolId = searchParams.get('schoolId')

    const repository = getRepository()
    let classes
    if (schoolId) {
      validateSchoolId(schoolId)
      classes = repository.getClassesBySchool(schoolId)
    } else {
      classes = []
    }

    const response: ApiResponse<typeof classes> = {
      success: true,
      data: classes,
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
    const { schoolId, name, code, teacherId } = body

    validateSchoolId(schoolId)
    validateClassName(name)
    validateClassCode(code)

    const repository = getRepository()
    const classData = repository.createClass({
      schoolId,
      name,
      code,
      teacherId,
    })

    const response: ApiResponse<typeof classData> = {
      success: true,
      data: classData,
    }
    return NextResponse.json(response, { status: 201 })
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
