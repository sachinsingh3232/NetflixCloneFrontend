import "./adminHome.css";
import Sidebar from "../../components/sidebar/Sidebar"
import Topbar from "../../components/topbar/Topbar"
import NewUsers from "../../components/NewUsers/NewUsers"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function AdminHome({ setUser, setMessage, Message, user }) {
  const navigate = useNavigate();
  useEffect(() => {
    if (!user || !user.isAdmin) navigate("/admin");
  }, [])

  return (
    <div>
      <Topbar />
      <div className="container">
        <Sidebar setUser={setUser} setMessage={setMessage} Message={Message} />
        <div className="adminHome">
          <div className="homeNewUsers">
            <NewUsers setMessage={setMessage} />
          </div>
        </div>
      </div>
    </div>
  );
}
