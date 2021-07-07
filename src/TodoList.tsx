import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValueType, TaskType} from "./App";

type TodoListPropsType = {
  title: string
  tasks: Array<TaskType>
  addTask: (title: string) => void
  removeTask: (taskId: string) => void
  changeFilter: (nextFilter: FilterValueType) => void
}

export const TodoList = (props: TodoListPropsType) => {
  const [title, setTitle] = useState<string>('')

  const tasksJsxElements = props.tasks.map(t => {
    //*выносим переменную из button
    const removeTask = () => props.removeTask(t.id)
    return (
      <li key={t.id}>
        <input type="checkbox" checked={t.isDone}/>
        <span>{t.title}</span>
        <button onClick={removeTask}>x</button>
        {/*<button onClick={() => props.removeTask(t.id)}>x</button>*/}
      </li>
    )
  })

  //функция очищаем input
  const addTask = () => {
    props.addTask(title)
    setTitle('')
  }
  //выносим button функции в отдельные переменные
  const onAllClickHandler = () => props.changeFilter('all')
  const onActiveClickHandler = () => props.changeFilter('active')
  const onCompletedClickHandler = () => props.changeFilter('completed')
  const onTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.ctrlKey) addTask()
  }

  return (
    <div className="App">
      <div>
        <h3>{props.title}</h3>
        <div>
          <input
            value={title}
            onChange={onTitleChangeHandler}
            //добавление task по Enter
            onKeyPress={onKeyPressHandler}
          />
          <button onClick={addTask}>+</button>
        </div>
        <ul>
          {tasksJsxElements}
        </ul>
        <div>
          <button onClick={onAllClickHandler}>All</button>
          <button onClick={onActiveClickHandler}>Active</button>
          <button onClick={onCompletedClickHandler}>Completed</button>
        </div>
      </div>
    </div>
  );
};