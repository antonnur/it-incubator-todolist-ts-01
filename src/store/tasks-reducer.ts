import {TasksStateType} from "../App";
import {v1} from "uuid";
import {AddTodoListActionType, RemoveTodoListActionType} from "./todolists-reducer";

export type removeTaskActionType = {
  type: 'REMOVE-TASK'
  taskId: string
  todoListId: string
}

type addTaskActionType = {
  type: 'ADD-TASK'
  title: string
  todoListId: string
}

type changeTaskStatusActionType = {
  type: 'CHANGE-TASK-STATUS'
  taskId: string
  isDone: boolean
  todoListId: string
}

type changeTaskTitleActionType = {
  type: 'CHANGE-TASK-TITLE'
  taskId: string
  title: string
  todoListId: string
}

export type ActionType =
  removeTaskActionType
  | addTaskActionType
  | changeTaskStatusActionType
  | changeTaskTitleActionType
  | AddTodoListActionType
  | RemoveTodoListActionType

export const tasksReducer = (state: TasksStateType, action: ActionType): TasksStateType => {
  switch (action.type) {
    case "REMOVE-TASK":
      return {...state, [action.todoListId]: state[action.todoListId].filter(task => task.id !== action.taskId)}
    case "ADD-TASK":
      return {...state, [action.todoListId]: [{id: v1(), title: action.title, isDone: false}, ...state[action.todoListId]]}
    case "CHANGE-TASK-STATUS":
      return {
        ...state, [action.todoListId]: state[action.todoListId]
          .map(task => task.id === action.taskId ? {...task, isDone: action.isDone} : task)
      }
    case "CHANGE-TASK-TITLE":
      return {
        ...state, [action.todoListId]: state[action.todoListId]
          .map(task => task.id === action.taskId ? {...task, title: action.title} : task)
      }
    case "ADD-TODO-LIST":
      return {...state, [action.todoListId]: []}
    case "REMOVE-TODO-LIST":
      // destructuring
      // let {[action.todoListId]: [], ...newState} = {...state}
      let newState = {...state}
      delete newState[action.todoListId]
      return newState
    default:
      return state
  }
}

export const removeTaskAC = (taskId: string, todoListId: string): removeTaskActionType => {
  return {type: 'REMOVE-TASK', taskId, todoListId}
}

export const addTaskAC = (title: string, todoListId: string): addTaskActionType => {
  return {type: 'ADD-TASK', title, todoListId}
}

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todoListId: string): changeTaskStatusActionType => {
  return {type: 'CHANGE-TASK-STATUS', taskId, isDone, todoListId}
}

export const changeTaskTitleAC = (taskId: string, title: string, todoListId: string): changeTaskTitleActionType => {
  return {type: 'CHANGE-TASK-TITLE', taskId, title, todoListId}
}