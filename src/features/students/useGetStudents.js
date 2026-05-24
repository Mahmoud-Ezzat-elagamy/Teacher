import { useQuery } from "@tanstack/react-query";
import { getStudentsApi } from "../../../services/apiStudents";

export default function useGetStudents(page, searchString) {
  const {
    data: students,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["students", page, searchString],
    queryFn: ({ size, page, searchString }) =>
      getStudentsApi(size, page, searchString),

    // Refetch data when window regains focus
    refetchOnWindowFocus: true,

    // Refetch data when network reconnects
    refetchOnReconnect: true,
  });

  return { students, isLoading, isError };
}
