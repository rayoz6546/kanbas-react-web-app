import { Link } from "react-router-dom";
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
      <div id="wd-dashboard-courses">
        <div className="wd-dashboard-course">
          <img src="/images/reactjs.jpg" width={200} />
          <div>
            <Link className="wd-dashboard-course-link"
                  to="/Kanbas/Courses/1234/Home"> CS1234 React JS </Link>
            <p className="wd-dashboard-course-title">
              Full Stack software developer </p>
            <Link to="/Kanbas/Courses/1234/Home"> Go </Link>
          </div>
        </div>

        <br />

        <div className="wd-dashboard-course">
          <img src="/images/AI.jpg" width={200} />
          <div>
            <Link className="wd-dashboard-course-link"
                  to="/Kanbas/Courses/1234/Home"> CS1234 AI </Link>
            <p className="wd-dashboard-course-title">
              Artificial Intelligience </p>
            <Link to="/Kanbas/Courses/1234/Home"> Go </Link>
          </div>
        </div>

        <br />

        <div className="wd-dashboard-course">
          <img src="/images/database.jpg" width={200} />
          <div>
            <Link className="wd-dashboard-course-link"
                  to="/Kanbas/Courses/1234/Home"> CS1234 Database </Link>
            <p className="wd-dashboard-course-title">
              Data Management </p>
            <Link to="/Kanbas/Courses/1234/Home"> Go </Link>
          </div>
        </div>

        <br />

        <div className="wd-dashboard-course">
          <img src="/images/cloud.jpg" width={200} />
          <div>
            <Link className="wd-dashboard-course-link"
                  to="/Kanbas/Courses/1234/Home"> CS1234 Cloud </Link>
            <p className="wd-dashboard-course-title">
              Fundamentals of Cloud Computing </p>
            <Link to="/Kanbas/Courses/1234/Home"> Go </Link>
          </div>
        </div>

        <br />

        <div className="wd-dashboard-course">
          <img src="/images/qphysics.jpg" width={200} />
          <div>
            <Link className="wd-dashboard-course-link"
                  to="/Kanbas/Courses/1234/Home"> CS1234 Quantum Physics </Link>
            <p className="wd-dashboard-course-title">
              Intro to Quantum Physics </p>
            <Link to="/Kanbas/Courses/1234/Home"> Go </Link>
          </div>
        </div>

        <br />

        <div className="wd-dashboard-course">
          <img src="/images/calc.jpg" width={200} />
          <div>
            <Link className="wd-dashboard-course-link"
                  to="/Kanbas/Courses/1234/Home"> CS1234 Calculus III </Link>
            <p className="wd-dashboard-course-title">
              Calculus III </p>
            <Link to="/Kanbas/Courses/1234/Home"> Go </Link>
          </div>
        </div>

        <br />

        <div className="wd-dashboard-course">
          <img src="/images/chem.jpg" width={200} />
          <div>
            <Link className="wd-dashboard-course-link"
                  to="/Kanbas/Courses/1234/Home"> CS1234 Chemistry II </Link>
            <p className="wd-dashboard-course-title">
              Chemistry II </p>
            <Link to="/Kanbas/Courses/1234/Home"> Go </Link>
          </div>
        </div>

      </div>
    </div>
);}