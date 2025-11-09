import Footer from "@/components/footer";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ArrowRight, User } from "lucide-react";

export default function BlogPage() {
  // Mock blog posts data
  const blogPosts = [
    {
      id: 1,
      title: "The Art of Digital Illustration: Tips from Professional Artists",
      excerpt: "Discover the techniques and tools that professional digital artists use to create stunning illustrations. From sketching to final polish, learn the workflow that brings ideas to life.",
      author: "Sarah Chen",
      date: "2025-11-08",
      readTime: "5 min read",
      category: "Digital Art",
      featured: true,
      image: "/blog/digital-art.jpg"
    },
    {
      id: 2,
      title: "Building a Successful Art Portfolio: What Really Matters",
      excerpt: "Learn how to curate your artwork portfolio to showcase your best work and attract the right opportunities. Focus on quality over quantity and tell your unique story.",
      author: "Mike Johnson",
      date: "2025-11-05",
      readTime: "7 min read",
      category: "Career",
      featured: false,
      image: "/blog/portfolio.jpg"
    },
    {
      id: 3,
      title: "Color Theory in Modern Art: Breaking the Rules",
      excerpt: "Explore how contemporary artists are using color theory in innovative ways. From monochromatic palettes to bold experimental combinations, see how color drives emotion and meaning.",
      author: "Emma Wilson",
      date: "2025-11-03",
      readTime: "6 min read",
      category: "Theory",
      featured: false,
      image: "/blog/color-theory.jpg"
    },
    {
      id: 4,
      title: "NFT Art Market: Opportunities and Challenges for Artists",
      excerpt: "A comprehensive guide to navigating the NFT art market. Understand the technology, marketplace dynamics, and how to protect your digital creations.",
      author: "Alex Rivera",
      date: "2025-10-30",
      readTime: "8 min read",
      category: "Digital",
      featured: false,
      image: "/blog/nft-market.jpg"
    },
    {
      id: 5,
      title: "Traditional vs Digital: Finding Your Artistic Voice",
      excerpt: "Compare traditional and digital art mediums and discover how to blend techniques for unique results. Every artist has their own journey to finding their authentic voice.",
      author: "Lisa Park",
      date: "2025-10-28",
      readTime: "4 min read",
      category: "Technique",
      featured: false,
      image: "/blog/traditional-digital.jpg"
    },
    {
      id: 6,
      title: "Mental Health and the Creative Process",
      excerpt: "Important insights on maintaining mental wellness while pursuing creative work. Learn strategies for dealing with creative blocks, imposter syndrome, and burnout.",
      author: "Dr. James Mitchell",
      date: "2025-10-25",
      readTime: "6 min read",
      category: "Wellness",
      featured: false,
      image: "/blog/mental-health.jpg"
    }
  ];

  const categories = ["All", "Digital Art", "Career", "Theory", "Digital", "Technique", "Wellness"];

  return (
    <div className="min-h-screen bg-black">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Artfolio Blog</h1>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            Insights, tutorials, and inspiration for artists and creators.
            Discover new techniques, industry trends, and creative inspiration.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <Badge
              key={category}
              variant={category === "All" ? "default" : "secondary"}
              className={`cursor-pointer px-4 py-2 ${
                category === "All"
                  ? "bg-zinc-800 hover:bg-zinc-700 text-white"
                  : "bg-zinc-900 hover:bg-zinc-800 text-zinc-300"
              }`}
            >
              {category}
            </Badge>
          ))}
        </div>

        {/* Featured Post */}
        {blogPosts.find(post => post.featured) && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">Featured Article</h2>
            <Card className="bg-zinc-900/50 border-zinc-800 overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <div className="h-64 md:h-full bg-zinc-800 flex items-center justify-center">
                    <span className="text-zinc-500">Featured Image</span>
                  </div>
                </div>
                <div className="md:w-1/2 p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <Badge className="bg-zinc-800 text-zinc-300">
                      {blogPosts.find(post => post.featured)?.category}
                    </Badge>
                    <div className="flex items-center text-zinc-500 text-sm">
                      <Calendar className="w-4 h-4 mr-1" />
                      {blogPosts.find(post => post.featured)?.date}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {blogPosts.find(post => post.featured)?.title}
                  </h3>
                  <p className="text-zinc-400 mb-6">
                    {blogPosts.find(post => post.featured)?.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-zinc-500 text-sm">
                      <User className="w-4 h-4" />
                      {blogPosts.find(post => post.featured)?.author}
                      <span className="mx-2">•</span>
                      <Clock className="w-4 h-4 mr-1" />
                      {blogPosts.find(post => post.featured)?.readTime}
                    </div>
                    <Link
                      href={`/blog/${blogPosts.find(post => post.featured)?.id}`}
                      className="text-zinc-400 hover:text-white flex items-center gap-1 transition-colors"
                    >
                      Read More <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Blog Posts Grid */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Latest Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.filter(post => !post.featured).map((post) => (
              <Card key={post.id} className="bg-zinc-900/50 border-zinc-800 overflow-hidden hover:bg-zinc-800/50 transition-colors">
                <div className="h-48 bg-zinc-800 flex items-center justify-center">
                  <span className="text-zinc-500">{post.category}</span>
                </div>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary" className="bg-zinc-800 text-zinc-300 text-xs">
                      {post.category}
                    </Badge>
                    <span className="text-zinc-500 text-xs">{post.date}</span>
                  </div>
                  <CardTitle className="text-white text-lg leading-tight">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-zinc-400 text-sm mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-zinc-500">
                    <div className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {post.author}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </div>
                  </div>
                  <Link
                    href={`/blog/${post.id}`}
                    className="inline-flex items-center gap-1 text-zinc-400 hover:text-white text-sm mt-3 transition-colors"
                  >
                    Read Article <ArrowRight className="w-3 h-3" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Newsletter Signup */}
        <Card className="bg-zinc-900/50 border-zinc-800">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">Stay Updated</h3>
            <p className="text-zinc-400 mb-6 max-w-md mx-auto">
              Subscribe to our newsletter for the latest articles, tutorials, and art industry insights.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-600"
              />
              <button className="px-6 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-md transition-colors">
                Subscribe
              </button>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}