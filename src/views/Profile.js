import React, { useState, useEffect } from "react";
import Navbar from "components/Navbars/AuthNavbar.js";
import Footer from "components/Footers/Footer.js";
import CardProfile from "../components/Cards/CardProfile.js";
import { getMyProfile, updateMyProfile } from "../services/ApiUser"; // adapte si besoin

export default function Profile() {
  const [profileData, setProfileData] = useState(null);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getMyProfile();
        setProfileData(res.data.user);
      } catch (error) {
        console.error("❌ Erreur lors du chargement du profil", error);
      }
    };
    fetchProfile();
  }, []);

  const handleUpdate = async (updatedData) => {
    try {
      const res = await updateMyProfile(updatedData);
      setProfileData(res.data.updated);
      setEditMode(false);
    } catch (error) {
      console.error("❌ Erreur lors de la mise à jour", error);
    }
  };

  if (!profileData) return <div>Chargement...</div>;

  return (
    <>
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@300;400;500;600&display=swap');
        .luxury-container {
          font-family: 'Inter', sans-serif;
          background: linear-gradient(135deg, #fefefe 0%, #f8f6f3 50%, #f5f2ef 100%);
          min-height: 100vh;
          color: #2c2826;
        }
        .hero-section-profile {
          padding: 100px 0 60px;
          text-align: center;
          background: linear-gradient(135deg, #ffffff 0%, #f9f7f4 100%);
          position: relative;
          overflow: hidden;
          border-bottom: 1px solid #e8e3dd;
        }
        .profile-page {
          background: none; /* Remove the blue background */
        }
        .hero-section-profile::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(ellipse, rgba(185, 157, 98, 0.08) 0%, transparent 70%);
        }
        .hero-content-profile {
          position: relative;
          z-index: 2;
        }
        .hero-title-profile {
          font-family: 'Playfair Display', serif;
          font-size: 3rem;
          font-weight: 700;
          margin-bottom: 1rem;
          background: linear-gradient(45deg, #b99d62, #d4c49a, #8b7355);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-shadow: 0 2px 4px rgba(139, 115, 85, 0.1);
        }
        .hero-subtitle-profile {
          font-size: 1.2rem;
          color: #6b5b4f;
          margin-bottom: 1.5rem;
          font-style: italic;
          font-weight: 300;
          letter-spacing: 0.5px;
        }
        @media (max-width: 768px) {
          .hero-title-profile {
            font-size: 2rem;
          }
          .hero-subtitle-profile {
            font-size: 1rem;
          }
        }
      `}</style>
      <div className="luxury-container">
        <Navbar transparent />
        {/* Hero Section for Profile */}
        <section className="hero-section-profile">
          <div className="hero-content-profile">
            <h1 className="hero-title-profile">Mon Profil</h1>
            
          </div>
        </section>
        <main className="profile-page">
          <section className="relative py-16">
            <div className="container mx-auto px-4">
              <CardProfile
                data={profileData}
                editMode={editMode}
                onEdit={() => setEditMode(true)}
                onCancel={() => setEditMode(false)}
                onUpdate={handleUpdate}
              />
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
