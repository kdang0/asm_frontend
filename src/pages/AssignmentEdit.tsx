import { useState, useEffect} from "react";
import { useAuth } from '../hooks/useAuth';
import AssignmentForm from "../components/AssignmentForm/AssignmentForm";
import {Class, Assignment} from "../types";
import { useNavigate, useParams } from "react-router-dom";
import { getAssignment, getClasses, updateAssignmentAPI } from "../services/dac-api";


export const AssignmentEdit = () => {
    const [classes, setClasses] = useState<Class[]>([]);
    const [assignment, setAssignment] = useState<Assignment>({
        name: '',
        description: '',
        totalPoints: 0,
        classId: '',
        questions: []
    });

    const {user} = useAuth();
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        async function fetchAssignment(){
            if(params.id){
                const data = await getAssignment(params.id);
                data.questions.forEach((question) => question['choices'] = question.choices.map((choice) => typeof choice !== 'string' ? choice : {value: choice}));
                console.log(data);
                setAssignment(data);
            }
        }
        fetchAssignment();
    }, [params.id]);

    useEffect(() => {
        async function fetchClasses(){
            if(user){
                const data = await getClasses(user._id, user.role);
                setClasses(data);
            }
        }
        fetchClasses();
    }, [user]);

    const updateAssignment = async (assignmentItem : Assignment) => {
        if(user && params.id){
            await updateAssignmentAPI(params.id, assignmentItem);
        }
        navigate('/assignment');
    }

    return (
    <div className="displayFlex flexColumn alignItemsCenter container">
        <h1>Edit Assignment</h1>
        {assignment.classId ? 
        <AssignmentForm assignmentItem={assignment} classes={classes} createAssignment={updateAssignment} formType="edit"/>
        
            : <p>loading</p>
        }
    </div>
  )
}
