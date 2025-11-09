"use client";

import Link from "next/link";
import { Twitter, Mail, Heart, Github, Instagram, Youtube, ArrowUp, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";

export default function Footer() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-gradient-to-br from-black via-zinc-900 to-black border-t border-zinc-800/50 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.1),transparent_50%)] opacity-50" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(168,85,247,0.1),transparent_50%)] opacity-30" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Content */}
        <div className={`grid grid-cols-1 lg:grid-cols-12 gap-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>

          {/* Brand Section */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-teal-600 to-teal-700 rounded-lg blur opacity-25" />
                <Link href="/" className="relative text-3xl font-bold bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent">
                  Artfolio
                </Link>
              </div>
              <Sparkles className="h-6 w-6 text-teal-400 animate-pulse" />
            </div>

            <p className="text-zinc-400 leading-relaxed max-w-md">
              A modern art portfolio platform for creators. Showcase your work, connect with artists, and grow your creative career with cutting-edge tools.
            </p>

            {/* Social Links */}
            <div className="flex space-x-4">
              {[
                { icon: Twitter, href: "https://twitter.com/artfolio", label: "Twitter" },
                { icon: Instagram, href: "https://instagram.com/artfolio", label: "Instagram" },
                { icon: Youtube, href: "https://youtube.com/artfolio", label: "YouTube" },
                { icon: Github, href: "https://github.com/artfolio", label: "GitHub" },
                { icon: Mail, href: "mailto:hello@artfolio.com", label: "Email" }
              ].map(({ icon: Icon, href, label }) => (
                <Link
                  key={label}
                  href={href}
                  className="group relative p-3 bg-zinc-800/50 hover:bg-zinc-700/50 rounded-xl border border-zinc-700/50 hover:border-zinc-600/50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-teal-500/10"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                >
                  <Icon className="h-5 w-5 text-zinc-400 group-hover:text-white transition-colors" />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-teal-600/20 to-teal-700/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-white font-semibold text-lg relative">
              Platform
              <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full" />
            </h3>
            <ul className="space-y-3">
              {[
                { href: "/explore", label: "Explore Artworks" },
                { href: "/features", label: "Features" },
                { href: "/pricing", label: "Pricing" },
                { href: "/docs", label: "Documentation" }
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-zinc-400 hover:text-white transition-all duration-300 hover:translate-x-1 inline-block group"
                  >
                    {label}
                    <span className="inline-block ml-2 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-white font-semibold text-lg relative">
              Resources
              <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full" />
            </h3>
            <ul className="space-y-3">
              {[
                { href: "/blog", label: "Blog" },
                { href: "/tutorials", label: "Tutorials" },
                { href: "/community", label: "Community" },
                { href: "/support", label: "Support" }
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-zinc-400 hover:text-white transition-all duration-300 hover:translate-x-1 inline-block group"
                  >
                    {label}
                    <span className="inline-block ml-2 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-3 space-y-6">
            <h3 className="text-white font-semibold text-lg relative">
              Stay Updated
              <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full" />
            </h3>
            <p className="text-zinc-400 text-sm">
              Get the latest updates on new features and art trends.
            </p>
            <div className="space-y-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700/50 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/25 transition-all"
                suppressHydrationWarning
              />
              <button className="w-full px-4 py-3 bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white font-medium rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/25 hover:scale-[1.02]"
                suppressHydrationWarning
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className={`border-t border-zinc-800/50 mt-16 pt-8 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">

            {/* Copyright */}
            <div className="text-zinc-400 text-sm">
              © 2025 Artfolio. Crafted with <Heart className="inline h-4 w-4 text-red-500 animate-pulse mx-1" /> for artists worldwide.
            </div>

            {/* Links */}
            <div className="flex items-center space-x-6 text-sm">
              <Link href="/privacy" className="text-zinc-400 hover:text-white transition-colors hover:underline underline-offset-4">
                Privacy
              </Link>
              <Link href="/terms" className="text-zinc-400 hover:text-white transition-colors hover:underline underline-offset-4">
                Terms
              </Link>
              <Link href="/cookies" className="text-zinc-400 hover:text-white transition-colors hover:underline underline-offset-4">
                Cookies
              </Link>
            </div>

            {/* Back to Top */}
            <button
              onClick={scrollToTop}
              className="group flex items-center space-x-2 text-zinc-400 hover:text-white transition-all duration-300 hover:scale-105"
              aria-label="Back to top"
              suppressHydrationWarning
            >
              <span className="text-sm">Back to top</span>
              <ArrowUp className="h-4 w-4 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-10 right-10 w-20 h-20 bg-gradient-to-br from-teal-500/10 to-teal-600/10 rounded-full blur-xl animate-pulse" />
      <div className="absolute bottom-10 left-10 w-16 h-16 bg-gradient-to-br from-cyan-500/10 to-teal-500/10 rounded-full blur-xl animate-pulse delay-1000" />
    </footer>
  );
}