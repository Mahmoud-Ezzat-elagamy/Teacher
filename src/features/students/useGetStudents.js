import { useQuery } from "@tanstack/react-query";
import { getStudentsApi } from "../../../services/apiStudents";

export default function useGetStudents(size, page, searchString) {
  const {
    data: students,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["students", size, page, searchString],
    queryFn: () => getStudentsApi(size, page, searchString),

    // Refetch data when window regains focus
    refetchOnWindowFocus: true,

    // Refetch data when network reconnects
    refetchOnReconnect: true,
  });

  return { studentsData: students, isLoading, isError };
}
