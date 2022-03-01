import React, {useReducer} from 'react'
import './App.css'
import {TodoList} from "./TodoList"
import {v1} from 'uuid'
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from '@material-ui/icons';
import {
  AddTodoListAC,
  ChangeTodoListFilterAC,
  ChangeTodoListTitleAC,
  RemoveTodoListAC,
  todoListsReducer
} from "./store/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./store/tasks-reducer";

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
  // new BLL:
  const todoListId_1 = v1()
  const todoListId_2 = v1()

  const [todoLists, dispatchToTodoLists] = useReducer(todoListsReducer,[
    {id: todoListId_1, title: 'Заявка №1', filter: 'all'},
    {id: todoListId_2, title: 'Заявка №2', filter: 'all'},
  ])

  const [tasks, dispatchToTasks] = useReducer(tasksReducer,{
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
    let action = removeTaskAC(taskId, todoListId)
    dispatchToTasks(action)
  }

  const addTask = (title: string, todoListId: string) => {
    dispatchToTasks(addTaskAC(title, todoListId))
  }

  const changeTaskStatus = (taskId: string, isDone: boolean, todoListId: string) => {
    dispatchToTasks(changeTaskStatusAC(taskId, isDone, todoListId))
  }

  const changeTaskTitle = (taskId: string, title: string, todoListId: string) => {
    dispatchToTasks(changeTaskTitleAC(taskId, title, todoListId))
  }

  const changeTodoListFilter = (filter: FilterValueType, todoListId: string) => {
    dispatchToTodoLists(ChangeTodoListFilterAC (filter, todoListId))
  }

  const changeTodoListTitle = (title: string, todoListId: string) => {
    dispatchToTodoLists(ChangeTodoListTitleAC (title, todoListId))
  }

  const removeTodoList = (todoListId: string) => {
    let action = RemoveTodoListAC (todoListId)
    dispatchToTodoLists(action)
    dispatchToTasks(action)
  }

  const addTodoList = (title: string) => {
    let action = AddTodoListAC (title)
    dispatchToTodoLists(action)
    dispatchToTasks(action)
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