import { useForm } from "react-hook-form";
import { Submission } from "../../types";
import styles from './SubmissionForm.module.css'
import { updateSubmission } from "../../services/dac-api";
import { useNavigate } from "react-router-dom";

interface SubmissionFormProp {
  submission: Submission;
  totalPoints: number;
  assignId: string;
}

export const SubmissionForm = ({ submission, totalPoints, assignId }: SubmissionFormProp) => {
   const navigate = useNavigate();
  const methods = useForm<Submission>({
    defaultValues: submission,
  });
  const { register, handleSubmit } = methods;
  

  return (
    <form onSubmit={handleSubmit(async (data) => {
        const res : boolean = await updateSubmission(data._id, data);
        if(res){
            navigate(`/assignment/view/${assignId}`)
        }
    })}>
      <div>
        <label>Grade:</label>
        <input
          type="number"
          size={4}
          min={0}
          max={totalPoints}
          {...register("grade")}
        />{" "}
        <span>/{totalPoints}</span>
      </div>
      <div>
        <p>
          <label>Feedback:</label>
        </p>
        <textarea rows={4} cols={50} {...register("feedback")}></textarea>
      </div>
      <div className={styles.btn}>
        <button type="submit" className={styles["btn--save"]}>
          Save
        </button>
      </div>
    </form>
  );
};
