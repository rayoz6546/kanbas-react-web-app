import { CiNoWaitingSign } from "react-icons/ci";
import { FaCheckCircle } from "react-icons/fa";
import { FiMoreVertical } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router";
import * as questionsClient from "../Quizzes/questionsClient";
import { setQuestions } from "./questionsReducer";
import { useEffect, useState } from "react";
export default function QuizEditor({setStagedQuestions, stagedQuestions}:{setStagedQuestions:any, stagedQuestions:any}) {
    const { pathname } = useLocation();
    const { cid, qid } = useParams()
    const {quizzes} = useSelector((state:any) => state.quizzesReducer)
    const quiz = quizzes.find((q: any) => q._id === qid && q.course === cid)
    const [points, setPoints] = useState(quiz? quiz.points : 0)

    const addQuestionsPoints = () => {
        let p = 0
        stagedQuestions.map((q:any)=>{(q.points) ? (p += parseFloat(q.points)) : p+= 0 })
        setPoints(p)
    }
      
    useEffect(() => {


        addQuestionsPoints()
        
    }, [stagedQuestions, setStagedQuestions]);

    return (

 
        <div id="wd-quiz-editor" className="p-3">

            <div className="row mb-3 float-end">
                <div className="col text-nowrap">
                    Points {points}
                </div>
                <div className="col text-nowrap" style={{ color: "grey" }}>
                    {quiz && quiz.published ? (<><FaCheckCircle className="fs-5 mb-1 me-1 text-success" /> Published</>) : (<><CiNoWaitingSign className="fs-5 mb-1 me-1" /> Not Published</>)}
                </div>
                <div className="col">
                    <button id="wd-quiz-menu-btn" className="btn btn-sm btn-secondary fs-6 rounded-1 float-end" style={{ position: "relative", top: "-4px" }}>
                        <FiMoreVertical /></button>
                </div>
            </div>

            <hr style={{ border: "1px solid #ccc", width: "100%", margin: "0" }} className="mb-2" />

            <div className="row">
                <ul className="nav nav-tabs">
                    <li className="nav-item">
                        <a href={`#/Kanbas/Courses/${cid}/Quizzes/${qid}/Editor/Details`} className={`nav-link ${pathname.includes("Details") ? "active" : ""}`}>
                            Details
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href={`#/Kanbas/Courses/${cid}/Quizzes/${qid}/Editor/Questions`}
                            className={`nav-link ${pathname.includes("Questions") ? "active" : ""}`}>
                            Questions
                        </a>
                    </li>
                </ul>
            </div>


        </div>
    );
}
