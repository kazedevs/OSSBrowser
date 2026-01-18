"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiMenu, FiX } from "react-icons/fi";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border-subtle">
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-16 h-12 flex items-center justify-between">

        <div className="flex items-center gap-8">
          <Link href="/" className="font-mono text-xs tracking-tighter flex items-center gap-1 group cursor-pointer">
          <Image src="/ossNav.png" alt="Logo" width={20} height={20} />
            <span className="text-foreground font-bold text-sm group-hover:text-blue-600 transition-colors">oss/browser</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-6 text-[#878787]">
            <Link href="/contact" className="text-xs font-medium hover:text-blue-600 transition-colors uppercase tracking-wider cursor-pointer">
              Contact Us
            </Link>
            <Link href="/about" className="text-xs font-medium hover:text-blue-600 transition-colors uppercase tracking-wider cursor-pointer">
              About
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:block">
            <Link href="/submit">
            <button className="text-foreground border border-border-subtle text-[10px] font-mono font-bold px-4 py-1.5 rounded-full hover:text-blue-600 hover:border-blue-200 transition-all uppercase tracking-tight shadow-none cursor-pointer">
              Submit Project
            </button>
            </Link>
          </div>
          
          <button 
            className="md:hidden text-foreground p-1 cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-12 left-0 right-0 bg-background border-b border-border-subtle p-6">
          <div className="flex flex-col gap-6">
            <Link 
              href="/contact" 
              className="text-sm font-medium text-[#878787] hover:text-blue-600 transition-colors uppercase tracking-wider"
              onClick={() => setIsOpen(false)}
            >
              Contact Us
            </Link>
            <Link 
              href="/about" 
              className="text-sm font-medium text-[#878787] hover:text-blue-600 transition-colors uppercase tracking-wider"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <button className="w-full text-foreground border border-border-subtle text-[10px] font-mono font-bold px-4 py-2.5 rounded-full hover:text-blue-600 hover:border-blue-200 transition-all uppercase tracking-tight shadow-none cursor-pointer">
              Submit Project
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}


