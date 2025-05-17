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
      <Navbar transparent />
      <main className="profile-page">
        <section className="relative block h-500-px">
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&auto=format&fit=crop&w=2710&q=80')",
            }}
          >
            <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-50 bg-black"
            ></span>
          </div>
          <div
            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
            style={{ transform: "translateZ(0)" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-blueGray-200 fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>
        </section>

        <section className="relative py-16 bg-blueGray-200">
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
    </>
  );
}
