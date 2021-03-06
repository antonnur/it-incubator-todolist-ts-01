import React, {useState} from 'react'
import './App.css'
import {TodoList} from "./TodoList"
import {v1} from 'uuid'
import AddItemForm from "./AddItemForm";
import {AppBar, Toolbar, IconButton, Typography, Button, Container, Grid, Paper} from "@material-ui/core";
import {Menu} from '@material-ui/icons';

export type FilterValueType = 'all' | 'active' | 'completed'

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

export type TodoListType = {
  id: string
  title: string
  filter: FilterValueType
}

export type TasksStateType = {
  [key: string]: TaskType[]
}

const App = () => {
  // new BLL:
  const todoListId_1 = v1()
  const todoListId_2 = v1()
  const [todoLists, setTodoLists] = useState<TodoListType[]>([
    {id: todoListId_1, title: 'Заявка №1', filter: 'all'},
    {id: todoListId_2, title: 'Заявка №2', filter: 'all'},
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
    tasks[todoListId] = tasks[todoListId].filter(t => t.id !== taskId)
    setTasks({...tasks})
  }

  const addTask = (title: string, todoListId: string) => {
    const newTask: TaskType = {id: v1(), title, isDone: false}
    tasks[todoListId] = [newTask, ...tasks[todoListId]]
    setTasks({...tasks})
  }

  const changeTaskStatus = (taskId: string, isDone: boolean, todoListId: string) => {
    tasks[todoListId] = tasks[todoListId].map(t => t.id === taskId ? {...t, isDone: isDone} : t)
    setTasks({...tasks})
  }

  const changeTaskTitle = (taskId: string, title: string, todoListId: string) => {
    tasks[todoListId] = tasks[todoListId].map(t => t.id === taskId ? {...t, title} : t)
    setTasks({...tasks})
  }

  const changeTodoListFilter = (filter: FilterValueType, todoListId: string) => {
    setTodoLists(todoLists.map(tl => tl.id === todoListId ? {...tl, filter: filter} : tl))
  }

  const changeTodoListTitle = (title: string, todoListId: string) => {
    setTodoLists(todoLists.map(tl => tl.id === todoListId ? {...tl, title} : tl))
  }

  const removeTodoList = (todoListId: string) => {
    setTodoLists(todoLists.filter(tl => tl.id !== todoListId))
    delete tasks[todoListId]
  }

  const addTodoList = (title: string) => {
    const todoListId = v1()
    setTodoLists([...todoLists, {id: todoListId, title, filter: "all"}])
    setTasks({...tasks, [todoListId]: []})
  }

  //UI
  const todoListComponents = todoLists.map(tl => {
    //вариант учебный
    let tasksForRender = tasks[tl.id]
    if (tl.filter === 'active') {
      tasksForRender = tasks[tl.id].filter(t => !t.isDone) //t.isDone === false
    }
    if (tl.filter === 'completed') {
      tasksForRender = tasks[tl.id].filter(t => t.isDone) //t.isDone === true
    }

    /*//вариант улучшеный
const getTasksForRender = (): Array<TaskType> => {
  switch (filter) {
    case "completed":
      return tasks[tl.id].filter(t => t.isDone)
    case "active":
      return tasks[tl.id].filter(t => !t.isDone)
    default:
      return tasks[tl.id]
  }}*/

    return (
      <Grid item key={tl.id}>
        <Paper elevation={8} style={{padding: "16px"}}>
          <TodoList
            id={tl.id}
            filter={tl.filter}
            title={tl.title}
            tasks={tasksForRender}
            addTask={addTask}
            removeTask={removeTask}
            removeTodoList={removeTodoList}
            changeTaskStatus={changeTaskStatus}
            changeTodoListFilter={changeTodoListFilter}
            changeTaskTitle={changeTaskTitle}
            changeTodoListTitle={changeTodoListTitle}
          />
        </Paper>
      </Grid>
    )
  })

  // GUI (CRUD):
  return (
    <div className={'App'}>
      <AppBar position={"static"}>
        <Toolbar style={{justifyContent: "space-between"}}>
          <IconButton edge={"start"} color={"inherit"} aria-label={"menu"}>
            <Menu/>
          </IconButton>
          <Typography variant={"h6"}>
            TodoLists
          </Typography>
          <Button color={"inherit"} variant={"outlined"}>Login</Button>
        </Toolbar>
      </AppBar>
      <Container fixed>
        <Grid container style={{padding: "20px 0"}}>
          <AddItemForm addItem={addTodoList}/>
        </Grid>
        <Grid container spacing={4}>
          {todoListComponents}
        </Grid>
      </Container>
    </div>
  )
}

export default App