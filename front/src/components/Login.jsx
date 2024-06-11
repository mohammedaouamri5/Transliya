import React, { useState } from 'react';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Replace with your actual API call
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        // Handle successful login (e.g., store token, redirect)
        console.log('Login successful:', data);
      } else {
        setError('Invalid email or password'); // Or handle other errors
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="login-container">
        <h1>Connexion</h1>
        <form onSubmit={handleSubmit}>
          <div class="form-floating mb-3">
            <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
            <label for="floatingInput">Email address</label>
          </div>
          <div class="form-floating">
            <input type="password" class="form-control" id="floatingPassword" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <label for="floatingPassword">Password</label>
          </div>
          {error && <div style={{ color: 'red' }}>{error}</div>}
          <button type="submit" disabled={loading}>
            {loading ? 'Connexion en cours...' : 'Connexion'}
          </button>
        </form>
      </div>
    </>
  );
}