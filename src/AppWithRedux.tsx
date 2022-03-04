import React from 'react'
import './App.css'
import {TodoList} from "./TodoList"
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from '@material-ui/icons';
import {
  AddTodoListAC, ChangeTodoListFilterAC, ChangeTodoListTitleAC, RemoveTodoListAC
} from "./store/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./store/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store/store";

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

const AppWithRedux = () => {
  const todoLists = useSelector<AppRootStateType, Array<TodoListType>>( state => state.todoLists)

  const tasks = useSelector<AppRootStateType, TasksStateType>( state => state.tasks)

  const dispatch = useDispatch()

  const removeTask = (taskId: string, todoListId: string) => {
    let action = removeTaskAC(taskId, todoListId)
    dispatch(action)
  }

  const addTask = (title: string, todoListId: string) => {
    dispatch(addTaskAC(title, todoListId))
  }

  const changeTaskStatus = (taskId: string, isDone: boolean, todoListId: string) => {
    dispatch(changeTaskStatusAC(taskId, isDone, todoListId))
  }

  const changeTaskTitle = (taskId: string, title: string, todoListId: string) => {
    dispatch(changeTaskTitleAC(taskId, title, todoListId))
  }

  const changeTodoListFilter = (filter: FilterValueType, todoListId: string) => {
    dispatch(ChangeTodoListFilterAC (filter, todoListId))
  }

  const changeTodoListTitle = (title: string, todoListId: string) => {
    dispatch(ChangeTodoListTitleAC (title, todoListId))
  }

  const removeTodoList = (todoListId: string) => {
    let action = RemoveTodoListAC (todoListId)
    dispatch(action)
  }

  const addTodoList = (title: string) => {
    let action = AddTodoListAC (title)
    dispatch(action)
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

export default AppWithRedux