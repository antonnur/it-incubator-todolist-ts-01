import React, {ChangeEvent,} from "react";
import {FilterValueType, TaskType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, ButtonGroup, Checkbox, IconButton, List, Typography} from "@material-ui/core";
import {Clear, Delete} from "@material-ui/icons";

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
          style={{display: 'flex', justifyContent: 'space-between'}}
      >
        <div className={t.isDone ? 'is-done' : ''}
             style={{display: 'inline-block'}}>
          <Checkbox
            color={"primary"}
            checked={t.isDone}
            onChange={changeTaskStatus}
          />
          <EditableSpan title={t.title} changeTitle={changeTitle}/>
        </div>
        <IconButton onClick={removeTask} color={"secondary"}>
          <Clear/>
        </IconButton>
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
      <div className="Todo-list">
        <Typography
          variant={"h5"}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
          <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
          <IconButton onClick={removeTodoList}>
            <Delete/>
          </IconButton>
        </Typography>
        <AddItemForm addItem={addTask}/>
        <List>
          {tasksJsxElements}
        </List>
        <div>
          <ButtonGroup
            disableElevation
            variant={"contained"}
            size={"small"}
          >
            <Button
              color={props.filter === 'all' ? 'primary' : 'default'}
              onClick={setAllFilterValue}>All </Button>
            <Button
              color={props.filter === 'active' ? 'primary' : 'default'}
              onClick={setActiveFilterValue}>Active </Button>
            <Button
              color={props.filter === 'completed' ? 'primary' : 'default'}
              onClick={setCompletedFilterValue}>Completed </Button>
          </ButtonGroup>
        </div>
      </div>
    </div>
  );
};