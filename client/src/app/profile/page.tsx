"use client";

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { User, Mail, Calendar, LogOut, Edit, Save, X, AlertCircle, CheckCircle } from "lucide-react";

interface ExtendedUser {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  username?: string;
  role?: string;
  createdAt?: string;
}

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
  });

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    } else if (session?.user) {
      const user = session.user as ExtendedUser;
      setFormData({
        username: user.username || "",
        email: user.email || "",
      });
    }
  }, [session, status, router]);

  const handleSave = async () => {
    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      // TODO: Implement actual profile update API
      // For now, just show a success message
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call

      setSuccess("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error('Profile update error:', error);
      setError("Failed to update profile. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    if (session?.user) {
      const user = session.user as ExtendedUser;
      setFormData({
        username: user.username || "",
        email: user.email || "",
      });
    }
    setIsEditing(false);
    setError("");
    setSuccess("");
  };

  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
    if (error) setError("");
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  if (!session?.user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black p-4">
      <div className="max-w-4xl mx-auto pt-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link href="/" className="text-3xl font-bold text-white">
              Artfolio
            </Link>
            <p className="text-zinc-400 mt-2">Manage your profile</p>
          </div>
          <Button
            variant="outline"
            onClick={() => signOut({ callbackUrl: '/' })}
            className="border-zinc-700 text-zinc-400 hover:bg-zinc-700 hover:text-white"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Overview */}
          <div className="lg:col-span-1">
            <Card className="border border-zinc-700 bg-zinc-800/80 backdrop-blur-sm">
              <CardHeader className="text-center">
                <Avatar className="w-24 h-24 mx-auto mb-4">
                  <AvatarImage src={session.user.image || ""} alt={session.user.name || ""} />
                  <AvatarFallback className="text-2xl bg-zinc-700 text-white">
                    {(session.user as ExtendedUser).name?.charAt(0)?.toUpperCase() || session.user.email?.charAt(0)?.toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="text-white">{session.user.name}</CardTitle>
                <CardDescription className="text-zinc-400">
                  {(session.user as ExtendedUser).role === 'artist' ? 'Artist' : 'Viewer'}
                </CardDescription>
                <Badge variant="secondary" className="mt-2 bg-zinc-700 text-zinc-300">
                  {(session.user as ExtendedUser).role || 'viewer'}
                </Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="w-4 h-4 text-zinc-500" />
                  <span className="text-zinc-300">{session.user.email}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <User className="w-4 h-4 text-zinc-500" />
                  <span className="text-zinc-300">@{(session.user as ExtendedUser).username}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Calendar className="w-4 h-4 text-zinc-500" />
                  <span className="text-zinc-300">
                    Joined {new Date((session.user as ExtendedUser).createdAt || Date.now()).toLocaleDateString()}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Profile Settings */}
          <div className="lg:col-span-2">
            <Card className="border border-zinc-700 bg-zinc-800/80 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-white">Profile Settings</CardTitle>
                    <CardDescription className="text-zinc-400">
                      Update your account information
                    </CardDescription>
                  </div>
                  {!isEditing ? (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsEditing(true)}
                      className="border-zinc-700 text-zinc-400 hover:bg-zinc-700 hover:text-white"
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                  ) : (
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleCancel}
                        disabled={isLoading}
                        className="border-zinc-700 text-zinc-400 hover:bg-zinc-700 hover:text-white"
                      >
                        <X className="w-4 h-4 mr-2" />
                        Cancel
                      </Button>
                      <Button
                        size="sm"
                        onClick={handleSave}
                        disabled={isLoading}
                        className="bg-zinc-800 hover:bg-zinc-700 text-white"
                      >
                        <Save className="w-4 h-4 mr-2" />
                        Save
                      </Button>
                    </div>
                  )}
                </div>
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

                {/* Profile Form */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="username" className="text-zinc-300">Username</Label>
                    <Input
                      id="username"
                      value={formData.username}
                      onChange={handleInputChange('username')}
                      disabled={!isEditing || isLoading}
                      className="bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-zinc-600 disabled:opacity-50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-zinc-300">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange('email')}
                      disabled={!isEditing || isLoading}
                      className="bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-zinc-600 disabled:opacity-50"
                    />
                  </div>
                </div>

                {/* Account Actions */}
                <div className="pt-6 border-t border-zinc-700">
                  <h3 className="text-lg font-medium text-white mb-4">Account Actions</h3>
                  <div className="space-y-3">
                    <Button
                      variant="outline"
                      className="w-full justify-start border-zinc-700 text-zinc-400 hover:bg-zinc-700 hover:text-white"
                    >
                      Change Password
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start border-zinc-700 text-zinc-400 hover:bg-zinc-700 hover:text-white"
                    >
                      Download My Data
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start border-red-800 text-red-400 hover:bg-red-900 hover:text-red-300"
                    >
                      Delete Account
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}