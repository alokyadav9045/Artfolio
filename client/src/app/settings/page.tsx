'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { User, Bell, Shield } from 'lucide-react'
import ProtectedRoute from '@/components/ProtectedRoute'

export default function SettingsPage() {
  const { data: session } = useSession()
  const [settings, setSettings] = useState({
    name: session?.user?.name || '',
    email: session?.user?.email || '',
    bio: '',
    website: '',
    location: '',
    emailNotifications: true,
    publicProfile: true,
    showEmail: false,
  })

  const handleSave = () => {
    // TODO: Implement save functionality
    console.log('Saving settings:', settings)
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
            <p className="text-zinc-400">Manage your account settings and preferences</p>
          </div>

          <div className="space-y-8">
            {/* Profile Settings */}
            <Card className="bg-zinc-900/50 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  Profile Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Avatar */}
                <div className="flex items-center space-x-4">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src={session?.user?.image || ''} alt={session?.user?.name || ''} />
                    <AvatarFallback className="bg-zinc-700 text-white text-xl">
                      {session?.user?.name?.charAt(0) || session?.user?.email?.charAt(0) || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-medium text-white">{session?.user?.name}</h3>
                    <p className="text-zinc-400">{session?.user?.email}</p>
                    <Button variant="outline" size="sm" className="mt-2 border-zinc-700 text-zinc-300 hover:bg-zinc-800">
                      Change Avatar
                    </Button>
                  </div>
                </div>

                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-zinc-300">Display Name</Label>
                    <Input
                      id="name"
                      value={settings.name}
                      onChange={(e) => setSettings({ ...settings, name: e.target.value })}
                      className="bg-zinc-800 border-zinc-700 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-zinc-300">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={settings.email}
                      onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                      className="bg-zinc-800 border-zinc-700 text-white"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio" className="text-zinc-300">Bio</Label>
                  <Textarea
                    id="bio"
                    placeholder="Tell us about yourself..."
                    value={settings.bio}
                    onChange={(e) => setSettings({ ...settings, bio: e.target.value })}
                    className="bg-zinc-800 border-zinc-700 text-white min-h-[100px]"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="website" className="text-zinc-300">Website</Label>
                    <Input
                      id="website"
                      placeholder="https://yourwebsite.com"
                      value={settings.website}
                      onChange={(e) => setSettings({ ...settings, website: e.target.value })}
                      className="bg-zinc-800 border-zinc-700 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location" className="text-zinc-300">Location</Label>
                    <Input
                      id="location"
                      placeholder="City, Country"
                      value={settings.location}
                      onChange={(e) => setSettings({ ...settings, location: e.target.value })}
                      className="bg-zinc-800 border-zinc-700 text-white"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Privacy Settings */}
            <Card className="bg-zinc-900/50 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  Privacy & Security
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-zinc-300">Public Profile</Label>
                    <p className="text-sm text-zinc-500">Make your profile visible to other users</p>
                  </div>
                  <Switch
                    checked={settings.publicProfile}
                    onCheckedChange={(checked: boolean) => setSettings({ ...settings, publicProfile: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-zinc-300">Show Email</Label>
                    <p className="text-sm text-zinc-500">Display your email on your public profile</p>
                  </div>
                  <Switch
                    checked={settings.showEmail}
                    onCheckedChange={(checked: boolean) => setSettings({ ...settings, showEmail: checked })}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Notification Settings */}
            <Card className="bg-zinc-900/50 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Bell className="w-5 h-5 mr-2" />
                  Notifications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-zinc-300">Email Notifications</Label>
                    <p className="text-sm text-zinc-500">Receive email notifications for important updates</p>
                  </div>
                  <Switch
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked: boolean) => setSettings({ ...settings, emailNotifications: checked })}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Save Button */}
            <div className="flex justify-end">
              <Button onClick={handleSave} className="bg-zinc-800 hover:bg-zinc-700 text-white">
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}