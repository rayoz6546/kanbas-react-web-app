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
import { useNavigate, useParams } from "react-router";

export default function CourseStatus({isStudentView}:{isStudentView:Boolean}) {
  const navigate = useNavigate()
  const {cid} = useParams()
  return (
    <div id="wd-course-status" style={{ width: "300px" }}>
      <h2>Course Status</h2>
      {isStudentView ? (
        <>
      

        <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
        <TfiAnnouncement className="me-2 fs-5" /> Announcements </button>

        <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
        <IoIosNotifications className="me-2 fs-5" /> View Course Notifications </button>

        <button className="btn btn-lg btn-secondary w-100 mt-1 text-start" onClick={()=>navigate(`/Kanbas/Courses/${cid}/Analytics`)}>
        <BiSolidBarChartAlt2 className="me-2 fs-5"/> Vew Analytics </button>

        <button className="btn btn-lg btn-secondary w-100 mt-1 text-start" onClick = {() => window.open("https://www.microsoft.com/en-us/microsoft-365/outlook/email-and-calendar-software-microsoft-outlook","_blank")}>
        <MdEmail className="me-2 fs-5" /> Outlook </button>

        </>
) : 
<>


        <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
        <TfiAnnouncement className="me-2 fs-5" /> Announcements </button>

        <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
        <IoIosNotifications className="me-2 fs-5" /> View Course Notifications </button>

        <button className="btn btn-lg btn-secondary w-100 mt-1 text-start"  onClick={()=>navigate(`/Kanbas/Courses/${cid}/Analytics`)}>
        <BiSolidBarChartAlt2 className="me-2 fs-5" /> Vew Analytics </button>

        <button className="btn btn-lg btn-secondary w-100 mt-1 text-start" onClick = {() => window.open("https://www.microsoft.com/en-us/microsoft-365/outlook/email-and-calendar-software-microsoft-outlook","_blank")}>
        <MdEmail className="me-2 fs-5" /> Outlook </button></>}

    </div>
);}

  