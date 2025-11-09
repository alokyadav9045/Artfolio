"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, AlertCircle, CheckCircle, ArrowLeft } from "lucide-react";
import { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email) {
      setError("Please enter your email address");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send reset email');
      }

      setSuccess(data.message);
      setEmail("");
    } catch (error) {
      console.error('Password reset error:', error);
      setError(error instanceof Error ? error.message : "An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back to Login */}
        <div className="mb-8">
          <Link
            href="/login"
            className="inline-flex items-center text-zinc-400 hover:text-zinc-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Sign In
          </Link>
        </div>

        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <Link href="/" className="text-3xl font-bold text-white">
            Artfolio
          </Link>
          <p className="text-zinc-400 mt-2">Reset your password</p>
        </div>

        <Card className="shadow-xl border border-zinc-700 bg-zinc-800/80 backdrop-blur-sm">
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-2xl font-bold text-center text-white">Forgot Password</CardTitle>
            <CardDescription className="text-center text-zinc-400">
              Enter your email address and we'll send you a link to reset your password
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

            {/* Reset Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-zinc-300">Email</Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError("");
                    }}
                    required
                    disabled={isLoading}
                    className="w-full pl-10 bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-zinc-600"
                  />
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-500" />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-zinc-800 hover:bg-zinc-700 text-white disabled:opacity-50"
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? "Sending..." : "Send Reset Link"}
              </Button>
            </form>

            {/* Sign In Link */}
            <div className="text-center text-sm">
              <span className="text-zinc-400">Remember your password? </span>
              <Link href="/login" className="text-zinc-300 hover:text-white font-medium">
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-zinc-500">
          <p>
            Need help? Contact our{" "}
            <Link href="/support" className="text-zinc-400 hover:text-zinc-300">
              support team
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}