import { useLocation, useNavigate } from "react-router-dom";
import "./updateList.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../helper"

export default function UpdateList({ setUser, setMessage, Message, user }) {
    const navigate = useNavigate();
    const location = useLocation();
    const [data, setData] = useState({})
    const [allMovieSeries, setAllMovieSeries] = useState([])
    const [list, setList] = useState(null)
    useEffect(() => {
        if (!user || !user.isAdmin) navigate("/admin");
    }, [])
    const getAllMovieSeries = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/netflix/movie/getAllMoviesSeries`, { withCredentials: true })
            setAllMovieSeries(res.data.data)
        } catch (e) {
            // console.log(e)
        }
    }
    const getData = async () => {
        try {
            const listId = location.state.List._id;
            const res = await axios.get(`${BASE_URL}/netflix/list/getListDetails/${listId}`, { withCredentials: true })
            setData(res.data.list)
            // console.log(res)
        } catch (e) {
            // console.log(e)
        }
    }
    useEffect(() => {
        getData();
        getAllMovieSeries();
    }, [])

    const handleSelect = (e) => {
        let value = Array.from(e.target.selectedOptions, (option) => option.value);
        setList({ ...list, [e.target.name]: value })
    }
    const handleChange = (e) => {
        // console.log(movie)
        const value = e.target.value;
        setList({ ...list, [e.target.name]: value })
    }
    const handleUpdate = async (e) => {
        e.preventDefault();
        const listId = location.state.List._id;
        const res = await axios.put(`${BASE_URL}/netflix/list/updateList/${listId}`,
            {
                "title": list.title,
                "type"
                    :
                    list.type,
                "genre"
                    :
                    list.genre,
                "content": list.content
            }
            , { headers: { "Content-Type": "application/json" }, withCredentials: true }
        )
        navigate('/ListsList')
    }
    return (
        <div>
            <Topbar />
            <div className="container">
                <Sidebar setUser={setUser} setMessage={setMessage} Message={Message} />
                <div className="list">
                    <div className="listTitleContainer">
                        <h1 className="listTitle">Update Movie</h1>
                    </div>
                    <div className="listTop">
                        <div className="listTopRight">
                            <div className="listInfoTop">
                                <span className="listName">{data.title}</span>
                            </div>
                            <div className="listInfoBottom">
                                <div className="listInfoItem">
                                    <span className="listInfoKey">id:</span>
                                    <span className="listInfoValue">{data._id}</span>
                                </div>
                                <div className="listInfoItem">
                                    <span className="listInfoKey">Genre:</span>
                                    <span className="listInfoValue">{data.genre}</span>
                                </div>
                                <div className="listInfoItem">
                                    <span className="listInfoKey">Year:</span>
                                    <span className="listInfoValue">{data.type}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="listBottom">
                        <form className="listForm">
                            {/* <div className="movieFormLeft"> */}
                            <div className="formTop">
                                <div className="updateListItem">
                                    <label>List Title</label>
                                    <input type="text" value={data.title} name="title" onChange={handleChange} />
                                </div>
                                <div className="updateListItem">
                                    <label>Type</label>
                                    <input type="text" placeholder="Series/Movie" name="type" onChange={handleChange} />
                                </div>
                                <div className="updateListItem">
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
                            </div>
                            <div className="formBottom">
                                <div className="updateListItem">
                                    <label>Content</label>
                                    <select multiple name="content" id="genre" onChange={handleSelect} style={{ height: "300px" }}>
                                        {allMovieSeries.map(m => (
                                            <option key={m._id} value={m._id}>{m.title}</option>
                                        ))}
                                    </select>
                                </div>
                                <button className="updateListButton" onClick={handleUpdate}>Update</button>
                            </div>
                            {/* </div> */}
                        </form>
                    </div>
                </div>
            </div >
        </div >
    );
}
