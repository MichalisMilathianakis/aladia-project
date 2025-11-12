'use client'


import * as React from 'react'
import { InputField } from '@/components/ui/InputField'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { apiFetch } from '@/lib/api'


interface RegisterResponse {
  id: string
  email: string
  name: string
  createdAt: string
}


export default function RegisterPage() {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [name, setName] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [success, setSuccess] = React.useState<string | null>(null)
  const [error, setError] = React.useState<string | null>(null)


  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(null)


    const response = await apiFetch<RegisterResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, name }),
    })


    setLoading(false)


    if (response.success) {
      setSuccess(`User "${response.data?.email}" registered successfully!`)
      setEmail('')
      setPassword('')
      setName('')
    } else {
      setError(response.error ?? 'Registration failed')
    }
  }


  return (
    <main className="flex min-h-[calc(100vh-56px)] items-center justify-center bg-gray-50 px-4 py-8 dark:bg-gray-950">
      <Card className="w-full max-w-md">
        <h1 className="mb-4 text-xl font-semibold text-gray-900 dark:text-gray-100">Register User</h1>


        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField
            label="Name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />


          <InputField
            label="Email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />


          <InputField
            label="Password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />


          <Button
            type="submit"
            variant="primary"
            size="md"
            isLoading={loading}
            disabled={loading}
          >
            Register
          </Button>


          {error && (
            <p className="rounded-md bg-red-50 p-2 text-sm text-red-600 dark:bg-red-950/40 dark:text-red-300">
              {error}
            </p>
          )}
          {success && (
            <p className="rounded-md bg-green-50 p-2 text-sm text-green-700 dark:bg-green-950/40 dark:text-green-300">
              {success}
            </p>
          )}
        </form>
      </Card>
    </main>
  )
}