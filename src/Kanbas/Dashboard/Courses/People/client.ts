import axios from "axios";
export const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
export const USERS_API = `${REMOTE_SERVER}/api/people`;

export const findCoursePeople = async (courseId:string) => {
  const response = await axios.get(`${USERS_API}/${courseId}`);
  return response.data;
};


export const addUserToCourse = async (courseId:any, userId:any) => {
  const response = await axios.post(`${USERS_API}/${courseId}/add`, { userId });
  return response.data;
};


export const removeUserFromCourse = async (courseId:any, userId:any) => {
  const response = await axios.delete(`${USERS_API}/${courseId}/remove`, { data: { userId } });
  return response.data;
};

export const updateUserSection = async (userId:any, newSection:any) => {

  const response = await axios.put(`${USERS_API}/${userId}/section`, { section: newSection });
  return response.data; 
  
};