export default function Footer() {
  return (
    <footer className="relative z-20 bg-[#0d0703] px-6 py-16">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col items-center gap-8">
          <h3
            className="text-3xl font-black italic text-[#FFD75A]"
            style={{ fontFamily: "var(--font-cormorant), serif" }}
          >
            Mr. Biryani
          </h3>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm tracking-[0.15em] uppercase text-white/40">
            <a href="#hero" className="hover:text-[#FFD75A] transition-colors duration-300 cursor-pointer">Home</a>
            <a href="#menu" className="hover:text-[#FFD75A] transition-colors duration-300 cursor-pointer">Menu</a>
            <a href="#about" className="hover:text-[#FFD75A] transition-colors duration-300 cursor-pointer">About</a>
            <a href="#gallery" className="hover:text-[#FFD75A] transition-colors duration-300 cursor-pointer">Gallery</a>
            <a href="#contact" className="hover:text-[#FFD75A] transition-colors duration-300 cursor-pointer">Contact</a>
            <a
              href="https://mrbiryanirestaurant.smartonlineorder.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#FFD75A]/80 hover:text-[#FFD75A] transition-colors duration-300 cursor-pointer"
            >
              Order Online
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-sm text-white/40" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
            <div className="flex flex-col items-center gap-1">
              <span className="text-[0.65rem] tracking-[0.25em] uppercase text-[#FFD75A]/50">Contact</span>
              <a href="mailto:Mrbiryanica@gmail.com" className="hover:text-[#FFD75A] transition-colors duration-300">Mrbiryanica@gmail.com</a>
              <a href="tel:+19052409585" className="hover:text-[#FFD75A] transition-colors duration-300">+1 905-240-9585</a>
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="text-[0.65rem] tracking-[0.25em] uppercase text-[#FFD75A]/50">Location</span>
              <a
                href="https://www.google.com/maps/search/?api=1&query=2598+Birchmount+Rd,+Scarborough,+ON+M1T+3H1"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#FFD75A] transition-colors duration-300 text-center"
              >
                2598 Birchmount Rd, Scarborough, ON M1T 3H1
              </a>
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="text-[0.65rem] tracking-[0.25em] uppercase text-[#FFD75A]/50">Hours</span>
              <span>11:30 AM – 11:00 PM</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {[
              { label: "Instagram", href: "https://www.instagram.com/mr.biryanica/", path: "M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.43.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.43.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41-.56-.22-.96-.48-1.38-.9-.42-.42-.68-.82-.9-1.38-.16-.43-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.43-.16 1.06-.36 2.23-.41 1.27-.06 1.65-.07 4.85-.07zM12 7.16a4.84 4.84 0 100 9.68 4.84 4.84 0 000-9.68zm0 7.98a3.14 3.14 0 110-6.28 3.14 3.14 0 010 6.28zm6.16-8.18a1.13 1.13 0 100 2.26 1.13 1.13 0 000-2.26z" },
              { label: "Facebook", href: "https://www.facebook.com/p/Mr-Biryani-61590366496319/", path: "M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.99 3.66 9.13 8.44 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.23.2 2.23.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.45 2.89h-2.33v6.99C18.34 21.13 22 16.99 22 12z" },
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                target={social.href === "#" ? undefined : "_blank"}
                rel={social.href === "#" ? undefined : "noopener noreferrer"}
                aria-label={social.label}
                className="flex items-center justify-center w-10 h-10 rounded-full border border-[rgba(255,215,90,0.15)] text-white/40 hover:text-[#FFD75A] hover:border-[rgba(255,215,90,0.4)] transition-all duration-300 cursor-pointer"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d={social.path} />
                </svg>
              </a>
            ))}
          </div>

          <div className="w-full max-w-xs h-px bg-gradient-to-r from-transparent via-[rgba(255,215,90,0.15)] to-transparent" />

          <p className="text-xs text-white/30 tracking-wide text-center" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
            &copy; {new Date().getFullYear()} Mr. Biryani &mdash; Royal Kitchen. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
