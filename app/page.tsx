import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import AuthButtonServer from './auth-button-server';
import { redirect } from 'next/navigation';
import { Database } from '@/lib/database.types';

export default async function Page() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data: { session }} = await supabase.auth.getSession();
  if (!session) redirect('/login');
  const { data: twoots } = await supabase
    .from('twoots')
    .select('*, auth.profiles(*)');

  return (
    <>
      <AuthButtonServer/>
      <pre>
        {JSON.stringify(twoots, null, 2)}
      </pre>
    </>
  )
}
