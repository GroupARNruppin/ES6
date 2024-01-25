import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './Index.css'
import CCQ1 from './CLassComps/CCQ1/CCQ1';
import CCQ2 from './CLassComps/CCQ2/CCQ2';
import CCQ3 from './CLassComps/CCQ3/CCQ3';


function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="app-container">
      <div className='flex-container'>
        <h2>Q1</h2>
        <CCQ1 />
      </div>
      <div className="ccq2-ccq3-container">
        <div className='flex-container'>
          <h2>Q2</h2>
          <CCQ2 />
        </div>
        <div className='flex-container'>
          <h2>Q3</h2>
          <CCQ3 />
        </div>
      </div>
    </div>

  )
}

export default App
