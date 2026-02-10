

// components/header.tsx
// import { createClient } from "@/lib/supabase/server"
import { getCurrentUserWithRole } from "@/lib/auth/getCurrentUserWithRole"
import DesktopNav from "./desktop-nav"
import MobileNav from "./mobile-nav"

export default async function Header() {
  // const supabase = await createClient()
  // const { data } = await supabase.auth.getClaims()
  // const user = data?.claims ?? null

  const {user,role}= await getCurrentUserWithRole();

  return (
    <>
      <DesktopNav user={user} role={role} />
      <MobileNav user={user} role={role} />
    </>
  )
}
