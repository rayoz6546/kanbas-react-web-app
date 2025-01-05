import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  grades: [],
};
const gradesSlice = createSlice({
    name: "grades",
    initialState,
    reducers: {

        setGrades: (state, action) => {
            state.grades = action.payload;
          },

          
        addGrade: (state, {payload: assignment}) => {
            const newGrade: any = {
                _id: new Date().getTime().toString(),
                userId: assignment.userId,
                courseId: assignment.courseId, 
                courseGrade: assignment.courseGrade,

            };
            state.grades = [...state.grades, newGrade] as any;
        },

        deleteGrade: (state, {payload: assignmentId}) => {
            state.grades = state.grades.filter(
                (m: any) => m._id !== assignmentId);
        },

        updateGrade: (state, { payload: assignment }) => {
            state.grades= state.grades.map((m: any) =>
                m._id === assignment._id ? assignment : m
            ) as any;
            },

            editGrade: (state, { payload: assignmentId }) => {
                state.grades = state.grades.map((m: any) =>
                  m._id === assignmentId ? { ...m, editing: true } : m
              ) as any;
    },
}
});

export const { addGrade, deleteGrade, updateGrade, editGrade, setGrades} =
gradesSlice.actions;
export default gradesSlice.reducer;