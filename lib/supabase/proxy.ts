
 import { createServerClient } from "@supabase/ssr"
import { NextRequest, NextResponse } from "next/server"
import {ROUTES} from "@/lib/constants"

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )

          response = NextResponse.next({ request })

          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  


  const pathname = request.nextUrl.pathname

   const inRoute=(routes:readonly string[])=> routes.some((route)=>pathname.startsWith(route));



  const isProtectedPath=inRoute(ROUTES.PROCTECTED)||
                        inRoute(ROUTES.ADMIN)||
                        inRoute(ROUTES.COORDINATOR);
     
      const isAuthPath = inRoute(ROUTES.AUTH);

     // If the page is PUBLIC (not protected, not login), STOP HERE.
  // Don't wait for Supabase. Serve the page immediately.
  if (!isProtectedPath && !isAuthPath) {
    return response;
  }

        // MUST call getClaims (safe)
  const { data } = await supabase.auth.getClaims();
  const user = data?.claims
  // console.log("user:",user)


      if (isProtectedPath && !user){

        const url = request.nextUrl.clone()
    // console.log("procted route runs block runs");

    url.pathname = "/login"
    url.searchParams.set("redirect",request.nextUrl.pathname+request.nextUrl.search)
    // console.log("url::",url)
    return NextResponse.redirect(url)
      }
    
      if(isAuthPath && user){
        return NextResponse.redirect(new URL("/",request.url));
      }

  return response;

}






// import { NextResponse, type NextRequest } from 'next/server'

// export async function updateSession(request: NextRequest) {
//   let supabaseResponse = NextResponse.next({
//     request,
//   })

//   // With Fluid compute, don't put this client in a global environment
//   // variable. Always create a new one on each request.
//   const supabase = createServerClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
//     {
//       cookies: {
//         getAll() {
//           return request.cookies.getAll()
//         },
//         setAll(cookiesToSet) {
//           cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
//           supabaseResponse = NextResponse.next({
//             request,
//           })
//           cookiesToSet.forEach(({ name, value, options }) => supabaseResponse.cookies.set(name, value, options))
//         },
//       },
//     }
//   )

//   // Do not run code between createServerClient and
//   // supabase.auth.getClaims(). A simple mistake could make it very hard to debug
//   // issues with users being randomly logged out.

//   // IMPORTANT: If you remove getClaims() and you use server-side rendering
//   // with the Supabase client, your users may be randomly logged out.
//   const { data } = await supabase.auth.getClaims()

//   const user = data?.claims

//   if (
//     !user &&
//     !request.nextUrl.pathname.startsWith('/login') &&
//     !request.nextUrl.pathname.startsWith('/register')
//   ) {
//     // no user, potentially respond by redirecting the user to the login page
//     const url = request.nextUrl.clone()
//     url.pathname = '/register'
//     return NextResponse.redirect(url)
//   }


 


//   // IMPORTANT: You *must* return the supabaseResponse object as it is. If you're
//   // creating a new response object with NextResponse.next() make sure to:
//   // 1. Pass the request in it, like so:
//   //    const myNewResponse = NextResponse.next({ request })
//   // 2. Copy over the cookies, like so:
//   //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
//   // 3. Change the myNewResponse object to fit your needs, but avoid changing
//   //    the cookies!
//   // 4. Finally:
//   //    return myNewResponse
//   // If this is not done, you may be causing the browser and server to go out
//   // of sync and terminate the user's session prematurely!

//   return supabaseResponse
//  }








  // const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
  //   pathname.startsWith(route)
  // )
  // // console.log("isProtectedRoute",isProtectedRoute)
  // const isAuthRoute = AUTH_ROUTES.some((route) =>
  //   pathname.startsWith(route)
  // )

  // // admin routes 
  // const isAdminRoute= ADMIN_ROUTES.some((route)=>pathname.startsWith(route))
  
  // // cordinator routes
  // const isCoordinatorRoute= COORDINATOR_ROUTES.some((route)=>pathname.startsWith(route))

  // // 1 Not logged in + protected route → login
  // if (!user && (isProtectedRoute || isAdminRoute ||isCoordinatorRoute)) {
  //   const url = request.nextUrl.clone()
  //   // console.log("procted route runs block runs");

  //   url.pathname = "/login"
  //   url.searchParams.set("redirect",request.nextUrl.pathname+request.nextUrl.search)
  //   console.log("url::",url)
  //   return NextResponse.redirect(url)
  // }

  // // All all admin routes
  // if(user && isAdminRoute && role!=="admin"){
  //   console.log("admin routes::",role)
  //   return NextResponse.next()
    
  // }
  // if(user && isCoordinatorRoute && role!=="coordinator"){
  //   console.log("cordinator routes::",role)
  //   return NextResponse.next()
    
  // }



  

  // // 2️ Logged in + auth pages → home
  // if (user && isAuthRoute) {
  //   // console.log("Auth route runs block runs");

  //   const url = request.nextUrl.clone()
  //   url.pathname = "/"
  //   return NextResponse.redirect(url)
  // }

  // // 3️ Home & public pages → always allowed
  // // Allow server actions
