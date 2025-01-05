
import {useNavigate, useParams} from "react-router-dom";
import {  useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as studentFilesClient from "./studentFileClient";
import * as filesClient from "../filesClient";
import {  setFiles } from "../filesReducer";

import * as assignmentsResultsClient from "./assignmentsResultsClient";
import { addAssignmentResult, deleteAssignmentResult, setAssignmentResults } from "./assignmentResultsReducer";
import { addStudentFile, deleteStudentFile, setStudentFiles } from "./studentFileReducer";

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;

export default function TakeAssignment() {
  const { cid, aid } = useParams();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { assignments } = useSelector((state: any) => state.assignmentsReducer);
  const { assignmentsResults } = useSelector((state: any) => state.assignmentsResultsReducer);
  const { files } = useSelector((state: any) => state.filesReducer);
  const [assignmentResult, setAssignmentResult] = useState<Record<string, any> | null>(null);

  const file = files.find((f:any)=> f.itemId === aid)
  const { studentFiles } = useSelector((state: any) => state.studentFilesReducer);
  const [studentFile, setFile] = useState(assignmentResult ? assignmentResult.submission : "");
  const assignment = assignments.filter((a: any) => a._id === aid);

  useEffect(() => {
    if (studentFiles && studentFiles.length > 0) {
      const file_ = studentFiles.find(
        (f: any) => f.itemId === aid && f.userId === currentUser._id
      );
      if (file_) {
        setFile(file_);
      }
    }
  }, [studentFiles, aid, assignmentResult]);


  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [resultSubmissionType, setResultSubmissionType] = useState(
    assignmentResult ? assignmentResult.submission_type: ""
  );
  const [resultSubmission, setResultSubmission] = useState<any>(
    assignmentResult?.submission || ""
  );
  const [resultSubmissionScore, setResultSubmissionScore] = useState(
    assignmentResult ? assignmentResult.score : null
  );

  const fetchStudentFiles = async () => {
    try {
        const studentFiles = await studentFilesClient.fetchFiles();
        dispatch(setStudentFiles(studentFiles));
    } catch (error) {
        console.error("Error fetching files:", error);
    }
};
  const fetchFiles = async () => {
    try {
        const files = await filesClient.fetchFiles();
        dispatch(setFiles(files));
    } catch (error) {
        console.error("Error fetching files:", error);
    }
};

const fetchResults = async () => {
  try {
      const assignmentsResults = await assignmentsResultsClient.fetchAllAssignmentsResultsByAssignment(aid as string);
      const assignmentResult = assignmentsResults && assignmentsResults.find((a: any)=>a.courseId === cid && a.assignmentId === aid && a.userId === currentUser._id)
      setAssignmentResult(assignmentResult)
       dispatch(setAssignmentResults(assignmentsResults));

      }
   catch (error) {
      console.error("Error fetching assignment results:", error);
  }
};


  useEffect(() => {
      fetchFiles();
      fetchStudentFiles();

  }, []);

  useEffect(() => {
    if (aid) {
        fetchResults();
    }
}, [aid]);


  const [openSubmission, setOpenSubmission]= useState(false)
  const [uploadFile, setUploadFile] = useState(false)
  const [uploadText, setUploadText] = useState(false)
  const [uploadLink, setUploadLink] = useState(false)

  const date_submit = () => {
    const now = new Date();
    const month = now.toLocaleString('en-US', { month: 'short' });
    const day = now.getDate(); 

    const timeOptions: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
    };
    const formattedTime = now.toLocaleTimeString('en-US', timeOptions);
    return `${month} ${day} at ${formattedTime}`;
}  
const [loading, setLoading] = useState(false);

const file_ass = studentFiles.find((f:any)=> f.itemId===aid &&  f.userId === currentUser._id) 
const save = async () => {


  let newResult;
  let submitted_file = resultSubmission;

  if (uploadFile) { 
  let fileId = studentFile;
  if (resultSubmission) {
      if (file_ass) {
          await studentFilesClient.deleteFile(file_ass._id);
          dispatch(deleteStudentFile(file_ass._id));
      }

      // Upload the new file
      const fileUploadResponse = await studentFilesClient.uploadFile(resultSubmission, aid as string, currentUser._id);
      fileId = fileUploadResponse.fileId;
      dispatch(addStudentFile(fileUploadResponse));
      }
      submitted_file=fileId
    }

  if (!assignmentResult) {
    if (loading) return; // Prevent duplicate saves
    setLoading(true); // Disable the button
      newResult = {
          _id: Date.now().toString(),
          courseId: cid,
          assignmentId: aid,
          userId: currentUser._id,
          submission_type: resultSubmissionType,
          submission: submitted_file,
          submitted_date: date_submit(),
          score: resultSubmissionScore,
          attempt: 1,
      };
      const createdResult = await assignmentsResultsClient.createAssignmentResult(
          aid as string,
          currentUser._id,
          newResult
      );
      setAssignmentResult(createdResult); // Update immediately
      dispatch(addAssignmentResult(createdResult));
  } else {
      newResult = {
          _id: assignmentResult._id,
          courseId: cid,
          assignmentId: aid,
          userId: currentUser._id,
          submission_type: resultSubmissionType,
          submission: submitted_file,
          submitted_date: date_submit(),
          score: resultSubmissionScore,
          attempt: parseInt(assignmentResult.attempt) + 1,
      };
      const updatedResult = await assignmentsResultsClient.updateAssignmentResult(newResult);
      setAssignmentResult(updatedResult); 
      dispatch(addAssignmentResult(updatedResult));
  }
  await fetchResults();
  setUploadFile(false);
  setUploadLink(false);
  setUploadText(false);
  setOpenSubmission(false);
};


  const handleCancel = () => {
    setUploadFile(false)
    setUploadLink(false)
    setUploadText(false)
    setOpenSubmission(false)
  }
  

  return (
    <>

        <div className="container-fluid d-flex" id="wd-take-quiz">

            <div style={{flex:"4"}}>

                {assignment
                .map((a:any)=> (
                    <>
                    <div className="row d-flex">
                      
                    <div className="col-8 me-5 ">
                    <div className="row mb-2">
                        <h4 style={{ fontWeight: "bold" }}> {`${a.title}`} 

                          
                          {assignmentResult && assignmentResult.attempt < assignment[0].attempts &&
                          <button className="btn btn-danger float-end" onClick={()=>setOpenSubmission(true)}>New Attempt</button>}
                          
                          </h4>
                        
                    </div>
        

                    <hr />

                    <div className="row mb-3">
                      <table className="table table-borderless mb-1">
                          <tbody>
                              <tr className="table">
                                  
                                      <div className="details-row">
                                          <div><strong>Due</strong>{`${a.due_date}`.toString().split("T")[0]}</div>
                                          <div><strong>Points</strong>{a.points}</div>
                                          <div><strong>Available</strong>{`${a.available_from}`.toString().split("T")[0]} - {`${a.until}`.toString().split("T")[0]}</div>
                                          
                                      </div>
                                  
                              </tr>

                          </tbody>
                      </table>
                      <hr />
                  </div>
        
                    <div className="row ms-1">
                        {a.description}
        
                    </div>

                    {file && (
                    <div className="row">
                      <p>The assignment is
                        <a
                        href={`${REMOTE_SERVER}/api/files/${file._id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        download
                        className="ms-2"
                      >
                        {file.originalName}
                      </a></p>
        
                    </div>)}



                    
                    
                    </div></div>
                </>))} 

              </div>

              
                    
            {!assignmentResult ? (
              
              <div style={{flex:"1"}}>

                <button className="btn btn-danger" onClick={()=>setOpenSubmission(true)}>Submit Assignment</button>
              </div>) : 
              (
                <div style={{flex:"2"}}>

                  
                <div >
                    <strong>Submission Details</strong> 
                </div>
                <hr />
                <div >
                <strong>Submitted: </strong>{assignmentResult.submitted_date}
                </div>
                <hr />
                <div >
                <strong>Score: </strong>{assignmentResult.score===null ? "-": assignmentResult.score} out of {assignment[0].points}
                </div>
                <hr />


            </div>
              )
            }
              
              
              </div>

            
            <br />
            {openSubmission && (

              <>
                <div className="border">
                  <div className="p-2 mb-3" style={{background:"lightgrey"}}>
                  <h4 className="ms-3">Submission</h4>
                  </div>
                  <div className="ms-3">
                  <button className="btn btn-secondary me-2" onClick={()=>{setUploadText(true); setUploadLink(false); setUploadFile(false); setResultSubmissionType("text")}}>Upload Text</button>
                  <button className="btn btn-secondary me-2" onClick={()=>{setUploadLink(true);setUploadText(false);setUploadFile(false);setResultSubmissionType("link")}}>Upload Link</button>
                  <button className="btn btn-secondary" onClick={()=>{setUploadFile(true);setUploadLink(false);setUploadText(false);setResultSubmissionType("file")}}>Upload File</button>
                  </div>
                  {uploadText && (
                    <>
                    <div className="mt-3 ms-3" style={{display:"flex"}}>
                      <input type="text" className="form-control" placeholder="Add Text" onChange={(e) => setResultSubmission(e.target.value)}/>
                      <button className="btn btn-secondary ms-2 me-3" onClick={()=>setUploadText(false)}>Cancel</button>
                    </div>
                    
                    </>
                  )}
                    {uploadLink && (
                    <>
                    <div className="mt-3 ms-3" style={{display:"flex"}}>
                      <input type="text" placeholder="Add Link" className="form-control" onChange={(e) => setResultSubmission(e.target.value)}/>
                      <button className="btn btn-secondary ms-2 me-3" onClick={()=>setUploadLink(false)}>Cancel</button>
                    </div>
                    
                    </>
                  )}
                  {uploadFile && (
                    <>
                    <div className="mt-3 ms-3" style={{display:"flex"}}>
                      <input type="file" className="form-control" onChange={(e) => setResultSubmission(e.target.files?.[0] || null)}/>
                      <button className="btn btn-secondary ms-2 me-3" onClick={()=>setUploadFile(false)}>Cancel</button>
                    </div>
                    
                    </>
                  )}
                  <br /><br /><br />

                  <div className="ms-3 mb-3">
                  <button className="btn btn-secondary me-2" onClick={()=>{handleCancel()}}>Cancel</button>
                  <button className="btn btn-danger" onClick={save} disabled={loading}>Submit</button>
                  </div>
                </div>
              </>

            )}
      
      
      
      </>
  );
}
