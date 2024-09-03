'use client';

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";

export default function GitHubButton() {
  const supabase = createClientComponentClient<Database>();

  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
  };

  return <div className="flex-col">
    <h1 className="text-center text-5xl pb-8">Log in</h1>

    <button onClick={handleSignIn} className="hover:bg-gray-800 p-8 rounded-xl">
      <Image
        src={'/github-mark-white.png'}
        alt='GitHub logo'
        width={100}
        height={100}
      />
    </button>
  </div>;
}