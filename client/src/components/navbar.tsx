"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Menu, X, Search, User, LogOut, Settings } from "lucide-react";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
// Fallback DropdownMenu components if the project does not provide "@/components/ui/dropdown-menu"
function DropdownMenu({ children }: React.PropsWithChildren) {
  return <div className="relative inline-block">{children}</div>;
}
function DropdownMenuTrigger({ children, asChild }: React.PropsWithChildren & { asChild?: boolean }) {
  // Render children directly so the existing usage with asChild works as expected
  return <>{children}</>;
}
function DropdownMenuContent({ children, className = "", align, forceMount }: React.PropsWithChildren & { className?: string; align?: string; forceMount?: boolean }) {
  // Simple absolute positioned menu aligned to the end to roughly match expected behavior
  return (
    <div className={`absolute right-0 mt-2 rounded-md shadow-lg ${className}`}>
      {children}
    </div>
  );
}
function DropdownMenuLabel({ children, className, ...props }: React.PropsWithChildren & { className?: string }) {
  return <div className={className} {...props}>{children}</div>;
}
function DropdownMenuSeparator({ className = "" }: { className?: string }) {
  return <div className={`my-1 h-px w-full bg-zinc-700 ${className}`} />;
}
function DropdownMenuItem({ children, className = "", ...props }: React.PropsWithChildren & { className?: string } & Record<string, unknown>) {
  return (
    <div {...props} className={`px-3 py-2 text-sm ${className}`}>
      {children}
    </div>
  );
}
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

  return (
    <nav className="bg-black/80 backdrop-blur-md border-b border-zinc-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-white">
              Artfolio
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                href="/"
                className="text-white hover:text-zinc-300 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Home
              </Link>
              <Link
                href="/explore"
                className="text-zinc-400 hover:text-zinc-300 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Explore
              </Link>
              {isAuthenticated && (
                <Link
                  href="/dashboard"
                  className="text-zinc-400 hover:text-zinc-300 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Dashboard
                </Link>
              )}
            </div>
          </div>

          {/* Search Bar */}
          <div className="hidden md:block flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="text"
                placeholder="Search artworks, artists..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-zinc-600"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-zinc-500" />
            </form>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:block">
            <div className="ml-4 flex items-center space-x-4">
              {isAuthenticated && session?.user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={session.user?.image || ""} alt={session.user?.name || ""} />
                        <AvatarFallback className="bg-zinc-700 text-white">
                          {session.user?.name?.charAt(0) || session.user?.email?.charAt(0) || "U"}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 bg-zinc-900 border-zinc-700" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none text-white">
                          {session.user?.name || "User"}
                        </p>
                        <p className="text-xs leading-none text-zinc-400">
                          {session.user?.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-zinc-700" />
                    <DropdownMenuItem
                      className="text-zinc-300 hover:text-white hover:bg-zinc-800 cursor-pointer"
                      onClick={() => router.push("/dashboard")}
                    >
                      <User className="mr-2 h-4 w-4" />
                      <span>Dashboard</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-zinc-300 hover:text-white hover:bg-zinc-800 cursor-pointer"
                      onClick={() => router.push("/settings")}
                    >
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-zinc-700" />
                    <DropdownMenuItem
                      className="text-zinc-300 hover:text-white hover:bg-zinc-800 cursor-pointer"
                      onClick={handleSignOut}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <>
                  <Link href="/login">
                    <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-white hover:bg-zinc-800">
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/signup">
                    <Button size="sm" className="bg-zinc-800 hover:bg-zinc-700 text-white">
                      Get Started
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 text-zinc-400 hover:text-white hover:bg-zinc-800"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-black border-t border-zinc-800">
              {/* Mobile Search */}
              <div className="px-3 py-2">
                <form onSubmit={handleSearch} className="relative">
                  <Input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-zinc-600"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-zinc-500" />
                </form>
              </div>

              <Link
                href="/"
                className="text-white hover:text-zinc-300 block px-3 py-2 rounded-md text-base font-medium"
                onClick={toggleMenu}
              >
                Home
              </Link>
              <Link
                href="/explore"
                className="text-zinc-400 hover:text-zinc-300 block px-3 py-2 rounded-md text-base font-medium"
                onClick={toggleMenu}
              >
                Explore
              </Link>
              {isAuthenticated && (
                <Link
                  href="/dashboard"
                  className="text-zinc-400 hover:text-zinc-300 block px-3 py-2 rounded-md text-base font-medium"
                  onClick={toggleMenu}
                >
                  Dashboard
                </Link>
              )}

              <div className="pt-4 pb-3 border-t border-zinc-800">
                {isAuthenticated && session?.user ? (
                  <div className="space-y-3">
                    <div className="flex items-center px-3">
                      <Avatar className="h-8 w-8 mr-3">
                        <AvatarImage src={session.user?.image || ""} alt={session.user?.name || ""} />
                        <AvatarFallback className="bg-zinc-700 text-white">
                          {session.user?.name?.charAt(0) || session.user?.email?.charAt(0) || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium text-white">
                          {session.user?.name || "User"}
                        </p>
                        <p className="text-xs text-zinc-400">
                          {session.user?.email}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full text-zinc-400 hover:text-white hover:bg-zinc-800 justify-start"
                        onClick={() => {
                          router.push("/dashboard");
                          setIsMenuOpen(false);
                        }}
                      >
                        <User className="mr-2 h-4 w-4" />
                        Dashboard
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full text-zinc-400 hover:text-white hover:bg-zinc-800 justify-start"
                        onClick={() => {
                          router.push("/settings");
                          setIsMenuOpen(false);
                        }}
                      >
                        <Settings className="mr-2 h-4 w-4" />
                        Settings
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full text-zinc-400 hover:text-white hover:bg-zinc-800 justify-start"
                        onClick={() => {
                          handleSignOut();
                          setIsMenuOpen(false);
                        }}
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Sign Out
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center space-x-3">
                    <Link href="/login" onClick={toggleMenu}>
                      <Button variant="ghost" size="sm" className="w-full text-zinc-400 hover:text-white hover:bg-zinc-800">
                        Sign In
                      </Button>
                    </Link>
                    <Link href="/signup" onClick={toggleMenu}>
                      <Button size="sm" className="w-full bg-zinc-800 hover:bg-zinc-700 text-white">
                        Get Started
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