import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type EditableSpanPropsType = {
  title: string
  changeTitle: (title: string) => void
}

function EditableSpan(props: EditableSpanPropsType) {
  const [editMode, setEditMode] = useState<boolean>(true)
  const [title, setTitle] = useState<string>(props.title)
  const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }
  const offEditMode = () => {
    props.changeTitle(title)
    setEditMode(false)
  }
  const onEditMode = () => setEditMode(true)

  return (
    editMode
      ? <input
        value={title}
        autoFocus={true}
        onChange={changeTitle}
        onBlur={offEditMode}
      />
      : <span
        onDoubleClick={onEditMode}
      >{props.title}</span>
  )
}

export default EditableSpan