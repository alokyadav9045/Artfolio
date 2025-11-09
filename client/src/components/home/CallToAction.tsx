'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Palette, Users, Upload, TrendingUp } from 'lucide-react'

interface CallToActionProps {
  className?: string
}

export function CallToAction({ className }: CallToActionProps) {
  return (
    <section className={className}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 border-zinc-700">
          <CardContent className="p-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                Ready to Share Your Art?
              </h2>
              <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
                Join thousands of artists showcasing their work and connecting with art lovers worldwide
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {/* Create Account */}
              <div className="text-center">
                <div className="w-16 h-16 bg-teal-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-teal-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Create Your Profile</h3>
                <p className="text-zinc-400 mb-4">
                  Set up your artist profile and start building your portfolio
                </p>
                <Link href="/signup">
                  <Button className="w-full bg-teal-600 hover:bg-teal-700">
                    Sign Up Free
                  </Button>
                </Link>
              </div>

              {/* Upload Artwork */}
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Upload className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Upload Your Work</h3>
                <p className="text-zinc-400 mb-4">
                  Share your creations with our community of art enthusiasts
                </p>
                <Link href="/artwork/create">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    Upload Artwork
                  </Button>
                </Link>
              </div>

              {/* Explore Community */}
              <div className="text-center">
                <div className="w-16 h-16 bg-green-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Explore & Connect</h3>
                <p className="text-zinc-400 mb-4">
                  Discover amazing artists and get inspired by their work
                </p>
                <Link href="/explore">
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    Explore Artworks
                  </Button>
                </Link>
              </div>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center gap-2 text-zinc-400 mb-6">
                <Palette className="w-5 h-5" />
                <span>Join over 1,000+ artists already creating on Artfolio</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/login">
                  <Button size="lg" variant="outline" className="border-zinc-600 text-zinc-300 hover:bg-zinc-800">
                    Sign In
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button size="lg" className="bg-zinc-800 hover:bg-zinc-700 text-white px-8">
                    Get Started Today
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}