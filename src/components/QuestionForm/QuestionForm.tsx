import { useFormContext, useFieldArray } from "react-hook-form";
//REMINDER TO STORE THESE TYPES AND INTERFACES IN ANOTHER FILE TO REDUCE REDUNDANCY
interface QuestionFormProps {
  index: number;
}

export const QuestionForm = ({ index }: QuestionFormProps) => {
  const { register, control } = useFormContext();
  const { fields } = useFieldArray({
    control,
    name: `questions.${index}.choices`,
  });

  return (
    <div>
      <div>
        <label>Problem: </label>
        <input
          type="text"
          {...register(`questions.${index}.problem` as const)}
        />
      </div>
      <div>
        <label>Answer: </label>
        <input
          type="text"
          {...register(`questions.${index}.answer` as const)}
        />
      </div>
      <div>
        <label>Choices: </label>

        {fields.map((field, choiceIndex) => {
          return (
            <input
              key={field.id}
              {...register(
                `questions.${index}.choices.${choiceIndex}.value` as const
              )}
            />
          );
        })}
      </div>
    </div>
  );
};
