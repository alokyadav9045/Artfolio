"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, User, AlertCircle, CheckCircle, Mail, Lock } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: ""
  });

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError("Full name is required");
      return false;
    }
    if (formData.name.trim().length < 2) {
      setError("Name must be at least 2 characters long");
      return false;
    }
    if (!formData.email) {
      setError("Email is required");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address");
      return false;
    }
    if (formData.username && formData.username.length < 3) {
      setError("Username must be at least 3 characters long");
      return false;
    }
    if (formData.username && !/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      setError("Username can only contain letters, numbers, and underscores");
      return false;
    }
    if (!formData.password) {
      setError("Password is required");
      return false;
    }
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long");
      return false;
    }
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      setError("Password must contain at least one uppercase letter, one lowercase letter, and one number");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.toLowerCase().trim(),
          username: formData.username || undefined,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Account created successfully! You can now sign in.");
        setFormData({
          name: "",
          email: "",
          username: "",
          password: "",
          confirmPassword: ""
        });
        // Redirect to login after 2 seconds
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      } else {
        setError(data.error || 'An error occurred during signup');
      }
    } catch (error) {
      console.error('Signup error:', error);
      setError('Network error. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear errors when user starts typing
    if (error) setError("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <Link href="/" className="text-3xl font-bold text-white">
            Artfolio
          </Link>
          <p className="text-zinc-400 mt-2">Create your account and start building amazing projects.</p>
        </div>

        <Card className="shadow-xl border border-zinc-700 bg-zinc-800/80 backdrop-blur-sm">
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-2xl font-bold text-center text-white">Create Account</CardTitle>
            <CardDescription className="text-center text-zinc-400">
              Sign up to get started with Artfolio
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Error/Success Messages */}
            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-900/20 border border-red-800 rounded-lg text-red-400 text-sm">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {error}
              </div>
            )}
            {success && (
              <div className="flex items-center gap-2 p-3 bg-green-900/20 border border-green-800 rounded-lg text-green-400 text-sm">
                <CheckCircle className="w-4 h-4 flex-shrink-0" />
                {success}
              </div>
            )}

            {/* Signup Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-zinc-300 font-medium">Full Name</Label>
                <div className="relative">
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    required
                    disabled={isLoading}
                    className="w-full pl-10 bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600"
                  />
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-500" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-zinc-300 font-medium">Email Address</Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required
                    disabled={isLoading}
                    className="w-full pl-10 bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600"
                  />
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-500" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="username" className="text-zinc-300 font-medium">Username <span className="text-zinc-500 text-sm">(Optional)</span></Label>
                <div className="relative">
                  <Input
                    id="username"
                    type="text"
                    placeholder="Choose a username"
                    value={formData.username}
                    onChange={(e) => handleInputChange("username", e.target.value)}
                    disabled={isLoading}
                    className="w-full pl-10 bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600"
                  />
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-500" />
                </div>
                <p className="text-xs text-zinc-500">Letters, numbers, and underscores only. 3-30 characters.</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-zinc-300 font-medium">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    required
                    disabled={isLoading}
                    className="w-full pl-10 pr-10 bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600"
                  />
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-500" />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-zinc-700"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-zinc-500" />
                    ) : (
                      <Eye className="h-4 w-4 text-zinc-500" />
                    )}
                  </Button>
                </div>
                <p className="text-xs text-zinc-500">Must be at least 8 characters with uppercase, lowercase, and number.</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-zinc-300 font-medium">Confirm Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                    required
                    disabled={isLoading}
                    className="w-full pl-10 pr-10 bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600"
                  />
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-500" />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-zinc-700"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    disabled={isLoading}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4 text-zinc-500" />
                    ) : (
                      <Eye className="h-4 w-4 text-zinc-500" />
                    )}
                  </Button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-zinc-800 hover:bg-zinc-700 text-white disabled:opacity-50 transition-colors"
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>
            </form>

            {/* Sign In Link */}
            <div className="text-center text-sm pt-4 border-t border-zinc-700">
              <span className="text-zinc-400">Already have an account? </span>
              <Link href="/login" className="text-zinc-300 hover:text-white font-medium transition-colors">
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-zinc-500">
          <p>
            By creating an account, you agree to our{" "}
            <Link href="/terms" className="text-zinc-400 hover:text-zinc-300 transition-colors">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-zinc-400 hover:text-zinc-300 transition-colors">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}