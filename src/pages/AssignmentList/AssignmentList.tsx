import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../hooks/useAuth";
import AssignmentCard from "../../components/AssignmentCard/AssignmentCard";
import { getAssignments, deleteAssignment } from "../../services/dac-api";
import { Link } from "react-router-dom";
import styles from "./AssignmentList.module.css";
import { Assignment } from "../../types";

axios.defaults.withCredentials = true;

export const AssignmentList = () => {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const { user } = useAuth();
  useEffect(() => {
    async function fetchAssignments() {
      if (user) {
        const data = await getAssignments(user._id, user.role);
        setAssignments(data);
      }
    }
    fetchAssignments();
  }, [user]);

  const handleAssignment = async (
    assignmentId: string,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setAssignments((prevAssignment) =>
      prevAssignment.filter((assignment) => assignment._id !== assignmentId)
    );
    await deleteAssignment(assignmentId);
  };

  return (
    <div className="displayFlex flexColumn alignItemsCenter container gap10 padding15">
      {user && user.role == "tutor" ? (
        <Link to="/assignment/create">
          <button className={`${styles.button}`}>create assignment</button>
        </Link>
      ) : (
        <></>
      )}
      {user ? (
        assignments.map((assignment) => {
          if (assignment._id && assignment.status) {
            return (
              <AssignmentCard
                key={assignment._id}
                name={assignment.name}
                role={user.role}
                id={assignment._id}
                handleOnClick={handleAssignment}
                classId={assignment.classId}
                accessLevel={assignment.accessLevel}
                status={assignment.status}
              />
            );
          }
        })
      ) : (
        <></>
      )}
    </div>
  );
};
