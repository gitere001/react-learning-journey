import { useContext, useState } from "react";
import { CheckCircle, Circle, Trash2, Sun, Plus, CloudSun, Moon } from "lucide-react";
import "./MainHomePage.css";
import { HomePageContext } from "../context/AppState";

export default function MainHomePage() {
  const { loginState, taskDispatch, tasks } = useContext(HomePageContext);

  const [newTask, setNewTask] = useState("");
  const username = loginState.userName;

  const getGreetingAndIcon = () => {
    const hour = new Date().getHours();

    if (hour < 12)  return { message: "Good morning", icon: <CloudSun className="morning-icon" /> };
    if (hour < 18)  return { message: "Good afternoon", icon: <Sun className="day-icon" /> };
    return { message: "Good evening", icon: <Moon className="night-icon" /> };
  };

  const toggleTask = (id) => {
    taskDispatch({type: "mark-task-completed", payload: id});
};

const deleteTask = (id) => {
	  taskDispatch({type: "delete-a-task", payload: id});

  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (newTask.trim()) {
      taskDispatch({
        type: "add-new-task",
        payload: { id: Date.now(), title: newTask.trim(), completed: false },
      });
      setNewTask("");
    }
  };

  const { message, icon } = getGreetingAndIcon();


  return (
    <main className="main-home-container">
      {/* Greeting */}
      <div className="greeting">

        {icon}
        <h2>
          {message}, <span className="username">{username}</span>
        </h2>
      </div>

      {/* Add Task Form */}
      <form onSubmit={handleAddTask} className="task-form">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task..."
          className="task-input"
        />
        <button
          type="submit"
          className="add-task-btn"
          disabled={!newTask.trim()}
        >
          <Plus className="plus-icon" />
          Add Task
        </button>
      </form>

      {/* Tasks List */}
      <div className="task-list">
        {tasks.length === 0 ? (
          <div className="empty-state">
            <CheckCircle className="check-icon" />
            <p>All caught up!</p>
          </div>
        ) : (
          tasks.map((task) => (
            <div key={task.id} className="task-item">
              <button
                onClick={() => toggleTask(task.id)}
                className="task-toggle"
              >
                {task.completed ? (
                  <CheckCircle className="task-completed" />
                ) : (
                  <Circle className="task-pending" />
                )}
              </button>
              <span
                className={task.completed ? "task-text completed" : "task-text"}
              >
                {task.title}
              </span>
              <button
                onClick={() => deleteTask(task.id)}
                className="task-delete"
              >
                <Trash2 />
              </button>
            </div>
          ))
        )}
      </div>
    </main>
  );
}
