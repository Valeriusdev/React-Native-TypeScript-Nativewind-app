import { supabase } from "@/lib/supabase";

export async function getMovies() {

  const { data, error } = await supabase.from("movies").select("*");
  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function addMovie(movie: any) {
  const { error } = await supabase
    .from("movies")
    .insert({ name: movie.name, description: movie.description });

  if (error) {
    throw new Error(error.message);
  }
}
