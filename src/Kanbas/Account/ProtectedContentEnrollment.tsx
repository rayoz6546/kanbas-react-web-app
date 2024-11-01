import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
export default function ProtectedContentEnrollment({ children }: { children: any }) {
  const { currentUserRole } = useSelector((state: any) => state.accountReducer);
  if (currentUserRole!=="FACULTY") {
    return children;
  } 
  else {
    return null
}
}
