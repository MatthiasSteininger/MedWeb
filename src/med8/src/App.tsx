import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import domdom from './assets/DOMDOM.jpg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [domdomVisability, toggleDomDom] = useState(false)

  //i can also use the domdomVisability variable itself -> but passing the current is also valid
  //when a component is within a component all styles of the parnent can be applied

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs" onClick={() => toggleDomDom((current) => !current)}>
        Click on the Vite and React logos to learn more
      </p>
      {domdomVisability ? 
        <>
          <div className='domdomcontainer test'>
            Von den Machern von IceAges
            <img src={domdom} className='domdom'></img>
          </div>
        </> : <></>}
    </>
  )
}

export default App