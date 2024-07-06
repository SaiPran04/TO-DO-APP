import React, { useState } from 'react'
import {auth,provider} from "../firebase";
import {signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { FaGoogle } from 'react-icons/fa';
const Login = () => {
    const [email, setEmail] = useState("");
    const [Pasword, setPassword] = useState("");

    const navigate = useNavigate();
    
    const signInwithGoogle = async () => {

        const result = await signInWithPopup(auth,provider);
          navigate("/")
    };

    const handleSubmission = async (e) => {
         e.preventDefault();
         try {
          await signInWithEmailAndPassword(auth,email,Pasword);
          console.log("user logged in successfully");
        toast.success("user logged in successfully", {
          position: "top-center",
        });
        navigate("/");
         } 
         
         catch (error) {
          console.log(error.message);

          toast.error(error.message, {
            position: "bottom-center",
          });
         }
        
    };

    const register = () => {
      navigate("/register");
    }

  return (
    <>
    <div className='w-full h-screen flex'>
    <div className='Login-section w-full flex items-center justify-center lg:w-1/2'>

    <div className='bg-white rounded-3xl shadow-md px-10 py-20 border-gray-200 lg:w-3/4'>
    <h1 className='text-center text-4xl text-stone-800 text font-bold'>Welcome Back!</h1>
    <div className='mt-8'>
    <div className='email flex flex-col mb-3'>
    <label className='font-medium text-lg'>Email</label>
      <input type="email" 
      placeholder='email'
        onChange={(e) => setEmail(e.target.value)}
        className='w-full border-2 border-gray-100 rounded-md p-2 mt-1 bg-transparent'
      />
    </div>

      <div className='password flex flex-col mb-3'>
    <label className='font-medium text-lg'>Pasword</label>
    <input type="Password"
     placeholder='Password' 
     onChange={(e) => setPassword(e.target.value) }
     className='w-full border-2 border-gray-100 rounded-md p-2 mt-1 bg-transparent'
     />
      </div>

      <div className='flex justify-center mt-8'>
      <div className='submit-btn border-2 bg-gradient-to-br from-blue-500 to-cyan-700 bg- w-full text-center rounded-md text-white active:scale-[0.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out'>
        <button onClick={handleSubmission}>Login</button>
      </div>
      </div>

      <div className='mt-5'>

      <div className='googlesignin'>
      <div class="inline-flex items-center justify-center w-full">
    <hr class="w-64 h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"/>
    <span class="absolute px-3 font-medium text-gray-900 -translate-x-1/2 bg-white left-1/2 dark:text-black lg:left-1/4">OR</span>
    </div>
    
      <p className='text-lg font-light text-center'>Sign In with Google to continue</p>
      <div className='w-full flex justify-center gap-3'>
      <div className='mt-1'>
      <FaGoogle onClick={signInwithGoogle} className=' transition-all hover:scale-[1.1] ease-in-out cursor-pointer'/>
      </div>
      <div>

      <button onClick={signInwithGoogle} className='hover:tracking-wide font-semibold'>Sign In</button>
      </div>
      </div>
    </div>
    </div>


    <div className='noacc flex mt-8 gap-2 justify-center'>
     <p className=''>Don't have an account?</p>
     <button className='font-semibold hover:tracking-wide border-b-2 hover:text-blue-600' onClick={register}>Click here</button>
     </div>

    </div>
    </div>
    </div>
   
   <div className='side-section hidden lg:flex w-1/2 h-1/2 items-center'>
   <div className='absolute top-32'>

   <img src="../src/assets/Dark Modern Sign Up Registration Page Desktop Prototype.png" alt="" />

   </div>
   </div>
    </div>
   
    </>
  )
}

export default Login
