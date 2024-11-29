import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import ClassCard from "../components/ClassCard/ClassCard";
import { Class } from "../types";
import { getClasses } from "../services/dac-api";
axios.defaults.withCredentials = true;

export const ClassList = () => {
  const [classes, setClasses] = useState<Class[]>([]);
  const { user } = useAuth();
  //Fetches list of classes based on user
  useEffect(() => {
    async function fetchClasses() {
      if (user) {
        const data = await getClasses(user._id, user.role);
        setClasses(data);
      }
    }
    fetchClasses();
  }, [user]);
  return (
    <div className="displayFlex flexColumn alignItemsCenter container gap10 padding15">
      {classes.map((classInst) => (
        <ClassCard key={classInst._id} name={classInst.name} />
      ))}
    </div>
  );
};
