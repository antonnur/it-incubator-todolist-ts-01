import {FilterValueType, TodoListType} from "../App";
import {v1} from "uuid";

export type RemoveTodoListActionType = {
  type: 'REMOVE-TODO-LIST'
  todoListId: string
}

export type AddTodoListActionType = {
  type: 'ADD-TODO-LIST'
  title: string
  todoListId: string
}

type ChangeTodoListTitleActionType = {
  type: 'CHANGE-TODO-LIST-TITLE'
  title: string
  todoListId: string
}

type ChangeTodoListFilterActionType = {
  type: 'CHANGE-TODO-LIST-FILTER'
  filter: FilterValueType
  todoListId: string
}

export type ActionType =
  RemoveTodoListActionType
  | AddTodoListActionType
  | ChangeTodoListTitleActionType
  | ChangeTodoListFilterActionType


const initialState: Array<TodoListType> = []

export const todoListsReducer =
  (state = initialState, action: ActionType): Array<TodoListType> => {
    switch (action.type) {
      case "REMOVE-TODO-LIST":
        return state.filter(tl => tl.id !== action.todoListId)
      case "ADD-TODO-LIST":
        return [...state, {id: action.todoListId, title: action.title, filter: "all"}]
      case "CHANGE-TODO-LIST-TITLE":
        return state.map(tl => tl.id === action.todoListId ? {...tl, title: action.title} : tl)
      case "CHANGE-TODO-LIST-FILTER":
        return state.map(tl => tl.id === action.todoListId ? {...tl, filter: action.filter} : tl)
      default:
        return state
    }
  }

export const RemoveTodoListAC = (todoListId: string): RemoveTodoListActionType => {
  return {type: 'REMOVE-TODO-LIST', todoListId: todoListId}
}

export const AddTodoListAC = (title: string): AddTodoListActionType => {
  return {type: 'ADD-TODO-LIST', title: title, todoListId: v1()}
}

export const ChangeTodoListTitleAC = (title: string, todoListId: string): ChangeTodoListTitleActionType => {
  return {type: 'CHANGE-TODO-LIST-TITLE', title, todoListId}
}

export const ChangeTodoListFilterAC = (filter: FilterValueType, todoListId: string): ChangeTodoListFilterActionType => {
  return {type: 'CHANGE-TODO-LIST-FILTER', filter, todoListId}
}