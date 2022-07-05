import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Login from "./Login";
import { useAuth } from "../contexts/AuthContexts";

export default function Navbar({ openNav }) {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate;

  async function handleLogout() {
    setError("");
    try {
      await logout();
      navigate("/logged_out");
    } catch (error) {}
  }

  return (
    <div class="h-[80vh] w-[15vw]">
      {openNav && (
        <div class="bg-green-200 flex flex-col h-[80vh] w-[15vw] divide-green-400 divide-y-4 hover:divide-y-4">
          {currentUser ? (
            <h1 class="py-5 mx-5 ">{currentUser.email}</h1>
          ) : (
            <>
              {error && <div>{error}</div>}
              <Login />
            </>
          )}
          <Link
            to="/"
            class="py-5 hover:bg-green-500 hover:translate-x-5 duration-500"
          >
            <div class="mx-5">New Simulation</div>
          </Link>
          <Link
            to="/"
            class="py-5 hover:bg-green-500 hover:translate-x-5 duration-500"
          >
            <div class="mx-5">Rankings</div>
          </Link>
          <Link
            to="/"
            class="py-5 hover:bg-green-500 hover:translate-x-5 duration-500"
          >
            <div class="mx-5">Deck Builder</div>
          </Link>
          {currentUser && (
            <button
              class="py-5 hover:bg-green-500 duration-500"
              onClick={handleLogout}
            >
              Logout
            </button>
          )}
        </div>
      )}
    </div>
  );
}
