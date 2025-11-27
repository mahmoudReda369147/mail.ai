import { AuthForm } from "@/components/auth/auth-form"
import { AuthSidebar } from "@/components/auth/auth-sidebar"

export default function AuthPage() {
  return (
    <div className="min-h-screen flex">
      <div className="flex-1 flex items-center justify-center p-4 sm:p-8">
        <AuthForm />
      </div>
      <div className="hidden lg:block">
        <AuthSidebar />
      </div>
    </div>
  )
}
