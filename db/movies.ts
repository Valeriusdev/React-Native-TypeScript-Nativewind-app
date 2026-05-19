import { supabase } from "@/lib/supabase";

export async function getMovies() {
  const { data, error } = await supabase.from("movies").select("*");
  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function addMovie(name: string, description: string) {
  const { error } = await supabase.from("movies").insert({ name, description });

  if (error) {
    throw new Error(error.message);
  }
}