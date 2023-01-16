import "./newList.css";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../helper"
export default function NewList({ setUser, setMessage, Message, user }) {
  const navigate = useNavigate();
  const [list, setList] = useState(null)
  const [allMovieSeries, setAllMovieSeries] = useState([])
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
  useEffect(() => {
    getAllMovieSeries();
  }, [])

  const handleChange = (e) => {
    const value = e.target.value;
    setList({ ...list, [e.target.name]: value })
  }
  const handleSelect = (e) => {
    let value = Array.from(e.target.selectedOptions, (option) => option.value);
    setList({ ...list, [e.target.name]: value })
  }
  const handleCreate = async (e) => {
    e.preventDefault();
    const res = await axios.post(`${BASE_URL}/netflix/list/createList`,
      {
        "title": list.title,
        "genre": list.genre,
        "type": list.type,
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
        <div className="newList">
          <h1 className="addListTitle">New List</h1>
          <form className="addListForm">
            <div className="formTop">
              <div className="addListItem">
                <label>Title</label>
                <input type="text" placeholder="Best Horror Movies" name="title" onChange={handleChange} />
              </div>
              <div className="addListItem">
                <label>Type</label>
                <input type="text" placeholder="Series/Movie" name="type" onChange={handleChange} />
              </div>
              <div className="addListItem">
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
            </div>
            <div className="formBottom">
              <div className="addListItem">
                <label>Content</label>
                <select multiple name="content" id="content" onChange={handleSelect} style={{ height: "300px" }}>
                  {allMovieSeries.map(m => (
                    <option key={m._id} value={m._id}>{m.title}</option>
                  ))}
                </select>
              </div>
              <button className="addListButton" onClick={handleCreate}>Create</button>
            </div>
          </form>
        </div>
      </div >
    </div >
  );
}
