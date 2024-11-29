import { useState, useEffect } from "react";
import { Question } from "../../components/Question/Question";
import { getAssignment, submitAssignment } from "../../services/dac-api";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import styles from "./Assignment.module.css";
import { Assignment as assign } from "../../types";


export const Assignment = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const params = useParams();
  const [assignment, setAssignment] = useState<assign | null>(null);
  const [answerChoices, setAnswerChoices] = useState<Record<string, unknown>>(
    {}
  );

  useEffect(() => {
    const updateAssignment = async () => {
      if (params.assignmentId) {
        const assignment: assign = await getAssignment(params.assignmentId);
        setAssignment(assignment);
      }
    };
    updateAssignment();
  }, [params.assignmentId]);

  const handleSelection = (questionId: string, choice: string) => {
    setAnswerChoices((prevSelection) => ({
      ...prevSelection,
      [questionId]: choice,
    }));
  };

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const answers = [];
    const submission: Record<string, unknown> = {};
    for (const answerChoice in answerChoices) {
      const refAnswer = {
        questionId: answerChoice,
        answer: answerChoices[answerChoice],
      };
      answers.push(refAnswer);
    }
    submission["answers"] = answers;
    submission["classId"] = params.classId;
    submission["assignmentId"] = params.assignmentId;
    if (user) submission["id"] = user._id;
    const status = await submitAssignment(submission);
    if (status === 201) {
      navigate("/assignment");
    }
  };
  return (
    <>
      {assignment ? (
        <div className={`${styles.assignment}`}>
          <form
            className={`${styles.assignment__form}`}
            onSubmit={handleSubmit}
          >
            <h1 className={`${styles.assignment__title}`}>{assignment.name}</h1>
            <p>{assignment.description}</p>
            <div>
              {assignment.questions.map((question) => (
                <Question
                  key={question._id}
                  problem={question.problem}
                  choices={question.choices as string[]}
                  handleSelect={handleSelection}
                  id={question._id as string}
                />
              ))}
            </div>
            <div className={`${styles.assignment__btn}`}>
              <button
                disabled = {Object.keys(answerChoices).length === assignment.questions.length ? false : true}
                type="submit"
                className={`${styles["assignment__btn--submit"]}`}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      ) : (
        <>Loading...</>
      )}
    </>
  );
};
