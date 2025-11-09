import Footer from "@/components/footer";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Users,
  MessageCircle,
  Heart,
  TrendingUp,
  Calendar,
  Star,
  Award,
  Zap,
  Globe,
  UserPlus,
  Eye,
  Share2
} from "lucide-react";

export default function CommunityPage() {
  const communityStats = [
    { label: "Active Artists", value: "12,847", icon: Users, change: "+12%" },
    { label: "Artworks Shared", value: "45,231", icon: Heart, change: "+8%" },
    { label: "Discussions", value: "8,942", icon: MessageCircle, change: "+15%" },
    { label: "Countries", value: "127", icon: Globe, change: "+3%" }
  ];

  const trendingTopics = [
    { name: "Digital Art Techniques", posts: 234, trend: "up" },
    { name: "Portfolio Reviews", posts: 189, trend: "up" },
    { name: "Career Advice", posts: 156, trend: "up" },
    { name: "Tool Recommendations", posts: 142, trend: "stable" },
    { name: "Exhibition Opportunities", posts: 98, trend: "up" }
  ];

  const recentDiscussions = [
    {
      id: 1,
      title: "Best practices for creating a cohesive art portfolio",
      author: "Sarah Chen",
      avatar: "/avatars/sarah.jpg",
      category: "Portfolio",
      replies: 23,
      likes: 45,
      views: 892,
      lastActivity: "2 hours ago",
      tags: ["portfolio", "advice", "career"],
      isHot: true
    },
    {
      id: 2,
      title: "Digital painting workflow: From sketch to final piece",
      author: "Mike Johnson",
      avatar: "/avatars/mike.jpg",
      category: "Techniques",
      replies: 18,
      likes: 32,
      views: 654,
      lastActivity: "4 hours ago",
      tags: ["digital", "workflow", "tutorial"],
      isHot: false
    },
    {
      id: 3,
      title: "Finding inspiration when you're in a creative rut",
      author: "Emma Wilson",
      avatar: "/avatars/emma.jpg",
      category: "Inspiration",
      replies: 31,
      likes: 67,
      views: 1203,
      lastActivity: "6 hours ago",
      tags: ["inspiration", "motivation", "creativity"],
      isHot: true
    },
    {
      id: 4,
      title: "Pricing your artwork: A guide for emerging artists",
      author: "David Kim",
      avatar: "/avatars/david.jpg",
      category: "Business",
      replies: 27,
      likes: 89,
      views: 1456,
      lastActivity: "8 hours ago",
      tags: ["pricing", "business", "sales"],
      isHot: true
    }
  ];

  const featuredArtists = [
    {
      name: "Alex Rivera",
      username: "alex_digital",
      avatar: "/avatars/alex.jpg",
      specialty: "Digital Illustration",
      followers: 2847,
      artworks: 156,
      featured: true,
      bio: "Creating immersive digital worlds through illustration and concept art."
    },
    {
      name: "Lisa Park",
      username: "lisa_design",
      avatar: "/avatars/lisa.jpg",
      specialty: "Graphic Design",
      followers: 1923,
      artworks: 98,
      featured: false,
      bio: "Bridging art and functionality through thoughtful design solutions."
    },
    {
      name: "James Mitchell",
      username: "james_traditional",
      avatar: "/avatars/james.jpg",
      specialty: "Traditional Art",
      followers: 3456,
      artworks: 203,
      featured: false,
      bio: "Exploring the timeless beauty of traditional painting techniques."
    }
  ];

  const upcomingEvents = [
    {
      title: "Digital Art Showcase",
      date: "November 15, 2025",
      type: "Online Exhibition",
      participants: 89,
      description: "Showcase your digital artwork and connect with fellow artists."
    },
    {
      title: "Portfolio Review Session",
      date: "November 20, 2025",
      type: "Workshop",
      participants: 45,
      description: "Get constructive feedback on your portfolio from industry professionals."
    },
    {
      title: "Art Business Masterclass",
      date: "November 25, 2025",
      type: "Webinar",
      participants: 156,
      description: "Learn essential business skills for successful art careers."
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Artfolio Community</h1>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            Connect with fellow artists, share your work, and grow together.
            Join discussions, get feedback, and be part of a supportive creative community.
          </p>
        </div>

        {/* Community Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {communityStats.map((stat) => (
            <Card key={stat.label} className="bg-zinc-900/50 border-zinc-800">
              <CardContent className="p-6 text-center">
                <stat.icon className="w-8 h-8 text-zinc-400 mx-auto mb-3" />
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-zinc-400 text-sm mb-2">{stat.label}</div>
                <Badge variant="secondary" className="bg-green-900/20 text-green-400 text-xs">
                  {stat.change}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Discussions */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Recent Discussions</h2>
              <Button className="bg-zinc-800 hover:bg-zinc-700 text-white">
                <MessageCircle className="w-4 h-4 mr-2" />
                Start Discussion
              </Button>
            </div>

            <div className="space-y-4">
              {recentDiscussions.map((discussion) => (
                <Card key={discussion.id} className="bg-zinc-900/50 border-zinc-800 hover:bg-zinc-800/50 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={discussion.avatar} alt={discussion.author} />
                        <AvatarFallback>
                          <Users className="w-4 h-4" />
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-white font-medium hover:text-zinc-100 transition-colors cursor-pointer">
                            {discussion.title}
                          </h3>
                          {discussion.isHot && (
                            <Badge className="bg-red-900/20 text-red-400 text-xs">
                              <Zap className="w-3 h-3 mr-1" />
                              Hot
                            </Badge>
                          )}
                        </div>

                        <div className="flex items-center gap-4 text-sm text-zinc-500 mb-3">
                          <span>by {discussion.author}</span>
                          <Badge variant="outline" className="border-zinc-600 text-zinc-400 text-xs">
                            {discussion.category}
                          </Badge>
                          <span>{discussion.lastActivity}</span>
                        </div>

                        <div className="flex flex-wrap gap-1 mb-3">
                          {discussion.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="bg-zinc-800 text-zinc-300 text-xs">
                              #{tag}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex items-center gap-6 text-sm text-zinc-500">
                          <div className="flex items-center gap-1">
                            <MessageCircle className="w-4 h-4" />
                            {discussion.replies} replies
                          </div>
                          <div className="flex items-center gap-1">
                            <Heart className="w-4 h-4" />
                            {discussion.likes} likes
                          </div>
                          <div className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            {discussion.views} views
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Trending Topics */}
            <Card className="bg-zinc-900/50 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Trending Topics
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  {trendingTopics.map((topic, index) => (
                    <div key={topic.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-zinc-500 text-sm">#{index + 1}</span>
                        <span className="text-zinc-300 text-sm hover:text-white transition-colors cursor-pointer">
                          {topic.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-zinc-500 text-xs">{topic.posts}</span>
                        {topic.trend === "up" && (
                          <TrendingUp className="w-3 h-3 text-green-400" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Events */}
            <Card className="bg-zinc-900/50 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Upcoming Events
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-4">
                  {upcomingEvents.map((event, index) => (
                    <div key={index} className="border-l-2 border-zinc-700 pl-4">
                      <h4 className="text-white font-medium text-sm mb-1">{event.title}</h4>
                      <p className="text-zinc-400 text-xs mb-2">{event.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-zinc-500 text-xs">{event.date}</span>
                        <Badge variant="secondary" className="bg-zinc-800 text-zinc-300 text-xs">
                          {event.participants} attending
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Featured Artists */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Featured Artists</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredArtists.map((artist) => (
              <Card key={artist.username} className="bg-zinc-900/50 border-zinc-800">
                <CardContent className="p-6 text-center">
                  <Avatar className="w-16 h-16 mx-auto mb-4">
                    <AvatarImage src={artist.avatar} alt={artist.name} />
                    <AvatarFallback>
                      <Users className="w-6 h-6" />
                    </AvatarFallback>
                  </Avatar>

                  <h3 className="text-white font-semibold mb-1">{artist.name}</h3>
                  <p className="text-zinc-500 text-sm mb-2">@{artist.username}</p>
                  <Badge variant="secondary" className="bg-zinc-800 text-zinc-300 text-xs mb-3">
                    {artist.specialty}
                  </Badge>

                  <p className="text-zinc-400 text-sm mb-4">{artist.bio}</p>

                  <div className="flex justify-center gap-4 text-sm text-zinc-500 mb-4">
                    <div>
                      <div className="text-white font-medium">{artist.followers.toLocaleString()}</div>
                      <div>Followers</div>
                    </div>
                    <div>
                      <div className="text-white font-medium">{artist.artworks}</div>
                      <div>Artworks</div>
                    </div>
                  </div>

                  <Button className="w-full bg-zinc-800 hover:bg-zinc-700 text-white">
                    <UserPlus className="w-4 h-4 mr-2" />
                    Follow
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Community Guidelines */}
        <Card className="bg-zinc-900/50 border-zinc-800">
          <CardContent className="p-8">
            <div className="text-center mb-6">
              <Award className="w-12 h-12 text-zinc-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">Community Guidelines</h3>
              <p className="text-zinc-400">
                Help us maintain a positive and supportive environment for all artists.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <Heart className="w-8 h-8 text-red-400 mx-auto mb-3" />
                <h4 className="text-white font-medium mb-2">Be Respectful</h4>
                <p className="text-zinc-400 text-sm">
                  Treat others with kindness and respect. Constructive criticism is welcome, but always be considerate.
                </p>
              </div>

              <div className="text-center">
                <Share2 className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                <h4 className="text-white font-medium mb-2">Share & Support</h4>
                <p className="text-zinc-400 text-sm">
                  Share your work, provide feedback, and support fellow artists in their creative journeys.
                </p>
              </div>

              <div className="text-center">
                <Star className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
                <h4 className="text-white font-medium mb-2">Stay Authentic</h4>
                <p className="text-zinc-400 text-sm">
                  Be genuine in your interactions and celebrate the unique perspectives each artist brings.
                </p>
              </div>
            </div>

            <div className="text-center mt-6">
              <Link href="/docs/guidelines">
                <Button variant="outline" className="border-zinc-700 text-zinc-300 hover:bg-zinc-800">
                  Read Full Guidelines
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}