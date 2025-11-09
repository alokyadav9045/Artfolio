'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Heart, MessageCircle, User } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Artwork } from '@/types'

interface ArtworkCardProps {
  artwork: Artwork
}

export function ArtworkCard({ artwork }: ArtworkCardProps) {
  const mainImage = artwork.images[0]

  return (
    <Card className="group overflow-hidden border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800/50 transition-colors">
      <Link href={`/artwork/${artwork.id}`}>
        <div className="aspect-square relative overflow-hidden">
          {mainImage ? (
            <Image
              src={mainImage.url}
              alt={mainImage.alt || artwork.title}
              fill
              className="object-cover transition-transform group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            />
          ) : (
            <div className="w-full h-full bg-zinc-800 flex items-center justify-center">
              <User className="w-12 h-12 text-zinc-600" />
            </div>
          )}
        </div>
      </Link>

      <div className="p-4">
        <Link href={`/artwork/${artwork.id}`}>
          <h3 className="font-semibold text-white truncate hover:text-zinc-300 transition-colors">
            {artwork.title}
          </h3>
        </Link>

        <Link href={`/artist/${artwork.author.username || artwork.author.id}`}>
          <p className="text-sm text-zinc-400 hover:text-zinc-300 transition-colors mt-1">
            {artwork.author.name || 'Anonymous'}
          </p>
        </Link>

        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center space-x-4 text-sm text-zinc-500">
            <div className="flex items-center space-x-1">
              <Heart className="w-4 h-4" />
              <span>{artwork.likeCount || 0}</span>
            </div>
            <div className="flex items-center space-x-1">
              <MessageCircle className="w-4 h-4" />
              <span>{artwork.commentCount || 0}</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}