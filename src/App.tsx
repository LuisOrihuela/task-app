import React, { useState, useRef } from 'react'

type FormElement = React.FormEvent<HTMLFormElement>
interface ITask {
  name: string
  done: boolean
}

type InputRef = HTMLInputElement

function App(): JSX.Element {
  const inputRef = useRef<InputRef>(null)
  const [newTask, setNewTask] = useState<string>('')
  const [tasks, setTasks] = useState<ITask[]>([])

  const handleSubmit = (e: FormElement) => {
    e.preventDefault()
    addTask(newTask)
    setNewTask('')
  }

  const addTask = (name: string) => {
    const newTasks: ITask[] = [...tasks, { name, done: false }]
    setTasks(newTasks)
    inputRef.current?.focus()
  }

  const toggleDoneTask = (idx: number): void => {
    const newTask: ITask[] = [...tasks]
    newTask[idx].done = !newTask[idx].done
    setTasks(newTask)
  }

  const handleDelete = (idx: number) => {
    const newTasks: ITask[] = tasks.filter((task, index) => index !== idx)
    setTasks(newTasks)
  }

  return (
    <div className='container p-4'>
      <div className='row'>
        <div className='col-md-6 offset-md-3'>
          <div className='card'>
            <div className='card-body'>
              <form onSubmit={handleSubmit}>
                <input
                  ref={inputRef}
                  value={newTask}
                  type='text'
                  onChange={e => setNewTask(e.target.value)}
                  className='form-control'
                  autoFocus
                />
                <button className='btn btn-primary btn-block mt-2'>Save</button>
              </form>
            </div>
          </div>
          {tasks.map((task: ITask, idx: number) => (
            <div className='card card-body mt-2' key={idx}>
              <h2 style={{ textDecoration: task.done ? 'line-through' : '' }}>{task.name}</h2>
              <div>
                <button className='btn btn-outline-secondary' onClick={() => toggleDoneTask(idx)}>
                  {task.done ? '✓' : '✗'}
                </button>
                <button className='btn btn-outline-danger' onClick={() => handleDelete(idx)}>
                  🗑
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
