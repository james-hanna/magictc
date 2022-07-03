import React, { useState, useRef } from "react";
import { useAuth } from "../contexts/AuthContexts";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  async function submitHandler(event) {
    event.preventDefault();

    try {
      setErrors("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      navigate("/");
    } catch (e) {
      console.log(e);
      setErrors("failed to sign in");
    }
    setLoading(false);
  }

  return (
    <div class="flex justify-center">
      {errors && <div>{errors}</div>}
      <form>
        <div className="form-group">
          <label class="flex justify-center">Email</label>
          <input
            id="last_name"
            placeholder="Enter an Email"
            type="email"
            name="email"
            className="placeholder:italic placeholder:text-center"
            ref={emailRef}
            required
          />
          <label class="flex justify-center">Password</label>

          <input
            id="password"
            placeholder="Enter a password"
            type="password"
            name="password"
            className="placeholder:italic placeholder:text-center"
            ref={passwordRef}
            required
          />
          <div class="flex justify-center">
            <button
              className="mx-2"
              type="submit"
              onClick={submitHandler}
              disabled={loading}
            >
              Log In
            </button>
            <button
              className="mx-2"
              type="submit"
              onClick={() => navigate("/signup")}
              disabled={loading}
            >
              Sign Up
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
