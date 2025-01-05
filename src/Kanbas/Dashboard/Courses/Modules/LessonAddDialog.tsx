import { useState } from "react";
import { useDispatch } from "react-redux";
import * as modulesClient from "./client";
import * as filesClient from "../filesClient";

export default function AddLessonDialog({
  dialogTitle,
  moduleId,
  closeDialog,
}: {
  dialogTitle: string;
  moduleId: string;
  closeDialog: () => void;
}) {
  const [lessonName, setLessonName] = useState("");
  const [lessonLink, setLessonLink] = useState("");
  const [lessonFile, setLessonFile] = useState<File | null>(null);
  const [activeInput, setActiveInput] = useState<"name" | "link" | "file" | null>(null);
  const dispatch = useDispatch();

  const addLesson = async () => {
    if (!activeInput) return;

    const newLesson = {
      _id: new Date().getTime().toString(),
      moduleId,
      name: activeInput === "name" ? lessonName : (activeInput === "file" && lessonFile ? lessonFile.name : ""),
      link: activeInput === "link" ? lessonLink : "",
      file: activeInput === "file" && lessonFile ? lessonFile.name : "",
    };

    try {

      if (activeInput === "file" && lessonFile) {
        const fileUploadResponse = await filesClient.uploadFile(lessonFile, newLesson._id);
        newLesson.file = fileUploadResponse.fileId; 
        console.log("File uploaded successfully:", fileUploadResponse);
      }
      await modulesClient.createLessonForModule(moduleId, newLesson);
      dispatch({ type: "modules/addLessonToModule", payload: { moduleId, lesson: newLesson} });




      closeDialog();
    } catch (error) {
      console.error("Failed to add lesson:", error);
    }
  };



  return (
    <div className="p-3 mt-2 border rounded bg-light">
      <h5>{dialogTitle}</h5>
      <div className="d-flex gap-2 mb-3">
        <button
          className={`btn ${activeInput === "name" ? "btn-primary" : "btn-outline-secondary"}`}
          onClick={() => setActiveInput("name")}
        >
          Add Name
        </button>
        <button
          className={`btn ${activeInput === "link" ? "btn-primary" : "btn-outline-secondary"}`}
          onClick={() => setActiveInput("link")}
        >
          Add Link
        </button>
        <button
          className={`btn ${activeInput === "file" ? "btn-primary" : "btn-outline-secondary"}`}
          onClick={() => setActiveInput("file")}
        >
          Upload File
        </button>
      </div>
      {activeInput === "name" && (
        <input
          type="text"
          placeholder="Lesson Name"
          value={lessonName}
          onChange={(e) => setLessonName(e.target.value)}
          className="form-control mb-2"
        />
      )}
      {activeInput === "link" && (
        <input
          type="text"
          placeholder="Lesson Link"
          value={lessonLink}
          onChange={(e) => setLessonLink(e.target.value)}
          className="form-control mb-2"
        />
      )}
      {activeInput === "file" && (
        <input
          type="file"
          onChange={(e) => setLessonFile(e.target.files?.[0] || null)}
          className="form-control mb-2"
        />
      )}
      <div className="d-flex justify-content-end gap-2">
        <button onClick={closeDialog} className="btn btn-secondary">
          Cancel
        </button>
        <button onClick={addLesson} className="btn btn-primary">
          Save
        </button>
      </div>
    </div>
  );
}

