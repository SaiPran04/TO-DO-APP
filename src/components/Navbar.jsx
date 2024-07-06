import React from 'react'
import {Link, useNavigate} from "react-router-dom";
import {auth} from "../firebase";
import {useAuthState} from "react-firebase-hooks/auth";
import { signOut } from 'firebase/auth';
const Navbar = () => {
      const [user] = useAuthState(auth);
      const navigate = useNavigate();
      const signUserout = async () => {
            await signOut(auth);
            navigate("/login");
      }

  return (
    <div className='flex justify-center items-center lg:gap-10 gap-4 text-black font-light'>
     { user && (
      <Link to="/"> Home </Link>
     )
      }
     
     <Link to="/register"> sign up/Login </Link>

     <div className='flex justify-center items-center gap-3'>
     { user && (
        <>
        
        <img src={user?.photoURL || ""} className="w-9 h-9 rounded-full"/>
        <p>{user?.displayName}</p>
        <button onClick={signUserout}> Sign out</button>
        </>
     )
     }
     </div>

    </div>
  )
}

export default Navbar
