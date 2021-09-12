import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValueType, TaskType} from "./App";

type TodoListPropsType = {
  id: string
  title: string
  filter: FilterValueType
  tasks: Array<TaskType>
  removeTask: (taskId: string, todoListId: string) => void
  changeFilter: (nextFilter: FilterValueType, todoListId: string) => void
  changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void
  addTask: (title: string, todoListId: string) => void
  removeTodoList: (todoListId: string) => void
}

export const TodoList = (props: TodoListPropsType) => {
  const [title, setTitle] = useState<string>('')
  const [error, setError] = useState<string | null>(null)

  //функция очищаем input
  const addTask = () => {
    if (title.trim() !== '' && title !== 'censors-text') {
      props.addTask(title.trim(), props.id)
      setTitle('')
    } else {
      setError('Title is required')
    }
  }

  const getTasksJsxElements = (t: TaskType) => {
    //*выносим переменную из button
    const removeTask = () => props.removeTask(t.id, props.id)
    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
      props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
    }
    return (
      <li key={t.id}
          className={t.isDone ? 'is-done' : ''}
      >
        <input
          type="checkbox"
          checked={t.isDone}
          onChange={changeTaskStatus}
        />
        <span>{t.title}</span>
        <button onClick={removeTask}>x</button>
        {/*<button onClick={() => props.removeTask(t.id)}>x</button>*/}
      </li>
    )
  }
  const tasksJsxElements = props.tasks.map(getTasksJsxElements)

  //выносим button функции в отдельные переменные
  const setAllFilterValue = () => props.changeFilter('all', props.id)
  const setActiveFilterValue = () => props.changeFilter('active', props.id)
  const setCompletedFilterValue = () => props.changeFilter('completed', props.id)
  const onTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
  const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null)
    if (e.key === 'Enter' || e.ctrlKey) addTask()
  }
  const removeTodoList = () => props.removeTodoList(props.id)

  // JSX
  return (
    <div className="App">
      <div>
        <h3>{props.title}
          <button onClick={removeTodoList}>x</button>
        </h3>
        <div>
          <input
            value={title}
            onChange={onTitleChangeHandler}
            //добавление task по Enter
            onKeyPress={onKeyPressAddTask}
            className={error ? 'error' : ''}
          />
          <button onClick={addTask}>+</button>
          {error && <div className={'error-message'}>{error}</div>}
        </div>
        <ul>
          {tasksJsxElements}
        </ul>
        <div>
          <button onClick={setAllFilterValue}
                  className={props.filter === 'all' ? 'active-filter' : ''}>All
          </button>
          <button onClick={setActiveFilterValue}
                  className={props.filter === 'active' ? 'active-filter' : ''}>Active
          </button>
          <button onClick={setCompletedFilterValue}
                  className={props.filter === 'completed' ? 'active-filter' : ''}>Completed
          </button>
        </div>
      </div>
    </div>
  );
};