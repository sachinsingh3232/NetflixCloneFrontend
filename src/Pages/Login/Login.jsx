import "./login.scss"
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios";
import { useState, useEffect } from "react";
import { BASE_URL } from "../../helper"
const Login = ({ setUser, Message, setMessage, user }) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    useEffect(() => {
        // console.log(user)
        if (user) navigate("/");
    }, [user])
    const handleClick = () => {
        navigate("/register");
    }
    const login = async () => {
        try {
            const response = await axios.post(`${BASE_URL}/netflix/user/login`, {
                "email": email,
                "password": password
            }, { headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin":"*", }, withCredentials: true }
            )
            localStorage.setItem("user", JSON.stringify(response.data.data))
            setMessage(response.data.message)
            setUser(response.data.data)
        } catch (e) {
            // console.log(e);
            setUser(null)
        }
    }
    const loginHandler = (e) => {
        e.preventDefault();
        alert('Checking Credentials Please wait !')
        login();
        navigate("/");
    }
    const admin = () => {
        setMessage("");
        setUser(null);
    }
    return (
        <div className="login">
            <div className="top">
                <div className="wrapper">
                    <img
                        className="logo"
                        src="https://images.ctfassets.net/4cd45et68cgf/7LrExJ6PAj6MSIPkDyCO86/542b1dfabbf3959908f69be546879952/Netflix-Brand-Logo.png?w=684&h=456"
                        alt="Netflix"
                    />
                    <Link to="/admin">
                        <button onClick={admin} className="loginButton">Admin</button>
                    </Link>
                </div>
            </div>
            <div className="container">
                <form>
                    {Message && <div className="message">{Message}</div>}
                    <h1>Sign In</h1>
                    <input type="email" placeholder="Email or Phone number" onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                    <button onClick={loginHandler} className="loginButton">Login</button>
                    <span>New to Netflix? <b onClick={handleClick}>Sign Up Now.</b></span>
                </form>
            </div>
        </div>
    )
}

export default Login
