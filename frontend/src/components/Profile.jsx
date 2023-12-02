import { useContext, useEffect, useState } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import ProfilePosts from "./ProfilePosts";
import { UserContext } from "../../context/UserContext";
import { url } from "../url";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";
const Profile = () => {
  const {user,setUser}=useContext(UserContext)
  // console.log(user+" "+user==null?"":user.username)
  const [username,setUsername]=useState("")
  const [password,setPassword]=useState()
  const [confirmPassowrd,setConfirmPassword]=useState("")
  const [loading, setLoading] = useState(false);
  const navigate=useNavigate();
  useEffect(()=>{
    setUsername(user==null?"":user.username)
  },[user])
  // const {user}=useContext(UserContext)
  const handleUpdate=async ()=>{
    if(password!=confirmPassowrd){
      toast.error("Password and confirm password does not match");
      setPassword("");
      setConfirmPassword("");
      return;
    }
    try {
      setLoading(true);
      const response = await fetch(url + "/api/users/", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Include cookies in the request
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Request failed");
      }
      const data = await response.json();
      // console.log(data.info);
      setLoading(false);
      // setUser(data.info);
      setUser(data.updatedUser);
      toast.success("Information updated successfully");
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
      console.log(error)
      // Handle and display the error message
    }
  }
  const handleDelete=async()=>{
    try {
      setLoading(true);
      const response = await fetch(url + "/api/users/", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Include cookies in the request
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Request failed");
      }
      // console.log(data.info);
      setLoading(false);
      
      toast.success("User deleted successfully");
      setUser(null)
      navigate("/")
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
      console.log(error)
      // Handle and display the error message
    }
  }
  return (
    loading?<Loader/>:<div>
      <ToastContainer />
      <Navbar />
      <div className="px-8 md:px-[200px] mt-8 flex md:flex-row flex-col-reverse md:items-start">
        <div className="flex flex-col md:w-[70%] w-full">
          <h1 className="text-2xl font-bold mb-4">Your posts</h1>
          <ProfilePosts />
          <ProfilePosts />
          <ProfilePosts />
          <ProfilePosts />
          <ProfilePosts />
          <ProfilePosts />
          <ProfilePosts />
        </div>
        <div className="md:sticky md:top-16 flex justify-start md:justify-end items-start md:w-[30%] w-full md:items-end my-10">
          <div className="flex flex-col space-y-4">
            <h1 className=" text-2xl font-bold mb-4">Profile</h1>
            <input
              className="outline-none px-4 py-2 text-gray-500"
              placeholder="Your username"
              type="text"
              value={username}
              onChange={(e)=>setUsername(e.target.value)}
            />
            <input
              className="outline-none px-4 py-2 text-gray-500"
              placeholder="Your email"
              value={user==null?"":user.email}
              disabled={true}
              type="text"
            />
            <input
              className="outline-none px-4 py-2 text-gray-500"
              placeholder="Your password"
              type="password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />
            <input
              className="outline-none px-4 py-2 text-gray-500"
              placeholder="Confirm Password"
              type="password"
              value={confirmPassowrd}
              onChange={(e)=>setConfirmPassword(e.target.value)}
            />
            <div className="flex items-center space-x-4 mt-8">
              <button className="text-white font-semibold bg-black px-4 py-2 hover:text-black hover:bg-gray-400" onClick={handleUpdate}>
                Update
              </button>
              <button className="text-white font-semibold bg-black px-4 py-2 hover:text-black hover:bg-gray-400" onClick={handleDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
