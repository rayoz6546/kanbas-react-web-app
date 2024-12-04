import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
export default function ProtectedContent({ children }: { children: any }) {
  const { currentUserRole } = useSelector((state: any) => state.accountReducer);
  if (currentUserRole==="ADMIN") {
    return children;
  } 
  else {
    return null
}
}