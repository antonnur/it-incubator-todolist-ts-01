import React, {ChangeEvent, KeyboardEvent, useState} from "react";

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
    <div>
      <input
        value={title}
        onChange={onTitleChangeHandler}
        //добавление task по Enter
        onKeyPress={onKeyPressAddItem}
        className={error ? 'error' : ''}
      />
      <button onClick={addItem}>+</button>
      {error && <div className={'error-message'}>{error}</div>}
    </div>
  )
}

export default AddItemForm