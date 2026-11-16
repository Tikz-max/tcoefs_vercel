// Decides whether a signed-in Supabase user is an authorised administrator.
// Pure and dependency-free so it can run in middleware, routes and the browser.

type MaybeUser = {
  user_metadata?: Record<string, any> | null;
  app_metadata?: Record<string, any> | null;
  identities?: { provider?: string; identity_data?: Record<string, any> | null }[] | null;
} | null;

export function authorizedAdmins(): string[] {
  return (process.env.NEXT_PUBLIC_AUTHORIZED_ADMINS ?? "")
    .split(",")
    .map((name) => name.trim().toLowerCase())
    .filter(Boolean);
}

/** GitHub username as reported by the provider (not user-editable data). */
export function githubUsername(user: MaybeUser): string | null {
  if (!user) return null;
  const identity = user.identities?.find((i) => i.provider === "github");
  const fromIdentity =
    identity?.identity_data?.user_name ??
    identity?.identity_data?.preferred_username;
  const fromMetadata =
    user.user_metadata?.user_name ?? user.user_metadata?.preferred_username;
  const name = fromIdentity ?? fromMetadata;
  return typeof name === "string" ? name.toLowerCase() : null;
}

export function isAuthorizedAdmin(user: MaybeUser): boolean {
  const name = githubUsername(user);
  return !!name && authorizedAdmins().includes(name);
}
