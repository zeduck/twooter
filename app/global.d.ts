import { Database as DB } from '@/lib/database.types';

type Twoot = DB['public']['Tables']['twoots']['Row'];
type Profile = DB['public']['Tables']['profiles']['Row'];

declare global {
  type Database = DB;
  
  type TwootWithAuthor = Twoot & {
    author: Profile;
    likes: number;
    user_has_liked_twoot: boolean;
  }
};
