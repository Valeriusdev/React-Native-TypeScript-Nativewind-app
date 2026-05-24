import { useQuery } from "@tanstack/react-query";
import { getMovies } from "./movies";
import { getUser } from "./user";

export function useMovies() {
  return useQuery({
    queryKey: ["movies"],
    queryFn: getMovies,
  });
}

export function useUser() {
  return useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });
}