import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { auth,db } from "../firebase";
import { setDoc,doc } from "firebase/firestore";
import { toast } from "react-toastify";



const Register = () =>  {
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const [fname, setFname] = useState("");
      const [lname, setLname] = useState("");
      const [submitbuttonDisabled, setsubmitbuttonDisabled]  = useState(false);
      
      const handleRegister = async (e) => {

        e.preventDefault();
        try {
          setsubmitbuttonDisabled(true);
          await createUserWithEmailAndPassword (auth,email,password);
          const user = auth.currentUser;
          updateProfile(user, {
            displayName: fname,
          });

           
          if(user) {
            const docRef = doc(db, "Users", user.uid); 
            await setDoc( docRef, {
              email: user.email,
              firstName:fname,
              lastName:lname,
            });
          }
        navigate("/login");
          console.log("User Registered Sucessfully!");
          toast.success("User Registered Sucessfully!", {
            position: "top-center",
          });
          

        } catch (error) {
          console.log(error.message);
          toast.success(error.message , {
            position: "bottom-center",
        });
       
  }
 
  }
  const navigate = useNavigate();
  const login = () => {
  navigate("/login")
   }

  return (
    <>
    <div className="flex w-full h-screen">
   
    <div className="w-full flex items-center justify-center lg:w-1/2">
    <div className="bg-white px-10 py-20 rounded-3xl border-2 border-gray-200">
    
     <h1 className="text-4xl font-semibold">Welcome! Please enter your details</h1>
     
    <div className="mt-8">
    <div>
      <label className="text-lg font-medium">First name</label>
      <input type="text" 
      placeholder="First name"
       onChange={(e) => setFname(e.target.value)} required
        className="w-full border-2 border-gray-100 rounded-xl p-3 mt-1 bg-transparent"
       />
      </div>

      <div>
      <label className="text-lg font-medium">Last name</label>
      <input type="text" 
      placeholder="Last name"
       onChange={(e) => setLname(e.target.value)} required
        className="w-full border-2 border-gray-100 rounded-xl p-3 mt-1 bg-transparent"
       />
      </div>

      <div>
      <label className="text-lg font-medium">Email</label>
      <input type="email" 
      placeholder="Email"
       onChange={(e) => setEmail(e.target.value)} required
       value={email}
        className="w-full border-2 border-gray-100 rounded-xl p-3 mt-1 bg-transparent"
       />
      </div>

      <div>
      <label className="text-lg font-medium">Password</label>
      <input type="password" 
      placeholder="password"
       onChange={(e) => setPassword(e.target.value)} required
       value={password}
        className="w-full border-2 border-gray-100 rounded-xl p-3 mt-1 bg-transparent"
       />
      </div>


     <div>
      <div className="mt-8 flex justify-center">
        <button onClick={handleRegister} className="border-2 w-full py-3 bg-violet-500 rounded-xl text-white font-medium text-lg active:scale-[0.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out">Register</button>
       
      </div>
      <div className="mt-3 text-center">
      <button onClick={login} className="font-medium text-base text-center border-b-2 hover:text-violet-700 hover:tracking-wide">Already have an account?</button>
      </div>
     </div>

    </div>
      
     </div>
    </div>
  
    
    <div className="hidden lg:flex h-full w-1/2 bg-gray-200 items-center justify-center relative">
         <div className="h-60 w-60 bg-gradient-to-tr from-violet-500 to-pink-500 rounded-full animate-bounce"/>
         <div className="w-full h-1/2 backdrop-blur-lg bg-white/10 absolute bottom-0"/>
    </div>
    </div>
    </>
  )
}

export default Register
