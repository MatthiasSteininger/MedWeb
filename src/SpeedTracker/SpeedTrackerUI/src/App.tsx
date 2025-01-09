import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)
  const [filecontent, setFileContent] = useState("NO FILE CONTENT")

  return (
    <>
      <div className='flex flex-col'>
        <div className="bg-gray-400 w-full h-full flex gap-4">
          <button className="bg-blue-400 justify-center" onClick={() => setCount(count + 1)}>Add 1</button>
          <button className="bg-blue-400 justify-center" onClick={() => setCount(count + 2)}>Add 2</button>
          <button className="bg-blue-400 justify-center" onClick={() => setCount(count + 4)}>Add 4</button>
          <button className="bg-blue-400 justify-center" onClick={() => {
            const filePath = 'C:\\_GitHUB\\@LVR-P\\MedWeb\\src\\SpeedTracker\\Data\\data1.json'; // Replace with the correct file path

            // Use the `readFile` function exposed via the preload script
            // window.ipcRenderer.invoke('read-file', filePath);
            // window.stone.readFile(filePath);
            window.electronAddon.readFile(filePath).then((content: string) => {
              console.log(content); // Print file content to the console
              content = content.substring(0, 400);
              setFileContent(content)
            }).catch((error: Error) => {
              console.error('Error reading file:', error);
            });
          }}>Print To Console</button>
        </div>
        <a>Current count is: {count}</a>
        <a>{filecontent}</a>
      </div>
    </>
  )
}

export default App