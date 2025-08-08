//  import "../App.css"
export default function TasksList({ dispatch, visibleItems, taskCount, filterCompleted }) {
  return (
    
    <ul className="p-3 mb-5  border-gray-200/100 dark:border-gray-600
       rounded-xl " style={{border: taskCount  < 2 ? "none":  " ridge 3px  " }}>
        
        
    {visibleItems.map((todo) => (
      <li className="mb-3 font-[Josifen_Sans]  max-w-xl " 
      key={todo.id} style={{textDecoration:
        !filterCompleted && todo.complete?"line-through": "none" }}>
            {todo.title}
           
            {/* Complete Button */}
         <button className={"complete"}  onClick={() => dispatch({type:"COMPLETE",
          id: todo.id })} style={{color: todo.complete? "gray": "green"}}>✔ 
         <p className="tooltip dark:text-gray-200! dark:bg-gray-700! ">complete</p></button>
         {/* Delete Button */}
         <button
        className="delete filter hover:shadow-[1px_5px_30px_-4px_rgb(250,2,25)]!"
         onClick={() => dispatch({type:"DELETE", id: todo.id})}>X
         <p className="tooltip dark:text-gray-200! dark:bg-gray-700! ">delete</p></button>
        
      <br/>
         </li> 
      ))}
      </ul>
    
  )
}