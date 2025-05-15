import React, { useState } from 'react';
import { Link, useHistory } from "react-router-dom"; 
import { addUserClient } from "../../services/ApiUser";

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [delivery_address, setDeliveryAddress] = useState('');
  const [newsletter, setNewsletter] = useState(false);
  const [privacyPolicy, setPrivacyPolicy] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  const history = useHistory();

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);

  const handlePasswordChange = (e) => {
    const pwd = e.target.value;
    setPassword(pwd);

    if (!passwordRegex.test(pwd)) {
      setPasswordError("Le mot de passe doit contenir au moins 8 caractères, une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial.");
    } else {
      setPasswordError('');
    }
  };

  const handlePhoneChange = (e) => setPhone(e.target.value);
  const handleDeliveryAddressChange = (e) => setDeliveryAddress(e.target.value);
  const handleNewsletterChange = () => setNewsletter(!newsletter);
  const handlePrivacyPolicyChange = () => setPrivacyPolicy(!privacyPolicy);

  const handleClick = () => {
    if (!username || !email || !password || !phone || !delivery_address) {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    if (passwordError) {
      alert(passwordError);
      return;
    }

    if (!privacyPolicy) {
      alert("Vous devez accepter la politique de confidentialité.");
      return;
    }

    try {
      addUserClient({
        username,
        email,
        password,
        phone,
        delivery_address,
        newsletter,
      }).then((res) => {
        console.log("Utilisateur enregistré :", res);
        history.push("/");
      }).catch((error) => {
        console.error("Erreur lors de l'inscription :", error);
        alert("Erreur lors de l'inscription. Veuillez vérifier vos données.");
      });
    } catch (error) {
      console.log("Erreur :", error);
    }
  };

  return (
    <div className="container mx-auto px-4 h-full">
      <div className="flex content-center items-center justify-center h-full">
        <div className="w-full lg:w-6/12 px-4">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
            <div className="rounded-t mb-0 px-6 py-6">
              <div className="text-center mb-3">
                <h6 className="text-blueGray-500 text-sm font-bold">Inscrivez-vous avec</h6>
              </div>
              <div className="btn-wrapper text-center">
                <button className="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150">
                  <img alt="..." className="w-5 mr-1" src={require("assets/img/icons8-facebook-logo.svg").default} />
                  Facebook
                </button>
                <button className="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150">
                  <img alt="..." className="w-5 mr-1" src={require("assets/img/google.svg").default} />
                  Google
                </button>
              </div>
              <hr className="mt-6 border-b-1 border-blueGray-300" />
            </div>
            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
              <div className="text-blueGray-400 text-center mb-3 font-bold">
                <small>Ou inscrivez-vous avec vos informations</small>
              </div>
              <form>
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="name">Nom complet</label>
                  <input type="text" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" placeholder="Nom complet" value={username} onChange={handleUsernameChange} />
                </div>

                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="email">Email</label>
                  <input type="email" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" placeholder="Email" value={email} onChange={handleEmailChange} />
                </div>

                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="password">Mot de passe</label>
                  <input type="password" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" placeholder="Mot de passe" value={password} onChange={handlePasswordChange} />
                  {passwordError && <p className="text-red-500 text-xs italic mt-1">{passwordError}</p>}
                </div>

                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="phone">Numéro de téléphone</label>
                  <input type="tel" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" placeholder="Numéro de téléphone" value={phone} onChange={handlePhoneChange} />
                </div>

                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="address">Adresse de livraison</label>
                  <input type="text" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" placeholder="Adresse de livraison" value={delivery_address} onChange={handleDeliveryAddressChange} />
                </div>

                <div>
                  <label className="inline-flex items-center cursor-pointer">
                    <input id="newsletterSubscription" type="checkbox" className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150" checked={newsletter} onChange={handleNewsletterChange} />
                    <span className="ml-2 text-sm font-semibold text-blueGray-600">Je souhaite recevoir des nouveautés et promotions</span>
                  </label>
                </div>

                <div>
                  <label className="inline-flex items-center cursor-pointer">
                    <input id="customCheckLogin" type="checkbox" className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150" checked={privacyPolicy} onChange={handlePrivacyPolicyChange} />
                    <span className="ml-2 text-sm font-semibold text-blueGray-600">J'accepte la{" "} <a href="#pablo" className="text-lightBlue-500">politique de confidentialité</a></span>
                  </label>
                </div>

                <div className="text-center mt-6">
                  <button className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150" type="button" onClick={handleClick}>
                    Créer un compte
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="flex flex-wrap mt-6 relative">
            <div className="w-1/2">
              <Link to="/auth/forget" className="text-blueGray-200"><small>Mot de passe oublié ?</small></Link>
            </div>
            <div className="w-1/2 text-right">
              <Link to="/auth/login" className="text-blueGray-200"><small>Connexion</small></Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
