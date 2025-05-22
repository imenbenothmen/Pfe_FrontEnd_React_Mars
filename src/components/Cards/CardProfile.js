import React, { useState, useEffect } from "react";

export default function CardProfile({ data, editMode, onEdit, onCancel, onUpdate }) {
  const [formData, setFormData] = useState(data);

  useEffect(() => {
    setFormData(data);
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData);
  };

  return (
    <>
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@300;400;500;600&display=swap');
        .luxury-card {
          background: #fff;
          border-radius: 24px;
          box-shadow: 0 8px 32px rgba(139, 115, 85, 0.12);
          border: 1.5px solid #f0ece6;
          padding: 48px 32px 32px 32px;
          margin-top: -120px;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
          position: relative;
        }
        .luxury-avatar {
          width: 140px;
          height: 140px;
          object-fit: cover;
          border-radius: 50%;
          border: 4px solid #d4c49a;
          box-shadow: 0 4px 24px rgba(185, 157, 98, 0.15);
          background: linear-gradient(135deg, #f8f6f3, #f0ece6);
          margin: 0 auto;
          display: block;
          position: relative;
          top: -90px;
          z-index: 2;
        }
        .luxury-title {
          font-family: 'Playfair Display', serif;
          font-size: 2.2rem;
          font-weight: 700;
          color: #5a4a3a;
          margin-bottom: 0.5rem;
          text-align: center;
        }
        .luxury-info {
          color: #6b5b4f;
          font-size: 1.1rem;
          margin-bottom: 0.5rem;
          text-align: center;
          font-family: 'Inter', sans-serif;
        }
        .luxury-form label {
          color: #8b7355;
          font-weight: 500;
          font-family: 'Inter', sans-serif;
          margin-bottom: 0.3rem;
        }
        .luxury-form input {
          width: 100%;
          border: 1.5px solid #d4c49a;
          border-radius: 18px;
          padding: 12px 18px;
          font-size: 1rem;
          margin-bottom: 18px;
          font-family: 'Inter', sans-serif;
          background: #f9f7f4;
          transition: border 0.2s;
        }
        .luxury-form input:focus {
          border-color: #b99d62;
          outline: none;
          background: #fffbe9;
        }
        .luxury-btn {
          padding: 12px 32px;
          border-radius: 30px;
          border: 2px solid #b99d62;
          background: linear-gradient(45deg, #b99d62, #d4c49a);
          color: #fff;
          font-weight: 600;
          font-family: 'Inter', sans-serif;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.2s;
          margin: 0 8px;
          box-shadow: 0 2px 8px rgba(185, 157, 98, 0.08);
        }
        .luxury-btn:hover {
          background: linear-gradient(45deg, #a08854, #c9b086);
          color: #fff;
          border-color: #8b7355;
          transform: translateY(-2px) scale(1.03);
        }
        .luxury-btn.secondary {
          background: #fff;
          color: #b99d62;
          border: 2px solid #b99d62;
        }
        .luxury-btn.secondary:hover {
          background: #f9f7f4;
          color: #8b7355;
        }
        .luxury-actions {
          display: flex;
          justify-content: center;
          gap: 12px;
          margin-top: 24px;
        }
        @media (max-width: 600px) {
          .luxury-card {
            padding: 32px 8px 24px 8px;
          }
          .luxury-avatar {
            width: 100px;
            height: 100px;
            top: -60px;
          }
          .luxury-title {
            font-size: 1.4rem;
          }
        }
      `}</style>
      {editMode ? (
        <div className="luxury-card">
          <img
            alt="avatar"
            src={`http://localhost:5000/files/${data.user_image}`}
            className="luxury-avatar"
            style={{ marginBottom: '-60px' }}
          />
          <h3 className="luxury-title" style={{ marginTop: '0.5rem' }}>Modifier Profil</h3>
          <form className="luxury-form" onSubmit={handleSubmit}>
            {["username", "email", "phone", "delivery_address"].map((field) => (
              <div key={field}>
                <label>{field.replace("_", " ")}</label>
                <input
                  type={field === "email" ? "email" : "text"}
                  name={field}
                  value={formData[field] || ""}
                  onChange={handleChange}
                  autoComplete="off"
                />
              </div>
            ))}
            <div className="luxury-actions">
              <button
                type="button"
                onClick={onCancel}
                className="luxury-btn secondary"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="luxury-btn"
              >
                Sauvegarder
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="luxury-card">
          <img
            alt="avatar"
            src={`http://localhost:5000/files/${data.user_image}`}
            className="luxury-avatar"
          />
          <h3 className="luxury-title">{data.username}</h3>
          <div className="luxury-info">{data.email}</div>
          <div className="luxury-info">{data.phone}</div>
          <div className="luxury-info">{data.delivery_address}</div>
          <div className="luxury-actions">
            <button
              onClick={onEdit}
              className="luxury-btn"
            >
              Modifier le profil
            </button>
          </div>
        </div>
      )}
    </>
  );
}
