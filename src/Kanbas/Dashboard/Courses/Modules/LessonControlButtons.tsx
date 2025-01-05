import { IoEllipsisVertical } from "react-icons/io5";
import { FaCheckCircle, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { CiNoWaitingSign } from "react-icons/ci";
import * as modulesClient from "./client";
import { updateLessonInModule } from "./reducer";
import { useState } from "react";

export default function LessonControlButtons({handleDelete, moduleId, lessonId,allIconsVisible, visibleIcons,toggleIcons}:{  handleDelete: (moduleId: string, lessonId: string, lesson:any) => void;
  moduleId: string;
  lessonId: string;
  allIconsVisible: boolean;
  visibleIcons:any, 
  toggleIcons: (Id:any)=>void
}) 
  {
  const dispatch = useDispatch();

  const {modules} = useSelector(((state: any) => state.modulesReducer))
  const module = modules.find((m:any)=> m._id === moduleId)
  const lesson = module?.lessons.find((l: any) => l._id === lessonId);

  const isVisible = allIconsVisible || visibleIcons[lessonId];


  const handlePublishToggle = async () => {

    const updatedModule = modules.find((m: any) => m._id === moduleId);
    const lesson = updatedModule?.lessons.find((l: any) => l._id === lessonId);
  
    if (!lesson) {
      console.error("Lesson not found!");
      return;
    }
  
    const updatedPublished = !lesson.published;
  
    try {

      await modulesClient.updateLesson(moduleId, lessonId, {
        ...lesson,
        published: updatedPublished,
      });
  

      dispatch(
        updateLessonInModule({
          moduleId,
          lessonId,
          updatedLesson: { ...lesson, published: updatedPublished },
        })
      );
    } catch (error) {
      console.error("Failed to toggle publish status:", error);
    }
  };
  return (
    <div className="float-end">

{isVisible && (<>
    <span className="me-1 position-relative" onClick={()=>handlePublishToggle()} >
    {lesson.published ? ( 
        <FaCheckCircle style={{ top: "0.5px", cursor:"pointer" }} className=" text-success position-relative fs-4" />
    ) : ( 
        <CiNoWaitingSign className="fs-4 position-relative" style={{ top: "0.5px", cursor:"pointer" }}/>
    )}
    </span>
      <FaTrash
      className="text-danger ms-2"
      onClick={()=>handleDelete(moduleId,lessonId,lesson)}
      style={{ cursor: "pointer" }}
    /></>)}

          <button
        id="wd-module-menu-btn"
        className="btn fs-5"
        onClick={()=>toggleIcons(lessonId)}
      >
        <IoEllipsisVertical style={{ cursor: "pointer" }} />
      </button>

    </div>
);}
