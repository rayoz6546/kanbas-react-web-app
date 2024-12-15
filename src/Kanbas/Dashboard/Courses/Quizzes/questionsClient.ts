import axios from "axios";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const QUESTIONS_API = `${REMOTE_SERVER}/api/questions`;

export const deleteQuestion = async (questionId: string) => {
    const response = await axios.delete(`${QUESTIONS_API}/${questionId}`);
    return response.data;
   };
   
   
   export const updateQuestion = async (question: any) => {
   
       const { data } = await axios.put(`${QUESTIONS_API}/${question._id}`, question);
       return data;
     };

  export const fetchQuestions = async (quizId:string)=> {
    const response = await axios.get(`${QUESTIONS_API}/${quizId}`);
    return response.data;
  }

  export const createQuestion = async (quizId: string, question: any) => {
    const response = await axios.post(
      `${QUESTIONS_API}/${quizId}`,
      question
    );
    return response.data;
  };


  export const deleteAllQuestions = async (quizId:string) => {
    const response = await axios.delete(`${QUESTIONS_API}/all/${quizId}`);
    return response.data;
  }