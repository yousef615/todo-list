export  function AddTaskForm({ inputValue, setInputValue, handleAddTask, exist }) {
    return (
      <div>
        <input
          className="bg-white border-1 border-gray-300
          text-gray-900 text-sm rounded-lg
          focus:outline-blue-900 inline m-3 p-3
          dark:bg-gray-600 dark:border-gray-600 
          dark:placeholder-gray-400 dark:text-white"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAddTask()}
          placeholder="New Task"
        />
        <button onClick={handleAddTask}>Add task</button>
        {exist && <p className="text-red-500 text-lg mb-1">This task already exists</p>}
      </div>
    );
  }