import { MdDoNotDisturbAlt } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { BiImport } from "react-icons/bi";
import { LiaFileImportSolid } from "react-icons/lia";
import { IoMdHome } from "react-icons/io";
import { BiSolidBarChartAlt2 } from "react-icons/bi";
import { TfiAnnouncement } from "react-icons/tfi";
import { IoIosNotifications } from "react-icons/io";
import ProtectedContent from "../../../Account/ProtectedContent";
import { MdEmail } from "react-icons/md";

export default function CourseStatus({isStudentView}:{isStudentView:Boolean}) {
  return (
    <div id="wd-course-status" style={{ width: "300px" }}>
      <h2>Course Status</h2>
      {isStudentView ? (
        <>
      
      <ProtectedContent>
      <div className="d-flex">
        <div className="w-50 pe-1">
          <button className="btn btn-lg btn-secondary w-100 text-nowrap ">
            <MdDoNotDisturbAlt className="me-2 fs-5" /> Unpublish </button>
        </div>
        <div className="w-50">
          <button className="btn btn-lg btn-success w-100">
            <FaCheckCircle className="me-2 fs-5" /> Publish </button>
        </div>
      </div><br />
      

      <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
        <BiImport className="me-2 fs-5" /> Import Existing Content </button>



        </ProtectedContent>

        <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
        <TfiAnnouncement className="me-2 fs-5" /> Announcements </button>

        <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
        <IoIosNotifications className="me-2 fs-5" /> View Course Notifications </button>

        <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
        <BiSolidBarChartAlt2 className="me-2 fs-5" /> Vew Analytics </button>

        </>
) : 
<>


        <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
        <TfiAnnouncement className="me-2 fs-5" /> Announcements </button>

        <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
        <IoIosNotifications className="me-2 fs-5" /> View Course Notifications </button>

        <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
        <BiSolidBarChartAlt2 className="me-2 fs-5" /> Vew Analytics </button>

        <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
        <MdEmail className="me-2 fs-5" /> Outlook </button></>}

    </div>
);}

  