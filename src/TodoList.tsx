import React, {ChangeEvent,} from "react";
import {FilterValueType, TaskType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";

type TodoListPropsType = {
  id: string
  title: string
  tasks: Array<TaskType>
  filter: FilterValueType
  removeTask: (taskId: string, todoListId: string) => void
  addTask: (title: string, todoListId: string) => void
  removeTodoList: (todoListId: string) => void
  changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void
  changeTodoListFilter: (nextFilter: FilterValueType, todoListId: string) => void
  changeTaskTitle: (taskId: string, title: string, todoListId: string) => void
  changeTodoListTitle: (title: string, todoListId: string) => void
}

export const TodoList = (props: TodoListPropsType) => {
  const getTasksJsxElements = (t: TaskType) => {
    //*выносим переменную из button
    const removeTask = () => props.removeTask(t.id, props.id)
    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
      props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
    }
    const changeTitle = (title: string) =>
      props.changeTaskTitle(t.id, title, props.id)
    return (
      <li key={t.id}
          className={t.isDone ? 'is-done' : ''}
      >
        <input
          type="checkbox"
          checked={t.isDone}
          onChange={changeTaskStatus}
        />
        <EditableSpan title={t.title} changeTitle={changeTitle}/>
        <button onClick={removeTask}>x</button>
      </li>
    )
  }
  const tasksJsxElements = props.tasks.map(getTasksJsxElements)

  //выносим button функции в отдельные переменные
  const changeTodoListTitle = (title: string) => props.changeTodoListTitle(title, props.id)
  const addTask = (title: string) => props.addTask(title, props.id)
  const setAllFilterValue = () => props.changeTodoListFilter('all', props.id)
  const setActiveFilterValue = () => props.changeTodoListFilter('active', props.id)
  const setCompletedFilterValue = () => props.changeTodoListFilter('completed', props.id)
  const removeTodoList = () => props.removeTodoList(props.id)

  // JSX
  return (
    <div className="App">
      <div>
        <h3>
          <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
          <button onClick={removeTodoList}>x</button>
        </h3>
        <AddItemForm addItem={addTask}/>
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