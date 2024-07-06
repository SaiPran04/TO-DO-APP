
import {FaPencilAlt, FaTrash, FaCheck } from 'react-icons/fa';
import Priority from './Priority';
const Todoitem = ({index, setEdit, DeleteTodo, todo, FinishTodo}) => {
  return (
      <>
      <div className='mb-5'>
      <div>
        <li key={index} className='flex items-center justify-between bg-white p-3 rounded shadow-md mb-3 bg-opacity-80'>
      <span className='text-lg'>{todo.todo}</span>
      <div>
        <button onClick={() => setEdit(index)} className='mr-2 p-2 bg-gradient-to-r from-gray-400 to-gray-600 text-white rounded hover:from-gray-500 hover:to-gray-700'><FaPencilAlt/></button>
        <button onClick={() => DeleteTodo(todo.id)} className='mr-2 p-2 bg-gradient-to-r from-red-400 to-red-600 text-white rounded hover:from-red-500 hover:to-red-700'><FaTrash/></button>
        <button onClick={() => FinishTodo(todo.id)} className='p-2 bg-gradient-to-r from-blue-400 to-blue-700 text-white rounded hover:from-blue-500 hover:to-blue-700'><FaCheck/></button>

      </div>
     </li>
     </div>

     <div>
      <Priority todo={todo}/>
     </div>

     </div>
     </>
      )
  
}

export default Todoitem
