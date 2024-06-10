import React, { useState } from 'react';

export function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Replace with your actual API call
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, confirmPassword }),
      });

      if (response.ok) {
        const data = await response.json();
        // Handle successful signup (e.g., store token, redirect)
        console.log('Signup successful:', data);
      } else {
        setError('Invalid email or password'); // Or handle other errors
      }
    } catch (error) {
      console.error('Error during signup:', error);
      setError('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="signup-container">
        <h1>Inscription</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Nom:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            // Add validation if needed (e.g., using regular expressions)
          />
          <br />
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            // Add validation if needed (e.g., using regular expressions)
          />
          <br />
          <label htmlFor="password">Mot de passe:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <label htmlFor="confirmPassword">Confirmer mot de passe:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <br />
          {error && <div style={{ color: 'red' }}>{error}</div>}
          <button type="submit" disabled={loading}>
            {loading ? 'Inscription en cours...' : 'Inscription'}
          </button>
        </form>
      </div>
    </>
  );
}
