import { BsGripVertical } from "react-icons/bs";
import ModulesControls from "./ModulesControls";
import ModuleControlButtons from "./ModuleControlButtons";
import LessonControlButtons from "./LessonControlButtons";
import { HiLink } from "react-icons/hi";
import { FaRegFileAlt } from "react-icons/fa";
import { useParams } from "react-router";

import React, { useState, useEffect } from "react";
import * as coursesClient from "../client";
import { addModule, editModule, updateModule, deleteModule, setModules, deleteLessonFromModule } from "./reducer";
import { useSelector, useDispatch } from "react-redux";
import ProtectedContent from "../../../Account/ProtectedContent";
import * as modulesClient from "./client";
import ProtectedContentEnrollment from "../../../Account/ProtectedContentEnrollment";

import { useViewContext } from "../Quizzes/View";
import StudentViewButton from "../Quizzes/StudentViewButton";
import AddLessonDialog from "./LessonAddDialog";
import * as filesClient from "../filesClient";
import { deleteFile, setFiles } from "../filesReducer";

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;

export default function Modules({ collapsed, setCollapsed, allIconsVisible, setAllIconsVisible,toggleAllIcons, visibleIcons,toggleIcons}: { collapsed: boolean, setCollapsed:any, allIconsVisible:any, setAllIconsVisible:any,visibleIcons:any,  toggleAllIcons: () => void;toggleIcons: (Id:any)=>void
}) {
    const { cid } = useParams();
    const [moduleName, setModuleName] = useState("");
    const { isStudentView, toggleView } = useViewContext();
    const { modules } = useSelector((state: any) => state.modulesReducer);
    const { files } = useSelector((state: any) => state.filesReducer);


    const dispatch = useDispatch();


    const fetchModules = async () => {
      const modules = await coursesClient.findModulesForCourse(cid as string);
      dispatch(setModules(modules));
    };
    useEffect(() => {
      fetchModules();
    }, []);
  

    const createModuleForCourse = async () => {
      if (!cid) return;
      const newModule = { name: moduleName, course: cid, published:false };
      const module = await coursesClient.createModuleForCourse(cid, newModule);
      dispatch(addModule(module));
      fetchModules();
    };
  
    const removeModule = async (moduleId: string) => {
      await modulesClient.deleteModule(moduleId);
      dispatch(deleteModule(moduleId));
      fetchModules();

    };

    const saveModule = async (module: any) => {

      await modulesClient.updateModule(module);
      dispatch(updateModule(module));
    };
  
    const handleDelete = async (moduleId: string, lessonId: string, lesson:any) => {
      try {
        await modulesClient.deleteLesson(moduleId, lessonId);

  
        dispatch(deleteLessonFromModule({ moduleId, lessonId }));
        if (lesson.file!=="") { 
          await filesClient.deleteFile(lesson.file);
          dispatch(deleteFile(lesson.file))
        }
      } catch (error) {
        console.error("Failed to delete lesson:", error);
      }
    };
    const toggleCollapseAll = () => {
      setCollapsed(!collapsed);
    };

    const [showLessonDialog, setShowLessonDialog] = useState(false);
    const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null);
    const openAddLessonDialog = (moduleId: string) => {
      setSelectedModuleId(moduleId);
      setShowLessonDialog(true);
    };
  
    const closeAddLessonDialog = () => {
      setShowLessonDialog(false);
      setSelectedModuleId(null);
    };
  



  
    return (
      <>
        <ProtectedContent><StudentViewButton
            isStudentView={isStudentView}
            onClick={toggleView}
        /></ProtectedContent>
      <div>

        {isStudentView ? (<>

     

        <ModulesControls
          moduleName={moduleName}
          setModuleName={setModuleName}
          addModule={createModuleForCourse}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          allIconsVisible={allIconsVisible}
          setAllIconsVisible={setAllIconsVisible}
          toggleAllIcons={toggleAllIcons}


        />
                    
        <br /><br /><br /><br />


        <ul id="wd-modules" className="list-group rounded-0">

        {modules
          // .filter((module: any) => module.course === cid)
          .map((module: any) => (
            <>
  
                <ProtectedContent>

                  
          <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
            <div className="wd-title p-3 ps-2 bg-secondary">
              <BsGripVertical className="me-2 fs-3" />       {!module.editing && module.name}
      { module.editing && (
        <input className="form-control w-50 d-inline-block"
              onChange={(e) => dispatch(updateModule({ ...module, name: e.target.value }))}
               onKeyDown={(e) => {
                 if (e.key === "Enter") {
                  dispatch(updateModule({ ...module, editing: false }));
                  saveModule({ ...module, editing: false });

                 }
               }}
               defaultValue={module.name}/>
      )}
              <ProtectedContent>
              <ModuleControlButtons  moduleId={module._id} 
              deleteModule={(moduleId:any) => removeModule(moduleId)}
                  editModule={(moduleId:any) => dispatch(editModule(moduleId))} openAddLessonDialog={openAddLessonDialog} allIconsVisible={allIconsVisible} visibleIcons={visibleIcons} toggleIcons={toggleIcons}
                  /></ProtectedContent>
            </div>

            
            {module.lessons && !collapsed && (
              <ul className="wd-lessons list-group rounded-0">
                {module.lessons.map((lesson: any) => (
                  <>
                  {(lesson.name!==""  && lesson.file==="") ? <>
                    <li className="wd-lesson list-group-item p-3 ps-1">
                    <BsGripVertical className="me-2 fs-3" /> {lesson.name}  <ProtectedContent><LessonControlButtons handleDelete={handleDelete} moduleId={module._id} lessonId={lesson._id} allIconsVisible={allIconsVisible} visibleIcons={visibleIcons} toggleIcons={toggleIcons}/></ProtectedContent>
                  </li></> : null

                  }

                {lesson.link!=="" ? <>
                    <li className="wd-lesson list-group-item p-3 ps-1">
                    <HiLink className="ms-2 fs-4" /> <button className="btn btn-link fs-5" onClick={() => window.open(lesson.link,"_blank")}>{lesson.link}</button> <ProtectedContent><LessonControlButtons handleDelete={handleDelete} moduleId={module._id} lessonId={lesson._id} allIconsVisible={allIconsVisible} visibleIcons={visibleIcons} toggleIcons={toggleIcons}/></ProtectedContent>
                  </li></> : null

                  }


                  {lesson.file !== "" ? (
                    <li className="wd-lesson list-group-item p-3 ps-1">
                      <FaRegFileAlt className="me-2 ms-2 fs-4" />

                      <a
                        href={`${REMOTE_SERVER}/api/files/${files && files.find((f: any) => f.itemId === lesson._id)?._id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        download
                        className="btn btn-link fs-5"
                      >
                         {lesson.name}
                      </a>
                      <ProtectedContent>
                        <LessonControlButtons
                          handleDelete={handleDelete}
                          moduleId={module._id}
                          lessonId={lesson._id}
                          allIconsVisible={allIconsVisible} 
                          visibleIcons={visibleIcons} 
                          toggleIcons={toggleIcons}
                        />
                      </ProtectedContent>
                    </li>
                  ) : null}

                  </>
                ))}
                </ul>
                )}

              {selectedModuleId === module._id && (
                <AddLessonDialog
                  dialogTitle={`Add Lesson to ${module.name}`}
                  moduleId={module._id}
                  closeDialog={closeAddLessonDialog}
                />
              )}
                </li></ProtectedContent>


                {module.published && (
                  <ProtectedContentEnrollment>
                <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
                  <div className="wd-title p-3 ps-2 bg-secondary">
                    <BsGripVertical className="me-2 fs-3" />       {!module.editing && module.name}
            { module.editing && (
              <input className="form-control w-50 d-inline-block"
                    onChange={(e) => dispatch(updateModule({ ...module, name: e.target.value }))}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                        dispatch(updateModule({ ...module, editing: false }));
                        saveModule({ ...module, editing: false });
      
                        }
                      }}
                      defaultValue={module.name}/>
            )}
                    <ProtectedContent>
                    <ModuleControlButtons  moduleId={module._id} 
                    deleteModule={(moduleId:any) => removeModule(moduleId)}
                        editModule={(moduleId:any) => dispatch(editModule(moduleId))} openAddLessonDialog={openAddLessonDialog} allIconsVisible={allIconsVisible} visibleIcons={visibleIcons} toggleIcons={toggleIcons}
                        /></ProtectedContent>
                  </div>
      
                  
                  {module.lessons && !collapsed && (
                    <ul className="wd-lessons list-group rounded-0">
                      {module.lessons.map((lesson: any) => (
                        <>
                        {lesson.published && (
                           <>
                           {(lesson.name!==""  && lesson.file==="") ? <>
                             <li className="wd-lesson list-group-item p-3 ps-1">
                             <BsGripVertical className="me-2 fs-3" /> {lesson.name}  <ProtectedContent><LessonControlButtons handleDelete={handleDelete} moduleId={module._id} lessonId={lesson._id} allIconsVisible={allIconsVisible} visibleIcons={visibleIcons}  toggleIcons={toggleIcons}/></ProtectedContent>
                           </li></> : null
         
                           }
         
                         {lesson.link!=="" ? <>
                             <li className="wd-lesson list-group-item p-3 ps-1">
                             <HiLink className="ms-2 fs-4" /> <button className="btn btn-link fs-5" onClick={() => window.open(lesson.link,"_blank")}>{lesson.link}</button> <ProtectedContent><LessonControlButtons handleDelete={handleDelete} moduleId={module._id} lessonId={lesson._id} allIconsVisible={allIconsVisible} visibleIcons={visibleIcons} toggleIcons={toggleIcons}/></ProtectedContent>
                           </li></> : null
         
                           }
         
         {lesson.file !== "" ? (
                    <li className="wd-lesson list-group-item p-3 ps-1">
                      <FaRegFileAlt className="me-2 ms-2 fs-4" />
                      <a
                        href={`${REMOTE_SERVER}/api/files/${files && files.find((f: any) => f.itemId === lesson._id)?._id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        download
                        className="btn btn-link fs-5"
                      >
                         {lesson.name}
                      </a>

                    </li>
                  ) : null}
                           </>
                        )}</>
                      ))}
                      </ul>
                      )}
                      </li></ProtectedContentEnrollment>
                )}
                </>))}
    
        </ul></>):(
        <>
      <button
          id="wd-collapse-all"
          className="btn btn-lg btn-secondary me-1 float-end"
          onClick={toggleCollapseAll}
        >
          {collapsed ? "Uncollapse All" : "Collapse All"}
        </button>
                    
        <br /><br /><br /><br />
        <ul id="wd-modules" className="list-group rounded-0">

              {modules
                .map((module: any) => (
                  <>
                  
                      {module.published && (
                          
                              <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
                                <div className="wd-title p-3 ps-2 bg-secondary">
                                  <BsGripVertical className="me-2 fs-3" />       {!module.editing && module.name}

                                </div>
                    
                                
                                {module.lessons && !collapsed && (
                                  <ul className="wd-lessons list-group rounded-0">
                                    {module.lessons.map((lesson: any) => (
                                      <>
                                      {lesson.published && (
                                        <>
                                        {(lesson.name!==""  && lesson.file==="") ? <>
                                          <li className="wd-lesson list-group-item p-3 ps-1">
                                          <BsGripVertical className="me-2 fs-3" /> {lesson.name} 
                                        </li></> : null
                      
                                        }
                      
                                      {lesson.link!=="" ? <>
                                          <li className="wd-lesson list-group-item p-3 ps-1">
                                          <HiLink className="ms-2 fs-4" /> <button className="btn btn-link fs-5" onClick={() => window.open(lesson.link,"_blank")}>{lesson.link}</button> 
                                        </li></> : null
                      
                                        }
                      
                      {lesson.file !== "" ? (
                    <li className="wd-lesson list-group-item p-3 ps-1">
                      <FaRegFileAlt className="me-2 ms-2 fs-4" />
                      <a
                        href={`${REMOTE_SERVER}/api/files/${files && files.find((f: any) => f.itemId === lesson._id)?._id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        download
                        className="btn btn-link fs-5"
                      >
                         {lesson.name}
                      </a>

                    </li>
                  ) : null}
                                        </>
                                      )}</>
                                    ))}
                                    </ul>
                                    )}
                                    </li>)}
                      </>))}
            </ul>
        </>)}
        </div></>

  );}
  
  