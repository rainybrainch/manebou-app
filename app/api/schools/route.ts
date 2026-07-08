import { NextResponse } from 'next/server'
import { getRepository } from '@/lib/data/repository'
import { ApiResponse } from '@/types/ApiResponse'
import { validateSchoolName, validateSchoolCode, ValidationError } from '@/lib/validation'

export async function GET() {
  try {
    const repository = getRepository()
    const schools = repository.getSchools()
    const response: ApiResponse<typeof schools> = {
      success: true,
      data: schools,
    }
    return NextResponse.json(response)
  } catch (error) {
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
    const { name, code } = body

    validateSchoolName(name)
    validateSchoolCode(code)

    const repository = getRepository()
    const school = repository.createSchool({ name, code })

    const response: ApiResponse<typeof school> = {
      success: true,
      data: school,
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
