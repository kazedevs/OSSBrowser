"use client";

import { useState } from "react";
import { MdOutlineClose } from "react-icons/md";

export default function WaitlistButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) throw new Error("Failed to join");

      setStatus("success");
      setEmail("");
      setTimeout(() => {
        setIsOpen(false);
        setStatus("idle");
      }, 2000);
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
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

          <div className="relative bg-black w-full h-80 max-w-sm rounded-xl px-6 py-12 flex flex-col justify-between border border-zinc-800">
            <div className="space-y-2">
              <h2 className="text-xl font-bold font-instrument tracking-tight text-white text-center">
                Join the waitlist
              </h2>
              <p className="text-sm text-zinc-400 text-center">
                Be the first to try OSS Browser
              </p>
            </div>

            {status === "success" ? (
              <div className="text-center text-green-400 font-medium animate-in fade-in zoom-in">
                You're on the list!
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input
                  type="email"
                  placeholder="name@example.com"
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-zinc-700 transition-colors"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={status === "loading"}
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full bg-white rounded-lg px-4 py-3 text-black font-medium tracking-tight transition-all cursor-pointer hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === "loading" ? "Joining..." : "Join Waitlist"}
                </button>
                {status === "error" && (
                  <p className="text-xs text-red-400 text-center">Something went wrong. Try again.</p>
                )}
              </form>
            )}
            
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
