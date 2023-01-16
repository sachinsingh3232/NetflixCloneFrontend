import "./NewUsers.css";
import { Visibility } from "@material-ui/icons";
import { useState } from "react";
import axios from 'axios'
import { useEffect } from "react";
import { BASE_URL } from "../../helper"
export default function NewUsers({setMessage}) {
  const [newUsers, setNewsUsers] = useState([])
  useEffect(() => {
    const getNewUSers = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/netflix/user/getAllUsers?new=true`, { withCredentials: true })
        setNewsUsers(res.data.users)
      } catch (e) {
        // console.log(e)
      }
    }
    getNewUSers();
  }, [])

  return (
    <div className="NewUsers">
      <span className="NewUsersTitle">New Joined Members</span>
      <ul className="NewUsersList">
        {newUsers.map((user) => (
          <li className="NewUsersListItem" key={user._id}>
            <img
              src={user.profilePicture || "https://ih0.redbubble.net/image.618427277.3222/flat,1000x1000,075,f.u2.jpg"}
              alt=""
              className="NewUsersImg"
            />
            <div className="NewUsersUser">
              <span className="NewUsersUsername">{user.email}</span>
              <span className="NewUsersUserTitle">Software Engineer</span>
            </div>
            {/* <div className="NewUsersUser">
            </div> */}
          </li>
        ))}
      </ul>
    </div>
  );
}
