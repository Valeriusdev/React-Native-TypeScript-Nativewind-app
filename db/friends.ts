import { supabase } from "@/lib/supabase";

export async function getFriends(id: string) {
  const { data, error } = await supabase.from("users").select("*").neq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}