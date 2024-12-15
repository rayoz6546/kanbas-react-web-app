import Signin from "./Signin";
import Profile from "./Profile";
import Signup from "./Signup";
import AccountNavigation from "./Navigation";
import { Routes, Route, Navigate } from "react-router";
import { useSelector } from "react-redux";
import Users from "./Users";

export default function Account() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
    return (
      <div id="wd-account-screen" className="row">

        <div className="d-flex">
          <div className="d-none d-md-block">
          <AccountNavigation/>
          </div>
        

          <div className="flex-fill">
            <Routes>
            <Route path="/" element={<Navigate to={currentUser ? "/Kanbas/Account/Profile" : "/Kanbas/Account/Signin"} />} />
            <Route path="/Signin" element={<Signin />} />
            <Route path="/Profile" element={<Profile />} />
            <Route path="/Signup" element={<Signup />} />
            <Route path="/Users" element={<Users />} />
            <Route path="/Users/:uid" element={<Users />} />
          </Routes>
          </div>

        </div>


        <div className="mt-5">
          <h3>Team Members (Team 106):</h3> 
        </div>
        <div>
        Rayan Hassan (SEC 02), Nakul Rao (SEC 02), Vasant Tholappa (SEC 02)
        </div>

      </div>
  );}
