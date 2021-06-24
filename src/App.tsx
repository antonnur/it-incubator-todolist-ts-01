// 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
import React from 'react';
import './App.css';
import {Todolist} from "./Todolist";

function App() {
  return (
    <div>
      <Todolist title={'What to learn'}/>
      <Todolist title={'Songs'}/>
      <Todolist title={'Books'}/>
    </div>
  );
}

export default App;
