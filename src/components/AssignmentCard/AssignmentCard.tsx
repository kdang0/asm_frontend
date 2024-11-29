import { Link } from "react-router-dom";
import styles from "./AssignmentCard.module.css";
import { useState } from "react";
import { getSubmissionBUA, publishAssignment } from "../../services/dac-api";
import { Submission } from "../../types";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
interface AssignmentCardProp {
  name: string;
  role: string;
  id: string;
  handleOnClick: (
    id: string,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  classId: string;
  accessLevel?: string;
  status: string;
}

//useEffect to grab possible submission using assignment ID if not then w.e
export default function AssignmentCard({
  name,
  role,
  id,
  handleOnClick,
  classId,
  accessLevel,
  status,
}: AssignmentCardProp) {
  const navigate = useNavigate();
  const [curStatus, setCurStatus] = useState<string>(status);
  const { user } = useAuth();

  const viewSubmission = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (user && id) {
      const submission: Submission = await getSubmissionBUA(user._id, id);
      navigate(`/submission/${submission._id}`);
    }
  };

  const handlePublish = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string
  ) => {
    e.preventDefault();
    await publishAssignment(id);
    setCurStatus("public");
  };
  return (
    <>
      {role == "tutor" ? (
        <Link to={`/assignment/view/${id}`} className={`${styles.cardLink}`}>
          <div className={`${styles.container}`}>
            <div>
              <p className={`${styles.name}`}>{name}</p>
            </div>
            <div className={`${styles.buttonContainer}`}>
              <button
                className={`${styles.button}`}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`/assignment/edit/${id}`);
                }}
              >
                edit
              </button>
              <button
                className={`${styles.button}`}
                onClick={(e) => handleOnClick(id, e)}
              >
                delete
              </button>

              <button
                disabled={curStatus === "private" ? false : true}
                className={`${styles.button}`}
                onClick={(e) => handlePublish(e, id)}
              >
                {curStatus === "private" ? "publish" : "published"}
              </button>
            </div>
          </div>
        </Link>
      ) : (
        <div>
          <div className={`${styles.container}`}>
            <p className={`${styles.name}`}>{name}</p>
            {accessLevel === "view" ? (
              <button
                onClick={(e) => viewSubmission(e)}
                className={`${styles.button}`}
              >
                view
              </button>
            ) : (
              <Link
                to={`/class/${classId}/assignment/${id}`}
                className={`${styles.button}`}
              >
                start
              </Link>
            )}
          </div>
        </div>
      )}
    </>
  );
}
