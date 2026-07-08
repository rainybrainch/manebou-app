'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const user = localStorage.getItem('currentUser')
    if (!user) {
      router.push('/login')
    } else {
      setIsReady(true)
    }
  }, [router])

  if (!isReady) {
    return <div className="flex items-center justify-center h-screen">読み込み中...</div>
  }

  return <>{children}</>
}
