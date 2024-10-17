import { Link, useLocation, useParams } from "react-router-dom";


export default function AccountNavigation() {
  const {cid} = useParams()
  const { pathname } = useLocation();
  const links = ["Signin", "Signup", "Profile"];
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
