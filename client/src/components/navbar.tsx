"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Menu, X, Search, User, LogOut, Settings } from "lucide-react";
import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const { data: session, status } = useSession();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" });
  };

  const isAuthenticated = status === "authenticated" && session?.user;

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/explore", label: "Explore" },
    ...(isAuthenticated ? [{ href: "/dashboard", label: "Dashboard" }] : [])
  ];

  return (
    <nav className="bg-black/90 backdrop-blur-xl border-b border-zinc-800/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-teal-600 to-teal-700 rounded-md flex items-center justify-center">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <span className="text-xl font-semibold bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent">
                Artfolio
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-zinc-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors duration-200"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Search Bar */}
          <div className="hidden md:block flex-1 max-w-sm mx-8">
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="text"
                placeholder="Search artworks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-zinc-800/50 border border-zinc-700/50 text-white placeholder:text-zinc-500 focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/25 rounded-md backdrop-blur-sm"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-zinc-500" />
            </form>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              {isAuthenticated && session?.user ? (
                <div className="relative">
                  <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="flex items-center space-x-2 text-zinc-300 hover:text-white p-2 rounded-md hover:bg-zinc-800/50 transition-colors duration-200"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={session.user?.image || ""} alt={session.user?.name || ""} />
                      <AvatarFallback className="bg-gradient-to-r from-teal-600 to-teal-700 text-white text-sm">
                        {session.user?.name?.charAt(0) || session.user?.email?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">{session.user?.name?.split(' ')[0] || "User"}</span>
                  </button>

                  {isMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-zinc-900/95 backdrop-blur-xl border border-zinc-700/50 shadow-2xl rounded-md py-1 z-50">
                      <div className="px-4 py-2 border-b border-zinc-700/50">
                        <p className="text-sm font-medium text-white">{session.user?.name}</p>
                        <p className="text-xs text-zinc-400">{session.user?.email}</p>
                      </div>
                      <Link
                        href="/dashboard"
                        className="flex items-center px-4 py-2 text-sm text-zinc-300 hover:bg-gradient-to-r hover:from-teal-600/20 hover:to-teal-700/20 hover:text-white"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <User className="mr-3 h-4 w-4" />
                        Dashboard
                      </Link>
                      <Link
                        href="/settings"
                        className="flex items-center px-4 py-2 text-sm text-zinc-300 hover:bg-gradient-to-r hover:from-teal-600/20 hover:to-teal-700/20 hover:text-white"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <Settings className="mr-3 h-4 w-4" />
                        Settings
                      </Link>
                      <div className="border-t border-zinc-700/50 my-1"></div>
                      <button
                        onClick={() => {
                          handleSignOut();
                          setIsMenuOpen(false);
                        }}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-400 hover:bg-red-600/20 hover:text-red-300"
                      >
                        <LogOut className="mr-3 h-4 w-4" />
                        Sign out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link href="/login">
                    <Button
                      variant="ghost"
                      className="text-zinc-400 hover:text-white hover:bg-zinc-800/50"
                    >
                      Sign in
                    </Button>
                  </Link>
                  <Link href="/signup">
                    <Button className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white">
                      Get started
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-800/50 transition-colors duration-200"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-zinc-800/50 bg-black/95 backdrop-blur-xl">
            <div className="px-4 pt-4 pb-6 space-y-4">

              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="relative">
                <Input
                  type="text"
                  placeholder="Search artworks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-zinc-800/50 border border-zinc-700/50 text-white placeholder:text-zinc-500 focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/25 rounded-md backdrop-blur-sm"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-zinc-500" />
              </form>

              {/* Navigation Links */}
              <div className="space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block px-3 py-2 text-zinc-300 hover:text-white hover:bg-gradient-to-r hover:from-teal-600/20 hover:to-teal-700/20 rounded-md transition-colors duration-200"
                    onClick={toggleMenu}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              {/* Auth Section */}
              <div className="pt-4 border-t border-zinc-800/50">
                {isAuthenticated && session?.user ? (
                  <div className="space-y-4">
                    <div className="flex items-center px-2">
                      <Avatar className="h-10 w-10 mr-3">
                        <AvatarImage src={session.user?.image || ""} alt={session.user?.name || ""} />
                        <AvatarFallback className="bg-gradient-to-r from-teal-600 to-teal-700 text-white">
                          {session.user?.name?.charAt(0) || session.user?.email?.charAt(0) || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium text-white">{session.user?.name}</p>
                        <p className="text-xs text-zinc-400">{session.user?.email}</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Link
                        href="/dashboard"
                        className="flex items-center px-3 py-2 text-zinc-300 hover:bg-zinc-800/50 rounded-md transition-colors duration-200"
                        onClick={toggleMenu}
                      >
                        <User className="mr-3 h-4 w-4" />
                        Dashboard
                      </Link>
                      <Link
                        href="/settings"
                        className="flex items-center px-3 py-2 text-zinc-300 hover:bg-zinc-800/50 rounded-md transition-colors duration-200"
                        onClick={toggleMenu}
                      >
                        <Settings className="mr-3 h-4 w-4" />
                        Settings
                      </Link>
                      <button
                        onClick={() => {
                          handleSignOut();
                          setIsMenuOpen(false);
                        }}
                        className="flex items-center w-full px-3 py-2 text-red-400 hover:bg-red-600/20 rounded-md transition-colors duration-200"
                      >
                        <LogOut className="mr-3 h-4 w-4" />
                        Sign out
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col space-y-3">
                    <Link href="/login" onClick={toggleMenu}>
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-zinc-400 hover:text-white hover:bg-zinc-800/50"
                      >
                        Sign in
                      </Button>
                    </Link>
                    <Link href="/signup" onClick={toggleMenu}>
                      <Button className="w-full bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white">
                        Get started
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}