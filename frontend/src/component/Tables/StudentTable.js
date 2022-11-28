import { useEffect, useState } from "react"
import User from "../../api/User";
import { TBody } from "./Body";
import { UserTable } from "./Table"

export const StudentTable = () => {
  const [ students, setStudent ] = useState();

  const getStudent = async () => {
    const students = await User.admin.getStudents();
    setStudent(students.data)

  } 

  useEffect(() => {
    getStudent()
  }, [])

  return (
    <UserTable>
      {
        students && students.map((itm, idx) => (
          <TBody
            idx={idx + 1}
            user={itm}
          />
        ))
      }
    </UserTable>
  )
}
