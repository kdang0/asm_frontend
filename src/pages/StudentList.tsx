import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { StudentCard } from "../components/StudentCard/StudentCard";
import { Student } from "../types";
import { getStudents } from "../services/dac-api";


export const StudentList = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const { user } = useAuth();
  useEffect(() => {
    async function fetchStudents() {
      if (user) {
        const data = await getStudents(user._id);
        setStudents(data);
      }
    }
    fetchStudents();
  }, [user]);

  return (
    <div className="displayFlex flexColumn alignItemsCenter container gap10 padding15">
      {students.map((student) => (
        <StudentCard
          key={student._id}
          firstName={student.firstName}
          lastName={student.lastName}
        />
      ))}
    </div>
  );
};
