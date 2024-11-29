import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Assignment, Class } from "../types";
import AssignmentForm from "../components/AssignmentForm/AssignmentForm";
import { getClasses, createAssignmentAPI } from "../services/dac-api";

export const AssignmentCreate = () => {
  const [classes, setClasses] = useState<Class[]>([]);
  const [assignment, setAssignment] = useState<Assignment>({
    name: "",
    description: "",
    totalPoints: 0,
    classId: "",
    questions: [],
  });
  const { user } = useAuth();
  const navigate = useNavigate();

  //Generates list of classes to be on options
  useEffect(() => {
    async function fetchClasses() {
      if (user) {
        const data = await getClasses(user._id, user.role);
        setClasses(data);
        setAssignment((prevAssignment) => ({
          ...prevAssignment,
          classId: data[0]._id,
        }));
      }
    }
    fetchClasses();
  }, [user]);

  /**
   * Creates the assignment upon submission
   * Things to TODO:
   * > Form validation
   * > Error handling
   * @param assignmentItem The assignment object you want to create
   */
  const createAssignment = async (assignmentItem: Assignment) => {
    if (user) {
      await createAssignmentAPI(user._id, assignmentItem);
    }
    navigate("/assignment");
  };

  return (
    <div className="displayFlex flexColumn alignItemsCenter container">
      <h1>Create Assignment</h1>
      {assignment.classId ? (
        <AssignmentForm
          assignmentItem={assignment}
          classes={classes}
          createAssignment={createAssignment}
          formType="create"
        />
      ) : (
        <p>loading</p>
      )}
    </div>
  );
};
