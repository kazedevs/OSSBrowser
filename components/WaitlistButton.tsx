"use client";

import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { MdOutlineClose } from "react-icons/md";

export default function WaitlistButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = () => {
    setLoading(true);
    // Simulate auth flow or redirect
    setTimeout(() => {
      setLoading(false);
      alert("Google Auth would trigger here!");
    }, 1000);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-zinc-900 text-white px-6 py-3 rounded-full font-medium text-sm transition-all cursor-pointer border border-zinc-800 shadow-xl hover:bg-black"
      >
        Join the waitlist
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          <div className="relative bg-black w-full h-72 max-w-sm rounded-xl px-6 py-12 flex flex-col justify-between border border-zinc-800">
            <div className="space-y-2">
              <h2 className="text-xl font-bold font-instrument tracking-tight text-white text-center">
                Join the waitlist
              </h2>
              <p className="text-sm text-zinc-400 text-center">
                Be the first to try OSS Browser
              </p>
            </div>

            <button
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-3 bg-white rounded-full px-4 py-3 text-black tracking-tight transition-all cursor-pointer hover:bg-zinc-200"
            >
              <FcGoogle size={20} />
              <span>Sign up with Google</span>
            </button>
            
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-2 text-zinc-500 hover:text-white transition-colors cursor-pointer"
            >
              <MdOutlineClose size={20} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
