'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { signIn, signOut, useSession } from 'next-auth/react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Loader } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { RootState, AppDispatch } from '@/store/store'
import { useDispatch, useSelector } from 'react-redux'
import { sendData } from '@/store/slices/sessionSlice'

// Validation schema
const signupSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

export default function SignupForm() {
  const dispatch = useDispatch<AppDispatch>()
  const { data: session, status } = useSession()
  const router = useRouter()

  // ✅ Keep all hooks at the top, always in the same order
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
  })

  useEffect(() => {
    if (session) {
      if (session.user?.name && session.user?.email) {
        dispatch(
          sendData({
            name: session.user.name,
            email: session.user.email,
            message: '',
          })
        )
      }
      // Using replace instead of push for immediate redirection
      router.replace('/home')
    }
  }, [session, router, dispatch])

  const onSubmit = (data: any) => {
    console.log('Form Data:', data)
    alert('Signup Successful! (Backend Not Connected)')
  }

  // Show loading indicator during auth check OR while redirect is happening
  if (status === 'loading' || session) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader className="w-10 h-10 animate-spin text-gray-500" />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-sm shadow-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            Sign Up
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" {...register('name')} placeholder="John Doe" />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                {...register('email')}
                type="email"
                placeholder="you@example.com"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                {...register('password')}
                type="password"
                placeholder="••••••••"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>

            <Button type="submit" className="w-full">
              Sign Up
            </Button>
          </form>

          <div className="mt-4 text-center">
            <p className="text-gray-600">Or continue with</p>
            <Button
              onClick={() => signIn('google')}
              className="w-full mt-2 bg-blue-500 hover:bg-blue-600"
            >
              Sign In with Google
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
