import { Link, useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AccountNavigation() {
  const {cid} = useParams()
  const { pathname } = useLocation();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const links = currentUser ? ["Profile"] : ["Signin", "Signup"];
  return (
    <div id="wd-account-navigation" className="wd list-group fs-5 rounded-0 d-none d-md-block">

      {links.map((link) => (
              <Link to={`/Kanbas/Account/${link}`} className={`list-group-item border border-0 ${pathname.includes(link) ? "active" : "text-danger"}`}>
                {link}
              </Link>
            )
            )}
    </div>

);}
