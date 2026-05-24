import { supabase } from "@/lib/supabase";

export async function getUser() {
  const { data, error } = await supabase.from("users").select("*").single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}