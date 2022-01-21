import {v1} from 'uuid';
import {FilterValueType, TodoListType} from '../App';
import {
  ActionType,
  AddTodoListAC,
  ChangeTodoListFilterAC,
  ChangeTodoListTitleAC,
  RemoveTodoListAC,
  todoListsReducer
} from "./todolists-reducer";

// 9
test('correct todoList should be removed', () => {
  let todoListId1 = v1();
  let todoListId2 = v1();

  const startState: Array<TodoListType> = [
    {id: todoListId1, title: "What to learn", filter: "all"},
    {id: todoListId2, title: "What to buy", filter: "all"}
  ]

  const endState = todoListsReducer(startState, RemoveTodoListAC(todoListId1))

  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(todoListId2);
});

// 10
test('correct todoList should be added', () => {
  let todoListId1 = v1();
  let todoListId2 = v1();

  let newTodoListTitle = "New TodoList";
  let todoListId = v1()

  const startState: Array<TodoListType> = [
    {id: todoListId1, title: "What to learn", filter: "all"},
    {id: todoListId2, title: "What to buy", filter: "all"}
  ]

  const endState = todoListsReducer(startState, AddTodoListAC(newTodoListTitle, todoListId)
  )

  expect(endState.length).toBe(3);
  expect(endState[2].title).toBe(newTodoListTitle);
});

// 11
test('correct TodoList should change its name', () => {
  let todoListId1 = v1();
  let todoListId2 = v1();

  let newTodoListTitle = "New TodoList";

  const startState: Array<TodoListType> = [
    {id: todoListId1, title: "What to learn", filter: "all"},
    {id: todoListId2, title: "What to buy", filter: "all"}
  ]

/*
  const action: ActionType = {
    type: 'CHANGE_TODO_LIST_TITLE',
    title: newTodoListTitle,
    todoListId: todoListId2
  };
*/

  const endState = todoListsReducer(startState, ChangeTodoListTitleAC(newTodoListTitle, todoListId2));

  expect(endState[0].title).toBe("What to learn");
  expect(endState[1].title).toBe(newTodoListTitle);
});

// 12
test('correct filter of todoList should be changed', () => {
  let todoListId1 = v1();
  let todoListId2 = v1();

  let newFilter: FilterValueType = "completed";

  const startState: Array<TodoListType> = [
    {id: todoListId1, title: "What to learn", filter: "all"},
    {id: todoListId2, title: "What to buy", filter: "all"}
  ]

/*
  const action: ActionType = {
    type: 'CHANGE_TODO_LIST_FILTER' as const,
    filter: newFilter,
    todoListId: todoListId2
  };
*/

  const endState = todoListsReducer(startState, ChangeTodoListFilterAC(newFilter, todoListId2));

  expect(endState[0].filter).toBe("all");
  expect(endState[1].filter).toBe(newFilter);
});