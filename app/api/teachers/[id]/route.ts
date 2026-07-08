import { NextResponse } from 'next/server'
import { getRepository } from '@/lib/data/repository'
import { ApiResponse } from '@/types/ApiResponse'

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const repository = getRepository()
    const teacher = repository.getUser(params.id)

    if (!teacher) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'Teacher not found',
      }
      return NextResponse.json(response, { status: 404 })
    }

    const response: ApiResponse<typeof teacher> = {
      success: true,
      data: teacher,
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
    const repository = getRepository()
    const teacher = repository.updateUser(params.id, body)

    if (!teacher) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'Teacher not found',
      }
      return NextResponse.json(response, { status: 404 })
    }

    const response: ApiResponse<typeof teacher> = {
      success: true,
      data: teacher,
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

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const repository = getRepository()
    const deleted = repository.deleteUser(params.id)

    if (!deleted) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'Teacher not found',
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
