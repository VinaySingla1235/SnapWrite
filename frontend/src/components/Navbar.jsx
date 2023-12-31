
import { Link } from 'react-router-dom'
import { FaSearch } from "react-icons/fa";
import {FaBars} from 'react-icons/fa'
import { useContext, useState } from 'react';
import Menu from './Menu';
import { UserContext } from '../../context/UserContext';
const Navbar = () => {
    // const user=false;
    const [menu,setMenu]=useState(false);
    const showMenu=()=>{
      setMenu(!menu);
    }
    const {user}=useContext(UserContext)
    // console.log(user)
  return (
    <div className="flex items-center justify-between px-2 md:px-[200px] py-4">
        <h1 className='text-lg md:text-xl font-extrabold'><Link to="/">SnapWrite</Link></h1>
        <div className='flex justify-center items-center space-x-0'>
        <p><FaSearch /></p>
        <input className='outline-none px-3 w-[8rem] md:w-full' placeholder='Search a post' type="text" />
        </div>
        <div className="hidden md:flex items-center justify-center space-x-2 md:space-x-4">
            {user?<div onClick={showMenu}><p className='cursor-pointer'><FaBars/></p>
          {menu && <Menu/>}</div>:<h3 className="cursor-pointer"><Link to="/login">Login</Link></h3>}
            {user?<></>:<h3 className='cursor-pointer'><Link to="/register">Register</Link></h3>}
        </div>
        <div onClick={showMenu} className="md:hidden text-lg">
          <p className='cursor-pointer'><FaBars/></p>
          {menu && <Menu/>}
        </div>
    </div>
  )
}

export default Navbar