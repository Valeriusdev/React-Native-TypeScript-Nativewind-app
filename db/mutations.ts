import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addMovie } from "./movies";

export function useInsertMovie() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addMovie,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["movies"] });
    },
  });
}