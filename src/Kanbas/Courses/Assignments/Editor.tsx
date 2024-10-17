import { TbPointFilled } from "react-icons/tb";
import { MdDateRange } from "react-icons/md";
import { useLocation, useParams } from "react-router";
import * as db from "../../Database";
import { Link } from "react-router-dom";

export default function AssignmentEditor() {
    const { cid, aid } = useParams()
    const assignments = db.assignments;

    return (
      <div className="container-fluid">
      <div id="wd-assignments-editor" className="p-5 row">

        {assignments 
        .filter((assignment: any) => assignment.course==cid)
        .filter((assignment: any) => assignment._id ==aid)
        .map((assignment: any) => (
          <>  
          
            <div className="row mb-1 p-1"><label htmlFor="wd-name">Assignment Name</label></div>
              <div className="row mb-2"><input id="wd-name" value={`${assignment.title}`} type="text" className="form-control" /></div>
              <div className="row mb-2">
                <div contentEditable="true" id="wd-description" className="form-control">
                  <br />
                  This assignment is <span style={{color:"red"}}>available online</span><br /><br />
                  Submit a link to the landing page of your Web application running on Netlify <br /><br />
                  The landing page should include the following: <br /><br />
                  <TbPointFilled/> Your full name and section <br />
                  <TbPointFilled/> Links to each of the lab assignments <br />
                  <TbPointFilled/> Link to the Kanbas application <br />
                  <TbPointFilled/> Links to all relevant source code repositories <br /><br />
                  The Kanbas application should include a link to navigate back to the landing page. 
  
                </div>
              </div>

              <div className="row mb-2">
                    <div className="col"style={{textAlign:"right"}}>
                    <label htmlFor="wd-points" className="form-label">Points</label>
                    </div>

                    <div className="col">
                    <input type="text" className="form-control" id="wd-points" value={`${assignment.points}`}/>
                    </div>
              </div>

              <div className="row mb-2">
                <div className="col" style={{textAlign:"right"}}>
                <label htmlFor="wd-group" className="form-label">Assignment Group</label>
                </div>
                <div className="col">
                <select id="wd-group" className="form-select">
                  <option selected>ASSIGNMENTS</option>
                </select>
                </div>
              </div>

              <div className="row mb-2">
                <div className="col" style={{textAlign:"right"}}>
                <label htmlFor="wd-display-grade-as" className="form-label">Display Grade as</label>
                </div>
                <div className="col">
                <select id="wd-display-grade-as" className="form-select">
                  <option selected>PERCENTAGE</option>
                </select>
                </div>
              </div>

              <div className="row mb-2">
                <div className="col"style={{textAlign:"right"}}>
                <label htmlFor="wd-submission-type" className="form-label">Submission Type</label>
                </div>

                <div className="col">
                <ul className="list-group rounded-0 border">
                  <li className="list-group-item border-0"><select id="wd-submission-type" className="form-select">
                    <option selected>Online</option></select></li>

                  <li className="list-group-item border-0"><p style={{fontWeight:"bold"}}>Online Entry Options</p></li>
                  <li className="list-group-item border-0">
                    <input type="checkbox" name="wd-text-entry" id="wd-text-entry" className="form-check-input me-2"/>
                    <label htmlFor="wd-text-entry">Text Entry</label>
                  </li>

                  <li className="list-group-item border-0">
                    <input type="checkbox" name="wd-website-url" id="wd-website-url" className="form-check-input me-2"/>
                    <label htmlFor="wd-website-url">Website URL</label>
                  </li>

                  <li className="list-group-item border-0">
                    <input type="checkbox" name="wd-media-recordings" id="wd-media-recordings" className="form-check-input me-2"/>
                    <label htmlFor="wd-media-recordings">Media Recordings</label>
                  </li>

                  <li className="list-group-item border-0">
                    <input type="checkbox" name="wd-student-annotation" id="wd-student-annotation" className="form-check-input me-2"/>
                    <label htmlFor="wd-student-annotation">Student Annotation</label>
                  </li>

                  <li className="list-group-item border-0">
                    <input type="checkbox" name="wd-file-upload" id="wd-file-upload" className="form-check-input me-2"/>
                    <label htmlFor="wd-file-upload">File Uploads</label>
                  </li>
                </ul>
                </div>
              </div>

              <div className="row mb-2">
                <div className="col"style={{textAlign:"right"}}>
                  <label htmlFor="wd-assign-to" className="form-label">Assign</label>
                  </div>


                  <div className="col">
                      <ul className="list-group rounded-0 border">

                        <li className="list-group-item border-0">
                          <div className="row"><label htmlFor="wd-assign-to" className="form-label" style={{fontWeight:"bold"}}>Assign to</label></div>
                          <div className="row"><input type="text" name="wd-assign-to" id="wd-assign-to" className="form-control me-2"/></div>
                          </li>


                      <li className="list-group-item border-0">
                          <div className="row"><label htmlFor="wd-due-date" className="wd-due-date" style={{fontWeight:"bold"}}>Due</label></div>
                          <div className="row"><div className="input-group"><input type="datetime" name="wd-due-date" id="wd-due-date" className="form-control" value={`${assignment.due_date}`}/><span className="input-group-text"><MdDateRange /></span></div></div>
                          </li>

                      <li className="list-group-item border-0">
                        <div className="row">
                        <div className="col">
                          <div className="row"><label htmlFor="wd-available-from" className="wd-available-from" style={{fontWeight:"bold"}}>Available From</label></div>
                          <div className="row"><div className="input-group"><input type="datetime" name="wd-available-from" id="wd-available-from" className="form-control" value={`${assignment.available_from}`}/><span className="input-group-text"><MdDateRange /></span></div></div>
                          </div>

                          <div className="col">
                          <div className="row"><label htmlFor="wd-available-until" className="wd-available-until" style={{fontWeight:"bold"}}>Until</label></div>
                          <div className="row"><div className="input-group"><input type="datetime" name="wd-available-until" id="wd-available-until" className="form-control" value={`${assignment.until}`}/><span className="input-group-text"><MdDateRange /></span></div></div>
                          </div>
                          </div>
                          </li>
                      </ul>
                  </div>


              </div>
              

              <div className="row mt-5 mb-2">
                <div className="col">
                <hr />
                <div className="col"><Link to={`/Kanbas/Courses/${cid}/Assignments`}><button className="btn btn-danger float-end rounded-1" type="submit">Save</button></Link> </div>
                <div className="col"><Link to={`/Kanbas/Courses/${cid}/Assignments`}><button className="btn btn-secondary float-end me-2 rounded-1" type="submit">Cancel</button></Link></div>
              </div>
              </div>

              </>
    
        ))}

        

    </div>
    </div>

);}
