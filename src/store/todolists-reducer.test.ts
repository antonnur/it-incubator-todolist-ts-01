import {v1} from 'uuid';
import {FilterValueType, TodoListType} from '../App';
import {
  AddTodoListAC, ChangeTodoListFilterAC, ChangeTodoListTitleAC, RemoveTodoListAC, todoListsReducer
} from "./todolists-reducer";

let todoListId1: string
let todoListId2: string
let startState: Array<TodoListType>

beforeEach(() => {
  todoListId1 = v1();
  todoListId2 = v1();

  startState = [
    {id: todoListId1, title: "What to learn", filter: "all"},
    {id: todoListId2, title: "What to buy", filter: "all"}
  ]
})

// 9
test('correct todoList should be removed', () => {
  const endState = todoListsReducer(startState, RemoveTodoListAC(todoListId1))

  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(todoListId2);
});

// 10
test('correct todoList should be added', () => {
  let newTodoListTitle = "New TodoList";
  const endState = todoListsReducer(startState, AddTodoListAC(newTodoListTitle,)
  )

  expect(endState.length).toBe(3);
  expect(endState[2].title).toBe(newTodoListTitle);
  expect(endState[2].filter).toBe('all');
  expect(endState[2].id).toBeDefined();
});

// 11
test('correct TodoList should change its name', () => {
  let newTodoListTitle = "New TodoList";
  const endState = todoListsReducer(startState, ChangeTodoListTitleAC(newTodoListTitle, todoListId2));

  expect(endState[0].title).toBe("What to learn");
  expect(endState[1].title).toBe(newTodoListTitle);
});

// 12
test('correct filter of todoList should be changed', () => {
  let newFilter: FilterValueType = "completed";
  const endState = todoListsReducer(startState, ChangeTodoListFilterAC(newFilter, todoListId2));

  expect(endState[0].filter).toBe("all");
  expect(endState[1].filter).toBe(newFilter);
});