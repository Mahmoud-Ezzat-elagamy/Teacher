import { useState } from "react";
import StudentsPageLayout from "../components/StudentsPageLayout";
import UsersHeader from "../components/UsersHeader";

function Students() {
  const [inputValue, setInputValue] = useState("");

  return (
    <>
      <UsersHeader inputValue={inputValue} onInputChange={setInputValue} />
      <StudentsPageLayout inputValue={inputValue} />
    </>
  );
}

export default Students;
