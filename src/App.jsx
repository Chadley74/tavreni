import { useState, useEffect } from "react"
import "./App.css"

function App() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [status, setStatus] = useState("todo");
  const [dueDate, setDueDate] = useState("");

  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks")

    if (savedTasks) {
      return JSON.parse(savedTasks)
    }

    return []
  });

  const [editingTaskId, setEditingTaskId] = useState(null);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks]);

  function handleSubmit(event) {
    event.preventDefault();

    const taskIds = tasks.map((task) => task.id);

    if (editingTaskId !== null) {
      const updatedTasks = tasks.map((task) => {
        if (task.id === editingTaskId) {
          return {
            ...task,
            title,
            description,
            priority,
            status,
            dueDate,
          }
        } else {
          return task
        }
      });
    
    setTasks(updatedTasks)

    } else {
      
      let newId;

      if (taskIds.length === 0) {
        newId = 1;
      } else {
        newId = Math.max(...taskIds) + 1;
      }

      const task = {
        id: newId,
        title,
        description,
        priority,
        status,
        dueDate,
        dateCreated: new Date(),
      };

      const newTasks = [...tasks, task];
      setTasks(newTasks);
    }

    setTitle("");
    setDescription("");
    setPriority("medium");
    setStatus("todo");
    setDueDate("");
    setEditingTaskId(null);

  }

  function formatStatus(status) {
    if (status === "todo") {
      return "To Do"
    } else if (status === "in-progress") {
      return "In Progress"
    } else if (status === "completed") {
      return "Completed"
    }
  }

  function formatPriority(priority) {
    return priority.charAt(0).toUpperCase() + priority.slice(1)
  }

  function handleDelete(id) {
    const updateTasks = tasks.filter((task) => task.id !== id);
    setTasks(updateTasks);
  }

  function handleEdit(task) {
    setTitle(task.title)
    setDescription(task.description)
    setPriority(task.priority)
    setStatus(task.status)
    setDueDate(task.dueDate)
    setEditingTaskId(task.id)
  }

  return (
    <>
      <header>
        <h1>Tavreni</h1>
        <p>Personal Task Manager</p>
      </header>

      <main>

        <section>
          <h2>Create Task</h2>
          <form className="task-form" onSubmit={handleSubmit}>

            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input id="title" type="text" required value={title} onChange={(event) => setTitle(event.target.value)} />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea id="description" value={description} onChange={(event) => setDescription(event.target.value)} ></textarea>
            </div>

            <div className="form-group">
              <label htmlFor="priority">Priority</label>
              <select id="priority" value={priority} onChange={(event) => setPriority(event.target.value)} >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="status">Status</label>
              <select id="status" value={status} onChange={(event) => setStatus(event.target.value)} >
                <option value="todo">To Do</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="due-date">Due Date</label>
              <input id="due-date" type="date" value={dueDate} onChange={(event) => setDueDate(event.target.value)} />
            </div>

            <button className="primary-button" type="submit">{editingTaskId === null ? "Create Task" : "Save Changes"}</button>

          </form>
        </section>

        <section>
          <h2>My Tasks</h2>
          {tasks.map((task) => {
            return (

            <article className="task-card" key={task.id}>
              <div className="task-content">
                <h3>Title: {task.title}</h3>

                {task.description && (
                  <p>Description: {task.description}</p>
                )}
              </div>

              <div className="task-meta">
                <p>
                  Priority: <span className={`task-badge priority-${task.priority}`}>{formatPriority(task.priority)}</span>
                </p>

                <p>
                  Status: <span className={`task-badge status-${task.status}`}>{formatStatus(task.status)}</span>
                </p>
              </div>

              <div className="task-dates">
                {task.dueDate && (
                  <p>Due Date: {task.dueDate}</p>
                )}

                <p>Created: {new Date(task.dateCreated).toLocaleString()}</p>
              </div>

              <div className="task-actions">
                <button className="edit-button" type="button" onClick={() => handleEdit(task)}>Edit</button>
                <button className="delete-button" type="button" onClick={() => handleDelete(task.id)}>Delete</button>
              </div>

            </article>

          )})}
          {tasks.length === 0 && (
            <p>No tasks yet.</p>
          )}
        </section>

      </main>
    </>
  )
}

export default App
