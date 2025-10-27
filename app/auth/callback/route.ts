import { createClient } from '@/lib/supabase/client'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const origin = requestUrl.origin

  if (code) {
    const supabase = createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (error) {
      console.error('Error exchanging code for session:', error)
      return NextResponse.redirect(`${origin}/login?error=auth_failed`)
    }

    // Get user to check authorization
    const { data: { user } } = await supabase.auth.getUser()

    if (user) {
      const authorizedAdmins = process.env.NEXT_PUBLIC_AUTHORIZED_ADMINS?.split(',') || []
      const userGithubUsername = user.user_metadata?.user_name || user.user_metadata?.preferred_username

      if (!authorizedAdmins.includes(userGithubUsername)) {
        // User is not authorized, sign them out
        await supabase.auth.signOut()
        return NextResponse.redirect(`${origin}/unauthorized`)
      }
    }
  }

  // URL to redirect to after sign in process completes
  return NextResponse.redirect(`${origin}/admin`)
}
