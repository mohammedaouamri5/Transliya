import React, { useState } from 'react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Appel à votre API de connexion ici
    // Pour l'exemple, nous allons simuler une connexion réussie
    setTimeout(() => {
      if (email === 'admin@example.com' && password === 'password') {
        // Connexion réussie, rediriger vers la page d'accueil
        window.location.href = '/';
      } else {
        setError('Email ou mot de passe incorrect');
      }
      setLoading(false);
    }, 2000);
  }

  return (
    <div className="login-container">
      <h1>Connexion</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <br />
        <label htmlFor="password">Mot de passe:</label>
        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <br />
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <button type="submit" disabled={loading}>
          {loading ? 'Connexion en cours...' : 'Connexion'}
        </button>
      </form>
    </div>
  );
}

export default Login;