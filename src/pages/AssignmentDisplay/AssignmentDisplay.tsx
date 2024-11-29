import { useState, useEffect } from "react";
import { Assignment, Submission } from "../../types";
import { getAssignment, getSubmissions } from "../../services/dac-api";
import { useParams } from "react-router-dom";
import styles from "./AssignmentDisplay.module.css";
import SubmissionCard from "../../components/SubmissionCard/SubmissionCard";

export const AssignmentDisplay = () => {
  const [assignment, setAssignment] = useState<Assignment | null>(null);
  const [submissions, setSubmissions] = useState<Submission[]>();
  const params = useParams();

  useEffect(() => {
    const updateAssignment = async () => {
      if (params.id) {
        const assignment: Assignment = await getAssignment(params.id);
        setAssignment(assignment);
      }
    };
    updateAssignment();
  }, [params.id]);

  useEffect(() => {
    const updateSubmList = async () => {
      if (params.id) {
        const submList: Submission[] = await getSubmissions(params.id);
        setSubmissions(submList);
      }
    };
    updateSubmList();
  }, [params.id]);

  return (
    <>
      {assignment && submissions ? (
        <div className={`${styles.container}`}>
          <div className={`${styles.assignment}`}>
            <h1>{assignment.name}</h1>
            <p>{assignment.description}</p>
            <div>
              {assignment.questions.map((question) => (
                <div key={question._id}>
                  <h1>{question.problem}</h1>
                  {question.choices.map((choice, index) => (
                    <div>
                      <p key={(choice as string) + index}>{choice as string}</p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2>Submissions</h2>
            <div className={`${styles.submission__container}`}>
              {submissions.map((submission) => (
                <SubmissionCard
                  name={submission.studName}
                  date={submission.submittedDate}
                  key={submission._id}
                  id={submission._id}
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <>Loading</>
      )}
    </>
  );
};
