import { Add, PlayArrow, ThumbDownOutlined, ThumbUpAltOutlined } from "@material-ui/icons"
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import "./listItem.scss"
import axios from "axios"
import {BASE_URL} from "../../helper"
function ListItem({ index, item }) {
    // console.log(item)
    const [isHovered, setHovered] = useState(false);
    const [movie, setMovie] = useState({})
    useEffect(() => {
        const getMovie = async () => {
            try {
                const res = await axios.get(`${BASE_URL}/netflix/movie/getMovieDetails/` + item, { withCredentials: true })
                // console.log(res.data.movie);
                setMovie(res.data.movie);
            } catch (e) {
                // console.log(e)
            }
        }
        getMovie();
    }, [item])

    return (
        <div className="listItem"
            style={{ left: isHovered && index * 225 + index * 2.5 }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >

            <img
                src={movie.poster}
                alt=""
            />

            {isHovered &&
                <>
                    <video autoPlay>
                        <source src={movie.trailer} type="video/mp4" ></source>
                        Your browser does not support the video tag.
                    </video>
                    <div className="itemInfo">
                        <div className="icons">
                            <Link to="/watch" state={{ movie }}>
                                <PlayArrow className="icon" />
                            </Link>
                            <Add className="icon" />
                            <ThumbUpAltOutlined className="icon" />
                            <ThumbDownOutlined className="icon" />
                        </div>
                    </div>
                    <div className="itemInfoTop">
                        <span>{movie.title}</span>
                        <span className="limit">+{movie.limit}</span>
                        <span>{movie.year}</span>
                    </div>
                    <div className="desc">
                        {movie.desc}
                    </div>
                    <div className="genre">{movie.genre}</div>
                </>
            }
        </div>
    )
}

export default ListItem