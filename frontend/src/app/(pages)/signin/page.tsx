"use client";
import AccountOptions from "@/app/component/signup-options/AccountOptions";
import Link from "next/link";
import React, { useState } from "react";
import { handleSignIn } from "@/app/helpers/firebase/signin";

const ZoomSignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleNavigation = () => {
    setIsLoading(true);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center pt-16 px-4">
      {/* Logo */}
      <div className="mb-8 text-center">
        <div className="flex items-center justify-center">
          <h1 className="text-[#2D8CFF] text-3xl font-bold">SignMeet</h1>
          <svg
            className="w-4 h-4 ml-1 text-gray-500"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
        <h2 className="text-[#232333] text-2xl font-bold mt-2">Workplace</h2>
        <p className="text-gray-500 text-sm mt-1">us05web.sigmeet.us</p>
      </div>

      {/* Sign in form */}
      <div className="w-full max-w-md">
        <form className="space-y-4">
          {/* Email input */}
          <div>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password input */}
          <div className="relative">
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
              Forgot?
            </button>
          </div>

          {/* Sign in button */}
          <div className="w-full py-3 bg-[#2D8CFF] text-white rounded-lg hover:bg-blue-600 transition-colors text-center mt-4">
            <button
              onClick={async (e) => {
                setIsLoading(true);
                const success = await handleSignIn(e, email, password);
                if (success) {
                  window.location.href = "/home";
                }
                setIsLoading(false);
              }}
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  Signing in...
                  <svg
                    className="animate-spin -ml-1 ml-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </div>

          {/* Keep me signed in */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="keep-signed"
              className="w-4 h-4 border-gray-300 rounded"
            />
            <label htmlFor="keep-signed" className="ml-2 text-gray-600">
              Remember me
            </label>
          </div>
        </form>

        {/* Social sign in */}
        <div className="mt-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">
                or sign in with
              </span>
            </div>
          </div>

          <AccountOptions />
        </div>
      </div>

      {/* Bottom navigation */}
      <div className=" w-full bottom-0 left-0 right-0 p-4 flex justify-between bg-white">
        <button
          className="text-gray-600 hover:text-gray-900 flex items-center"
          onClick={handleNavigation}
          disabled={isLoading}
        >
          <svg
            className="w-4 h-4 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <Link href={"/"}>{isLoading ? "Loading..." : "Back"}</Link>
        </button>
        <button className="text-blue-500 hover:text-blue-600">Sign Up</button>
      </div>
    </div>
  );
};

export default ZoomSignIn;
