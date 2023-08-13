// import React, { useState } from "react";
// import { useHistory } from 'react-router-dom';
// import { useMutation } from '@apollo/client';
// import { LOGIN_USER, ADD_USER } from '../utils/mutations';
// import "../Style/AuthForm.css";

// const AuthForm = () => {
//   const [isSignUp, setIsSignUp] = useState(false);

//   const handleSignInClick = () => {
//     setIsSignUp(false);
//   };

//   const handleSignUpClick = () => {
//     setIsSignUp(true);
//   };

//   return (
//     <>
//       <div className={`container ${isSignUp ? "right-panel-active" : ""}`} id="container">
//         <div className="form-container sign-up-container">
//           <form action="#">
//             <h1>Create Account</h1>
//             <span>or use your email for registration</span>
//             <input type="text" placeholder="Name" />
//             <input type="email" placeholder="Email" />
//             <input type="password" placeholder="Password" />
//             <button>Sign Up</button>
//           </form>
//         </div>
//         <div className="form-container sign-in-container">
//           <form action="#">
//             <h1>Sign in</h1>
//             <span>or use your account</span>
//             <input type="email" placeholder="Email" />
//             <input type="password" placeholder="Password" />
//             <button>Sign In</button>
//           </form>
//         </div>
//         <div className="overlay-container">
//           <div className="overlay">
//             <div className={`overlay-panel overlay-left ${isSignUp ? "" : "overlay-active"}`}>
//               <h1>Welcome Back!</h1>
//               <p>To keep connected with us please login with your personal info</p>
//               <button className="ghost" onClick={handleSignInClick}>
//                 Sign In
//               </button>
//             </div>
//             <div className={`overlay-panel overlay-right ${isSignUp ? "overlay-active" : ""}`}>
//               <h1>Hello, Friend!</h1>
//               <p>Enter your personal details and start the journey with us</p>
//               <button className="ghost" onClick={handleSignUpClick}>
//                 Sign Up
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default AuthForm;

import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER, ADD_USER } from '../utils/mutations';
import "../Style/AuthForm.css";
import Auth from '../utils/auth'; // Import the Auth service

const AuthForm = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

//   const history = useHistory();
const navigate = useNavigate();
  const [login, { error: loginError, data: loginData }] = useMutation(LOGIN_USER);
  const [addUser, { error: registrationError, data: registrationData }] = useMutation(ADD_USER);

  const handleSignInClick = () => {
    setIsSignUp(false);
  };

  const handleSignUpClick = () => {
    setIsSignUp(true);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (isSignUp) {
       
        // Handle registration form submit
        const { data } = await addUser({
          variables: { ...formData },
        });

        console.log('New user registered:', data);
        Auth.login(data.addUser.token); // Log in the new user
        // Redirect to home page after registration
        navigate('/');
      } else {
        // Handle login form submit
        const { data } = await login({
          variables: { ...formData },
        });

        console.log('User logged in:', data);
        Auth.login(data.login.token); // Log in the user
        // Redirect to home page after login
        navigate('/');
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
      <div className={`container ${isSignUp ? "right-panel-active" : ""}`} id="container">
        <div className="form-container sign-up-container">
          <form onSubmit={handleSubmit}>
            <h1>Create Account</h1>
            <span>or use your email for registration</span>
            <input
              type="text"
              placeholder="Name"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              required
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            <button type="submit">Sign Up</button>
          </form>
        </div>
        <div className="form-container sign-in-container">
          <form onSubmit={handleSubmit}>
            <h1>Sign in</h1>
            <span>or use your account</span>
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            <button type="submit">Sign In</button>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className={`overlay-panel overlay-left ${isSignUp ? "" : "overlay-active"}`}>
              <h1>Welcome Back!</h1>
              <p>To keep connected with us please login with your personal info</p>
              <button className="ghost" onClick={handleSignInClick}>
                Sign In
              </button>
            </div>
            <div className={`overlay-panel overlay-right ${isSignUp ? "overlay-active" : ""}`}>
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start the journey with us</p>
              <button className="ghost" onClick={handleSignUpClick}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthForm;
