import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { useState } from "react";
import { url } from "../url";
import Loader from "../components/Loader";
import Swal from 'sweetalert2'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword,setConfirmPassword]=useState("");
  const [loading,setLoading]=useState(false);
  const navigate=useNavigate()
  const handleRegister = async () => {
    if(password!=confirmPassword){
      toast.error("password and confirm password does not match");
      setPassword("");
      setConfirmPassword("");
      return;
    }
    try {
      setLoading(true);
      const response = await fetch(url + "/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (!response.ok) {
        // If the response status is not ok (outside the range of 200 to 299),
        // throw an error with the response data
        const errorData = await response.json();
        throw new Error(errorData.message || "Request failed");
      }

      // If the response status is ok, parse the JSON response
      const data = await response.json();
      console.log(data);
      setLoading(false);
      Swal.fire({
        title: "Good job!",
        text: "User registration successfull now login using your credentials",
        icon: "success"
      });
      navigate("/login")
    } catch (error) {
      setLoading(false);
      if (error.message) {
        // console.log(error.message);
        toast.error(error.message)
      } else {

        // console.log(error);
        toast.error(error)
      }
      // Handle and display the error message
    }
  };
  return (
    loading?<Loader/>:
    <>
      <ToastContainer />
      <div className="flex items-center justify-between px-6 md:px-[200px] py-4">
        <h1 className="text-lg md:text-xl font-extrabold">
          <Link to="/">SnapWrite</Link>
        </h1>
        <h3 className="cursor-pointer">
          <Link to="/login">Log In</Link>
        </h3>
      </div>
      <div className="w-full flex justify-center items-center h-[80vh]">
        <div className="flex flex-col justify-center items-center space-y-4 w-[80%] md:w-[25%]">
          <h1 className="text-2xl font-bold text-left">Create an account</h1>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 border-2 border-black outline-0"
            type="text"
            placeholder="Enter your username"
          />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border-2 border-black outline-0"
            type="email"
            placeholder="Enter your email"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border-2 border-black outline-0"
            type="password"
            placeholder="Enter your password"
          />
          <input
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2 border-2 border-black outline-0"
            type="password"
            placeholder="Confirm your password"
          />
          <button
            onClick={handleRegister}
            className="w-full px-4 py-4 text-lg font-bold text-white bg-black rounded-lg hover:bg-gray-500 hover:text-black"
          >
            Register
          </button>
          <div className="flex justify-center items-center space-x-3">
            <p>Already have an Account?</p>
            <p className="text-blue-600 hover:underline">
              <Link to="/login">Log In</Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Register;
