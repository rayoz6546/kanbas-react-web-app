import { Link } from "react-router-dom";
export default function Dashboard() {
  return (
<div id="wd-dashboard">
  <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
  <h2 id="wd-dashboard-published">Published Courses (8)</h2> <hr />
  <div id="wd-dashboard-courses" className="row">
    <div className="row row-cols-1 row-cols-md-5 g-4">
      <div className="wd-dashboard-course col-12 col-sm-6 col-lg-3" style={{ width: "270px" }}>
        <div className="card rounded-3 overflow-hidden">
          <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                to="/Kanbas/Courses/1234/Home">
            <img src="/images/reactjs.jpg" width="100%" height={160}/>
            <div className="card-body">
              <h5 className="wd-dashboard-course-title card-title">
                 CS1234 React JS
              </h5>
              <p className="wd-dashboard-course-title card-text">
                  Full Stack Developer
              </p>
              <button className="btn btn-primary"> Go </button>
            </div>
          </Link>
        </div>
        </div>


        <div className="wd-dashboard-course col-12 col-sm-6 col-lg-3" style={{ width: "270px" }}>
        <div className="card rounded-3 overflow-hidden">
          <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                to="/Kanbas/Courses/1234/Home">
            <img src="/images/AI.jpg" width="100%" height={160}/>
            <div className="card-body">
              <h5 className="wd-dashboard-course-title card-title">
                CS1234 AI
              </h5>
              <p className="wd-dashboard-course-title card-text">
                Artificial Intelligience
              </p>
              <button className="btn btn-primary"> Go </button>
            </div>
          </Link>
        </div>
        </div>


        <div className="wd-dashboard-course col-12 col-sm-6 col-lg-3" style={{ width: "270px" }}>
        <div className="card rounded-3 overflow-hidden">
          <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                to="/Kanbas/Courses/1234/Home">
            <img src="/images/database.jpg" width="100%" height={160}/>
            <div className="card-body">
              <h5 className="wd-dashboard-course-title card-title">
                CS1234 Database
              </h5>
              <p className="wd-dashboard-course-title card-text">
                Data Management with SQL
              </p>
              <button className="btn btn-primary"> Go </button>
            </div>
          </Link>
        </div>
        </div>


        <div className="wd-dashboard-course col-12 col-sm-6 col-lg-3" style={{ width: "270px" }}>
        <div className="card rounded-3 overflow-hidden">
          <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                to="/Kanbas/Courses/1234/Home">
            <img src="/images/cloud.jpg" width="100%" height={160}/>
            <div className="card-body">
              <h5 className="wd-dashboard-course-title card-title">
              CS1234 Cloud
              </h5>
              <p className="wd-dashboard-course-title card-text">
              Cloud Computing
              </p>
              <button className="btn btn-primary"> Go </button>
            </div>
          </Link>
        </div>
        </div>

        
        <div className="wd-dashboard-course col-12 col-sm-6 col-lg-3" style={{ width: "270px" }}>
        <div className="card rounded-3 overflow-hidden">
          <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                to="/Kanbas/Courses/1234/Home">
            <img src="/images/qphysics.jpg" width="100%" height={160}/>
            <div className="card-body">
              <h5 className="wd-dashboard-course-title card-title">
              CS1234 Physics
              </h5>
              <p className="wd-dashboard-course-title card-text">
              Intro to Quantum Physics
              </p>
              <button className="btn btn-primary"> Go </button>
            </div>
          </Link>
        </div>
        </div>


        <div className="wd-dashboard-course col-12 col-sm-6 col-lg-3" style={{ width: "270px" }}>
        <div className="card rounded-3 overflow-hidden">
          <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                to="/Kanbas/Courses/1234/Home">
            <img src="/images/calc.jpg" width="100%" height={160}/>
            <div className="card-body">
              <h5 className="wd-dashboard-course-title card-title">
              CS1234 Calculus III
              </h5>
              <p className="wd-dashboard-course-title card-text">
              Calculus III
              </p>
              <button className="btn btn-primary"> Go </button>
            </div>
          </Link>
        </div>
        </div>
        

        <div className="wd-dashboard-course col-12 col-sm-6 col-lg-3" style={{ width: "270px" }}>
        <div className="card rounded-3 overflow-hidden">
          <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                to="/Kanbas/Courses/1234/Home">
            <img src="/images/chem.jpg" width="100%" height={160}/>
            <div className="card-body">
              <h5 className="wd-dashboard-course-title card-title">
              CS1234 Chemistry II
              </h5>
              <p className="wd-dashboard-course-title card-text">
              Chemistry II
              </p>
              <button className="btn btn-primary"> Go </button>
            </div>
          </Link>
        </div>
        </div>

        <div className="wd-dashboard-course col-12 col-sm-6 col-lg-3" style={{ width: "270px" }}>
        <div className="card rounded-3 overflow-hidden">
          <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                to="/Kanbas/Courses/1234/Home">
            <img src="/images/electromagnetics.jpg" width="100%" height={160}/>
            <div className="card-body">
              <h5 className="wd-dashboard-course-title card-title">
              CS1234 Physics III
              </h5>
              <p className="wd-dashboard-course-title card-text">
              Electromagnetics
              </p>
              <button className="btn btn-primary"> Go </button>
            </div>
          </Link>
        </div>
        </div>
        
        
    </div>
  </div>
  </div>

);}