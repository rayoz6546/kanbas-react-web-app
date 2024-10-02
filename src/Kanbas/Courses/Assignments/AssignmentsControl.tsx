import { FaPlus } from "react-icons/fa6";

export default function AssignmentsControls() {
  return (
  <>
    <div className="text-nowrap col">
      <input type="search" className="form-control rounded-0 me-1 wd-search-bar" id="wd-search-assignment" 
       placeholder="     Search..." style={{width:"250px"}}/>
      </div>
        

        <div className="col">
      <button id="wd-add-assignment-btn" className="btn btn-lg btn-danger me-1 float-end">
      <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
      Assignment</button>

      </div>

      <div className="col">
      <button id="wd-add-assignment-btn" className="btn btn-lg btn-secondary me-1 float-end">
      <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
      Group</button>
      </div>
</>

    
    
);
    
}