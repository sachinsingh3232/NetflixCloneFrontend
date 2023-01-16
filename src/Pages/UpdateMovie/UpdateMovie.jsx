import { useLocation, useNavigate } from "react-router-dom";
import "./UpdateMovie.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { useState, useEffect } from "react";
import storage from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import axios from "axios";
import { BASE_URL } from "../../helper"

export default function UpdateMovie({ setUser, setMessage, Message, user }) {
    const navigate = useNavigate();
    const location = useLocation();
    const [data, setData] = useState({})
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
    const getData = async () => {
        try {
            const movieId = location.state.movie._id;
            const res = await axios.get(`${BASE_URL}/netflix/movie/getMovieDetails/${movieId}`, { withCredentials: true })
            setData(res.data.movie)
        } catch (e) {
            // console.log(e)
        }
    }
    useEffect(() => {
        getData();
    }, [])

    const handleChange = (e) => {
        // console.log(movie)
        const value = e.target.value;
        setMovie({ ...movie, [e.target.name]: value })
    }
    const upload = (items) => {
        // console.log(movie)
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
    const handleUpdate = async (e) => {
        e.preventDefault();
        const movieId = location.state.movie._id;
        const res = await axios.put(`${BASE_URL}/netflix/movie/updateMovie/${movieId}`,
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
                <div className="movie">
                    <div className="movieTitleContainer">
                        <h1 className="movieTitle">Update Movie</h1>
                    </div>
                    <div className="movieTop">
                        <div className="movieTopRight">
                            <div className="movieInfoTop">
                                <img src={data.imgSmall} alt="imgSmall" className="movieInfoImg" />
                                <span className="movieName">{data.title}</span>
                            </div>
                            <div className="movieInfoBottom">
                                <div className="movieInfoItem">
                                    <span className="movieInfoKey">id:</span>
                                    <span className="movieInfoValue">{data._id}</span>
                                </div>
                                <div className="movieInfoItem">
                                    <span className="movieInfoKey">Genre:</span>
                                    <span className="movieInfoValue">{data.genre}</span>
                                </div>
                                <div className="movieInfoItem">
                                    <span className="movieInfoKey">Year:</span>
                                    <span className="movieInfoValue">{data.year}</span>
                                </div>
                                <div className="movieInfoItem">
                                    <span className="movieInfoKey">Limit:</span>
                                    <span className="movieInfoValue">{data.limit}</span>
                                </div>
                                <div className="movieInfoItem">
                                    <span className="movieInfoKey">Description:</span>
                                    <span className="movieInfoValue">{data.desc}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="movieBottom">
                        <form className="movieForm">
                            {/* <div className="movieFormLeft"> */}
                            <div className="addMovieItem">
                                <label>Movie Title</label>
                                <input type="text" value={data.title} name="title" onChange={handleChange} />
                            </div>
                            <div className="addMovieItem">
                                <label>isSeries?</label>
                                <select name="isSeries" id="isSeries" onChange={handleChange}>

                                    <option value={false}>NO</option>
                                    <option value={true}>YES</option>
                                </select>
                            </div>
                            <div className="addMovieItem">
                                <label>Year</label>
                                <input type="text" placeholder={data.year} name="year" onChange={handleChange} />
                            </div>
                            <div className="addMovieItem">
                                <label>Genre</label>
                                <select name="genre" id="genre" onChange={handleChange}>
                                    <option value="">Select</option>
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
                                <label>Limit</label>
                                <input type="text" placeholder={data.limit} name="limit" onChange={handleChange} />
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
                                <button className="addMovieButton" onClick={handleUpdate}>Update</button>
                            ) : (
                                <button className="addMovieButton" onClick={handleUpload}>Upload And Wait for Create Button</button>
                            )}
                            {/* </div> */}
                        </form>
                    </div>
                </div>
            </div >
        </div >
    );
}
