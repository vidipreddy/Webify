import { useState } from 'react';
import Login from './components/Login';
import MusicPlayer from './components/MusicPlayer';
import './App.css';

// The top-level component.
// If nobody is logged in, show the Login page; otherwise show the Music Player.
function App() {
  const [username, setUsername] = useState(null); // null = not logged in

  if (username === null) {
    return <Login onLogin={setUsername} />;
  }

  return <MusicPlayer username={username} onLogout={() => setUsername(null)} />;
}

export default App;
