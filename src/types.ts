//ASSIGNMENT FORM
export type Question = {
  problem: string;
  answer: string;
  choices: string[] | { value: string }[];
  questionId?: string;
  _id?: string;
};

export type Assignment = {
  name: string;
  description: string;
  totalPoints: number;
  classId: string;
  questions: Question[];
  dueDate?: string;
  accessLevel?: string;
  _id?: string;
  status?: string;
};

//ASSIGNMENT (INTERACTIVE)
export type AssignmentD = {
  questions: QuestionD[];
  description: string;
  name: string;
};

export type QuestionD = {
  _id: string;
  problem: string;
  choices: string[];
};

//SUBMISSION
export type Submission = {
  _id: string;
  submittedDate: string;
  studName: string;
  answers: Answer[];
  assignmentId: string;
  grade: number;
  feedback: string;
};

//ANSWER
type Answer = {
  questionId: string;
  answer: string;
  _id: string;
};

//USER
export type User = {
  _id: string;
  userName: string;
  firstName: string;
  lastName: string;
  role: string;
};

//Quote might delete
export type Quote = {
  q: string;
  a: string;
};

//STUDENT
export type Student = {
  firstName: string;
  lastName: string;
  _id: string;
};

export type Class = {
  _id: string;
  name: string;
};
