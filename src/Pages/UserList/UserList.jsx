import "./UserList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { useState, useEffect } from "react";
import axios from "axios";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../helper"

export default function UserList({ setUser, setMessage, Message, user }) {
  const [datas, setData] = useState([]);
  const [toggle, setToggle] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user || !user.isAdmin) navigate("/admin");
  }, [])

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/netflix/user/getAllUsers`, { withCredentials: true })
        // console.log(res.data)
        setData(res.data.users)
      } catch (e) {
        // console.log(e)
      }
    }
    getAllUsers();
  }, [toggle])

  const deleteUser = async (id) => {
    try {
      const res = await axios.delete(`${BASE_URL}/netflix/user/delete/${id}`, { withCredentials: true })
      // console.log(res.data.message)
    } catch (e) {
      // console.log(e)
    }
  }
  const handleDelete = (id) => {
    deleteUser(id);
    setData(datas.filter((item) => item._id !== id));
  };
  const makeAdminHandler = async (id) => {
    try {
      const res = await axios.put(`${BASE_URL}/netflix/user/makeAdmin/${id}`, { withCredentials: true })
      // console.log(res.data);
    } catch (e) {
      // console.log(e)
    }
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 250, headerAlign: 'center' },
    { field: "email", headerName: "Email", width: 250, headerAlign: 'center' },
    { field: "isAdmin", headerName: "IsAdmin", width: 150, headerAlign: 'center' },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      headerAlign: 'center',
      renderCell: (params) => {
        return (
          <>
            <button className="userListEdit" onClick={() => { makeAdminHandler(params.row._id); setToggle(1 - toggle) }}>ToggleAdmin</button>
            <DeleteOutline
              className="userListDelete"
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
        <div className="userList">
          <div className="userTitleContainer">
            <h1 className="userTitle">Users</h1>
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
