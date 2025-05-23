import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';  // Utilise useHistory ici

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const history = useHistory();  // Utilisation de useHistory dans la version 5

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Vérification si les champs sont vides
    if (!email || !password) {
      setError("Veuillez remplir tous les champs");
      return;
    }

    console.log('Tentative de connexion avec :', { email, password });

    try {
      // Appel API de connexion
      const response = await fetch('http://localhost:5000/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',  // TRÈS IMPORTANT pour envoyer/recevoir le cookie JWT
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log('Réponse du backend :', data);

      if (response.ok && data.user) {
        // Sauvegarder les informations de l'utilisateur dans le localStorage si nécessaire
        localStorage.setItem('user', JSON.stringify(data.user));
        console.log('✅ Connexion réussie pour :', data.user.email);

         // 🔁 Redirection selon le rôle
  if (data.user.role === 'admin') {
    history.push('/admin/Tables'); // (à créer après)
  } else {
    history.push('/welcome'); // (client)
  }
      } else {
        // Erreur dans les informations de connexion
        console.warn('❌ Échec de la connexion :', data.message || 'Erreur inconnue')
        setError(data.message || 'Email ou mot de passe incorrect'); // Affiche le message d'erreur du backend
      }

    } catch (err) {
      // Gestion des erreurs de requête
      console.error('🚨 Erreur lors de la requête vers le backend :', err);
      setError('Erreur de connexion au serveur');
    }
  };

  return (
    <>
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@300;400;500;600&display=swap');

        .luxury-login-container {
          font-family: 'Inter', sans-serif;
          background: linear-gradient(135deg, #fefefe 0%, #f8f6f3 50%, #f5f2ef 100%);
          min-height: 100vh;
          color: #2c2826;
          position: relative;
          overflow: hidden;
        }

        .luxury-login-container::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(ellipse, rgba(185, 157, 98, 0.08) 0%, transparent 70%);
        }

        .login-card {
          background: #ffffff;
          border-radius: 24px;
          box-shadow: 0 20px 60px rgba(139, 115, 85, 0.15);
          border: 1px solid #f0ece6;
          position: relative;
          z-index: 2;
          overflow: hidden;
          backdrop-filter: blur(10px);
        }

        .login-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 6px;
          background: linear-gradient(90deg, #b99d62, #d4c49a, #b99d62);
        }

        .login-header {
          background: linear-gradient(135deg, #ffffff 0%, #f9f7f4 100%);
          border-bottom: 1px solid #e8e3dd;
          position: relative;
        }

        .login-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.5rem;
          font-weight: 600;
          color: #8b7355;
          text-align: center;
          margin-bottom: 1.5rem;
          text-shadow: 0 1px 2px rgba(139, 115, 85, 0.1);
        }

        .social-buttons {
          display: flex;
          gap: 12px;
          justify-content: center;
          margin-bottom: 2rem;
        }

        .social-btn {
          background: #ffffff;
          color: #8b7355;
          border: 2px solid #d4c49a;
          border-radius: 50px;
          padding: 12px 24px;
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
          font-family: 'Inter', sans-serif;
          box-shadow: 0 4px 15px rgba(139, 115, 85, 0.08);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .social-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(212, 196, 154, 0.15), transparent);
          transition: left 0.5s ease;
        }

        .social-btn:hover::before {
          left: 100%;
        }

        .social-btn:hover {
          background: linear-gradient(45deg, #d4c49a, #e8dcc6);
          color: #5a4a3a;
          box-shadow: 0 8px 25px rgba(212, 196, 154, 0.25);
          transform: translateY(-2px);
          border-color: #b99d62;
        }

        .divider {
          margin: 2rem 0;
          border: none;
          height: 1px;
          background: linear-gradient(90deg, transparent, #e8e3dd, transparent);
        }

        .login-form-section {
          background: linear-gradient(135deg, #ffffff 0%, #f9f7f4 100%);
          padding: 2.5rem;
        }

        .form-subtitle {
          text-align: center;
          color: #6b5b4f;
          font-size: 0.875rem;
          font-weight: 500;
          margin-bottom: 2rem;
          font-style: italic;
          letter-spacing: 0.3px;
        }

        .form-group {
          margin-bottom: 1.5rem;
          position: relative;
        }

        .form-label {
          display: block;
          color: #8b7355;
          font-size: 0.875rem;
          font-weight: 600;
          margin-bottom: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          font-family: 'Inter', sans-serif;
        }

        .form-input {
          width: 100%;
          padding: 1rem 1.25rem;
          border: 2px solid #e8e3dd;
          border-radius: 50px;
          background: #ffffff;
          color: #2c2826;
          font-size: 1rem;
          transition: all 0.3s ease;
          font-family: 'Inter', sans-serif;
          box-shadow: 0 2px 8px rgba(139, 115, 85, 0.05);
        }

        .form-input::placeholder {
          color: #a19388;
          font-style: italic;
        }

        .form-input:focus {
          outline: none;
          border-color: #d4c49a;
          box-shadow: 0 0 0 4px rgba(212, 196, 154, 0.15), 0 4px 15px rgba(139, 115, 85, 0.1);
          background: #fefefe;
        }

        .error-message {
          color: #c53030;
          font-size: 0.875rem;
          margin-top: 0.5rem;
          font-weight: 500;
          background: #ffeaea;
          padding: 0.75rem 1rem;
          border-radius: 12px;
          border: 1px solid #f5c6c6;
          font-family: 'Inter', sans-serif;
        }

        .submit-btn {
          width: 100%;
          padding: 1rem;
          background: linear-gradient(45deg, #b99d62, #d4c49a);
          color: white;
          border: none;
          border-radius: 50px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
          font-family: 'Inter', sans-serif;
          text-transform: uppercase;
          letter-spacing: 1px;
          box-shadow: 0 8px 25px rgba(185, 157, 98, 0.3);
          margin-top: 1.5rem;
        }

        .submit-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.5s ease;
        }

        .submit-btn:hover::before {
          left: 100%;
        }

        .submit-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 35px rgba(185, 157, 98, 0.4);
          background: linear-gradient(45deg, #a08854, #c9b086);
        }

        .submit-btn:active {
          transform: translateY(0);
        }

        .login-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 2rem;
          padding: 1.5rem 0;
          border-top: 1px solid #e8e3dd;
          background: linear-gradient(135deg, #f9f7f4 0%, #ffffff 100%);
        }

        .footer-link {
          color: #8b7355;
          text-decoration: none;
          font-size: 0.875rem;
          font-weight: 500;
          transition: all 0.3s ease;
          position: relative;
          font-family: 'Inter', sans-serif;
        }

        .footer-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #b99d62, #d4c49a);
          transition: width 0.3s ease;
        }

        .footer-link:hover {
          color: #b99d62;
        }

        .footer-link:hover::after {
          width: 100%;
        }

        @media (max-width: 768px) {
          .social-buttons {
            flex-direction: column;
          }
          
          .social-btn {
            width: 100%;
          }
          
          .login-footer {
            flex-direction: column;
            gap: 1rem;
            text-align: center;
          }
        }
      `}</style>

      <div className="luxury-login-container">
        <div className="container mx-auto px-4 h-full">
          <div className="flex content-center items-center justify-center h-full">
            <div className="w-full lg:w-4/12 px-4">
              <div className="login-card">
                <div className="login-header rounded-t mb-0 px-6 py-6">
                  <div className="text-center mb-3">
                    <h6 className="login-title">Se connecter avec</h6>
                  </div>
                  {/* Boutons de connexion */}
                  <div className="social-buttons">
                    <button className="social-btn">
                      Facebook
                    </button>
                    <button className="social-btn">
                      Google
                    </button>
                  </div>
                  <hr className="divider" />
                </div>
                <div className="login-form-section">
                  <div className="form-subtitle">
                    <small>Ou connectez-vous avec vos identifiants</small>
                  </div>
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label className="form-label" htmlFor="grid-email">
                        Email
                      </label>
                      <input
                        type="email"
                        className="form-input"
                        placeholder="Votre adresse email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="grid-password">
                        Mot de passe
                      </label>
                      <input
                        type="password"
                        className="form-input"
                        placeholder="Votre mot de passe"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>

                    {error && <div className="error-message">{error}</div>}

                    <div className="text-center">
                      <button
                        type="submit"
                        className="submit-btn"
                      >
                        Se connecter
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <div className="login-footer">
                <div className="w-1/2">
                  <Link to="/auth/forget" className="footer-link">
                    <small>Mot de passe oublié ?</small>
                  </Link>
                </div>
                <div className="w-1/2 text-right">
                  <Link to="/auth/register" className="footer-link">
                    <small>Créer un nouveau compte</small>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}