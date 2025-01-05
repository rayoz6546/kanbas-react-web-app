import axios from "axios";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const GRADES_API = `${REMOTE_SERVER}/api/grades`;



export const deleteGrade= async (gradeId: string) => {
 const response = await axios.delete(`${GRADES_API}/${gradeId}`);
 return response.data;
};


export const updateGrade = async (grade: any) => {
    const { data } = await  axios.put(`${GRADES_API}/${grade._id}`, grade);
    return data;
  };


  export const createGrade = async (gradeId: string, grade: any) => {
    const { data } = await axios.post(`${GRADES_API}/${gradeId}`, grade);
    return data;
  };


  export const fetchCourseGrades = async (courseId:string) => {
    const response = await axios.get(`${GRADES_API}/${courseId}`);
    return response.data; 
  };


  export const fetchCourseGradesPerUser = async (courseId:string, userId:string) => {
    const response = await axios.get(`${GRADES_API}/${courseId}/${userId}`);
    return response.data; 
  };



