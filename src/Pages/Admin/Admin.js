import "./admin.css"
import { useNavigate } from 'react-router-dom'
import axios from "axios";
import { useState, useEffect } from "react";
import { BASE_URL } from "../../helper"
const Admin = ({ Message, setMessage, setUser, user }) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const adminLogin = async () => {
        try {
            const response = await axios.post(`${BASE_URL}/netflix/user/login`, {
                "email": email,
                "password": password
            }, { headers: { "Content-Type": "application/json" }, withCredentials: true }
            )
            response.data.data?setUser(response.data.data);
            setMessage(response.data.message);
        } catch (e) {
            // console.log(e);
            setUser(null)
        }
    }
    useEffect(() => {
        if (user && user.isAdmin) navigate("/adminHome");
        else if (user && !user.isAdmin) setMessage("You are not admin");
    }, [user])

    const loginHandler = async (e) => {
        e.preventDefault();
        adminLogin();
    }
    const handleClick = () => {
        setMessage("");
        setUser(null);
        navigate("/login");
    }
    return (
        <div className="admin">
            <form>
                <input type="email" placeholder="Email or Phone number" onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                <button onClick={loginHandler} className="loginButton">Login</button>
                {Message && <div className="message">{Message}!</div>}
                <span>Back to <b onClick={handleClick}>User!</b></span>
            </form>
        </div>
    )
}

export default Admin
