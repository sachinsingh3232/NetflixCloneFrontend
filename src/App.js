import './App.scss';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from './Pages/Home/Home';
import Register from './Pages/Register/Register';
import Login from './Pages/Login/Login';
import Watch from './Pages/Watch/Watch'
import { useState,useEffect } from 'react';
import Admin from './Pages/Admin/Admin';
import AdminHome from './Pages/AdminHome/AdminHome'
import MovieList from './Pages/Movies/MovieList';
import UpdateMovie from './Pages/UpdateMovie/UpdateMovie';
import NewMovie from './Pages/NewMovie/NewMovie';
import ListsList from './Pages/ListsList/ListsList';
import UpdateList from './Pages/UpdateList/UpdateList';
import NewList from './Pages/NewList/NewList';
import UserList from './Pages/UserList/UserList'

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
  useEffect(() => {
        localStorage.setItem("user", JSON.stringify(user));
    }, [user])
  const [Message, setMessage] = useState()
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Home setUser={setUser} setMessage={setMessage} user={user} />} />

        <Route exact path="/register" element={<Register setMessage={setMessage} user={user} />} />

        <Route path="/login" exact element={<Login setUser={setUser} Message={Message} setMessage={setMessage} user={user} />} />

        <Route path="/movies" exact element={<Home setUser={setUser} type="Movie" user={user} />} />

        <Route path="/series" exact element={<Home setUser={setUser} type="Series" user={user} />} />

        <Route path="/watch" element={<Watch user={user} />} />

        <Route path="/admin" exact element={<Admin setUser={setUser} user={user} setMessage={setMessage} Message={Message} />} />

        <Route path="/adminHome" exact element={<AdminHome setUser={setUser} setMessage={setMessage} Message={Message} user={user} />} />

        <Route path="/users" element={<UserList setUser={setUser} setMessage={setMessage} Message={Message} user={user} />} />

        <Route path="/movieList" element={<MovieList setUser={setUser} setMessage={setMessage} Message={Message} user={user} />} />

        <Route path="/updateMovie/:id" element={<UpdateMovie setUser={setUser} setMessage={setMessage} Message={Message} user={user} />} />

        <Route path="/createmovie" element={<NewMovie setUser={setUser} setMessage={setMessage} Message={Message} user={user} />} />

        <Route path="/listsList" element={<ListsList setUser={setUser} setMessage={setMessage} Message={Message} user={user} />} />

        <Route path="/updateList/:id" element={<UpdateList setUser={setUser} setMessage={setMessage} Message={Message} user={user} />} />

        <Route path="/createList" element={<NewList setUser={setUser} setMessage={setMessage} Message={Message} user={user} />} />

      </Routes>
    </Router>
  );
}

export default App;
