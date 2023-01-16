import "./newMovie.css";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import { useState, useEffect } from "react";
import storage from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../helper"
export default function NewMovie({ setUser, setMessage, Message, user }) {
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null)
  const [poster, setPoster] = useState(null)
  const [titleImage, setTitleImage] = useState(null)
  const [imgSmall, setImgSmall] = useState(null)
  const [trailer, setTrailer] = useState(null)
  const [video, setVideo] = useState(null)
  const [uploaded, setUploaded] = useState(0)
  useEffect(() => {
    if (!user || !user.isAdmin) navigate("/admin");
  }, [])
  const handleChange = (e) => {
    const value = e.target.value;
    setMovie({ ...movie, [e.target.name]: value })
  }
  const upload = (items) => {
    items.forEach(item => {
      const storageRef = ref(storage, `/items/${item.file.name}`);

      const uploadTask = uploadBytesResumable(storageRef, item.file);
      uploadTask.on('state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
        },
        (error) => {
          // console.log(error)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setMovie((prev) => {
              return { ...prev, [item.label]: downloadURL };
            });
            setUploaded((prev) => prev + 1);
          });
        }
      );
    })
  }
  const handleUpload = (e) => {
    e.preventDefault();
    upload([
      { file: poster, label: "poster" },
      { file: titleImage, label: "titleImage" },
      { file: imgSmall, label: "imgSmall" },
      { file: trailer, label: "trailer" },
      { file: video, label: "video" }
    ])
  }
  const handleCreate = async (e) => {
    e.preventDefault();
    const res = await axios.post(`${BASE_URL}/netflix/movie/createMovie`,
      {
        "isSeries": movie.isSeries,
        "desc"
          :
          movie.desc,
        "genre"
          :
          movie.genre,
        "imgSmall"
          : movie.imgSmall,
        "limit"
          : movie.limit,
        "poster"
          : movie.poster,
        "title"
          :
          movie.title,
        "titleImage"
          :
          movie.titleImage,
        "trailer"
          :
          movie.trailer,
        "video"
          :
          movie.video,
        "year"
          :
          movie.year
      }
      , { headers: { "Content-Type": "application/json" }, withCredentials: true }
    )
    navigate('/movieList')
  }
  return (
    <div>
      <Topbar />
      <div className="container">
        <Sidebar setUser={setUser} setMessage={setMessage} Message={Message} />
        <div className="newMovie">
          <h1 className="addMovieTitle">New Movie</h1>
          <form className="addMovieForm">
            <div className="addMovieItem">
              <label>Title</label>
              <input type="text" placeholder="John Wick" name="title" onChange={handleChange} />
            </div>
            <div className="addMovieItem">
              <label>isSeries?</label>
              <select name="isSeries" id="isSeries" onChange={handleChange}>
                <option value={false}>NO</option>
                <option value={true}>YES</option>
              </select>
            </div>
            <div className="addMovieItem">
              <label>Description</label>
              <input type="text" placeholder="description" name="desc" onChange={handleChange} />
            </div>
            <div className="addMovieItem">
              <label>Year</label>
              <input type="text" placeholder="year" name="year" onChange={handleChange} />
            </div>
            <div className="addMovieItem">
              <label>Limit</label>
              <input type="text" placeholder="limit" name="limit" onChange={handleChange} />
            </div>
            <div className="addMovieItem">
              <label>Genre</label>
              <select name="genre" id="genre" onChange={handleChange}>
                <option value="">select</option>
                <option value="action">Action</option>
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
            </div>
            <div className="addMovieItem">
              <label>Poster Image</label>
              <input type="file" id="PosterImg" name="poster" onChange={(e) => { setPoster(e.target.files[0]) }} />
            </div>
            <div className="addMovieItem">
              <label>titleImage</label>
              <input type="file" id="titleImg" name="titleImage" onChange={(e) => { setTitleImage(e.target.files[0]) }} />
            </div>
            <div className="addMovieItem">
              <label>SmallImage</label>
              <input type="file" id="ImgSmall" name="imgSmall" onChange={(e) => { setImgSmall(e.target.files[0]) }} />
            </div>
            <div className="addMovieItem">
              <label>Trailer</label>
              <input type="file" id="trailer" name="trailer" onChange={e => setTrailer(e.target.files[0])} />
            </div>
            <div className="addMovieItem">
              <label>Video</label>
              <input type="file" id="video" name="video" onChange={e => setVideo(e.target.files[0])} />
            </div>
            {uploaded >= 5 ? (
              <button className="addMovieButton" onClick={handleCreate}>Create</button>
            ) : (
              <button className="addMovieButton" onClick={handleUpload}>Upload And Wait For Create Button</button>
            )}
          </form>
        </div>
      </div >
    </div >
  );
}
