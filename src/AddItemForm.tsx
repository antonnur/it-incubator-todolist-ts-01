import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

type AddItemFormPropsType = {
  addItem: (title: string) => void
}

function AddItemForm(props: AddItemFormPropsType) {
  const [title, setTitle] = useState<string>('')
  const [error, setError] = useState<boolean>(false)
  const onTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (error) {
      setError(false)
    }
    setTitle(e.currentTarget.value)
  }
  const onKeyPressAddItem = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.ctrlKey)
      addItem()
  }

  //функция очищаем input
  const addItem = () => {
    if (title.trim() !== '' && title !== 'censors-text') {
      props.addItem(title.trim())
      setTitle('')
    } else {
      setError(true)
    }
  }

  return (
    <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
      <TextField
        label={"Текст"}
        size={"small"}
        variant={"outlined"}
        value={title}
        onChange={onTitleChangeHandler}
        //добавление task по Enter
        onKeyPress={onKeyPressAddItem}
        className={error ? 'error' : ''}
        error={error}
        helperText={error && "Title is required!"}
      />
      <IconButton onClick={addItem}>
        <AddBox/>
      </IconButton>
      {/*{error && <div className={'error-message'}>{error}</div>}*/}
    </div>
  )
}

export default AddItemForm