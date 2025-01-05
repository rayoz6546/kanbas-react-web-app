import { useEffect, useState } from "react";
import * as resultsClient from "../Quizzes/resultsClient";
import * as coursesClient from "../client";
import * as usersClient from "../../../Account/client"
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { setResults } from "../Quizzes/resultsReducer";
import { setQuizzes } from "../Quizzes/quizzesReducer";
import ProtectedContentEnrollment from "../../../Account/ProtectedContentEnrollment";
import ProtectedContent from "../../../Account/ProtectedContent";
import * as assignmentsResultsClient from "../Assignments/assignmentsResultsClient";
import { setAssignmentResults } from "../Assignments/assignmentResultsReducer";
import { setAssignments } from "../Assignments/reducer";
import { setGrades } from "./reducer";
import * as gradesClient from "./client";

export default function Grades() { 
    const { cid } = useParams();
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const navigate = useNavigate()
    const [users, setUsers] = useState<any[]>([]); 

    const {results} = useSelector((state:any)=> state.resultsReducer)
    const {quizzes} = useSelector((state:any) => state.quizzesReducer)
    const { assignments } = useSelector((state: any) => state.assignmentsReducer);
    const {assignmentResults} = useSelector((state:any)=> state.assignmentsResultsReducer)
    const [userGrades, setUserGrades] = useState<Record<string, number>>({});


    const { grades } = useSelector((state:any)=> state.gradesReducer)
    const dispatch = useDispatch()


    const fetchGrades = async () => {
        const grades = await gradesClient.fetchCourseGrades(cid as string)
        dispatch(setGrades(grades))
    }
    const fetchResults = async () => {
           const results = await resultsClient.fetchResultsByUser(cid as string, currentUser._id)
           dispatch(setResults(results))
        }

    
    const fetchQuizzes = async () => {
        const quizzes = await coursesClient.findQuizzesForCourse(cid as string);
    
        dispatch(setQuizzes(quizzes));

        };

    const fetchUsers = async () => {
        const users = await usersClient.findUsersForCourse(cid as string)
        setUsers(users)
        // dispatch(setQuizzes(quizzes));

        };

    const fetchAssignmentsResults = async () => {
        const assignmentsResults = await assignmentsResultsClient.fetchAllAssignmentsResultsByUser(currentUser._id as string)

        dispatch(setAssignmentResults(assignmentsResults))
    }

    const fetchAssignments = async () => {
        const assignments = await coursesClient.findAssignmentsForCourse(cid as string)
        dispatch(setAssignments(assignments))
    }

    useEffect(() => {
        const fetchAllGrades = async () => {
            const grades: Record<string, number> = {};
            for (const user of users) {
                if (user && user.role !== "FACULTY" && user.role !== "ADMIN") {
                    grades[user._id] = await calculateGrade(user._id);
                }
            }
            setUserGrades(grades);
        };

        fetchAllGrades();
    }, [users, quizzes, assignments, assignmentResults]);

    
    useEffect(() => {
        fetchQuizzes()
        fetchUsers()
        fetchAssignments()
        fetchAssignmentsResults()
        fetchGrades()
        }, []);

    useEffect(() => {
    
    
            fetchResults()
        }, [results,dispatch]);


        const calculateGrade = async (userId:string) => {
            const results_ = await resultsClient.fetchResultsByUser(cid as string, userId)
            const assignmentsResults = await assignmentsResultsClient.fetchAllAssignmentsResultsByUser(userId as string)
            let totalWeightedScore = 0;
            let totalPercentage = 0; 
          

            if (results_ && quizzes) {
              results_.forEach((r: any) => {
                const quiz = quizzes.find((q: any) => q._id === r.quizId && q.course === r.courseId);
                if (quiz && quiz.percentage && quiz.points) {

                  if (quiz.percentage > 0) {

                    totalWeightedScore += (r.score / quiz.points) * quiz.percentage;
                    totalPercentage += quiz.percentage;
                  }
                }
              });
            }
          

            if (assignmentsResults && assignments) {
              assignmentsResults.forEach((r: any) => {
                const assignment = assignments.find((a: any) => a._id === r.assignmentId && a.course === r.courseId);
                if (assignment && assignment.percentage && assignment.points) {
        
                  if (assignment.percentage > 0) {

                    totalWeightedScore += (r.score / assignment.points) * assignment.percentage;
                    totalPercentage += assignment.percentage;
                  }
                }
              });
            }
          
            return totalPercentage > 0 ? (totalWeightedScore / totalPercentage) * 100 : 0;
          };
          
          
          
    return (
        <div id="wd-grades" className="p-2">
            <ProtectedContentEnrollment>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Due</th>
                    <th>Submitted</th>
                    <th>Weight</th>
                    <th>Score</th>
                </tr>
                </thead>

                <tbody>
                    {results && results.map((r:any)=>(
                        <tr key={r.quizId}>
                            <td>{quizzes && quizzes.find((q:any)=>q._id === r.quizId && q.course === r.courseId).title}</td>
                            <td>{quizzes && quizzes.find((q:any)=>q._id === r.quizId).due_date}</td>
                            <td>{r.submitted_date}</td>
                            <td>{quizzes && quizzes.find((q:any)=>q._id === r.quizId).percentage ? quizzes.find((q:any)=>q._id === r.quizId).percentage : "--"} %</td>
                            <td>{r.score}/{quizzes && quizzes.find((q:any)=>q._id === r.quizId).points}</td>
                        </tr>
                    ))}
                    {assignmentResults && assignmentResults.map((r:any)=>(
                        <tr key={r.assignmentId}>
                            <td>{assignments && assignments.find((a:any)=>a._id === r.assignmentId && a.course === r.courseId).title}</td>
                            <td>{assignments && assignments.find((a:any)=>a._id === r.assignmentId).due_date}</td>
                            <td>{r.submitted_date}</td>
                            <td>{assignments && assignments.find((a:any)=>a._id === r.assignmentId).percentage ? assignments.find((a:any)=>a._id === r.assignmentId).percentage : "-"} %</td>
                            <td>{r.score}/{assignments && assignments.find((a:any)=>a._id === r.assignmentId).points}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
            <div className="ps-2 border">
                <strong>Current Course Grade: {userGrades[currentUser._id]?.toFixed(2) || "Loading..."}%</strong>
            </div>
            </ProtectedContentEnrollment>

            <ProtectedContent>
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>Student</th>
                        <th>Section</th>
                        <th>LoginID</th>
                        <th>Email</th>
                        <th>Course Grade</th>
                        <th>Grade Student</th>

                    </tr>
                    </thead>

                    <tbody>
                        {users && users.map((user:any)=>(
                            <tr key={user._id}>
                                <>
                                {user.role!== "FACULTY" && user.role !== "ADMIN" &&
                               <>
                                <td>{user.firstName} {user.lastName}</td>
                                <td>{user.section}</td>
                                <td>{user.loginId}</td>
                                <td>{user.email}</td>
                                <td>{userGrades[user._id]?.toFixed(2) || "Loading..."}%</td>
                                <td><button className="btn btn-info" onClick={()=>navigate(`/Kanbas/Courses/${cid}/Grades/${user._id}`)}>Grade Student</button></td>
                                </>
                                }</>
                            </tr>
                        ))}
                    </tbody>
                </table>
                
            </ProtectedContent>
        </div>
    );
}