import { User, createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Image from "next/image";

export const dynamic = 'force-dynamic'; // for cookies

export default function NewTwoot({ user } : { user: User }) {
  const addTwoot = async (formData: FormData) => {
    'use server';
    const title = String(formData.get('title'));
    const supabase = createServerActionClient<Database>({ cookies });
    await supabase.from('twoots').insert({ title, user_id: user.id});
  };
  
  return (
    <form action={addTwoot} className="border border-gray-700 border-t-0">
      <div className="flex py-8 px-4">
        <div className="h-12 w-12">
          <Image 
            src={user.user_metadata.avatar_url} 
            alt='user avatar' 
            width={48} 
            height={48}
            className="rounded-full"
          />
        </div>
        <input 
          name='title' 
          className="bg-inherit flex-1 ml-2 text-2xl leading-loose placeholder-gray-500 px-2" 
          placeholder="What is happening?!"
        />
      </div>
    </form>
  );
}