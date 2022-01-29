import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './tasks-reducer';
import {TasksStateType} from '../App';
import {AddTodoListAC, RemoveTodoListAC} from "./todolists-reducer";

//3. removeTaskAC
test('correct task should be deleted from correct array', () => {
  const startState: TasksStateType = {
    "todoListId1": [
      {id: "1", title: "CSS", isDone: false},
      {id: "2", title: "JS", isDone: true},
      {id: "3", title: "React", isDone: false}
    ],
    "todoListId2": [
      {id: "1", title: "bread", isDone: false},
      {id: "2", title: "milk", isDone: true},
      {id: "3", title: "tea", isDone: false}
    ]
  };

  const action = removeTaskAC("2", "todoListId2");

  const endState = tasksReducer(startState, action)

  expect(endState).toEqual({
    "todoListId1": [
      {id: "1", title: "CSS", isDone: false},
      {id: "2", title: "JS", isDone: true},
      {id: "3", title: "React", isDone: false}
    ],
    "todoListId2": [
      {id: "1", title: "bread", isDone: false},
      {id: "3", title: "tea", isDone: false}
    ]
  });
});

//4. addTaskAC
test('correct task should be added to correct array', () => {
  const startState: TasksStateType = {
    "todoListId1": [
      {id: "1", title: "CSS", isDone: false},
      {id: "2", title: "JS", isDone: true},
      {id: "3", title: "React", isDone: false}
    ],
    "todoListId2": [
      {id: "1", title: "bread", isDone: false},
      {id: "2", title: "milk", isDone: true},
      {id: "3", title: "tea", isDone: false}
    ]
  };

  const action = addTaskAC("juce", "todoListId2");

  const endState = tasksReducer(startState, action)

  expect(endState["todoListId1"].length).toBe(3);
  expect(endState["todoListId2"].length).toBe(4);
  expect(endState["todoListId2"][0].id).toBeDefined();
  expect(endState["todoListId2"][0].title).toBe('juce');
  expect(endState["todoListId2"][0].isDone).toBe(false);
});

//5. changeTaskStatusAC
test('status of specified task should be changed', () => {
  const startState: TasksStateType = {
    "todoListId1": [
      { id: "1", title: "CSS", isDone: false },
      { id: "2", title: "JS", isDone: true },
      { id: "3", title: "React", isDone: false }
    ],
    "todoListId2": [
      { id: "1", title: "bread", isDone: false },
      { id: "2", title: "milk", isDone: true },
      { id: "3", title: "tea", isDone: false }
    ]
  };

  const action = changeTaskStatusAC("2", false, "todoListId2");

  const endState = tasksReducer(startState, action)

  expect(endState["todoListId2"][1].isDone).toBe(false);
  expect(endState["todoListId1"][1].isDone).toBe(true);
});

//6. changeTaskTitleAC
test('title of specified task should be changed', () => {
  const startState: TasksStateType = {
    "todoListId1": [
      { id: "1", title: "CSS", isDone: false },
      { id: "2", title: "JS", isDone: true },
      { id: "3", title: "React", isDone: false }
    ],
    "todoListId2": [
      { id: "1", title: "bread", isDone: false },
      { id: "2", title: "milk", isDone: true },
      { id: "3", title: "tea", isDone: false }
    ]
  };

  const action = changeTaskTitleAC("2", 'beer', "todoListId2");

  const endState = tasksReducer(startState, action)

  expect(endState["todoListId2"][1].title).toBe('beer');
  expect(endState["todoListId1"][1].title).toBe('JS');
});

//7. AddTodoListAC
test('new array should be added when new todoList is added', () => {
  const startState: TasksStateType = {
    "todoListId1": [
      { id: "1", title: "CSS", isDone: false },
      { id: "2", title: "JS", isDone: true },
      { id: "3", title: "React", isDone: false }
    ],
    "todoListId2": [
      { id: "1", title: "bread", isDone: false },
      { id: "2", title: "milk", isDone: true },
      { id: "3", title: "tea", isDone: false }
    ]
  };

  const action = AddTodoListAC("new todoList");

  const endState = tasksReducer(startState, action)


  const keys = Object.keys(endState);
  const newKey = keys.find(k => k != "todoListId1" && k != "todoListId2");
  if (!newKey) {
    throw Error("new key should be added")
  }

  expect(keys.length).toBe(3);
  expect(endState[newKey]).toEqual([]);
});

//9. RemoveTodoListAC
test('property with todoListId should be deleted', () => {
  const startState: TasksStateType = {
    "todoListId1": [
      { id: "1", title: "CSS", isDone: false },
      { id: "2", title: "JS", isDone: true },
      { id: "3", title: "React", isDone: false }
    ],
    "todoListId2": [
      { id: "1", title: "bread", isDone: false },
      { id: "2", title: "milk", isDone: true },
      { id: "3", title: "tea", isDone: false }
    ]
  };

  const action = RemoveTodoListAC("todoListId2");

  const endState = tasksReducer(startState, action)


  const keys = Object.keys(endState);
  //

  expect(keys.length).toBe(1);
  expect(endState["todoListId2"]).not.toBeDefined();
});
