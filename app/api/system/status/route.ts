import { NextResponse } from 'next/server'
import { ApiResponse } from '@/types/ApiResponse'

export async function GET() {
  try {
    const response: ApiResponse<{
      mode: 'local' | 'supabase'
      repository: string
      version: string
      supabaseConfigured: boolean
    }> = {
      success: true,
      data: {
        mode: 'local',
        repository: 'LocalRepository',
        version: 'phase5',
        supabaseConfigured: false,
      },
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
