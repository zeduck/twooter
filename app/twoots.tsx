'use client';

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Likes from "./likes";
import { useEffect, useOptimistic } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Twoots({ twoots } : { twoots : TwootWithAuthor[] }) {
  const [optimisticTwoots, addOptimisticTwoot] = useOptimistic<TwootWithAuthor[], TwootWithAuthor>(
    twoots, 
    (currentOptimisticTwoots, newTwoot) => {
      const newOptimisticTwoots = [...currentOptimisticTwoots];
      const index = newOptimisticTwoots.findIndex((twoot) => twoot.id === newTwoot.id);
      newOptimisticTwoots[index] = newTwoot;
      return newOptimisticTwoots;
    }
  );

  const supabase = createClientComponentClient<Database>();
  const router = useRouter();

  useEffect(() => {
    const channel = supabase
      .channel('realtime twoots')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'twoots'
      }, (payload) => {
        router.refresh();
      }).subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
  }, [router, supabase]);

  return optimisticTwoots.map(twoot => (
    <div key={twoot.id} className="border border-gray-800 border-t-0 px-4 py-8 flex">
      <div className="h-12 w-12">
        <Image
          className="rounded-full"
          src={twoot.author.avatar_url}
          alt="twoot user avatar"
          width={48}
          height={48}
        />
      </div>
      <div className="ml-4">
        <p> 
          <span className="font-bold">
            {twoot.author.user_name} 
          </span>
        </p> 
        <p> {twoot.title} </p>
        <Likes twoot={twoot} addOptimisticTwoot={addOptimisticTwoot}/>
      </div>
    </div>
  ))
}