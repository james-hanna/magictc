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
    <div class="flex justify-center m-auto mt-[10vh] border-4 w-[40vw] h-[30vh] rounded-lg">
      {errors && <div>{errors}</div>}
      <form>
        <div class="flex flex-col w-[30vw]">
          <h1 class="font-bold text-5xl my-10">Log In</h1>
          <label class="font-bold">Email</label>
          <input
            id="last_name"
            placeholder="Enter an Email"
            type="email"
            name="email"
            className="form-control"
            ref={emailRef}
            required
          />
          <label class="font-bold mt-5">Password</label>

          <input
            id="password"
            placeholder="Enter a password"
            type="password"
            name="password"
            className="form-control"
            ref={passwordRef}
            required
          />
          <div class="flex flex-row">
            <div>
              <button
                className="p-1 mt-4 mr-8 border-2 border-green-200 hover:bg-green-100 duration-300 rounded-lg"
                type="submit"
                onClick={submitHandler}
                disabled={loading}
              >
                Log In
              </button>
            </div>
            <div>
              <button
                className="p-1 mt-4 border-2 border-green-200 hover:bg-green-100 duration-300 rounded-lg"
                type="submit"
                onClick={() => navigate("/signup")}
                disabled={loading}
              >
                Create an account
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
