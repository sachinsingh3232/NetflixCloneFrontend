import { ArrowDropDown, Notifications, Search } from "@material-ui/icons"
import axios from "axios"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./navbar.scss"
import { BASE_URL } from "../../helper"
const Navbar = ({ setUser, setMessage }) => {
  const navigate = useNavigate();
  const [isScrolled, setScrolled] = useState(false);
  window.onscroll = () => {
    setScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll === null);
  }
  const logOut = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/netflix/user/logout`, { headers: { "Content-Type": "application/json" }, withCredentials: true }
      )
      await setMessage(response.data.message)
    } catch (e) {
      // console.log(e)
    }
  }
  const logoutHandler = () => {
    logOut();
    setUser(null)
    navigate("/login");
  }
  return (
    <div className={isScrolled ? "navbar scrolled" : "navbar"}>
      <div className="container">
        <div className="left">
          <img
            src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png"
            alt="NETFLIX"
          />
          <Link to="/" className="Link "><span className="navbarmainLinks">Home</span></Link>
          <Link to="/series" className="Link "><span className="navbarmainLinks">Series</span></Link>
          <Link to="/movies" className="Link "><span className="navbarmainLinks">Movies</span></Link>
          <span>All Lists</span>
          <span>New and Popular</span>
        </div>
        <div className="right">
          <Search className="icon" />
          <Notifications className="icon" />
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJUAAACVCAMAAABmfEh9AAAAllBMVEX///8AESEAAAAADR/k5+gQFCP8/Pz///0AABcAEiAAABMAABEAAA3+/f8AAA8ADiEAAAhZXWP09fcADRwAABo6PkS1ubsABhrf4OLv7/B4en9mamyam52/wsWrr7EcHyYvMz1LTlOQlZqGio5wcnZCREzKzc8pLDYACxUTFh+kp60VHijV19ggJS9/gYMmKjAxNDgaHi4w9kT6AAAESklEQVR4nO2a23aqMBCGQ4IJQTCcFCgFj7VV2db9/i+3E6qttVXSGsK+yNeLylpd8q+Z6Z/JJAAYDAaDwWAwGAwGg8FgMBgMhh7wCWl+E0HPWt5phOS2bUfNo9+rmHeiehvOdpvNYDcrqhr3LQfzHxBtQwRHCYsRYkkAd0WFm+j1lkqMuaZp4MTWB2gEDyXX1VvIfAKyECZcCrXOSWARAb+X8iKirCe7ofUFRq1gtu6n6AlP3wSmX0U1OJu6iaVu+CurgLErqqxkugakj3BlXnpRUB9Qa/gn6iOJ9iG5FqiGIIz0iwJLeDV9b0XvTfSLylpEWTSNdQfLB3t4tahOwK2wf53Ur6hFk0Wdee7rVOWDymsTZVnxRq+XYhB+Y+oXIAqXWjPoA7c1gRz3SW/nkEEJURby9KpaS6li0NYpiq/LMqoorLWqqiRVrf9LVXpjJZdBplmVXLUjmGtVlUupSgeadzp/HAlVwUqzqqVMsIKtVlUElIP2JYfNMq2hwiSa3+6PBcNC+4aigm1Nn25fEOCD26LKK7SLAqBs6fvQVG9VNZDm3/DajoLRGE56GMv4AIfXNxTUgg99zGV8H9jzq6ZF4SoSkwjt8FfmIXwLzLkeyp8ZXGHg454Ga/keOhb9kkcXPmLc13jU9wmYPMHks8ujBIZlP/OYBiJ2e/ni4L5veChKhy/jbcQ19ZW+E9Fk9ReemO3L3ofIR3BeV4vlfvk4qaP/RtN5rojfX0UJhBtleWOVZ7qIcARebZl46EVfuY/noorOTcAXmnA5j/dr3WMiAV6HXsCc4XibfX45zrbjocu8Yaiz7nmOCAH1QzBi3D1ZAgfFY3k8WIrs8rH4CxO+aFM2Ch5q8ad6PIK/JapS79070yF0p7N5GIbz2dSFH9Ma5MVVBDSthlisfxctDIodd+g6Mfrs8wyGuR6b90F58NjZ0kebz4xSyqyLxZoyb7zuvs26fU7yHSnv/rruHvh6vICsbR9xDu//Fl0n0QfbG33xt7Bmwt0domeS2jNfApeioe5KFeG7wB/F6Q2KYNVdyWNQvqCf1NQRZsXDsptYiS/Np84Pi+qoynJebdDFuihOvsPRzwN1ZBR24vL8Gxe/qfQT3B866GwIyKDMecQ1EMw6yCDBq9/nTzBadeHwcmPjG8AuzlbH7WO02zhj9aLk5v63g1WprSzhCjJD45tQJ4wUm4Pc2L9FluJjHQJWEie6rXgroPQumx3c41UnUGArVbVVkECruUugUFVUtA2M5UgKlRcvsvbbC1Kg10yhqlJNAnkKS4Wqlq0HEXKIGw7qeHJ/0Rh/A3Of1InKd3H7G6WId+pOVzMvVlTtsaeu3NceVaSKeuoWnVpRsau9SxA9390wHHGeFdro5AWm6H5S+KKwHyVgXTxvNoP72GxeC5VjI7HQ++IC+33kPlDZyRCsZrip6nsMBoPBYDAYDAaDwWAwGAwGwxf+AdE5QYp0fx2KAAAAAElFTkSuQmCC"
            alt="user"
          />
          <div className="profile">
            <ArrowDropDown className="icon" />
            <div className="options">
              <span>Settings</span>
              <span onClick={logoutHandler}>LogOut</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
