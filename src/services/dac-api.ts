import { Submission, Assignment, Quote, Student, Class, User } from "../types";
import axios from "axios";
axios.defaults.withCredentials = true
const url = import.meta.env.VITE_URL;

export const getAssignment = async (id: string): Promise<Assignment> => {
  const res = await axios.get(`${url}/assignment/${id}`);
  const data: Assignment = res.data;
  return data;
};

export const getAssignments = async (
  userId: string,
  userRole: string
): Promise<Assignment[]> => {
  const res = await axios.get(`${url}/assignment/${userRole}/${userId}`);
  const data: Assignment[] = res.data;
  return data;
};

export const getSubmissions = async (id: string): Promise<Submission[]> => {
  const res = await axios.get(`${url}/assignment/submissions/${id}`);
  const data: Submission[] = res.data;
  return data;
};

export const getSubmission = async (id: string): Promise<Submission> => {
  const res = await axios.get(`${url}/submission/${id}`);
  const data: Submission = res.data;
  return data;
};

export const getSubmissionBUA = async (
  userId: string,
  assignId: string
): Promise<Submission> => {
  const res = await axios.get(
    `${url}/submission/assignment/${assignId}/${userId}`
  );
  const data: Submission = res.data;
  return data;
};

export const getStudents = async (id: string): Promise<Student[]> => {
  const res = await axios.get(`${url}/user/students/${id}`);
  const data: Student[] = res.data;
  return data;
};

export const getClasses = async (
  userId: string,
  userRole: string
): Promise<Class[]> => {
  const res = await axios.get(`${url}/class/${userRole}/${userId}`);
  const data: Class[] = res.data;
  return data;
};

export const updateSubmission = async (
  id: string,
  submission: Submission
): Promise<boolean> => {
  try {
    const res = await axios.patch(`${url}/submission/${id}`, submission);
    console.log("Response:", res);
    return res.status === 204;
  } catch (error) {
    console.error("Error updating submission:", error);
    return false;
  }
};

export const createAssignmentAPI = async (
  id: string,
  assignment: Assignment
): Promise<Assignment> => {
  const res = await axios.post(`${url}/assignment/${id}`, assignment);
  const data: Assignment = res.data;
  return data;
};

export const updateAssignmentAPI = async (
  id: string,
  assignment: Assignment
): Promise<Assignment> => {
  const res = await axios.patch(`${url}/assignment/${id}`, assignment);
  const data: Assignment = res.data;
  return data;
};

export const publishAssignment = async (id: string): Promise<void> => {
  await axios.post(`${url}/assignment/access/${id}`);
};

export const deleteAssignment = async (id: string): Promise<void> => {
  await axios.delete(`${url}/assignment/${id}`);
};

export const logoutAPI = async (): Promise<void> => {
  await axios.delete(`${url}/logout`);
};

export const loginAPI = async (
  userName: string,
  password: string
): Promise<{ [key: string]: unknown }> => {
  const res = await axios.post(`${url}/login`, {
    username: userName,
    password: password,
  }
);
  const data = res.data;
  return data;
};

export const getQuote = async (): Promise<Quote> => {
  const res = await axios.get(`${url}/quote`);
  const data: Quote = res.data;
  return data;
};


export const submitAssignment = async (submission: Record<string,unknown>) : Promise<number> => {
    const res = await axios.patch(`${url}/assignment/submit`, submission);
    return res.status;
}


export const getProfile = async () : Promise<User> => {
    const res = await axios.get(`${url}/profile`);
    const data = res.data;
    const user : User = data.user
    return user;
}