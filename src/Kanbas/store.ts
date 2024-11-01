import { configureStore } from "@reduxjs/toolkit";
import modulesReducer from "./Dashboard/Courses/Modules/reducer";
import accountReducer from "./Account/reducer";
import assignmentsReducer from "./Dashboard/Courses/Assignments/reducer";
import enrollmentsReducer from "./Dashboard/Enrollment/reducer";
import coursesReducer from "./Dashboard/Courses/reducer";

const store = configureStore({

  reducer: {
    modulesReducer,
    accountReducer,
    assignmentsReducer,
    enrollmentsReducer,
    coursesReducer,
  },
});
export default store;