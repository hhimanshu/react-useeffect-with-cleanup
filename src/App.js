import React, {useState} from 'react';
import './App.css';
import Quotes from './Quotes';
import Books from './Books';

function App() {
  const [showBooks, setShowBooks] = useState(false)
  return (
    <div className="App">
      <button onClick={() => setShowBooks(false)}>Quotes</button>
      <button onClick={() => setShowBooks(true)}>Books</button>
      
      {!showBooks && <Quotes/>}
      {showBooks && <Books/>}
    </div>
  );
}

export default App;
