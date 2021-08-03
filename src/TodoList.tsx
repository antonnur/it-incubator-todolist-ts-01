import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValueType, TaskType} from "./App";

type TodoListPropsType = {
  title: string
  tasks: Array<TaskType>
  addTask: (title: string) => void
  removeTask: (taskId: string) => void
  changeFilter: (nextFilter: FilterValueType) => void
  changeStatus: (taskId: string, isDone: boolean) => void
  filter: FilterValueType
}

export const TodoList = (props: TodoListPropsType) => {
  const [title, setTitle] = useState<string>('')
  const [error, setError] = useState<string | null>(null)

  //функция очищаем input
  const addTask = () => {
    if (title.trim() !== '' && title !== 'censors-text') {
      props.addTask(title.trim())
      setTitle('')
    } else {
      setError('Title is required')
    }
  }

  const tasksJsxElements = props.tasks.map(t => {
    //*выносим переменную из button
    const removeTask = () => props.removeTask(t.id)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      props.changeStatus(t.id, e.currentTarget.checked)
    }
    return (
      <li key={t.id}
          className={t.isDone ? 'is-done' : ''}
      >
        <input
          type="checkbox"
          onChange={onChangeHandler}
          checked={t.isDone}
        />
        <span>{t.title}</span>
        <button onClick={removeTask}>x</button>
        {/*<button onClick={() => props.removeTask(t.id)}>x</button>*/}
      </li>
    )
  })

  //выносим button функции в отдельные переменные
  const onAllClickHandler = () => props.changeFilter('all')
  const onActiveClickHandler = () => props.changeFilter('active')
  const onCompletedClickHandler = () => props.changeFilter('completed')
  const onTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null)
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
            className={error ? 'error' : ''}
          />
          <button onClick={addTask}>+</button>
          {error && <div className={'error-message'}>{error}</div>}
        </div>
        <ul>
          {tasksJsxElements}
        </ul>
        <div>
          <button onClick={onAllClickHandler}
                  className={props.filter === 'all' ? 'active-filter' : ''}>All
          </button>
          <button onClick={onActiveClickHandler}
                  className={props.filter === 'active' ? 'active-filter' : ''}>Active
          </button>
          <button onClick={onCompletedClickHandler}
                  className={props.filter === 'completed' ? 'active-filter' : ''}>Completed
          </button>
        </div>
      </div>
    </div>
  );
};