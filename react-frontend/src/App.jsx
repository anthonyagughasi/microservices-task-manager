import React, { useState, useEffect } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetching from the Express.js gateway
    fetch('http://localhost:5000/api/v1/tasks')
      .then(res => res.json())
      .then(res => {
        setTasks(res.data);
        setLoading(false);
      })
      .catch(err => console.error("Error fetching data:", err));
  }, []);

  if (loading) return <p>Loading system components...</p>;

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{ color: '#333' }}>Microservice Dashboard</h1>
      <h3 style={{ color: '#666' }}>Architecture Stack: React ➔ Express ➔ Django</h3>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {tasks.map(task => (
          <li key={task.id} style={{ 
            padding: '10px', 
            margin: '5px 0', 
            backgroundColor: '#f4f4f4', 
            borderRadius: '4px',
            textDecoration: task.completed ? 'line-through' : 'none',
            color: task.completed ? '#aaa' : '#333'
          }}>
            {task.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
