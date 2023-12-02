import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { authActions } from "../../store/auth-slice";
import { useDispatch } from "react-redux";

const Login = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [errors, setErrors] = useState({}); // State to manage validation errors

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validateForm = () => {
    let formErrors = {};

    // Email validation
    if (!userEmail) {
      formErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(userEmail)) {
      formErrors.email = "Invalid email address";
    }

    // Password validation
    if (!userPassword) {
      formErrors.password = "Password is required";
    } else if (userPassword.length < 6) {
      formErrors.password = "Password must be at least 6 characters";
    }

    setErrors(formErrors);

    // Return true if there are no errors, indicating a valid form
    return Object.keys(formErrors).length === 0;
  };

  const formSubmitHandler = async (event) => {
    event.preventDefault();

    // Validate the form
    if (validateForm()) {
      // Form is valid, you can proceed with Login

      try {
        const loginResponse = await axios.post(
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAIY0hSLsAMXxhgtKzcbfdrmVS5xOi1zuA",
          { email: userEmail, password: userPassword, returnSecureToken: true }
        );

        dispatch(authActions.isLogin());
        dispatch(authActions.setUserEmail(loginResponse.data.email));
        dispatch(authActions.setIdToken(loginResponse.data.idToken));

        localStorage.setItem("token", loginResponse.data.idToken);

        navigate("/home");
      } catch (error) {
        console.log(error);
      }
    } else {
      // Form is invalid, do not proceed with form submission
      console.log("Form validation failed");
    }
  };

  return (
    <form
      onSubmit={formSubmitHandler}
      className="mx-auto mt-20 w-96 p-8 rounded-md bg-white shadow-md"
    >
      <h2 className="text-2xl font-semibold mb-4">Login</h2>
      <div className="mb-4">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          className={`w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
            errors.email ? "border-red-500" : ""
          }`}
          onChange={(event) => setUserEmail(event.target.value)}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email}</p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          className={`w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
            errors.password ? "border-red-500" : ""
          }`}
          onChange={(event) => setUserPassword(event.target.value)}
        />
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password}</p>
        )}
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-blue-600"
      >
        Sign In
      </button>
    </form>
  );
};

export default Login;
