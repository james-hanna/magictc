import React, { useState, useRef } from "react";
import { useAuth } from "../contexts/AuthContexts";
import { Link, useNavigate } from "react-router-dom";

export default function Editprofile() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { editPassword, editEmail, currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  function submitHandler(event) {
    event.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setErrors("passwords do not match");
    }

    const promises = [];
    setLoading(true);
    setErrors("");
    if (emailRef.current.value !== currentUser.email) {
      promises.push(editEmail(emailRef.current.value));
    }
    if (passwordRef.current.value) {
      promises.push(editPassword(passwordRef.current.value));
    }

    Promise.all(promises)
      .then(() => {
        navigate("/");
      })
      .catch(() => {
        setErrors("failed to update account");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <div>
      {errors && <div>{errors}</div>}

      <h2> Edit Profile </h2>
      <form>
        <div className="form-group">
          <label>Email</label>
          <input
            id="email"
            defaultValue={currentUser.email}
            placeholder="Enter an Email"
            type="email"
            name="email"
            className="form-control"
            ref={emailRef}
            required
          />
          <label>Password</label>

          <input
            id="password"
            placeholder="leave blank to keep the same"
            type="password"
            name="password"
            className="form-control"
            ref={passwordRef}
          />
          <input
            id="passwordConfirm"
            placeholder="leave blank to keep the same"
            type="password"
            name="passwordConfirm"
            className="form-control"
            ref={passwordConfirmRef}
          />

          <div>
            <button
              className="mx-2"
              type="submit"
              onClick={submitHandler}
              disabled={loading}
            >
              Submit
            </button>
            <Link to="/">Cancel</Link>
            {/* <button type="cancel" onClick={cancelHandler}>
              Cancel
            </button> */}
          </div>
        </div>
      </form>
    </div>
  );
}
