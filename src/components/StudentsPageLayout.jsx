import { CiMenuKebab } from "react-icons/ci";
import Table from "./Table";
import Spinner from "./Spinner";
import useGetStudents from "../features/students/useGetStudents";
import Pagination from "./Pagination";
import { useSearchParams } from "react-router-dom";

function StudentsPageLayout({ inputValue }) {
  const [searchParam, setSearchParam] = useSearchParams();
  const page = parseInt(searchParam.get("page") || "1", 10) || 1;
  const size = parseInt(searchParam.get("size") || "10", 10) || 10;
  const { studentsData, isLoading, isError } = useGetStudents(
    size,
    page,
    inputValue,
  );

  console.log("studentsData", studentsData);
  const {
    items: students,
    totalCount,
    totalPages,
    resultFrom,
    resultTo,
  } = studentsData || {};

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-red-500">
          Failed to load students. Please try again.
        </p>
      </div>
    );
  }

  return (
    <Table layout="2fr 4fr 2fr 1fr">
      <Table.Header>
        <Table.Cell className="font-bold">Name</Table.Cell>
        <Table.Cell className="font-bold">Email</Table.Cell>
        <Table.Cell className="font-bold">Role</Table.Cell>
      </Table.Header>

      <Table.Body>
        {students?.length === 0 ? (
          <p>No students found.</p>
        ) : (
          students?.map((student) => (
            <Table.Row key={student.email}>
              <Table.Cell>{student.name}</Table.Cell>
              <Table.Cell>{student.email}</Table.Cell>
              <Table.Cell>{student.role}</Table.Cell>
              <Table.Cell>
                <CiMenuKebab />
              </Table.Cell>
            </Table.Row>
          ))
        )}
      </Table.Body>

      <Table.Footer>
        <Pagination
          setSearchParam={setSearchParam}
          totalCount={totalCount}
          totalPages={totalPages}
          resultFrom={resultFrom}
          resultTo={resultTo}
        />
      </Table.Footer>
    </Table>
  );
}

export default StudentsPageLayout;
