import React, { useState, useRef } from "react";
import { useAuth } from "../contexts/AuthContexts";
import { Link } from "react-router-dom";

export default function Forgotpassword() {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [message, setMessage] = useState("");

  async function submitHandler(event) {
    event.preventDefault();

    try {
      setMessage("");
      setErrors("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("check your inbox for further instructions")
    } catch {
      setErrors("failed to reset password");
    }
    setLoading(false);
  }

  return (
    <div>
      {errors && <div>{errors}</div>}
      {message && <div>{message}</div>}
      <h2>Reset Password</h2>
      <form>
        <div className="form-group">
          <label>Email</label>
          <input
            id="last_name"
            placeholder="Enter an Email"
            type="email"
            name="email"
            className="form-control"
            ref={emailRef}
            required
          />
          <div>
            <button
              className="mx-2"
              type="submit"
              onClick={submitHandler}
              disabled={loading}
            >
              Reset Password
            </button>
            <Link to="/login">Log In</Link>
            {/* <button type="cancel" onClick={cancelHandler}>
              Cancel
            </button> */}
          </div>
        </div>
      </form>
    </div>
  );
}
