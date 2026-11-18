import { useState } from 'react';
import { FaUser, FaLock } from 'react-icons/fa';
import Logo from './Logo';

// Demo accounts. There is no backend in this project, so the accounts are
// stored here. (A real app would check the password on a server.)
const users = [
  { username: 'student', password: 'music123' },
  { username: 'admin', password: 'admin123' },
];

function Login({ onLogin }) {
  // Controlled inputs: React state holds what the user types
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(event) {
    event.preventDefault(); // stop the browser from reloading the page

    if (username === '' || password === '') {
      setError('Please enter your username and password.');
      return;
    }

    const user = users.find((u) => u.username === username && u.password === password);

    if (user) {
      onLogin(user.username); // tell App.jsx who logged in
    } else {
      setError('Incorrect username or password.');
    }
  }

  return (
    <div className="login-page">
      <form className="login-box" onSubmit={handleSubmit}>
        <div className="login-logo">
          <Logo size={80} />
        </div>
        <h1>Webify</h1>
        <p className="login-subtitle">Log in to start listening</p>

        <div className="input-group">
          <FaUser />
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="input-group">
          <FaLock />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && <p className="login-error">{error}</p>}

        <button type="submit" className="login-button">
          Log In
        </button>

        <p className="login-hint">
          Demo account: <b>student</b> / <b>music123</b>
        </p>
      </form>
    </div>
  );
}

export default Login;
