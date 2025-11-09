import Footer from "@/components/footer";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Book,
  Code,
  Palette,
  Upload,
  Users,
  BarChart3,
  Shield,
  Zap,
  ChevronRight,
  Search,
  FileText,
  Video
} from "lucide-react";

export default function DocsPage() {
  const docSections = [
    {
      title: "Getting Started",
      description: "Learn the basics of Artfolio and get up and running quickly.",
      icon: Zap,
      articles: [
        { title: "Quick Start Guide", href: "/docs/quick-start", type: "guide" },
        { title: "Creating Your Account", href: "/docs/account-setup", type: "tutorial" },
        { title: "Platform Overview", href: "/docs/overview", type: "guide" },
        { title: "First Artwork Upload", href: "/docs/first-upload", type: "tutorial" }
      ]
    },
    {
      title: "Creating Artworks",
      description: "Everything you need to know about uploading and managing your art.",
      icon: Upload,
      articles: [
        { title: "Upload Guidelines", href: "/docs/upload-guidelines", type: "guide" },
        { title: "Image Formats & Sizes", href: "/docs/image-formats", type: "reference" },
        { title: "Adding Descriptions", href: "/docs/descriptions", type: "tutorial" },
        { title: "Organizing Collections", href: "/docs/collections", type: "guide" }
      ]
    },
    {
      title: "Artist Tools",
      description: "Advanced features for managing your artistic career.",
      icon: Palette,
      articles: [
        { title: "Analytics Dashboard", href: "/docs/analytics", type: "guide" },
        { title: "Comment Management", href: "/docs/comments", type: "tutorial" },
        { title: "Portfolio Customization", href: "/docs/portfolio", type: "guide" },
        { title: "Artist Profile Setup", href: "/docs/profile", type: "tutorial" }
      ]
    },
    {
      title: "Community Features",
      description: "Connect with other artists and build your network.",
      icon: Users,
      articles: [
        { title: "Following Artists", href: "/docs/following", type: "tutorial" },
        { title: "Liking & Commenting", href: "/docs/interactions", type: "guide" },
        { title: "Community Guidelines", href: "/docs/guidelines", type: "reference" },
        { title: "Reporting Content", href: "/docs/reporting", type: "guide" }
      ]
    },
    {
      title: "API & Integration",
      description: "Technical documentation for developers and integrations.",
      icon: Code,
      articles: [
        { title: "API Reference", href: "/docs/api-reference", type: "reference" },
        { title: "Authentication", href: "/docs/authentication", type: "guide" },
        { title: "Webhooks", href: "/docs/webhooks", type: "tutorial" },
        { title: "Rate Limits", href: "/docs/rate-limits", type: "reference" }
      ]
    },
    {
      title: "Account & Security",
      description: "Manage your account settings and privacy preferences.",
      icon: Shield,
      articles: [
        { title: "Privacy Settings", href: "/docs/privacy-settings", type: "guide" },
        { title: "Two-Factor Authentication", href: "/docs/2fa", type: "tutorial" },
        { title: "Account Deletion", href: "/docs/account-deletion", type: "guide" },
        { title: "Security Best Practices", href: "/docs/security", type: "reference" }
      ]
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case "guide": return "bg-blue-900/20 text-blue-400 border-blue-800/50";
      case "tutorial": return "bg-green-900/20 text-green-400 border-green-800/50";
      case "reference": return "bg-purple-900/20 text-purple-400 border-purple-800/50";
      default: return "bg-zinc-900/20 text-zinc-400 border-zinc-800/50";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "guide": return <Book className="w-3 h-3" />;
      case "tutorial": return <Video className="w-3 h-3" />;
      case "reference": return <FileText className="w-3 h-3" />;
      default: return <FileText className="w-3 h-3" />;
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Documentation</h1>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            Comprehensive guides, tutorials, and references to help you make the most of Artfolio.
            Whether you&apos;re just getting started or looking for advanced features, we&apos;ve got you covered.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search documentation..."
              className="w-full pl-10 pr-4 py-3 bg-zinc-900/50 border border-zinc-700 rounded-lg text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:border-transparent"
            />
          </div>
        </div>

        {/* Quick Start CTA */}
        <Card className="bg-gradient-to-r from-zinc-900/50 to-zinc-800/50 border-zinc-700 mb-12">
          <CardContent className="p-8 text-center">
            <Zap className="w-12 h-12 text-zinc-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-4">New to Artfolio?</h2>
            <p className="text-zinc-400 mb-6 max-w-lg mx-auto">
              Get started with our comprehensive quick start guide. Learn the basics in under 10 minutes.
            </p>
            <Button className="bg-zinc-800 hover:bg-zinc-700 text-white">
              <Book className="w-4 h-4 mr-2" />
              Start Learning
            </Button>
          </CardContent>
        </Card>

        {/* Documentation Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {docSections.map((section) => (
            <Card key={section.title} className="bg-zinc-900/50 border-zinc-800">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <section.icon className="w-6 h-6 text-zinc-400" />
                  <CardTitle className="text-white">{section.title}</CardTitle>
                </div>
                <p className="text-zinc-400 text-sm">{section.description}</p>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  {section.articles.map((article) => (
                    <Link
                      key={article.href}
                      href={article.href}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-zinc-800/50 transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <Badge className={`text-xs border ${getTypeColor(article.type)}`}>
                          <div className="flex items-center gap-1">
                            {getTypeIcon(article.type)}
                            {article.type}
                          </div>
                        </Badge>
                        <span className="text-zinc-300 group-hover:text-white transition-colors">
                          {article.title}
                        </span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-zinc-500 group-hover:text-zinc-400 transition-colors" />
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Popular Topics */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Popular Topics</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { title: "Upload Artwork", icon: Upload, href: "/docs/upload-guidelines" },
              { title: "View Analytics", icon: BarChart3, href: "/docs/analytics" },
              { title: "Manage Comments", icon: Users, href: "/docs/comments" },
              { title: "API Integration", icon: Code, href: "/docs/api-reference" }
            ].map((topic) => (
              <Link
                key={topic.title}
                href={topic.href}
                className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-6 hover:bg-zinc-800/50 transition-colors text-center group"
              >
                <topic.icon className="w-8 h-8 text-zinc-400 mx-auto mb-3 group-hover:text-zinc-300 transition-colors" />
                <h3 className="text-white font-medium group-hover:text-zinc-100 transition-colors">
                  {topic.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>

        {/* Help Section */}
        <Card className="bg-zinc-900/50 border-zinc-800">
          <CardContent className="p-8 text-center">
            <h3 className="text-xl font-bold text-white mb-4">Still Need Help?</h3>
            <p className="text-zinc-400 mb-6">
              Can&apos;t find what you&apos;re looking for? Our support team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" className="border-zinc-700 text-zinc-300 hover:bg-zinc-800">
                <Users className="w-4 h-4 mr-2" />
                Community Forum
              </Button>
              <Link href="/contact">
                <Button className="bg-zinc-800 hover:bg-zinc-700 text-white">
                  Contact Support
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