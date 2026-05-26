import React, { useState, useEffect } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetching from your live production Express.js gateway on Render
    fetch('https://express-api-gateway-rupn.onrender.com/api/v1/tasks')
      .then(res => res.json())
      .then(res => {
        // Fallback to an empty array if res.data is undefined/null
        setTasks(res.data || []);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching data:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p style={{ textAlign: 'center', marginTop: '50px' }}>Loading system components...</p>;

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{ color: '#333', textAlign: 'center' }}>Microservice Dashboard</h1>
      <h3 style={{ color: '#666', textAlign: 'center', fontWeight: 'normal' }}>
        Architecture Stack: React ➔ Express ➔ Django
      </h3>
      
      <hr style={{ border: '0', borderTop: '1px solid #eee', margin: '20px 0' }} />

      {tasks.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#888', fontStyle: 'italic', marginTop: '30px' }}>
          No tasks found in the database. Your pipeline is connected successfully!
        </p>
      ) : (
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {tasks.map(task => (
            <li key={task.id} style={{ 
              padding: '12px 15px', 
              margin: '8px 0', 
              backgroundColor: '#f9f9f9', 
              borderLeft: '4px solid #0070f3',
              borderRadius: '4px',
              textDecoration: task.completed ? 'line-through' : 'none',
              color: task.completed ? '#aaa' : '#333',
              display: 'flex',
              justifyContent: 'space-between',
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
            }}>
              <span>{task.title}</span>
              <span style={{ fontSize: '0.85em', color: task.completed ? '#aaa' : '#0070f3' }}>
                {task.completed ? '✓ Done' : 'Pending'}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
