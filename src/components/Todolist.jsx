
import Todoitem from './Todoitem'

const Todolist = ({todos, setEdit, DeleteTodo, FinishTodo}) => {
  return (
    <div className= 'p-6 rounded w-full max-w-lg lg:w-1/4 outline-none'>
      
    <ul>
    {
        todos.map((todo, index) => (
      <Todoitem key = {index} index={index} todo = {todo} setEdit={setEdit} DeleteTodo={DeleteTodo} FinishTodo={FinishTodo}/>
        ))}
    </ul>

    
  </div>
  )
}

export default Todolist
