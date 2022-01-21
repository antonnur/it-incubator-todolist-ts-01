import {FilterValueType, TodoListType} from "../App";

type RemoveTodoListAT = {
  type: 'REMOVE_TODO_LIST'
  todoListId: string
}

export const RemoveTodoListAC = (todoListId: string): RemoveTodoListAT => {
  return {
    type: 'REMOVE_TODO_LIST',
    todoListId: todoListId
  }
}

type AddTodoListAT = {
  type: 'ADD_TODO_LIST'
  title: string
  todoListId: string
}

export const AddTodoListAC = (title: string, todoListId: string): AddTodoListAT => {
  return {
    type: 'ADD_TODO_LIST',
    title: title,
    todoListId: todoListId
  }
}

type ChangeTodoListTitleAT = {
  type: 'CHANGE_TODO_LIST_TITLE'
  title: string
  todoListId: string
}

export const ChangeTodoListTitleAC = (title: string, todoListId: string): ChangeTodoListTitleAT => {
  return {
    type: 'CHANGE_TODO_LIST_TITLE',
    title,
    todoListId
  }
}

type ChangeTodoListFilterAT = {
  type: 'CHANGE_TODO_LIST_FILTER'
  filter: FilterValueType
  todoListId: string
}

export const ChangeTodoListFilterAC = (filter: FilterValueType, todoListId: string): ChangeTodoListFilterAT => {
  return {
    type: 'CHANGE_TODO_LIST_FILTER',
    filter,
    todoListId
  }
}

export type ActionType = RemoveTodoListAT | AddTodoListAT | ChangeTodoListTitleAT | ChangeTodoListFilterAT


export const todoListsReducer =
  (todoLists: Array<TodoListType>, action: ActionType): Array<TodoListType> => {
    switch (action.type) {
      case "REMOVE_TODO_LIST":
        return todoLists.filter(tl => tl.id !== action.todoListId)
      case "ADD_TODO_LIST":
        return [...todoLists, {id: action.todoListId, title: action.title, filter: "all"}]
      case "CHANGE_TODO_LIST_TITLE":
        return todoLists.map(tl => tl.id === action.todoListId ? {...tl, title: action.title} : tl)
      case "CHANGE_TODO_LIST_FILTER":
        return todoLists.map(tl => tl.id === action.todoListId ? {...tl, filter: action.filter} : tl)
      default:
        return todoLists
    }
  }