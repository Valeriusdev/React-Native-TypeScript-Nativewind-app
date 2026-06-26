import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { getFriends } from "./friends";
import { getMovies } from "./movies";
import { getUser } from "./user";

export function useMovies() {
  return useQuery({
    queryKey: ["movies"],
    queryFn: getMovies,
  });
}

export function useUser() {
  const { session } = useAuth();

  return useQuery({
    queryKey: ["user"],
    queryFn: () => getUser(session!.user.id),
    enabled: Boolean(session!.user),
  });
}

export function useFriends() {
  const { data: user } = useUser();

  return useQuery({
    queryKey: ["friends"],
    queryFn: () => getFriends(user!.id),
    enabled: Boolean(user),
  });
}