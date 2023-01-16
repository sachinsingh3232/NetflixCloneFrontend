import { InfoOutlined, PlayArrow } from "@material-ui/icons"
import "./featured.scss"
import { Link } from "react-router-dom"
import axios from "axios"
import { useEffect, useState } from "react"
import {BASE_URL} from "../../helper"

const Featured = ({ type, setGenre }) => {
  const [movie, setMovie] = useState({})
  useEffect(() => {
    const getRandom = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/netflix/movie/random${type ? "?type=" + type : ""}`, { withCredentials: true });
        // console.log(res.data.Movie[0]);
        setMovie(res.data.Movie1[0]);
      } catch (e) {
        // console.log(e)
      }
    }
    getRandom();
  }, [type])
  const handleChange = (e) => {
    setGenre(e.target.value);
  }
  return (
    <div className="featured">
      {type && (
        <div className="category">
          <span>{type === "Movie" ? "Movies" : "Series"}</span>
          <select name="Genre" id="genre" onChange={handleChange}>
            <option value="" >Genre</option>
            <option value="adventure">Adventure</option>
            <option value="comedy">Comedy</option>
            <option value="crime">Crime</option>
            <option value="fantasy">Fantasy</option>
            <option value="horror">Horror</option>
            <option value="historical">Historical</option>
            <option value="sci-fi">Sci-Fi</option>
            <option value="thriller">Thriller</option>
            <option value="drama">Drama</option>
          </select>
        </div>)
      }
      <img className="background"
        src={movie.poster}
        alt="User"
      />
      <div className="info">
        <h1>{movie.title}</h1>
        <span className="desc">
          {movie.desc}
        </span>
        <div className="buttons">
          <Link to='/watch' state={{ movie }} className="link">
            <button className="play">
              <PlayArrow />
              <span >Play</span>
            </button>
          </Link>
          <button className="more">
            <InfoOutlined />
            <span>Info</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Featured