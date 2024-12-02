import axios from "axios";
export const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const axiosWithCredentials = axios.create({ withCredentials: true });
export const USERS_API = `${REMOTE_SERVER}/api/people`;

export const findCoursePeople = async (courseId:string) => {
  if (courseId) {
  const response = await axios.get(`${USERS_API}/${courseId}`);
  return response.data;}

};
