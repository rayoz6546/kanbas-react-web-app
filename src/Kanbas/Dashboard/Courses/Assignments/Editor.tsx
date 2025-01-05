import { TbPointFilled } from "react-icons/tb";
import { MdDateRange } from "react-icons/md";
import { useLocation, useParams } from "react-router";
import * as db from "../../../Database";
import { Link , useNavigate} from "react-router-dom";
import { SetStateAction, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAssignment, updateAssignment } from "./reducer";
import * as coursesClient from "../client";
import * as assignmentsClient from "../Assignments/client"
import * as modulesClient from "../Modules/client";
import * as filesClient from "../filesClient";
import { addFile, deleteFile, setFiles } from "../filesReducer";
import ProtectedContent from "../../../Account/ProtectedContent";
import StudentViewButton from "../Quizzes/StudentViewButton";
import { useViewContext } from "../Quizzes/View";
import { CgDanger } from "react-icons/cg";

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const { assignments } = useSelector((state: any) => state.assignmentsReducer);
  const { files } = useSelector((state: any) => state.filesReducer);



  const assignment = assignments.find((a: any) => a._id === aid);



  const [assignmentName, setAssignmentName] = useState(assignment ? assignment.title : "");
  const [assignmentDescription, setAssignmentDescription] = useState(assignment ? assignment.description : "");
  const [assignmentPoints, setAssignmentPoints] = useState(assignment ? assignment.points : null);
  const [assignmentDue, setAssignmentDue] = useState(assignment ? assignment.due_date : "");
  const [assignmentFrom, setAssignmentFrom] = useState(assignment ? assignment.available_from : "");
  const [assignmentUntil, setAssignmentUntil] = useState(assignment ? assignment.until : "");
  const [assignmentAttempts, setAssignmentAttempts] = useState(assignment ? assignment.attempts : 1);
  const [assignmentPercentage, setAssignmentPercentage] = useState(assignment ? assignment.percentage : null);
  const [assignmentPublished, setAssignmentPublished] = useState(assignment ? assignment.published : false);
  const [file, setFile] = useState(assignment ? assignment.file : "");
  const [assignmentFile, setAssignmentFile] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);
  const file_ass = files.find((f:any)=> f.itemId===aid) 

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
      const file_ = files.find((f: any) => f.itemId === aid || f._id === assignment?.file);
      if (file_) {
          setFile(file_); 
      }
  }, [files, aid, assignment]);

  const fetchFiles = async () => {
    try {
        const fetchedFiles = await filesClient.fetchFiles();

        if (!Array.isArray(fetchedFiles)) {
            console.error("Invalid response from filesClient.fetchFiles, expected an array but got:", fetchedFiles);
            return;
        }
        dispatch(setFiles(fetchedFiles));
    } catch (error) {
        console.error("Error fetching files:", error);
    }
};


  useEffect(() => {
      fetchFiles();
  }, []);

  const save = async () => {
    if (loading) return; // Prevent duplicate saves
    setLoading(true); // Disable the button
    let fileId = file;
    if (assignmentFile) {
        if (file_ass) {
            await filesClient.deleteFile(file_ass._id);
            dispatch(deleteFile(file_ass._id));
        }

        // Upload the new file
        const fileUploadResponse = await filesClient.uploadFile(assignmentFile, aid as string);
        fileId = fileUploadResponse.fileId;
        dispatch(addFile(fileUploadResponse));
    }
    if (aid) {
        // Update the assignment
        const updatedAssignment = {
            _id: assignment._id,
            title: assignmentName,
            course: cid,
            points: assignmentPoints,
            due_date: assignmentDue,
            available_from: assignmentFrom,
            until: assignmentUntil,
            description: assignmentDescription,
            published: assignmentPublished  ,
            file: "",
            attempts: assignmentAttempts,
            percentage: assignmentPercentage,
        };
        await assignmentsClient.updateAssignment(updatedAssignment);
        dispatch(updateAssignment(updatedAssignment));
    } else {
        const newAssignment = {
            title: assignmentName,
            course: cid,
            points: assignmentPoints,
            due_date: assignmentDue,
            available_from: assignmentFrom,
            until: assignmentUntil,
            description: assignmentDescription,
            published: assignmentPublished ,
            file:"",
            attempts: assignmentAttempts,
            percentage: assignmentPercentage,
        };


        const createdAssignment = await coursesClient.createAssignmentForCourse(cid as string, newAssignment);
        dispatch(addAssignment(createdAssignment));


        if (assignmentFile) {
            const fileUploadResponse = await filesClient.uploadFile(assignmentFile, createdAssignment._id);
            dispatch(addFile(fileUploadResponse));

            const newerAssignment = { ...createdAssignment, file: fileUploadResponse.fileId };
            await assignmentsClient.updateAssignment(newerAssignment);
            dispatch(updateAssignment(newerAssignment));
        }
    }


    navigate(`/Kanbas/Courses/${cid}/Assignments`);
};

