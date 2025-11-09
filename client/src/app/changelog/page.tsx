import Footer from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  CheckCircle,
  Zap,
  Bug,
  Sparkles,
  Shield
} from "lucide-react";

export default function ChangelogPage() {
  const changelogEntries = [
    {
      version: "2.1.0",
      date: "November 8, 2025",
      type: "major",
      title: "Enhanced Dashboard & Analytics",
      description: "Complete redesign of the creator dashboard with comprehensive analytics, improved navigation, and new management tools.",
      changes: [
        { type: "feature", text: "Added detailed analytics dashboard with artwork performance metrics" },
        { type: "feature", text: "Implemented comments management system for artists" },
        { type: "feature", text: "Enhanced dashboard navigation with quick action cards" },
        { type: "improvement", text: "Improved mobile responsiveness across all dashboard pages" },
        { type: "improvement", text: "Added real-time notifications for new comments and likes" }
      ]
    },
    {
      version: "2.0.5",
      date: "November 5, 2025",
      type: "minor",
      title: "Documentation & Examples Hub",
      description: "Launched comprehensive documentation and portfolio examples to help artists get started and find inspiration.",
      changes: [
        { type: "feature", text: "Added complete documentation portal with guides and tutorials" },
        { type: "feature", text: "Created portfolio examples gallery showcasing different art styles" },
        { type: "feature", text: "Implemented blog system for art industry insights" },
        { type: "improvement", text: "Enhanced search functionality across documentation" }
      ]
    },
    {
      version: "2.0.0",
      date: "October 28, 2025",
      type: "major",
      title: "Platform Redesign & Performance",
      description: "Major platform overhaul with improved performance, modern UI design, and enhanced user experience.",
      changes: [
        { type: "feature", text: "Complete UI redesign with dark theme and modern components" },
        { type: "feature", text: "Implemented Next.js 15 with App Router for better performance" },
        { type: "improvement", text: "Optimized image loading and caching for faster page loads" },
        { type: "improvement", text: "Enhanced mobile experience with responsive design" },
        { type: "feature", text: "Added comprehensive error boundaries and loading states" }
      ]
    },
    {
      version: "1.9.2",
      date: "October 20, 2025",
      type: "patch",
      title: "Security & Bug Fixes",
      description: "Security improvements and critical bug fixes to enhance platform stability.",
      changes: [
        { type: "security", text: "Enhanced authentication security with improved token handling" },
        { type: "fix", text: "Fixed MongoDB connection issues in production environment" },
        { type: "fix", text: "Resolved React hydration mismatches in artwork components" },
        { type: "fix", text: "Fixed image upload validation for unsupported formats" }
      ]
    },
    {
      version: "1.9.0",
      date: "October 15, 2025",
      type: "minor",
      title: "Community Features",
      description: "Added social features to help artists connect and engage with their audience.",
      changes: [
        { type: "feature", text: "Implemented liking and commenting system for artworks" },
        { type: "feature", text: "Added artist following functionality" },
        { type: "feature", text: "Created community guidelines and moderation tools" },
        { type: "improvement", text: "Enhanced user profiles with social links and bio" }
      ]
    },
    {
      version: "1.8.0",
      date: "October 1, 2025",
      type: "minor",
      title: "Advanced Upload Features",
      description: "Enhanced artwork upload system with better file handling and organization tools.",
      changes: [
        { type: "feature", text: "Added support for multiple image formats and sizes" },
        { type: "feature", text: "Implemented artwork collections and organization" },
        { type: "improvement", text: "Enhanced upload progress indicators and error handling" },
        { type: "feature", text: "Added bulk upload functionality for multiple artworks" }
      ]
    },
    {
      version: "1.7.0",
      date: "September 15, 2025",
      type: "minor",
      title: "Artist Dashboard Launch",
      description: "Introduced the creator dashboard for artists to manage their portfolios and track performance.",
      changes: [
        { type: "feature", text: "Created comprehensive artist dashboard" },
        { type: "feature", text: "Added artwork management and editing tools" },
        { type: "feature", text: "Implemented basic analytics and statistics" },
        { type: "improvement", text: "Enhanced user experience for content creators" }
      ]
    },
    {
      version: "1.6.0",
      date: "September 1, 2025",
      type: "minor",
      title: "Explore & Discovery",
      description: "Launched the explore page with advanced filtering and search capabilities.",
      changes: [
        { type: "feature", text: "Added explore page with artwork discovery" },
        { type: "feature", text: "Implemented advanced search and filtering" },
        { type: "feature", text: "Added trending and featured artwork sections" },
        { type: "improvement", text: "Enhanced artwork grid layout and performance" }
      ]
    },
    {
      version: "1.5.0",
      date: "August 15, 2025",
      type: "minor",
      title: "User Authentication",
      description: "Implemented secure user authentication system with social login options.",
      changes: [
        { type: "feature", text: "Added NextAuth.js integration for authentication" },
        { type: "feature", text: "Implemented social login (Google, GitHub)" },
        { type: "feature", text: "Created user registration and login flows" },
        { type: "security", text: "Added secure password hashing and session management" }
      ]
    },
    {
      version: "1.0.0",
      date: "August 1, 2025",
      type: "major",
      title: "Artfolio Launch",
      description: "Initial launch of Artfolio - a modern art portfolio platform for creators.",
      changes: [
        { type: "feature", text: "Basic artwork upload and display functionality" },
        { type: "feature", text: "User profiles and portfolio pages" },
        { type: "feature", text: "Responsive design with dark theme" },
        { type: "feature", text: "MongoDB integration for data storage" }
      ]
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "feature": return <Sparkles className="w-4 h-4 text-green-400" />;
      case "improvement": return <Zap className="w-4 h-4 text-blue-400" />;
      case "fix": return <Bug className="w-4 h-4 text-orange-400" />;
      case "security": return <Shield className="w-4 h-4 text-red-400" />;
      default: return <CheckCircle className="w-4 h-4 text-zinc-400" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "feature": return "text-green-400";
      case "improvement": return "text-blue-400";
      case "fix": return "text-orange-400";
      case "security": return "text-red-400";
      default: return "text-zinc-400";
    }
  };

  const getVersionBadgeColor = (type: string) => {
    switch (type) {
      case "major": return "bg-red-900/20 text-red-400 border-red-800/50";
      case "minor": return "bg-blue-900/20 text-blue-400 border-blue-800/50";
      case "patch": return "bg-green-900/20 text-green-400 border-green-800/50";
      default: return "bg-zinc-900/20 text-zinc-400 border-zinc-800/50";
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Changelog</h1>
          <p className="text-zinc-400 text-lg">
            Stay updated with the latest features, improvements, and fixes.
            See what&apos;s new and what&apos;s changed in each version of Artfolio.
          </p>
        </div>

        {/* Current Version Highlight */}
        <Card className="bg-gradient-to-r from-zinc-900/50 to-zinc-800/50 border-zinc-700 mb-12">
          <CardContent className="p-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Badge className={`${getVersionBadgeColor(changelogEntries[0].type)} border`}>
                  v{changelogEntries[0].version}
                </Badge>
                <span className="text-zinc-400 text-sm flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {changelogEntries[0].date}
                </span>
              </div>
              <Badge variant="secondary" className="bg-zinc-800 text-zinc-300">
                Latest Release
              </Badge>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">{changelogEntries[0].title}</h2>
            <p className="text-zinc-400 mb-4">{changelogEntries[0].description}</p>
            <div className="space-y-2">
              {changelogEntries[0].changes.map((change, index) => (
                <div key={index} className="flex items-start gap-3">
                  {getTypeIcon(change.type)}
                  <span className={`text-sm ${getTypeColor(change.type)}`}>
                    {change.text}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Version History */}
        <div className="space-y-8">
          <h2 className="text-2xl font-bold text-white">Version History</h2>

          {changelogEntries.slice(1).map((entry, index) => (
            <Card key={entry.version} className="bg-zinc-900/50 border-zinc-800">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Badge className={`${getVersionBadgeColor(entry.type)} border`}>
                      v{entry.version}
                    </Badge>
                    <span className="text-zinc-400 text-sm flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {entry.date}
                    </span>
                  </div>
                  {index === 0 && (
                    <Badge variant="secondary" className="bg-zinc-800 text-zinc-300">
                      Recent
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-white text-xl">{entry.title}</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-zinc-400 mb-4">{entry.description}</p>
                <div className="space-y-2">
                  {entry.changes.map((change, changeIndex) => (
                    <div key={changeIndex} className="flex items-start gap-3">
                      {getTypeIcon(change.type)}
                      <span className={`text-sm ${getTypeColor(change.type)}`}>
                        {change.text}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Newsletter Signup */}
        <Card className="bg-zinc-900/50 border-zinc-800 mt-12">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">Stay Updated</h3>
            <p className="text-zinc-400 mb-6">
              Get notified about new releases and features. Subscribe to our changelog updates.
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
            <p className="text-zinc-500 text-sm mt-3">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}