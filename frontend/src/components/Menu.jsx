// import React from 'react'

import { useContext } from "react"
import { UserContext } from "../../context/UserContext"
import { Link, useNavigate } from "react-router-dom";
import { url } from "../url";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Menu = () => {
    const {user,setUser}=useContext(UserContext);
    const navigate=useNavigate();
    const handleLogout=async()=>{
      try {
        const response = await fetch(url + "/api/auth/logout", {
          method: "GET",
          credentials: "include", // Include cookies in the request
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Request failed");
        }
        const data = await response.json();
        setUser(null);
        toast.success("User logged out")
        navigate("/")
      } catch (error) {
        toast.error(error.message);
      }
    }
  return (
    <><ToastContainer/>
    <div className="bg-black flex flex-col items-start absolute top-12 right-4 md:right-28 md:w-[150px]
    rounded-md pl-4 pr-8 py-4 space-y-2">
      
        {!user && <h3 className="text-white text-sm hover:text-gray-500 cursor-pointer"><Link to="/login">Login</Link></h3>}
        {!user && <h3 className="text-white text-sm hover:text-gray-500 cursor-pointer"><Link to="/register">Register</Link></h3>}

        {user && <h3 className="text-white text-sm hover:text-gray-500 cursor-pointer"><Link to="/profile/45">Profile</Link></h3>}
        {user && <h3 className="text-white text-sm hover:text-gray-500 cursor-pointer"><Link to="/write">Write</Link></h3>}
        {user && <h3 className="text-white text-sm hover:text-gray-500 cursor-pointer"> <Link to="/profile/45">My Blogs</Link></h3>}
        {user && <h3 className="text-white text-sm hover:text-gray-500 cursor-pointer" onClick={handleLogout}>Logout</h3>}
    </div>
    </>
  )
}

export default Menu