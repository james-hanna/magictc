import React, { useState, useRef } from "react";
import { useAuth } from "../contexts/AuthContexts";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();


  async function submitHandler(event) {
    event.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setErrors("passwords do not match");
    }

    try {
      setMessage("");
      setErrors("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      setMessage("account created successfully!")
    } catch {
      setErrors("failed to create an account");
    }
    setLoading(false);
  }

  return (
    <div class="flex justify-center m-auto mt-[10vh] border-4 w-[40vw] h-[35vh]">
      {errors && <div>{message}</div>}
      <form>
        <div class="flex flex-col w-[30vw]">
          <h1 class="font-bold text-5xl my-10">Sign Up</h1>
          <label class="font-bold">Email</label>
          <input
            id="email"
            placeholder="Enter an Email"
            type="email"
            name="email"
            class="border-2"
            ref={emailRef}
            required
          />
          <label class="font-bold mt-5">Password</label>

          <input
            id="password"
            placeholder="Enter a password"
            type="password"
            name="password"
            class="border-2"
            ref={passwordRef}
            required
          />
          <label class="font-bold mt-5">Confirm Password</label>

          <input
            id="password"
            placeholder="Cornfirm Password"
            type="password"
            name="password"
            class="border-2"
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
                Create
              </button>
            </div>
            <div>
              <button
                className="p-1 mt-4 mr-8 border-2 border-green-200 hover:bg-green-100 duration-300 rounded-lg"
                type="submit"
                onClick={() => navigate("/") }
                disabled={loading}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
