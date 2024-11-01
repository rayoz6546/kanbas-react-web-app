import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  currentUser: null,
  currentUserRole: null,
};
const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
      state.currentUserRole = action.payload ? action.payload.role : null; 
    },
  },
});
export const { setCurrentUser } = accountSlice.actions;
export default accountSlice.reducer;