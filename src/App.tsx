import React from 'react';
import './App.css';
import {Todolist} from "./Todolist";

export type TaskType = {
  id: number
  title: string
  isDone: boolean
}

const App = () => {
  const tasks: Array<TaskType> = [
    {id: 1, title: 'CSS', isDone: true},
    {id: 2, title: 'JS', isDone: false},
    {id: 3, title: 'React', isDone: true},
    {id: 4, title: 'Hi', isDone: true},
    {id: 5, title: 'How are you', isDone: true},
    {id: 6, title: 'Yo', isDone: false}
  ]

  const removeTask = (taskId: number) => {

  }

  return (
    <div className={'App'}>
      <Todolist
        title={'What to learn'}
        tasks={tasks}
        removeTask={removeTask}
        />
    </div>
  );
}

export default App;

//https://youtu.be/F5NwMUukIhg?list=PLbLBXDhswD1en22z_qAh25RvkVXCmZ_IH&t=2520