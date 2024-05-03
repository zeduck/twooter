import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export default async function Page() {
  const supabase = createServerComponentClient({ cookies });

  const { data: twoots } = await supabase.from('twoots').select()

  return (
    <pre>
      {JSON.stringify(twoots, null, 2)}
    </pre>
  )
}
