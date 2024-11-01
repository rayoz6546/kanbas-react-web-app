
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { enroll, unEnroll } from "./Enrollment/reducer";
import ProtectedContent from "../Account/ProtectedContent";
import ProtectedContentEnrollment from "../Account/ProtectedContentEnrollment";
import { useViewContext } from "./Enrollment/EnrollmentView";


export default function Dashboard({course,setCourse,addNewCourse,deleteCourse,updateCourse}: {
  course: any; setCourse: (course: any) => void;
  addNewCourse: (course: any) => void; deleteCourse: (course: any) => void; updateCourse: () => void;}) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const dispatch = useDispatch();
  const { enrollments } = useSelector((state: any) => state.enrollmentsReducer);
  const { courses } = useSelector((state: any) => state.coursesReducer);
  const { isEnrollmentView, toggleView } = useViewContext();

  const userCoursesCount = courses.filter((course: { _id: any; }) => 
    enrollments.some((enrollment: { user: any; course: any; }) => 
        enrollment.user === currentUser._id && enrollment.course === course._id
    )
).length;

  const handleAddNewCourse = (newcourse:any) => {

    addNewCourse(newcourse);
    dispatch(enroll({ user: currentUser._id, course: newcourse._id }));
  }

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
<ProtectedContent>
      <h5>New Course
          <button className="btn btn-primary float-end"
                  id="wd-add-new-course-click"
                  onClick={() => {
                    const newCourse = { ...course, _id: new Date().getTime().toString(), image:"/images/react.jpg" };
                    setCourse(newCourse);  
                    handleAddNewCourse(newCourse);  
                }}
                  >
                    Add </button>
                    

          <button className="btn btn-warning float-end me-2"
                onClick={updateCourse} id="wd-update-course-click">
          Update
        </button>
      </h5><br />
      <input value={course.name} className="form-control mb-2"              
        onChange={(e) => setCourse({ ...course, name: e.target.value }) } />
      
      <textarea value={course.description} className="form-control"
        onChange={(e) => setCourse({ ...course, description: e.target.value }) }/>
        </ProtectedContent>

        <ProtectedContentEnrollment>
          <h5><button className="btn btn-primary float-end" onClick={toggleView}>Enrollments</button></h5>
          
        </ProtectedContentEnrollment>


      <h2 id="wd-dashboard-published">Published Courses ({userCoursesCount})</h2> <hr />
      <div id="wd-dashboard-courses" className="row">
        <div className="row row-cols-1 row-cols-md-5 g-4">
{isEnrollmentView ? 
        (courses.
            filter((course: any) =>
              enrollments.some(
                (enrollment:any) =>
                  enrollment.user === currentUser._id &&
                  enrollment.course === course._id
                 ))
        .map((course: any) => (

            <div className="wd-dashboard-course col" style={{ width: "300px"}}>

              <div className="card rounded-3 overflow-hidden">
                <Link to={`/Kanbas/Courses/${course._id}/Home`}
                      className="wd-dashboard-course-link text-decoration-none text-dark" >
                  <img src={course.image} width="100%" height={160} />
                  <div className="card-body">
                    <h5 className="wd-dashboard-course-title card-title">
                      {course.name} </h5>
                    <p className="wd-dashboard-course-title card-text overflow-y-hidden" style={{ maxHeight: 100 }}>
                      {course.description} </p>
                    <button className="btn btn-primary"> Go </button>

                    
                <ProtectedContent>
                    <button onClick={(event) => {
                      event.preventDefault();
                      deleteCourse(course._id);}} 
                    className="btn btn-danger float-end"
                    id="wd-delete-course-click">
                    Delete
                  </button>

                  <button id="wd-edit-course-click"
                        onClick={(event) => {
                          event.preventDefault();
                          setCourse(course);
                        }}
                        className="btn btn-warning me-2 float-end" >
                        Edit
                      </button>
                      </ProtectedContent>
                  </div>
                </Link>
              </div>
            </div>
          )))
        : 
        (courses
      .map((course: any) => (
          
          <div className="wd-dashboard-course col" style={{ width: "300px"}}>
            <div className="card rounded-3 overflow-hidden">
              <div className="wd-dashboard-course-link text-decoration-none text-dark">
                  
                <img src={course.image} width="100%" height={160} />
                <div className="card-body">
                  <h5 className="wd-dashboard-course-title card-title">
                    {course.name} </h5>
                  <p className="wd-dashboard-course-title card-text overflow-y-hidden" style={{ maxHeight: 100 }}>
                    {course.description} </p>
                  </div>

                  {
            enrollments.some(
                (enrollment:any) =>
                  enrollment.user === currentUser._id &&
                  enrollment.course === course._id
                 ) ?
                  <button onClick=
                  {(event) => {event.preventDefault();
                              dispatch(unEnroll({user:currentUser._id, course:course._id}))}}
                     className="btn btn-danger float-end"
                    id="wd-unenroll-course-click">
                    Unenroll
                  </button> : 

            <button onClick=
            {(event) => {event.preventDefault();
                        dispatch(enroll({user:currentUser._id, course:course._id}))}}

            className="btn btn-primary float-end"
            id="wd-enroll-course-click"> 
             Enroll </button>
  }


                  
                  </div></div></div>
                  )) )}

        </div>
      </div>
    </div>
);
}
