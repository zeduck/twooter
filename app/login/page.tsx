import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import GitHubButton from "./github-button";

export const dynamic = 'force-dynamic'; // for cookies

export default async function Login() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) redirect('/');

  return (
    <div className="flex-1 flex justify-center items-center">
      <GitHubButton/>
    </div>
  );
}