import { IoEllipsisVertical } from "react-icons/io5";
import { BsPlus } from "react-icons/bs";
export default function AssignmentsControlButtons() {
  return (
    <div className="float-end">
    <div className="wd-assignments-percentage">40% of Total</div>
    <BsPlus className="me-3 fs-3"/>
    <IoEllipsisVertical className="fs-4" />
    </div>
);}