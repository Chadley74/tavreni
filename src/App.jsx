import { useState } from "react"
import "./App.css"

function App() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [status, setStatus] = useState("todo");
  const [dueDate, setDueDate] = useState("");
  const [tasks, setTasks] = useState([]);
  const newId = tasks.length + 1;
  
  function handleSubmit(event) {
    event.preventDefault();
    const task = {
      id: newId,
      title,
      description,
      priority,
      status,
      dueDate,
      dateCreated: new Date(),
    }
    const newTasks = [...tasks, task];
    setTasks(newTasks);
    setTitle("")
    setDescription("")
    setPriority("medium")
    setStatus("todo")
    setDueDate("")
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
          <form onSubmit={handleSubmit}>
            <label htmlFor="title">Title</label>
            <input id="title" type="text" required value={title} onChange={(event) => setTitle(event.target.value)} />
            <label htmlFor="description">Description</label>
            <textarea id="description" value={description} onChange={(event) => setDescription(event.target.value)} ></textarea>
            <label htmlFor="priority">Priority</label>
            <select id="priority" value={priority} onChange={(event) => setPriority(event.target.value)} >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <label htmlFor="status">Status</label>
            <select id="status" value={status} onChange={(event) => setStatus(event.target.value)} >
              <option value="todo">To Do</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
            <label htmlFor="due-date">Due Date</label>
            <input id="due-date" type="date" value={dueDate} onChange={(event) => setDueDate(event.target.value)} />
            <button type="submit">Create Task</button>
          </form>
        </section>

        <section>
          <h2>My Tasks</h2>
          {tasks.map((task) => {
            return (
            <article key={task.id}>
              <h3>Title: {task.title}</h3>
              {task.description && (
                <p>Description: {task.description}</p>
              )}
              <p>Priority: {task.priority}</p>
              <p>Status: {task.status}</p>
              {task.dueDate && (
                <p>Due Date: {task.dueDate}</p>
              )}
              <p>Created: {task.dateCreated.toLocaleString()}</p>
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
