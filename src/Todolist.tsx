import React from "react";
import {TaskType} from "./App";

type TodolistPropsType = {
  title: string
  tasks: Array<TaskType>
  removeTask: (taskId: number) => void
}

export const Todolist = (props: TodolistPropsType) => {

  const tasksJsxElements = props.tasks.map(t => {
    return(
      <li key={t.id}>
        <input type="checkbox" checked={t.isDone}/>
        <span>{t.title}</span>
        <button>x</button>
      </li>
    )
  })

  return (
    <div className="App">
      <div>
        <h3>{props.title}</h3>
        <div>
          <input/>
          <button>+</button>
        </div>
        <ul>
          {tasksJsxElements}
        </ul>
        <div>
          <button>All</button>
          <button>Active</button>
          <button>Completed</button>
        </div>
      </div>
    </div>
  );
};