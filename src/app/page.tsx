import { SignIn } from '@/components/auth/sign-in'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">Next.js Auth</h1>
      <SignIn />
    </main>
  )
}
