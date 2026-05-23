import { useQuery } from "@tanstack/react-query";
import { getMovies } from "./movies";

export function useMovies() {
  return useQuery({
    queryKey: ["movies"],
    queryFn: getMovies,
  });
}