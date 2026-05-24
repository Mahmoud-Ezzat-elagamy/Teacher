import { CiMenuKebab } from "react-icons/ci";
import Table from "./Table";
import Spinner from "./Spinner";
import useGetStudents from "../features/students/useGetStudents";
import Pagination from "./Pagination";

function StudentsPageLayout({ inputValue }) {
  const page = 1;

  const { students, isLoading, isError } = useGetStudents(page, inputValue);

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
        {students.length === 0 ? (
          <p>No students found.</p>
        ) : (
          students.map((student) => (
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
        <Pagination />
      </Table.Footer>
    </Table>
  );
}

export default StudentsPageLayout;
