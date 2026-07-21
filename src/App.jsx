import './App.css'

function App() {

  return (
    <>
      <header>
        <h1>Tavreni</h1>
        <p>Personal Task Manager</p>
      </header>
      <main>
        <section>
          <h2>Create Task</h2>
          <form>
            <label htmlFor="title">Title</label>
            <input id="title" type="text" required />
            <label htmlFor="description">Description</label>
            <textarea id="description"></textarea>
            <label htmlFor="priority">Priority</label>
            <select id="priority" defaultValue="medium">
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <label htmlFor="status">Status</label>
            <select id="status" defaultValue="todo">
              <option value="todo">To Do</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
            <label htmlFor="due-date">Due Date</label>
            <input id="due-date" type="date" />
            <button type="submit">Create Task</button>
          </form>
        </section>

        <section>
          <h2>My Tasks</h2>
          <p>No tasks yet.</p>
        </section>

      </main>
    </>
  )
}

export default App
