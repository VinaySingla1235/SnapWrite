import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { useContext, useState } from "react";
import { url } from "../url";
import Loader from "../components/Loader";
// import Swal from 'sweetalert2'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "../../context/UserContext";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {setUser}=useContext(UserContext)
  const handleLogin = async () => {
    try {
      setLoading(true);
      const response = await fetch(url + "/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Include cookies in the request
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Request failed");
      }
      const data = await response.json();
      console.log(data.info);
      setLoading(false);
      setUser(data.info);
      toast.success(`Welcome ${data.info.username}`);
      navigate("/");
    } catch (error) {
      setLoading(false);
      if (error.message) {
        toast.error(error.message);
      } else {
        toast.error(error);
      }
      // Handle and display the error message
    }
  };
  return loading ? (
    <Loader />
  ) : (
    <>
      <ToastContainer />
      <div className="flex items-center justify-between px-6 md:px-[200px] py-4">
        <h1 className="text-lg md:text-xl font-extrabold">
          <Link to="/">SnapWrite</Link>
        </h1>
        <h3 className="cursor-pointer">
          <Link to="/register">Register</Link>
        </h3>
      </div>
      <div className="w-full flex justify-center items-center h-[70vh]">
        <div className="flex flex-col justify-center items-center space-y-4 w-[80%] md:w-[25%]">
          <h1 className="text-2xl font-bold text-left">
            Log in to your account
          </h1>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border-2 border-black outline-0"
            type="text"
            placeholder="Enter your email"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border-2 border-black outline-0"
            type="password"
            placeholder="Enter your password"
          />
          <button
            onClick={handleLogin}
            className="w-full px-4 py-4 text-lg font-bold text-white bg-black rounded-lg hover:bg-gray-500 hover:text-black"
          >
            Log in
          </button>
          <div className="flex justify-center items-center space-x-3">
            <p>New here?</p>
            <p className="text-blue-600 hover:underline">
              <Link to="/register">Register</Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
