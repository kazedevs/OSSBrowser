import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-border-subtle bg-background/80 backdrop-blur-sm mt-auto">
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-16 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div className="flex flex-col gap-4">
            <Link href="/" className="font-sans text-xs tracking-tighter flex items-center gap-1 group cursor-pointer">
              <Image src="/ossNav.png" alt="Logo" width={20} height={20} />
              <span className="text-foreground font-normal text-sm group-hover:text-blue-600 transition-colors">oss/browser</span>
            </Link>
            <p className="text-xs text-muted-foreground max-w-xs leading-relaxed">
              Discover and contribute to the world&apos;s most beautiful and high-quality open source projects.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-12">
            <div className="flex flex-col gap-3">
              <h4 className="text-[10px] font-bold text-foreground uppercase tracking-widest">Directory</h4>
              <Link href="/" className="text-xs text-muted-foreground hover:text-blue-600 transition-colors">All Projects</Link>
              <Link href="/?sort=stars" className="text-xs text-muted-foreground hover:text-blue-600 transition-colors">Popular</Link>
              <Link href="/submit" className="text-xs text-muted-foreground hover:text-blue-600 transition-colors">Submit</Link>
            </div>
            <div className="flex flex-col gap-3">
              <h4 className="text-[10px] font-bold text-foreground uppercase tracking-widest">Resources</h4>
              <Link 
              href="/about" 
              target="_blank"
              className="text-xs text-muted-foreground hover:text-blue-600 transition-colors"
              >About</Link>
              <a 
              href="mailto:hello@ossbrowser.com" 
              className="text-xs text-muted-foreground hover:text-blue-600 transition-colors"
              >Contact</a>
              <Link 
              href="/privacy" 
              target="_blank"
              className="text-xs text-muted-foreground hover:text-blue-600 transition-colors"
              >Privacy</Link>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-border-subtle flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest">
            © {new Date().getFullYear()} OSSBrowser. Built for the community.
          </p>
        </div>
      </div>
    </footer>
  );
}
