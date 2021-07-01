import React from "react";
import {FilterValueType, TaskType} from "./App";

type TodoListPropsType = {
  title: string
  tasks: Array<TaskType>
  removeTask: (taskId: number) => void
  changeFilter: (nextFilter: FilterValueType) => void
}

export const TodoList = (props: TodoListPropsType) => {

  const tasksJsxElements = props.tasks.map(t => {
    return (
      <li key={t.id}>
        <input type="checkbox" checked={t.isDone}/>
        <span>{t.title}</span>
        <button onClick={() => props.removeTask(t.id)}>x</button>
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
          <button onClick={() => props.changeFilter('all')}>All</button>
          <button onClick={() => props.changeFilter('active')}>Active</button>
          <button onClick={() => props.changeFilter('completed')}>Completed</button>
        </div>
      </div>
    </div>
  );
};