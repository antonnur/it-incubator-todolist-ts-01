import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {v1} from 'uuid';

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

export type FilterValueType = 'all' | 'active' | 'completed'

const App = () => {
  const [tasks, setTasks] = useState<Array<TaskType>>([
    {id: v1(), title: 'CSS', isDone: true},
    {id: v1(), title: 'JS', isDone: false},
    {id: v1(), title: 'React', isDone: true},
    {id: v1(), title: 'Hi', isDone: true},
    {id: v1(), title: 'How are you', isDone: true},
    {id: v1(), title: 'Yo', isDone: false}
  ])

  const removeTask = (taskId: string) => {
    // const oterArr = tasks.filter(t => t.id !== taskId)
    // setTasks(oterArr)
    setTasks(tasks.filter(t => t.id !== taskId))
  }

  const addTask = (title: string) => {
    const newTask: TaskType = {
      id: v1(),
      title: title,
      isDone: false
    }
    const copyTask = [...tasks]
    copyTask.push(newTask)
    setTasks(copyTask)

    // setTasks([...tasks, newTask])
    // setTasks([{id: 1(), title: title, isDone:false} ,...tasks])
  }

  const [filter, setFilter] = useState<FilterValueType>('all')
  const changeFilter = (nextFilter: FilterValueType) => {
    setFilter(nextFilter)
  }

  //вариант учебный
  let tasksForRender = tasks
  if (filter === 'active') {
    tasksForRender = tasks.filter(t => !t.isDone) //t.isDone === false
  }
  if (filter === 'completed') {
    tasksForRender = tasks.filter(t => t.isDone) //t.isDone === true
  }
  /*//вариант улучшеный
  const getTasksForRender = (): Array<TaskType> => {
    switch (filter) {
      case "completed":
        return tasks.filter(t => t.isDone)
      case "active":
        return tasks.filter(t => !t.isDone)
      default:
        return tasks
    }
  }*/

  return (
    <div className={'App'}>
      <TodoList
        title={'What to learn'}
        tasks={tasksForRender}
        removeTask={removeTask}
        changeFilter={changeFilter}
        addTask={addTask}
      />
    </div>
  );
}

export default App;