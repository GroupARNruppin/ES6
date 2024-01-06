import React, { useState } from 'react'

export default function App() {
  const [counter, setCounter ] = useState(0)
  const [outputContent, setOutputContent] = useState('');

  // Initialize
  function handleOnClickStart() {
    const initialValue = parseInt(document.getElementById('initialValue').value) || 0;
    setCounter(initialValue);
    setOutputContent('');
  }

  // Increment
  function handleOnClickPlus(){
    setCounter(prev => prev+1)
  }

  // Go
  function handleOnClickGo() {
    let content = '';
    for (let i = 0; i <= counter; i++) {
      content += i + ', ';
    }
    setOutputContent(content);
  }


  return (
    <div>
      <label htmlFor="initialValue">Enter Initial Value:</label>
      <input type="number" id="initialValue"/>
      <button onClick={handleOnClickStart}>Start</button>
      <button onClick={handleOnClickPlus}>+</button>
      <button onClick={handleOnClickGo}>Go</button>
      <div>
        {counter}
      </div>
      <div>
        {
          outputContent
        }
      </div>
    </div>
  )
}
