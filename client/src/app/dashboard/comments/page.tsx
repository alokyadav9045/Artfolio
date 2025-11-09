'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import Link from 'next/link'
import { ArrowLeft, MessageCircle, Trash2, Eye, Heart, User, Calendar, Flag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { useToast } from '@/hooks/use-toast'
import { mockComments, type MockComment } from '@/lib/mock-data/comments'

export default function CommentsPage() {
  const { toast } = useToast()
  const queryClient = useQueryClient()

  // Mock comments data - in production, fetch from API
  const { data: comments, isLoading } = useQuery({
    queryKey: ['user-comments'],
    queryFn: async () => {
      // TODO: Replace with actual API call
      return mockComments
    }
  })

  const deleteCommentMutation = useMutation({
    mutationFn: async (commentId: string) => {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      return commentId
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-comments'] })
      toast({
        title: 'Comment deleted',
        description: 'The comment has been successfully removed.',
      })
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed to delete comment. Please try again.',
        variant: 'destructive',
      })
    }
  })

  const reportCommentMutation = useMutation({
    mutationFn: async (commentId: string) => {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      return commentId
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-comments'] })
      toast({
        title: 'Comment reported',
        description: 'Thank you for helping keep our community safe.',
      })
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed to report comment. Please try again.',
        variant: 'destructive',
      })
    }
  })

  const handleDeleteComment = (commentId: string) => {
    deleteCommentMutation.mutate(commentId)
  }

  const handleReportComment = (commentId: string) => {
    reportCommentMutation.mutate(commentId)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading comments...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-white">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-white">Comments</h1>
              <p className="text-zinc-400">Manage comments on your artworks</p>
            </div>
          </div>
          <Badge variant="secondary" className="bg-zinc-800 text-zinc-300">
            {comments?.length || 0} Comments
          </Badge>
        </div>

        {/* Comments List */}
        <div className="space-y-6">
          {comments?.map((comment: MockComment) => (
            <Card key={comment.id} className="bg-zinc-900/50 border-zinc-800">
              <CardContent className="p-6">
                <div className="flex gap-4">
                  {/* Author Avatar */}
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
                    <AvatarFallback>
                      <User className="w-4 h-4" />
                    </AvatarFallback>
                  </Avatar>

                  {/* Comment Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-white font-medium">{comment.author.name}</span>
                      <span className="text-zinc-500">@{comment.author.username}</span>
                      <span className="text-zinc-500 text-sm flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(comment.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    <p className="text-zinc-300 mb-3">{comment.content}</p>

                    {/* Artwork Reference */}
                    <div className="flex items-center gap-2 mb-4 p-3 bg-zinc-800/50 rounded-lg">
                      <div className="w-8 h-8 bg-zinc-700 rounded flex items-center justify-center">
                        <Eye className="w-4 h-4 text-zinc-400" />
                      </div>
                      <div>
                        <p className="text-sm text-zinc-400">On artwork:</p>
                        <p className="text-sm text-white font-medium">{comment.artwork.title}</p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          className={`text-zinc-400 hover:text-red-400 ${comment.isLiked ? 'text-red-400' : ''}`}
                        >
                          <Heart className="w-4 h-4 mr-1" />
                          {comment.likes}
                        </Button>

                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-zinc-400 hover:text-blue-400"
                        >
                          <MessageCircle className="w-4 h-4 mr-1" />
                          Reply
                        </Button>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-zinc-400 hover:text-orange-400"
                          onClick={() => handleReportComment(comment.id)}
                          disabled={reportCommentMutation.isPending}
                        >
                          <Flag className="w-4 h-4" />
                        </Button>

                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-zinc-400 hover:text-red-400"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent className="bg-zinc-900 border-zinc-800">
                            <AlertDialogHeader>
                              <AlertDialogTitle className="text-white">Delete Comment</AlertDialogTitle>
                              <AlertDialogDescription className="text-zinc-400">
                                Are you sure you want to delete this comment? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel className="bg-zinc-800 text-white hover:bg-zinc-700">
                                Cancel
                              </AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDeleteComment(comment.id)}
                                className="bg-red-600 hover:bg-red-700"
                                disabled={deleteCommentMutation.isPending}
                              >
                                {deleteCommentMutation.isPending ? 'Deleting...' : 'Delete'}
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {comments?.length === 0 && (
          <Card className="bg-zinc-900/50 border-zinc-800">
            <CardContent className="p-12 text-center">
              <MessageCircle className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-white mb-2">No comments yet</h3>
              <p className="text-zinc-400">
                When people comment on your artworks, they&apos;ll appear here for you to manage.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}