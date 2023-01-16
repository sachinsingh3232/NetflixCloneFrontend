import { ArrowBackOutlined } from "@material-ui/icons"
import { Link, useLocation, useNavigate } from 'react-router-dom'
import "./watch.scss"
import { useEffect } from "react"

const Watch = ({ user }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const movie = location.state.movie;
    useEffect(() => {
        if (!user) navigate("/login");
    }, [])
    return (
        <div className="watch">
            <Link to="/">
                <div className="back">
                    <ArrowBackOutlined />
                    Home
                </div>
            </Link>
            <video className="video" progress controls src={movie.video}></video>
        </div>
    )
}

export default Watch