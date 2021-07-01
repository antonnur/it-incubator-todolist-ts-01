import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";

export type TaskType = {
  id: number
  title: string
  isDone: boolean
}

export type FilterValueType = 'all' | 'active' | 'completed'

const App = () => {
  const [tasks, setTasks] = useState<Array<TaskType>>([
    {id: 1, title: 'CSS', isDone: true},
    {id: 2, title: 'JS', isDone: false},
    {id: 3, title: 'React', isDone: true},
    {id: 4, title: 'Hi', isDone: true},
    {id: 5, title: 'How are you', isDone: true},
    {id: 6, title: 'Yo', isDone: false}
  ])

  const removeTask = (taskId: number) => {
    // const oterArr = tasks.filter(t => t.id !== taskId)
    // setTasks(oterArr)
    setTasks(tasks.filter(t => t.id !== taskId))
  }

  const [filter, setFilter] = useState<FilterValueType>('all')
  const changeFilter = (nextFilter: FilterValueType) => {
    setFilter(nextFilter)
  }

  let tasksForRender = tasks
  if (filter === 'active') {
    tasksForRender = tasks.filter(t => t.isDone === false) //!t.isDone
  }
  if (filter === 'completed') {
    tasksForRender = tasks.filter(t => t.isDone === true) //t.isDone
  }

  return (
    <div className={'App'}>
      <TodoList
        title={'What to learn'}
        tasks={tasksForRender}
        removeTask={removeTask}
        changeFilter={changeFilter}
      />
    </div>
  );
}

export default App;

//https://youtu.be/F5NwMUukIhg?list=PLbLBXDhswD1en22z_qAh25RvkVXCmZ_IH&t=2520