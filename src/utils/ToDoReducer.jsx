
export const toDoReducer = (state, action) => {
    switch(action.type) {
      case "ADDTASK": return [...state,{id: Date.now(), title: action.title, complete: false}];
      
      case "DELETE": return state.filter((todo) => todo.id !== action.id);
  
      case "COMPLETE": return state.map((todo) => todo.id === action.id ?{...todo, complete: !todo.complete}: todo );
  
      case "CLEAR_ALL": return [];
  
      default:  return state; 
      
      }}

