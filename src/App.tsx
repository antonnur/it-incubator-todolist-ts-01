import React from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";

function App() {

  let tasks1: Array<TaskType> = [
    {id: 1, title: 'CSS', isDone: true},
    {id: 2, title: 'JS', isDone: false},
    {id: 3, title: 'React', isDone: true}
  ]

  let tasks2: Array<TaskType> = [
    {id: 1, title: 'Hi', isDone: true},
    {id: 2, title: 'How are you', isDone: true},
    {id: 3, title: 'Yo', isDone: false}
  ]

  return (
    <div>
      <Todolist title={'What to learn'} tasks={tasks1}/>
      <Todolist title={'Songs'} tasks={tasks2}/>
    </div>
  );
}

export default App;
// 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