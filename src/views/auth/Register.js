import React, { useState } from 'react';
import { Link, useHistory } from "react-router-dom"; // Importation de useHistory
import { addUserClient } from "../../services/ApiUser"; // Importation de la fonction pour ajouter un utilisateur

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [delivery_address, setDeliveryAddress] = useState('');
  const [newsletter, setNewsletter] = useState(false);
  const [privacyPolicy, setPrivacyPolicy] = useState(false);

  const history = useHistory();  // Initialisation de useHistory pour la navigation

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handlePhoneChange = (e) => setPhone(e.target.value);
  const handleDeliveryAddressChange = (e) => setDeliveryAddress(e.target.value);
  const handleNewsletterChange = () => setNewsletter(!newsletter);
  const handlePrivacyPolicyChange = () => setPrivacyPolicy(!privacyPolicy);

  const handleClick = () => {
    // Validation des données
    if (!username || !email || !password || !phone || !delivery_address) {
      alert("Please fill in all the fields.");
      return;
    }

    if (!privacyPolicy) {
      alert("You must agree to the Privacy Policy.");
      return;
    }

    console.log(username, email, password, phone, delivery_address);

    try {
      addUserClient({
        "username": username,
        "email": email,
        "password": password,
        "phone": phone,
        "delivery_address": delivery_address,
        "newsletter": newsletter,
      }).then((res) => {
        console.log("User registered:", res);
        // Redirection vers la page principale après inscription réussie
        history.push("/");  // Redirige vers la page d'accueil ("/")
      }).catch((error) => {
        console.error("Error during registration:", error);
      });
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 h-full">
      <div className="flex content-center items-center justify-center h-full">
        <div className="w-full lg:w-6/12 px-4">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
            <div className="rounded-t mb-0 px-6 py-6">
              <div className="text-center mb-3">
                <h6 className="text-blueGray-500 text-sm font-bold">Sign up with</h6>
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
                <small>Or sign up with credentials</small>
              </div>
              <form>
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="name">Full Name</label>
                  <input type="text" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" placeholder="Full Name" value={username} onChange={handleUsernameChange} />
                </div>

                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">Email</label>
                  <input type="email" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" placeholder="Email" value={email} onChange={handleEmailChange} />
                </div>

                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">Password</label>
                  <input type="password" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" placeholder="Password" value={password} onChange={handlePasswordChange} />
                </div>

                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="phone">Phone Number</label>
                  <input type="tel" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" placeholder="Phone Number" value={phone} onChange={handlePhoneChange} />
                </div>

                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="address">Delivery Address</label>
                  <input type="text" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" placeholder="Delivery Address" value={delivery_address} onChange={handleDeliveryAddressChange} />
                </div>

                <div>
                  <label className="inline-flex items-center cursor-pointer">
                    <input id="newsletterSubscription" type="checkbox" className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150" checked={newsletter} onChange={handleNewsletterChange} />
                    <span className="ml-2 text-sm font-semibold text-blueGray-600">I want to receive updates on new products and promotions</span>
                  </label>
                </div>

                <div>
                  <label className="inline-flex items-center cursor-pointer">
                    <input id="customCheckLogin" type="checkbox" className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150" checked={privacyPolicy} onChange={handlePrivacyPolicyChange} />
                    <span className="ml-2 text-sm font-semibold text-blueGray-600">I agree with the{" "} <a href="#pablo" className="text-lightBlue-500">Privacy Policy</a></span>
                  </label>
                </div>

                <div className="text-center mt-6">
                  <button className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150" type="button" onClick={handleClick}>
                    Create Account
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="flex flex-wrap mt-6 relative">
            <div className="w-1/2">
              <Link to="/auth/forget" className="text-blueGray-200"><small>Forgot password?</small></Link>
            </div>
            <div className="w-1/2 text-right">
              <Link to="/auth/login" className="text-blueGray-200"><small>Login</small></Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
