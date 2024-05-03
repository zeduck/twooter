import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";
import AuthButtonClient from "../auth-button-client";
import { cookies } from "next/headers";

export default async function Login() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) redirect('/');

  return <AuthButtonClient session = {session}/>;
}