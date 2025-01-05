import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import * as resultsClient from "../Quizzes/resultsClient";
import * as coursesClient from "../client";
import * as usersClient from "../../../Account/client"
import { addResults, setResults, updateResults } from "../Quizzes/resultsReducer";
import { setQuizzes } from "../Quizzes/quizzesReducer";
import { useEffect, useState } from "react";
import * as assignmentsResultsClient from "../Assignments/assignmentsResultsClient";
import { addAssignmentResult, setAssignmentResults, updateAssignmentResult } from "../Assignments/assignmentResultsReducer";
import * as filesClient from "../Assignments/studentFileClient";
import { setStudentFiles } from "../Assignments/studentFileReducer";
import { setAssignments } from "../Assignments/reducer";
import * as gradesClient from "./client";
import { setGrades } from "./reducer";

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
export default function GradeStudent() { 
    const { cid, uid } = useParams();
    const {results} = useSelector((state:any)=> state.resultsReducer)
    const {quizzes} = useSelector((state:any) => state.quizzesReducer)
    const { assignments } = useSelector((state: any) => state.assignmentsReducer);
    const [users, setUsers] = useState<any[]>([]); 
    const user = users && users.find((u:any)=> u._id===uid)
    const {assignmentResults} = useSelector((state:any)=> state.assignmentsResultsReducer)
    const { grades } = useSelector((state:any)=> state.gradesReducer)
    
    const [viewSubmission, setViewSubmission] = useState<boolean | string>(false);
    const [viewAllAssignments, setViewAllAssignments] = useState(false)
    const [viewAllQuizzes, setViewAllQuizzes] = useState(false)

    const [quizGrade, setQuizGrade] = useState(0)
    const [assignmentGrade, setAssignmentGrade] = useState(0)
    const dispatch = useDispatch()

    const fetchGrades = async () => {
        const grades = await gradesClient.fetchCourseGrades(cid as string)
        dispatch(setGrades(grades))
    }

    const fetchResults = async () => {
            const results = await resultsClient.fetchResultsByUser(cid as string, uid as string)
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
        const assignmentsResults = await assignmentsResultsClient.fetchAllAssignmentsResultsByUser(uid as string)

        dispatch(setAssignmentResults(assignmentsResults))
    }

    const fetchAssignments = async () => {
        const assignments = await coursesClient.findAssignmentsForCourse(cid as string)
        dispatch(setAssignments(assignments))
    }

    useEffect(() => {
        fetchQuizzes()
        fetchUsers()
        fetchAssignments()
        fetchAssignmentsResults()
        }, []);

    useEffect(() => {
        fetchResults()
    }, [results,dispatch]);


    const handleViewSubmissionClick = (id: string) => {
        setViewSubmission((prev) => 
            prev === id ? false : id
        );
    };



    const { studentFiles } = useSelector((state: any) => state.studentFilesReducer);


    
      const fetchFiles = async () => {
        const fetchedFiles = await filesClient.fetchFiles();
        dispatch(setStudentFiles(fetchedFiles));

    };
    
      useEffect(() => {
          fetchFiles();
      }, []);

    const navigate = useNavigate()

    const updateQuizGrade = async (resultId:any, score:any) => {
        const result = results.find((r:any)=>r._id === resultId);
        const updatedResult = {...result, score:score}
        await resultsClient.updateResults(updatedResult);
        dispatch(updateResults(updatedResult))

    }

    const updateAssignmentGrade = async (resultId:any, score:any) => {
        const result = assignmentResults.find((r:any)=>r._id === resultId);
        const updatedResult = {...result, score:score}
        await assignmentsResultsClient.updateAssignmentResult(updatedResult)
        dispatch(updateAssignmentResult(updatedResult))
       

    }

    return (
        <div id="wd-grade-student" className="p-2">
            <h4>Grades for Student {user ? <strong>{`${user.firstName} ${user.lastName} (${user.loginId})`}</strong> : "User not found"}</h4>
            <hr />
            <button className="btn btn-secondary float-end" onClick={()=>setViewAllAssignments((prev:any)=>!prev)}>{viewAllAssignments ? "Close All" : "View All"}</button>
            <br /><br />
            <div id="wd-assignments-grades">
            <h4 style={{background:"lightgrey"}} className="p-2">Assignments</h4>

            
            <table className="table table-striped">
            <thead>
                    <tr>
                        <th className="text-nowrap">Assignment</th>
                        <th className="text-nowrap">Points</th>
                        <th className="text-nowrap">Percentage</th>
                        <th className="text-nowrap">Student Submission</th>

        

                    </tr>
                    </thead>

                    <tbody>
                {assignments && assignments.filter((a:any)=>a.course===cid)
                .map((assignment:any)=> 
                    <>

                    <tr key={assignment._id}>
            
                        <td className="text-nowrap">{assignment.title ? assignment.title : "-"}</td>
                        <td className="text-nowrap">{assignment.points ? assignment.points : "-"}</td>
                        <td className="text-nowrap">{assignment.percentage ? assignment.percentage : "-"}%</td>
                        <td><button className="btn btn-warning text-nowrap" onClick={()=>{handleViewSubmissionClick(assignment._id)}}>View and Grade</button></td>

                    </tr>

                    {((viewSubmission && viewSubmission === assignment._id) || viewAllAssignments)  && (
                 
                           
                           <tr className="border">
                            <td colSpan={4}>
                            {(assignmentResults && Array.isArray(assignmentResults) && assignmentResults.filter((a:any)=>a.assignmentId === assignment._id)
                            .map((result:any)=> (

                                <div className="text-nowrap" key={result._id}>
                                <strong>Submission ({result.submission_type}): </strong>
                                    {result.submission_type === "text" && (
                                            <p
                                            style={{
                                                whiteSpace: 'pre-wrap', 
                                                wordBreak: 'break-word', 
                                                overflowWrap: 'break-word', 
                                            }}
                                        >
                                            {result.submission}
                                        </p>
                                    )}
                                    {result.submission_type === "link" && (
                                        <button
                                            className="btn btn-link fs-6"
                                            onClick={() =>
                                                window.open(
                                                    result.submission,
                                                    "_blank"
                                                )
                                            }
                                        >
                                            {result.submission}
                                        </button>
                                    )}
                                    {result.submission_type === "file" && (
                                        <>

                                        {studentFiles &&
                                            studentFiles.map((file: any) =>
                                                file.itemId === assignment._id && file.userId === uid ? (
                                                    <p style={{display:"inline"}}>The assignment is
                                                    <a
                                                    href={`${REMOTE_SERVER}/api/studentFiles/${file._id}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    download
                                                    className="ms-2"
                                                  >
                                                    {file.originalName}
                                                  </a></p>
                                                ) : null
                                            )}

                                    </>
                                    )}
                                    <br />

                                    <strong className="me-5">Current Grade: {result.score} / {assignment.points} </strong>
                                    <p style={{display:"inline"}}>Change Grade: <input type="text" onChange={(e)=>setAssignmentGrade(parseInt(e.target.value))} disabled={viewAllAssignments} defaultValue={result.score}/><button className="btn btn-info ms-2" onClick={()=>{updateAssignmentGrade(result._id, assignmentGrade); fetchAssignmentsResults()}} disabled={viewAllAssignments}>Update</button></p>
                                </div>


                                ) 
                            ))}
                            </td>
                           </tr>
  
                    )}      
                                    </>)}
                   

                </tbody>
            </table>
            </div>


            <div id="wd-quizzes-grades">
            <button className="btn btn-secondary float-end" onClick={()=>setViewAllQuizzes((prev:any)=>!prev)}>{viewAllQuizzes ? "Close All Grades" : "View All Grades"}</button>
            <br /><br />
            <h4 style={{background:"lightgrey"}} className="p-2">Quizzes</h4>


            <table className="table table-striped">
            <thead>
                    <tr>
                        <th className="text-nowrap">Quiz</th>
                        <th className="text-nowrap">Points</th>
                        <th className="text-nowrap">Percentage</th>
                        <th className="text-nowrap">Grading</th>
                        <th className="text-nowrap">Student Submission</th>


                    </tr>
                    </thead>

                    <tbody>
                    {quizzes && quizzes.filter((q:any)=>q.course===cid)
                        .map((quiz:any)=> 
                        ( 
                            <>

                            <tr key={quiz._id}>
                            
                            <>
                            <td className="text-nowrap">{quiz.title ? quiz.title : "-"}</td>
                            <td className="text-nowrap">{quiz.points ? quiz.points : "-"}</td>
                            <td className="text-nowrap">{quiz.percentage ? quiz.percentage : "-"}%</td>
                            <td><button className="btn btn-warning text-nowrap" onClick={()=>{handleViewSubmissionClick(quiz._id);}}>View or Update</button></td>
                            <td><button className="btn btn-warning text-nowrap" onClick={()=>navigate(`/Kanbas/Courses/${cid}/Grades/${uid}/${quiz._id}`)}>View Results</button></td>

    
                            </>
                        </tr>
                {((viewSubmission && viewSubmission === quiz._id) || viewAllQuizzes) && (
                 
                 <tr className="border">
                  <td colSpan={5}>
                  {(results && Array.isArray(results) && results.filter((r:any)=>r.quizId === quiz._id )
                  .map((result:any)=> (
                      <div className="text-nowrap" key={result._id}>
                      <strong className="me-5">Current Grade: {result.score} / {quiz.points} </strong>
                      <p style={{display:"inline"}}>Change Grade: <input type="text" onChange={(e)=>setQuizGrade(parseInt(e.target.value))} disabled={viewAllQuizzes} defaultValue={result.score}/><button className="btn btn-info ms-2" onClick={()=>{updateQuizGrade(result._id, quizGrade)}} disabled={viewAllQuizzes}>Update</button></p>
   
                      </div>
                  ) 
                  ))}
                  </td>
                 </tr>

          )}
                        
                        
            </>

            )
            
            
        )}
        </tbody>

    </table>
    </div>
</div>
    );
}