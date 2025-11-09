import Footer from "@/components/footer";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  HelpCircle,
  Search,
  ChevronRight,
  ExternalLink,
  Clock,
  CheckCircle,
  AlertCircle,
  Users,
  Mail,
  Book,
  MessageCircle,
  Code,
  Shield,
  FileText
} from "lucide-react";

export default function SupportPage() {
  const faqs = [
    {
      question: "How do I upload my artwork?",
      answer: "Sign up for an account, then click 'Create Artwork' from your dashboard. You can upload images up to 10MB each in JPG, PNG, or GIF formats. Add a title, description, and tags to help others discover your work.",
      category: "Getting Started"
    },
    {
      question: "Can I edit my artwork after publishing?",
      answer: "Yes! Go to your dashboard, find the artwork you want to edit, and click the 'Edit' button. You can update the title, description, tags, and even replace the image file.",
      category: "Artwork Management"
    },
    {
      question: "How do I get featured on the homepage?",
      answer: "High-quality artworks are automatically featured based on engagement (likes, comments, views) and community feedback. Focus on creating compelling descriptions and using relevant tags.",
      category: "Discovery"
    },
    {
      question: "What are the image requirements?",
      answer: "We support JPG, PNG, and GIF files up to 10MB each. For best results, use high-resolution images (at least 1200px on the longest side) with good lighting and composition.",
      category: "Technical"
    },
    {
      question: "How do I report inappropriate content?",
      answer: "Use the 'Report' button on any artwork or comment that violates our community guidelines. Our moderation team reviews reports within 24 hours.",
      category: "Community"
    },
    {
      question: "Can I delete my account?",
      answer: "Yes, you can delete your account from your profile settings. This will permanently remove all your artworks, comments, and profile information. This action cannot be undone.",
      category: "Account"
    },
    {
      question: "How do I change my profile information?",
      answer: "Go to your dashboard and click on your profile picture or name. You can update your bio, social links, and profile picture from the settings page.",
      category: "Account"
    },
    {
      question: "What should I do if I forgot my password?",
      answer: "Click 'Sign In' and then 'Forgot Password'. Enter your email address and we'll send you a link to reset your password. Check your spam folder if you don't see it.",
      category: "Account"
    }
  ];

  const supportChannels = [
    {
      title: "Community Forum",
      description: "Get help from other artists and share your experiences",
      icon: Users,
      action: "Join Discussion",
      href: "/community",
      available: "24/7",
      responseTime: "Community Response"
    },
    {
      title: "Email Support",
      description: "Send us a detailed message about your issue",
      icon: Mail,
      action: "Send Email",
      href: "/contact",
      available: "Mon-Fri, 9AM-6PM EST",
      responseTime: "Within 24 hours"
    },
    {
      title: "Documentation",
      description: "Browse our comprehensive guides and tutorials",
      icon: Book,
      action: "Browse Docs",
      href: "/docs",
      available: "Always Available",
      responseTime: "Instant"
    },
    {
      title: "Live Chat",
      description: "Chat with our support team in real-time",
      icon: MessageCircle,
      action: "Start Chat",
      href: "#",
      available: "Mon-Fri, 10AM-5PM EST",
      responseTime: "Immediate"
    }
  ];

  const quickLinks = [
    { title: "Getting Started Guide", href: "/docs/quick-start", icon: Book },
    { title: "Upload Troubleshooting", href: "/docs/upload-troubleshooting", icon: HelpCircle },
    { title: "Community Guidelines", href: "/docs/guidelines", icon: Users },
    { title: "API Documentation", href: "/docs/api-reference", icon: Code },
    { title: "Privacy Policy", href: "/privacy", icon: Shield },
    { title: "Terms of Service", href: "/terms", icon: FileText }
  ];

  return (
    <div className="min-h-screen bg-black">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Support Center</h1>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            Get the help you need to make the most of Artfolio. Browse our FAQs,
            contact support, or explore our comprehensive documentation.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search for help..."
              className="w-full pl-10 pr-4 py-3 bg-zinc-900/50 border border-zinc-700 rounded-lg text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:border-transparent"
            />
          </div>
        </div>

        {/* Support Channels */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Get Help</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {supportChannels.map((channel) => (
              <Card key={channel.title} className="bg-zinc-900/50 border-zinc-800 hover:bg-zinc-800/50 transition-colors">
                <CardContent className="p-6 text-center">
                  <channel.icon className="w-8 h-8 text-zinc-400 mx-auto mb-3" />
                  <h3 className="font-semibold text-white mb-2">{channel.title}</h3>
                  <p className="text-zinc-400 text-sm mb-4">{channel.description}</p>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-center gap-1 text-xs text-zinc-500">
                      <Clock className="w-3 h-3" />
                      {channel.available}
                    </div>
                    <div className="flex items-center justify-center gap-1 text-xs text-zinc-500">
                      <CheckCircle className="w-3 h-3" />
                      {channel.responseTime}
                    </div>
                  </div>
                  <Button
                    className="w-full bg-zinc-800 hover:bg-zinc-700 text-white"
                    asChild={channel.href !== "#"}
                  >
                    {channel.href === "#" ? (
                      <span>{channel.action}</span>
                    ) : (
                      <Link href={channel.href}>{channel.action}</Link>
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Quick Links</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {quickLinks.map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className="flex items-center gap-3 p-4 bg-zinc-900/50 border border-zinc-800 rounded-lg hover:bg-zinc-800/50 transition-colors group"
              >
                <link.icon className="w-5 h-5 text-zinc-400 group-hover:text-zinc-300 transition-colors" />
                <span className="text-zinc-300 group-hover:text-white transition-colors">{link.title}</span>
                <ChevronRight className="w-4 h-4 text-zinc-500 group-hover:text-zinc-400 transition-colors ml-auto" />
              </Link>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index} className="bg-zinc-900/50 border-zinc-800">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white text-lg">{faq.question}</CardTitle>
                    <Badge variant="secondary" className="bg-zinc-800 text-zinc-300 text-xs">
                      {faq.category}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-zinc-400">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Status & Updates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Card className="bg-zinc-900/50 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                System Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-zinc-300">Website</span>
                  <Badge className="bg-green-900/20 text-green-400 border-green-800/50">
                    Operational
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-zinc-300">API</span>
                  <Badge className="bg-green-900/20 text-green-400 border-green-800/50">
                    Operational
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-zinc-300">File Upload</span>
                  <Badge className="bg-green-900/20 text-green-400 border-green-800/50">
                    Operational
                  </Badge>
                </div>
              </div>
              <p className="text-zinc-500 text-sm mt-4">
                All systems operational. Last updated: 2 minutes ago
              </p>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900/50 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-blue-400" />
                Recent Updates
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                  <div>
                    <p className="text-zinc-300 text-sm font-medium">Enhanced Dashboard Analytics</p>
                    <p className="text-zinc-500 text-xs">November 8, 2025</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                  <div>
                    <p className="text-zinc-300 text-sm font-medium">Documentation Portal Launched</p>
                    <p className="text-zinc-500 text-xs">November 5, 2025</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-teal-400 rounded-full mt-2"></div>
                  <div>
                    <p className="text-zinc-300 text-sm font-medium">Portfolio Examples Added</p>
                    <p className="text-zinc-500 text-xs">November 3, 2025</p>
                  </div>
                </div>
              </div>
              <Link href="/changelog" className="inline-flex items-center gap-1 text-zinc-400 hover:text-white text-sm mt-4 transition-colors">
                View all updates <ExternalLink className="w-3 h-3" />
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Contact CTA */}
        <Card className="bg-zinc-900/50 border-zinc-800">
          <CardContent className="p-8 text-center">
            <HelpCircle className="w-12 h-12 text-zinc-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-4">Still Need Help?</h3>
            <p className="text-zinc-400 mb-6 max-w-lg mx-auto">
              Can&apos;t find the answer you&apos;re looking for? Our support team is here to help.
              Contact us and we&apos;ll get back to you as soon as possible.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button className="bg-zinc-800 hover:bg-zinc-700 text-white">
                  Contact Support
                </Button>
              </Link>
              <Link href="/docs">
                <Button variant="outline" className="border-zinc-700 text-zinc-300 hover:bg-zinc-800">
                  Browse Documentation
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