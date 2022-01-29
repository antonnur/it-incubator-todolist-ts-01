import {TasksStateType, TodoListType} from "../App";
import {tasksReducer} from "./tasks-reducer";
import {AddTodoListAC, todoListsReducer} from "./todolists-reducer";

//8. AddTodoListAC
test('ids should be equals', () => {
  const startTasksState: TasksStateType = {};
  const startTodoListsState: Array<TodoListType> = [];

  const action = AddTodoListAC("new todoList");

  const endTasksState = tasksReducer(startTasksState, action)
  const endTodoListsState = todoListsReducer(startTodoListsState, action)

  // console.log(endTasksState)

  // keys [key1, key2, key3]
  // values [value1, value2, value3]
  // entries [[key1, value1], [key2, value2], [key3, value3]]

  const keys = Object.keys(endTasksState);
  // console.log(keys)

  const idFromTasks = keys[0];
  //tasksReducer
  // {...state, [action.todoListId]: []}
  const idFromTodoLists = endTodoListsState[0].id;
  //todoListsReducer
  // [] => [] => [{id: action.todoListId, title: action.title, filter: "all"}]

  expect(idFromTasks).toBe(action.todoListId);
  expect(idFromTodoLists).toBe(action.todoListId);
});
