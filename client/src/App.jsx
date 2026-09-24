import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [message, setMessage] = useState("Connecting to backend...")

  useEffect(() => {
    // Change 5000 to 5001 if your backend runs on port 5001
    fetch('http://localhost:5000/api/health') 
      .then((res) => res.json())
      .then((data) => setMessage(data.message || "Connected successfully!"))
      .catch((err) => {
        console.error(err)
        setMessage("Could not connect to backend server.")
      })
  }, [])

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif' }}>
      <h1>Finova AI Budget Tracker</h1>
      <div style={{ padding: '20px', background: '#222', borderRadius: '8px', color: '#fff' }}>
        <h3>Database API Status:</h3>
        <p>{message}</p>
      </div>
    </div>
  )
}

export default App
