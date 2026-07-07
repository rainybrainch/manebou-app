import { NextResponse } from 'next/server'
import { getRepository } from '@/lib/data/repository'
import { ApiResponse } from '@/types/ApiResponse'
import { validateClassName, validateClassCode, ValidationError } from '@/lib/validation'

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const repository = getRepository()
    const classData = repository.getClass(params.id)

    if (!classData) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'Class not found',
      }
      return NextResponse.json(response, { status: 404 })
    }

    const response: ApiResponse<typeof classData> = {
      success: true,
      data: classData,
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
    const { name, code, teacherId } = body

    if (name) validateClassName(name)
    if (code) validateClassCode(code)

    const repository = getRepository()
    const classData = repository.updateClass(params.id, { name, code, teacherId })

    if (!classData) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'Class not found',
      }
      return NextResponse.json(response, { status: 404 })
    }

    const response: ApiResponse<typeof classData> = {
      success: true,
      data: classData,
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
    const deleted = repository.deleteClass(params.id)

    if (!deleted) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'Class not found',
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
