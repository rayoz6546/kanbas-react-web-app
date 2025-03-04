import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const COURSES_API = `${REMOTE_SERVER}/api/courses`;


export const fetchAllCourses = async () => {
  const response= await axios.get(COURSES_API);
  return response.data;
 };
 
 export const findCoursesByDepartment = async (department: string) => {
  const encodedDepartment = encodeURIComponent(department);
  const response = await axios.get(`${COURSES_API}?department=${encodedDepartment}`);
  return response.data;
};

export const findCoursesByPartialName = async (name: string) => {
  const response = await axios.get(`${COURSES_API}?name=${name}`);
  return response.data;
};


 export const createCourse = async (course: any) => {

  const { data } = await axiosWithCredentials.post(`${COURSES_API}`, course);
  return data;
};

export const deleteCourse = async (id: string) => {
  const { data } = await axiosWithCredentials.delete(`${COURSES_API}/${id}`);
  return data;};

export const updateCourse = async (course: any) => {
  const { data } = await axiosWithCredentials.put(`${COURSES_API}/${course._id}`, course);
  return data;
};

export const findModulesForCourse = async (courseId: string) => {
  const response = await axiosWithCredentials.get(`${COURSES_API}/${courseId}/modules`);
  return response.data;
 };
 


export const createModuleForCourse = async (courseId: string, module: any) => {
  const response = await axiosWithCredentials.post(
    `${COURSES_API}/${courseId}/modules`,
    module
  );
  return response.data;
 };
 



export const findAssignmentsForCourse = async (courseId: string) => {
  const response = await axios.get(`${COURSES_API}/${courseId}/assignments`);
  return response.data;
};

export const createAssignmentForCourse = async (courseId: string, assignment: any) => {
  const response = await axios.post(
    `${COURSES_API}/${courseId}/assignments`,
    assignment
  );
  return response.data;
};



export const findQuizzesForCourse = async (courseId: string) => {
  const response = await axios.get(`${COURSES_API}/${courseId}/quizzes`);
  return response.data;
};

export const createQuizForCourse = async (courseId: string, quiz: any) => {
  const response = await axios.post(
    `${COURSES_API}/${courseId}/quizzes`,
    quiz
  );
  return response.data;
};


export const findAnnouncementsForCourse = async (courseId: string) => {
  const response = await axios.get(`${COURSES_API}/${courseId}/announcements`);
  return response.data;
};

export const createAnnouncementForCourse = async (courseId: string, announcement: any) => {
  const response = await axios.post(
    `${COURSES_API}/${courseId}/announcements`,
    announcement
  );
  return response.data;
};

