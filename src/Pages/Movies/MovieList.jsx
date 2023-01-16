import "./movieList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../helper"

export default function MovieList({ setUser, setMessage, Message, user }) {
  const [datas, setData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user || !user.isAdmin) navigate("/admin");
  }, [])
  useEffect(() => {
    const getAllMovieSeries = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/netflix/movie/getAllMoviesSeries`, { withCredentials: true })
        setData(res.data.data)
      } catch (e) {
        // console.log(e)
      }
    }
    getAllMovieSeries();
  }, [])

  const deleteMovie = async (id) => {
    try {
      const res = await axios.delete(`${BASE_URL}/netflix/movie/deleteMovie/${id}`, { withCredentials: true })
      // console.log(res.data.message)
    } catch (e) {
      // console.log(e)
    }
  }
  const handleDelete = (id) => {
    deleteMovie(id);
    setData(datas.filter((item) => item._id !== id));
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 90, headerAlign: 'center' },
    {
      field: "movie",
      headerName: "Movie",
      width: 200,
      headerAlign: 'center',
      renderCell: (params) => {
        return (
          <div className="movieListItem">
            <img className="movieListImg" src={params.row.imgSmall} alt="" />
            {params.row.title}
          </div>
        );
      },
    },
    { field: "genre", headerName: "Genre", width: 120, headerAlign: 'center' },
    { field: "year", headerName: "Year", width: 120, headerAlign: 'center' },
    { field: "limit", headerName: "Limit", width: 120, headerAlign: 'center' },
    { field: "isSeries", headerName: "isSeries", width: 150, headerAlign: 'center' },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      headerAlign: 'center',
      renderCell: (params) => {
        return (
          <>
            <Link to={`/updateMovie/${params.row._id}`} state={{ movie: params.row }}>
              <button className="movieListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="movieListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div>
      <Topbar />
      <div className="container">
        <Sidebar setUser={setUser} setMessage={setMessage} Message={Message} />
        <div className="movieList">
          <div className="movieTitleContainer">
            <h1 className="movieTitle">Movies</h1>
            <Link to="/createmovie">
              <button className="movieAddButton">Create</button>
            </Link>
          </div>
          <DataGrid
            rows={datas}
            disableSelectionOnClick
            columns={columns}
            pageSize={8}
            checkboxSelection
            getRowId={(r) => r._id}
            autoHeight
          />
        </div>
      </div>
    </div>
  );
}
