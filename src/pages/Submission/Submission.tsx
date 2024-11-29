import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSubmission, getAssignment } from "../../services/dac-api";
import { Submission as sub, Assignment } from "../../types";
import { useAuth } from "../../hooks/useAuth";
import { SubmissionForm } from "../../components/SubmissionForm/SubmissionForm";
import styles from "./Submission.module.css";

export const Submission = () => {
  const params = useParams();
  const { user } = useAuth();
  const [submission, setSubmission] = useState<sub>();
  const [assignment, setAssignment] = useState<Assignment>();
  useEffect(() => {
    const updateSubmission = async () => {
      if (params.id) {
        const submission: sub = await getSubmission(params.id);
        const assign: Assignment = await getAssignment(submission.assignmentId);
        setSubmission(submission);
        setAssignment(assign);
      }
    };
    updateSubmission();
  }, [params.id]);

  return (
    <>
      {user && submission && assignment ? (
        <div className={styles.submission}>
          <div className={styles.submission__top}>
            <div className={styles.problems}>
              <div className={styles.problems__questions}>
                <p>Question</p>
                <ol className={styles.problems__list}>
                  {assignment.questions.map((question) => (
                    <li key={question._id}>{question.problem}</li>
                  ))}
                </ol>
              </div>
              <div className={styles.problems__answers}>
                <p>
                  {user.role === "tutor"
                    ? "Student's Response"
                    : "Your Response"}
                </p>
                {submission.answers.map((answer) => (
                  <p key={answer._id}>{answer.answer}</p>
                ))}
              </div>
              {user.role === "student" ? (
                <div>
                  <p>Answer</p>
                  {assignment.questions.map((question) => (
                    <p key={question._id}>{question.answer}</p>
                  ))}
                </div>
              ) : (
                <></>
              )}
            </div>
            <div>
              {user.role === "student" ? (
                <p>
                  Grade:{" "}
                  {submission.grade
                    ? submission.grade + ` /${assignment.totalPoints}`
                    : `___ /${assignment.totalPoints}`}
                </p>
              ) : (
                <></>
              )}
              <p>
                Due Date:{" "}
                {assignment.dueDate
                  ? new Date(assignment.dueDate).toLocaleDateString()
                  : ""}
              </p>
              <p>
                Date Submitted:{" "}
                {new Date(submission.submittedDate).toLocaleDateString()}
              </p>
            </div>
          </div>
          <hr />
          {user.role === "tutor" && assignment._id ? (
            <SubmissionForm
              submission={submission}
              totalPoints={assignment.totalPoints}
              assignId={assignment._id}
            ></SubmissionForm>
          ) : (
            <>
              <p>Feedback: {submission.feedback}</p>
            </>
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};
