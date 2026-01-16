import Image from "next/image";
import WaitlistButton from "@/components/WaitlistButton";

export default function Home() {
  return (
    <div className="h-screen w-full bg-white relative overflow-hidden flex items-center justify-center selection:bg-black selection:text-white">
      <div className="relative w-[300px] md:w-[400px] aspect-3/4 transition-all duration-700 ease-out hover:scale-105 hover:rotate-1">
        <Image
          src="/brand/frame.jpg"
          alt="OSS Browser"
          fill
          className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
          priority
        />
      </div>
      <h1 className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        <span className="text-white mix-blend-difference font-instrument font-bold text-6xl md:text-[10rem] tracking-tighter leading-none text-center">
          oss/<br/>browser
        </span>
      </h1>

      <div className="absolute top-6 left-6 mix-blend-difference z-20">
         <span className="text-white font-mono text-xs uppercase tracking-widest">[ v0.1.0 ]</span>
      </div>

      <div className="absolute bottom-6 left-6 mix-blend-difference z-20">
        <span className="text-white font-instrument text-xl italic">Browser for Open Source Projects</span>
      </div>

      <div className="absolute bottom-6 right-6 z-20">  
        <WaitlistButton />
      </div>
    </div>
  );
}

