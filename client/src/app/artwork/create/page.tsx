'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import Image from 'next/image'
import { Upload, X, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import ProtectedRoute from '@/components/ProtectedRoute'

export default function CreateArtworkPage() {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState('')
  const [isPublished, setIsPublished] = useState<boolean>(true)
  const [images, setImages] = useState<File[]>([])
  const [imagePreviews, setImagePreviews] = useState<string[]>([])
  const [uploading, setUploading] = useState(false)

  const createArtworkMutation = useMutation({
    mutationFn: async (data: {
      title: string
      description: string
      images: string[]
      tags: string[]
      isPublished: boolean
    }) => {
      const res = await fetch('/api/artworks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('Failed to create artwork')
      return res.json()
    },
    onSuccess: (artwork) => {
      router.push(`/artwork/${artwork.id}`)
    },
  })

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setImages(prev => [...prev, ...files])

    // Create previews
    files.forEach(file => {
      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target?.result) {
          setImagePreviews(prev => [...prev, e.target!.result as string])
        }
      }
      reader.readAsDataURL(file)
    })
  }

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index))
    setImagePreviews(prev => prev.filter((_, i) => i !== index))
  }

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags(prev => [...prev, tagInput.trim()])
      setTagInput('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(prev => prev.filter(tag => tag !== tagToRemove))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || images.length === 0) return

    setUploading(true)

    try {
      // Upload images to storage
      const imageUrls: string[] = []

      for (const image of images) {
        const formData = new FormData()
        formData.append('file', image)

        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        })

        if (!uploadRes.ok) {
          throw new Error('Failed to upload image')
        }

        const { url } = await uploadRes.json()
        imageUrls.push(url)
      }

      createArtworkMutation.mutate({
        title: title.trim(),
        description: description.trim(),
        images: imageUrls,
        tags,
        isPublished,
      })
    } catch (error) {
      console.error('Upload failed:', error)
      setUploading(false)
      // TODO: Show error toast
    }
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Create New Artwork</h1>
            <p className="text-zinc-400">Share your creative work with the community</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Image Upload */}
            <Card className="bg-zinc-900/50 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-white">Artwork Images</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Upload Area */}
                  <div className="border-2 border-dashed border-zinc-700 rounded-lg p-8 text-center">
                    <Upload className="w-12 h-12 text-zinc-500 mx-auto mb-4" />
                    <p className="text-zinc-400 mb-4">
                      Drag and drop your images here, or click to browse
                    </p>
                    <Input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <Label htmlFor="image-upload">
                      <Button type="button" variant="outline" className="border-zinc-700 text-zinc-300 hover:bg-zinc-800">
                        Choose Files
                      </Button>
                    </Label>
                  </div>

                  {/* Image Previews */}
                  {imagePreviews.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {imagePreviews.map((preview, index) => (
                        <div key={index} className="relative group">
                          <div className="aspect-square relative rounded-lg overflow-hidden bg-zinc-800">
                            <Image
                              src={preview}
                              alt={`Preview ${index + 1}`}
                              fill
                              className="object-cover"
                            />
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={() => removeImage(index)}
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Artwork Details */}
            <Card className="bg-zinc-900/50 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-white">Artwork Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-zinc-300">Title *</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter artwork title"
                    required
                    className="bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-zinc-300">Description</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe your artwork..."
                    rows={4}
                    className="bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-zinc-300">Tags</Label>
                  <div className="flex gap-2">
                    <Input
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      placeholder="Add a tag"
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                      className="bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-500"
                    />
                    <Button type="button" onClick={addTag} variant="outline" className="border-zinc-700 text-zinc-300 hover:bg-zinc-800">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="bg-zinc-800 text-zinc-300 cursor-pointer" onClick={() => removeTag(tag)}>
                          {tag} <X className="w-3 h-3 ml-1" />
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label className="text-zinc-300">Publish Status</Label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="isPublished"
                        checked={isPublished}
                        onChange={() => setIsPublished(true)}
                        className="text-zinc-300"
                      />
                      <span className="text-zinc-300">Published</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="isPublished"
                        checked={!isPublished}
                        onChange={() => setIsPublished(false)}
                        className="text-zinc-300"
                      />
                      <span className="text-zinc-300">Draft</span>
                    </label>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Submit */}
            <div className="flex justify-end gap-4">
              <Button type="button" variant="outline" onClick={() => router.back()} className="border-zinc-700 text-zinc-300 hover:bg-zinc-800">
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={uploading || !title.trim() || images.length === 0 || createArtworkMutation.isPending}
                className="bg-zinc-800 hover:bg-zinc-700 text-white"
              >
                {uploading || createArtworkMutation.isPending ? 'Creating...' : 'Create Artwork'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </ProtectedRoute>
  )
}