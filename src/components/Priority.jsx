import { addDoc, collection, getDocs, onSnapshot, query, updateDoc, where, getDoc, increment, setDoc, doc, deleteDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { auth, db } from "../firebase";
import { useAuthState } from 'react-firebase-hooks/auth';


const Priority = ({todo}) => {
  const [user] = useAuthState(auth);
  const[Prioritylevel,setPriority] = useState({id: "", priority: ""});
  useEffect(() => {
   const fetchPriority = async () => {
         if(user && todo.id) {
          const docref = doc(db, "Priority", `${user.uid}_${todo.id}`);
          const docSnap = await getDoc(docref);
         

         if(docSnap.exists()) {
            setPriority({id: docSnap.id, priority: docSnap.data().priority});
            
         } 
         else {
          setPriority({id: "", priority: ""});
         }
        }
   };
   fetchPriority();

  }, [user,todo.id])

const addPriority = async (plevel) => {
   
  if(user && todo.id) {
    const docref = doc(db, "Priority", `${user.uid}_${todo.id}`);
    await setDoc(docref, {priority: plevel, userId: user.uid, todoId: todo.id}, {merge: true});
    setPriority({id:  `${user.uid}_${todo.id}`, priority: plevel});
  }
};

const deletePriority = async (id) => {
     try {
      await deleteDoc(doc(db,"Priority", id));
      setPriority({id: "", priority: ""});
     } catch (error) {
      console.log(error.message);
     }
}

const handlePriority = (level) => {
     if(Prioritylevel.priority === level) {
      deletePriority(Prioritylevel.id);
     } 
     else {
      addPriority(level);
     }
}
  return (
 <div className='flex gap-4'>
  <div>
   <button onClick={() => handlePriority("Low") } className= {`border-solid py-2 px-4 border-2 rounded ${
    Prioritylevel.priority === "Low" ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>Low</button>
  </div>

  <div>
   <button onClick={() => handlePriority("Medium")} className= {`border-solid py-2 px-4 border-2 rounded ${
    Prioritylevel.priority === "Medium" ? 'bg-yellow-500 text-white' : 'bg-gray-200'}`}>Medium</button>
  </div>
  <div>

   <button onClick={() => handlePriority  ("High")} className= {`border-solid py-2 px-4 border-2 rounded ${
    Prioritylevel.priority === "High" ? 'bg-red-500 text-white' : 'bg-gray-200'}`}>High</button>
  </div>

 </div>
  )
}

export default Priority
