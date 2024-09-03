import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import AuthButtonServer from './auth-button-server';
import { redirect } from 'next/navigation';
import { Database } from '@/lib/database.types';
import NewTwoot from './new-twoot';
import Twoots from './twoots';

export const dynamic = 'force-dynamic'; // for cookies

export default async function Page() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data: { session }} = await supabase.auth.getSession();
  if (!session) redirect('/login');
  const { data } = await supabase
    .from('twoots')
    .select('*, author: profiles(*), likes(user_id)')
    .order('created_at', { ascending: false });
  // author: is an alias
  
  const twoots = data?.map(twoot => ({
    ...twoot,
    author: Array.isArray(twoot.author) ? twoot.author[0] : twoot.author,
    user_has_liked_twoot: !!twoot.likes.find(like => like.user_id === session.user.id),
    likes: twoot.likes.length,
  })) ?? []

  return (
    <div className='w-full max-w-3xl mx-auto'>
      <div className='flex justify-between px-4 py-6 border border-gray-700 border-t-0'>
        <h1 className='text-xl font-bold'>Home</h1>
        <AuthButtonServer/>
      </div>
      <NewTwoot user = {session.user}/>
      <Twoots twoots={twoots}/>
    </div>
  )
}
