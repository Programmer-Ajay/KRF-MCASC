import { SignupForm } from '@/components/signup-form'
import { Metadata } from 'next'

export const metadata:Metadata={
  title:"Sign Up",
}
const Signup = async () => {
  return (
    <div className="relative min-h-screen bg-black flex items-center justify-center">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full px-4 sm:px-6 py-8 sm:py-0">
        <SignupForm />
      </div>
    </div>
  )
}

export default Signup
