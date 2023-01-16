import "./listsList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../helper"

export default function ListsList({ setUser, setMessage, Message, user }) {
  const [datas, setData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user || !user.isAdmin) navigate("/admin");
  }, [])
  useEffect(() => {
    const getAllList = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/netflix/list/getAllList`, { withCredentials: true })
        // console.log(res.data)
        setData(res.data.lists)
      } catch (e) {
        // console.log(e)
      }
    }
    getAllList();
  }, [])

  const deleteList = async (id) => {
    try {
      const res = await axios.delete(`${BASE_URL}/netflix/list/deleteList/${id}`, { withCredentials: true })
      console.log(res.data.message)
    } catch (e) {
      console.log(e)
    }
  }
  const handleDelete = (id) => {
    deleteList(id);
    setData(datas.filter((item) => item._id !== id));
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 250, headerAlign: 'center' },
    { field: "title", headerName: "Title", width: 250, headerAlign: 'center' },
    { field: "genre", headerName: "Genre", width: 150, headerAlign: 'center' },
    { field: "type", headerName: "Type", width: 150, headerAlign: 'center' },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      headerAlign: 'center',
      renderCell: (params) => {
        return (
          <>
            <Link to={`/updateList/${params.row._id}`} state={{ List: params.row }}>
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
            <h1 className="movieTitle">Lists</h1>
            <Link to="/createList">
              <button className="movieAddButton">CreateList</button>
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
