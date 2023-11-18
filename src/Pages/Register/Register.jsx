import "./register.scss"
import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useRef } from "react";
import axios from "axios";
import { BASE_URL } from "../../helper"

const Register = ({ setMessage, user }) => {
    const [email, setEmail] = useState();
    const emailref = useRef();
    const navigate = useNavigate();
    const [password, setPassword] = useState();
    const registerUser = async () => {
        try {
            console.log("registerUser")
            const res = await axios.post(`${BASE_URL}/netflix/user/register`, {
                "email": email,
                "password": password
            }, { headers: { "Content-Type": "application/json" }, withCredentials: true }
            )
            setMessage(res.data.message)
        } catch (e) {
            // console.log(e)
        }
    }
    const handleFinish = (e) => {
        console.log("handleF")
        registerUser();
        alert('Please wait !')
        navigate('/login')
    }
    const handleStart = () => {
        console.log("HandleS")
        setEmail(emailref.current.value);
    }
    return (
        <div className="register">
            <div className="top">
                <div className="wrapper">
                    <img
                        className="logo"
                        src="https://images.ctfassets.net/4cd45et68cgf/7LrExJ6PAj6MSIPkDyCO86/542b1dfabbf3959908f69be546879952/Netflix-Brand-Logo.png?w=684&h=456"
                        alt="Netflix"
                    />
                    <Link to="/login">
                        <button className="loginButton">Sign In</button>
                    </Link>
                </div>
            </div>
            <div className="container">
                <h1>Unlimited Movies , TV Shows and More</h1>
                <h2>Watch anywhere , Cancel anytime</h2>
                <p>
                    ready to watch? Enter your Email address to create or restart your membership.
                </p>
                {!email ?
                    <div className="input">
                        <input type="email" placeholder="Email Address" ref={emailref} />
                        <button className="registerButton" onClick={handleStart}>Get Started</button>
                    </div> :
                    <form className="input" onSubmit={handleFinish}>
                        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                        <button className="registerButton" >Start</button>
                    </form>
                }
            </div>
        </div>
    )
}

export default Register
