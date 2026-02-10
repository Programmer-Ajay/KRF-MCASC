import { LoginForm } from '@/components/login-form'
import { Metadata } from 'next'

export const metadata:Metadata={
  title:"Sign In",
}



const SignIn = async ({searchParams,}: {searchParams: Promise<{redirect?:string}>}) => {
  const params = await searchParams
  
  return (
    <div className="relative min-h-screen bg-black flex items-center justify-center">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full px-4 sm:px-6 py-8 sm:py-0">
        <LoginForm redirectTo={params.redirect}/>
      </div>
    </div>
  )
}

export default SignIn