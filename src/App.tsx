import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {v1} from 'uuid';
import {Simulate} from "react-dom/test-utils";
import keyDown = Simulate.keyDown;

export type FilterValueType = 'all' | 'active' | 'completed'

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

type TodoListType = {
  id: string
  title: string
  filter: FilterValueType
}

type TasksStateType = {
  [key: string]: TaskType[]
}

const App = () => {
  // new BLL:
  const todoListId_1 = v1()
  const todoListId_2 = v1()
  const [todoLists, setTodoLists] = useState<TodoListType[]>([
    {id: todoListId_1, title: ' What to learn', filter: 'all'},
    {id: todoListId_2, title: ' What to buy', filter: 'all'},
  ])

  const [tasks, setTasks] = useState<TasksStateType>({
    [todoListId_1]: [
      {id: v1(), title: 'CSS', isDone: true},
      {id: v1(), title: 'JS', isDone: false},
      {id: v1(), title: 'React', isDone: true},
    ],
    [todoListId_2]: [
      {id: v1(), title: 'Hi', isDone: true},
      {id: v1(), title: 'How are you', isDone: true},
      {id: v1(), title: 'Yo Fish', isDone: false}
    ]
  })

  const removeTask = (taskId: string, todoListId: string) => {
    setTasks({
      ...tasks,
      [todoListId]: tasks[todoListId].filter(t => t.id !== taskId)
    })
  }

  const addTask = (title: string, todoListId: string) => {
    const newTask: TaskType = {id: v1(), title, isDone: false}
    tasks[todoListId] = [...tasks[todoListId], newTask]
    setTasks({...tasks})
  }

  const changeTaskStatus = (taskId: string, isDone: boolean, todoListId: string) => {
    let task = tasks.find(t => t.id === taskId)
    if (task) {
      task.isDone = isDone
    }
    setTasks([...tasks])
  }

  const changeFilter = (nextFilter: FilterValueType, todoListId: string) => { setFilter(nextFilter) }

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
        changeStatus={changeTaskStatus}
        filter={filter}
      />
    </div>
  );
}

export default App;