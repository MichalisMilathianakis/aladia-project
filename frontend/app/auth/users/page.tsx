'use client'


import * as React from 'react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { fetchUsers } from '@/lib/api'
import type { User } from '@/lib/api'


export default function UsersPage() {
  const [users, setUsers] = React.useState<User[]>([])
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)


  async function loadUsers() {
    setLoading(true)
    setError(null)
    const response = await fetchUsers()
    setLoading(false)


    if (response.success && response.data) {
      setUsers(response.data)
    } else {
      setError(response.error ?? 'Failed to fetch users')
    }
  }


  React.useEffect(() => {
    loadUsers()
  }, [])


  return (
    <main className="flex min-h-[calc(100vh-56px)] flex-col items-center bg-gray-50 px-4 py-8 dark:bg-gray-950">
      <div className="w-full max-w-3xl space-y-6">
        <Card>
          <div className="mb-4 flex items-center justify-between">
            <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">User List</h1>
            <Button onClick={loadUsers} variant="secondary" size="sm" disabled={loading}>
              {loading ? 'Refreshing…' : 'Refresh'}
            </Button>
          </div>


          {error && (
            <p className="rounded-md bg-red-50 p-3 text-sm text-red-600 dark:bg-red-950/40 dark:text-red-300">{error}</p>
          )}


          {!loading && !error && users.length === 0 && (
            <p className="text-gray-600 dark:text-gray-300">No users found.</p>
          )}


          {loading && (
            <p className="animate-pulse text-gray-600 dark:text-gray-300">Loading users...</p>
          )}


          <div className="grid gap-3 sm:grid-cols-2">
            {users.map((u) => (
              <Card key={u.id} className="p-4">
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">{u.name}</h2>
                <p className="text-sm text-gray-700 dark:text-gray-300">{u.email}</p>
                <p className="text-xs text-gray-400 dark:text-gray-400">
                  Joined: {new Date(u.createdAt).toLocaleDateString()}
                </p>
              </Card>
            ))}
          </div>
        </Card>
      </div>
    </main>
  )
}