import React, { useEffect, useState } from 'react'
import Navbar from "../../components/Navbar/Navbar"
import Featured from "../../components/Featured/Featured"
import List from "../../components/List/List"
import "./Home.scss"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from "../../helper"

const Home = ({ type, setUser, setMessage,user }) => {
    const [lists, setLists] = useState([])
    const [genre, setGenre] = useState()
    const navigate = useNavigate();
    useEffect(() => {
        if (!user) navigate("/login");
    }, [])
    const randomList = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/netflix/list/randomList${type ? "?type=" + type : ""}${genre ? "&genre=" + genre : ""}`, { withCredentials: true })
            setLists(res.data.lists)
        } catch (e) {
            // console.log(e)
        }
    }
    useEffect(() => {
        randomList();
    }, [type, genre])

    return (
        <div className='home'>
            <Navbar setUser={setUser} setMessage={setMessage} />
            <Featured type={type} setGenre={setGenre} />
            {lists.map((list) => (
                <List list={list} />
            ))}
        </div>
    )
}

export default Home