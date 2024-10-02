import { FaPlus } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { BsGripVertical } from "react-icons/bs";
import ModuleControlButtons from "../Modules/ModuleControlButtons";
import LessonControlButtons from "../Modules/LessonControlButtons";
import { MdAssignmentAdd } from "react-icons/md";
import AssignmentsControls from "./AssignmentsControl"
import AssignmentsControlButtons from "./AssignmentsControlButtons";
import { IoMdArrowDropdown } from "react-icons/io";

export default function Assignments() {
    return (
      <div id="wd-assignments row" className="p-5">
        
        <div className="row mb-5">

            <div className="col">
          <input type="search" className="form-control rounded-0 me-1 wd-search-bar" id="wd-search-assignment" 
          placeholder="     Search..." style={{width:"300px"}}/>
          </div>
          
          <div className="col">
            <div className="col">
            <button id="wd-add-assignment-btn" className="btn btn-lg btn-danger fs-6 rounded-1 float-end">
            <FaPlus className="position-relative me-2" style={{ bottom: "1px"}} />
            Assignment</button>
            </div>

            <div className="col">
            <button id="wd-add-assignment-btn" className="btn btn-lg btn-secondary fs-6 rounded-1 float-end me-2">
            <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
            Group</button>
            </div>
          </div>
        </div>
      

        

      <div className="row">
        <ul className="list-group rouded-0">
          <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
        
          <div className="wd-title p-3 ps-2 bg-secondary"><BsGripVertical className="me-2 fs-3" /><IoMdArrowDropdown className="me-2"/>ASSIGNMENTS<AssignmentsControlButtons /></div>
          <ul id="wd-assignment-list" className="wd-lessons list-group rounded-0">


            <li className="wd-assignment-list-item list-group-item p-3 ps-1"><BsGripVertical className="me-2 fs-3" style={{color:"green"}}/><MdAssignmentAdd className="me-3 fs-3" style={{color:"green"}}/>
              <a className="wd-assignment-link" href="#/Kanbas/Courses/1234/Assignments/123">A1</a><LessonControlButtons />
              <br />
              <p className="wd-assignment-info"><span style={{color:'red'}}>Multiple Modules</span> | <strong>Not available until</strong> May 6 at 12:00am | <strong>Due</strong> May 13 at 11:59pm | 100 pts</p>
            </li>

            <li className="wd-assignment-list-item list-group-item p-3 ps-1"><BsGripVertical className="me-2 fs-3" style={{color:"green"}}/><MdAssignmentAdd className="me-3 fs-3" style={{color:"green"}}/>
              <a className="wd-assignment-link" href="#/Kanbas/Courses/1234/Assignments/123">A2</a> <LessonControlButtons />
              <br />
              <p className="wd-assignment-info"><span style={{color:'red'}}>Multiple Modules</span> | <strong>Not available until</strong> May 13 at 12:00am | <strong>Due</strong> May 20 at 11:59pm | 100 pts</p>
            </li>

            <li className="wd-assignment-list-item list-group-item p-3 ps-1"><BsGripVertical className="me-2 fs-3" style={{color:"green"}}/><MdAssignmentAdd className="me-3 fs-3" style={{color:"green"}}/>
              <a className="wd-assignment-link" href="#/Kanbas/Courses/1234/Assignments/123">A3</a> <LessonControlButtons />
              <br />
              <p className="wd-assignment-info"><span style={{color:'red'}}>Multiple Modules</span> | <strong>Not available until</strong> May 20 at 12:00am | <strong>Due</strong> May 27 at 11:59pm | 100 pts</p>
            </li>

          </ul>
          </li>

        </ul>

        </div>
      </div>
  );}
  