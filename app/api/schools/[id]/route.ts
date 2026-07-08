import { NextResponse } from 'next/server'
import { getRepository } from '@/lib/data/repository'
import { ApiResponse } from '@/types/ApiResponse'
import { validateSchoolName, validateSchoolCode, ValidationError } from '@/lib/validation'

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const repository = getRepository()
    const school = repository.getSchool(params.id)

    if (!school) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'School not found',
      }
      return NextResponse.json(response, { status: 404 })
    }

    const response: ApiResponse<typeof school> = {
      success: true,
      data: school,
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

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const { name, code } = body

    if (name) validateSchoolName(name)
    if (code) validateSchoolCode(code)

    const repository = getRepository()
    const school = repository.updateSchool(params.id, { name, code })

    if (!school) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'School not found',
      }
      return NextResponse.json(response, { status: 404 })
    }

    const response: ApiResponse<typeof school> = {
      success: true,
      data: school,
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

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const repository = getRepository()
    const deleted = repository.deleteSchool(params.id)

    if (!deleted) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'School not found',
      }
      return NextResponse.json(response, { status: 404 })
    }

    const response: ApiResponse<null> = {
      success: true,
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