const { isStudentView, toggleView } = useViewContext();
  return (
    <>

            <ProtectedContent><StudentViewButton
              isStudentView={isStudentView}
              onClick={toggleView}
              /></ProtectedContent>


      {isStudentView ? (
      <div className="container-fluid">
    
          <div id="wd-assignments-editor" className="p-5 row">
              <div className="row mb-1 p-1">
                  <label htmlFor="wd-name">Assignment Name</label>
              </div>
              <div className="row mb-2">
                  <input
                      id="wd-name"
                      value={assignmentName}
                      type="text"
                      className="form-control"
                      onChange={(e) => setAssignmentName(e.target.value)}
                  />
              </div>
   
              <div className="row mb-2">
                  <div className="row mb-1 p-1">
                      <label htmlFor="wd-description">Description</label>
                  </div>
                  <textarea
                      name="wd-description"
                      id="wd-description"
                      className="form-control"
                      value={assignmentDescription}
                      onChange={(e) => setAssignmentDescription(e.target.value)}
                      rows={5}
                  ></textarea>
              </div>


              <div className="row mb-5">
                  <div className="row mb-1 p-1">
                      <label htmlFor="wd-file">Upload File</label>
                  </div>
                  <input
                      type="file"

                      onChange={(e) => setAssignmentFile(e.target.files?.[0] || null)}
                      className="form-control mb-2"
                  />
 

                {file_ass ? (
                    <p className="text-muted">
                        {file_ass.originalName
                            ? `Current file: ${file_ass.originalName}`
                            : "No file uploaded"}
                    </p>
                ) : (
                    <p className="text-muted">No file uploaded</p>
                )}
              </div>


              <div className="row mb-2">
                    <div className="col"style={{textAlign:"right"}}>
                 <label htmlFor="wd-points" className="form-label">Points</label>
                    </div>

                    <div className="col">
                     <input type="text" className="form-control" id="wd-points" defaultValue={assignmentPoints}
                    onChange={(e) => setAssignmentPoints(parseInt(e.target.value))}/>
                    </div>
              </div>

              <div className="row mb-2">
                    <div className="col"style={{textAlign:"right"}}>
                 <label htmlFor="wd-attempts" className="form-label">Attempts</label>
                    </div>

                    <div className="col">
                     <input type="text" className="form-control" id="wd-attempts" defaultValue={assignmentAttempts}
                    onChange={(e) => setAssignmentAttempts(parseInt(e.target.value))}/>
                    </div>
              </div>
              
              <div className="row mb-2">
                    <div className="col"style={{textAlign:"right"}}>
                 <label htmlFor="wd-percentage" className="form-label">Percentage</label>
                    </div>

                    <div className="col">
                     <input type="text" className="form-control" id="wd-points" defaultValue={assignmentPercentage}
                    onChange={(e) => setAssignmentPercentage(parseInt(e.target.value))}/>
                    </div>
              </div>


              <div className="row mb-2">
                <div className="col"style={{textAlign:"right"}}>
                  <label htmlFor="wd-assign-to" className="form-label">Assign</label>
                  </div>


                  <div className="col">
                      <ul className="list-group rounded-0 border">

                      <li className="list-group-item border-0">
                          <div className="row"><label htmlFor="wd-due-date" className="wd-due-date" style={{fontWeight:"bold"}}>Due</label></div>
                          <div className="row"><div className="input-group"><input type="date" name="wd-due-date" id="wd-due-date" className="form-control" value={assignmentDue ? new Date(assignmentDue).toISOString().split("T")[0] : ""}
                          onChange={(e) => setAssignmentDue(new Date (e.target.value))}/></div></div>
                          </li>

                      <li className="list-group-item border-0">
                        <div className="row">
                        <div className="col">
                          <div className="row"><label htmlFor="wd-available-from" className="wd-available-from" style={{fontWeight:"bold"}}>Available From</label></div>
                          <div className="row"><div className="input-group"><input type="date" name="wd-available-from" id="wd-available-from" className="form-control" value={assignmentFrom ? new Date(assignmentFrom).toISOString().split("T")[0] : ""}
                          onChange={(e) => setAssignmentFrom(new Date (e.target.value))}/></div></div>
                          </div>

                          <div className="col">
                          <div className="row"><label htmlFor="wd-available-until" className="wd-available-until" style={{fontWeight:"bold"}}>Until</label></div>
                          <div className="row"><div className="input-group"><input type="date" name="wd-available-until" id="wd-available-until" className="form-control" value={assignmentUntil ? new Date(assignmentUntil).toISOString().split("T")[0] : ""}
                          onChange={(e) => setAssignmentUntil(new Date (e.target.value))}/></div></div>
                          </div>
                          </div>
                          </li>
                      </ul>
                  </div>


              </div>

              <div className="row mt-5 mb-2">
                  <div className="col">
                      <hr />
                      <div className="col">
                          <button onClick={save} className="btn btn-danger float-end rounded-1" type="submit" disabled={loading}> 
                              Save
                          </button>
                      </div>
                      <div className="col">
                          <Link to={`/Kanbas/Courses/${cid}/Assignments`}>
                              <button className="btn btn-secondary float-end me-2 rounded-1" type="submit">
                                  Cancel
                              </button>
                          </Link>
                      </div>
                  </div>
              </div>
          </div>
      </div>): 
      
      (

        <div className="container-fluid" id="wd-take-quiz">
        
                {assignments && assignments.filter((assignment:any)=>assignment._id === aid)
                .map((a:any)=> (
                    <>
                    <div className="row d-flex">
                    <div className="col-8 me-5 ">
                    <div className="row mb-2">
                        <h4 style={{ fontWeight: "bold" }}> {`${a.title}`} </h4>
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

        
                    {file_ass ? (
                    <div className="row">
                      <p>The assignment is
                        <a
                        href={`${REMOTE_SERVER}/api/files/${file_ass._id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        download
                        className="ms-2"
                      >
                        {file_ass.originalName}
                      </a></p>
        
                    </div>): null}



                    
                    
                    </div></div>
                </>))} 

              </div>
      )
      
      }
      </>
  );
}

