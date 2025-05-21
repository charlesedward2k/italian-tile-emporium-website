
import { User } from '@supabase/supabase-js';

export interface AppUser extends User {
  firstName?: string | null;
  lastName?: string | null;
}
