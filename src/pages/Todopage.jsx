import React from 'react'
import {FaPlus, FaPencilAlt, FaTrash} from 'react-icons/fa';
import Todolist from '../components/Todolist';
import { addDoc, collection, onSnapshot, updateDoc, doc, deleteDoc, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react'
import {auth, db} from "../firebase";
import { useAuthState } from 'react-firebase-hooks/auth';




const Todopage = () => {
  const [todos, setTodos] = useState([]);
  const [input , setInput] = useState('');
  const [editIndex, seteditIndex] = useState(-1);
  const [currentUser] = useAuthState(auth);

  useEffect(() => {
   if (currentUser) {
    const unsubscribe = onSnapshot ( query (collection(db, 'todos'), where('userId', '==', currentUser.uid)), (snapshot) => {
      setTodos(snapshot.docs.map((doc) => ({id: doc.id, todo: doc.data().todo})));
    });

    return () => unsubscribe;
  }
}, [currentUser]);

const setEdit = (index) => {
      setInput(todos[index].todo);
      seteditIndex(index);
}

const addTodo = async () => {
  try {
    if(input.trim() !== '') {
     // setTodos([...todos, {id: new Date(), todo: input}]);
     await addDoc(collection(db,'todos'),{todo: input, userId: currentUser.uid});
      setInput('');
    }
    
  } catch (error) {
    console.error(error.message);
  }
}

const updateTodo = async () => {
     try {
      if(input.trim() !== '') {
       // const updatedTodos = [...todos];
       // updatedTodos[editIndex].todo = input;
       // setTodos(updatedTodos);
       const todosRef = doc(db, 'todos', todos[editIndex].id);
       await updateDoc(todosRef, {todo: input});
        
        seteditIndex(-1);
        setInput('');
      }

     } catch (error) {
      console.error(error.message);
     }
}

const DeleteTodo = async (id) => {
      //let filteredTodos = todos.filter((todo) => todo.id !== id );
      //setTodos(filteredTodos);
      try {
        await deleteDoc(doc(db, 'todos', id));
      } catch (error) {
        console.error(error.message);
      }
}

const Finishtodo = async (id) => {
  try {
    await deleteDoc(doc(db,"todos", id));
   
  } catch (error) {
    console.log(error.message);
  }
}

    

  return ( 
    <>

    <div className='bg-custom-background bg-center bg-cover min-h-screen flex items-center justify-center p-4 flex-col gap-4'>
    <div className='bg-gray-100 p-6 rounded shadow-md max-w-lg lg:w-1/4 bg-opacity-40'>
     <h1 className='text-3xl font-bold text-center mb-4'>TODO APP</h1>
     <div className='flex'>
       <input type="text"
        placeholder='Add a todo' 
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className='py-2 px-4 border rounded w-full focus:outline-none'/>
       
       <button onClick={editIndex == -1 ? addTodo : updateTodo} className='bg-gradient-to-r from-red-400 to-red-600 text-white py-2 px-4 ml-3 hover:animate-bounce rounded-md'>
 
       {editIndex == -1 ? <FaPlus/> : <FaPencilAlt/>}
       </button>
     </div>
    </div>
     {
       todos.length > 0 && <Todolist todos={todos} setEdit={setEdit} DeleteTodo={DeleteTodo} FinishTodo={Finishtodo}/>
     }
    </div>
    </>
  )
}


export default Todopage
