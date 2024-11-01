import { Routes, Route, Navigate } from "react-router";
import Account from "./Account";
import Dashboard from "./Dashboard";
import KanbasNavigation from "./Navigation";
import Courses from "./Dashboard/Courses"
import "./styles.css"
import { useState } from "react";
import * as db from "./Database";
import ProtectedContent from "./Account/ProtectedContent";
import ProtectedRoute from "./Account/ProtectedRoute";
import { ViewProvider } from "./Dashboard/Enrollment/EnrollmentView";
import {addNewCourse, deleteCourse, updateCourse} from "./Dashboard/Courses/reducer"
import { useDispatch, useSelector } from "react-redux";

export default function Kanbas() {
  const { courses } = useSelector((state: any) => state.coursesReducer);
  const [course, setCourse] = useState<any>({
    _id: new Date().getTime().toString(), name: "New Course", number: "New Number",
    startDate: "2023-09-10", endDate: "2023-12-15",  image: "/images/react.jpg", description: "New Description",
  });

  const dispatch = useDispatch()

  return (
    <div id="wd-kanbas">
        <KanbasNavigation />
        <div className="wd-main-content-offset p-3">
          <ViewProvider>
      <Routes>
        <Route path="/" element={<Navigate to="Dashboard" />} />
        <Route path="/Account/*" element={<Account />} />
        <Route path="/Dashboard" element={<ProtectedRoute><Dashboard 

                      course={course}
                      setCourse={setCourse}
                      addNewCourse={(courseId) => {console.log('Adding course:', courseId); dispatch(addNewCourse(courseId))}} 
                      deleteCourse={(courseId) => dispatch(deleteCourse({ course: courseId }))}
                      updateCourse={() => dispatch(updateCourse(course))}
                      /></ProtectedRoute>} />
        <Route path="/Courses/:cid/*" element={<ProtectedRoute><Courses courses={courses}/></ProtectedRoute>} />
        <Route path="/Calendar" element={<h1>Calendar</h1>} />
        <Route path="/Inbox" element={<h1>Inbox</h1>} />
      </Routes>
      </ViewProvider>  
      </div>

    </div>
);}

  