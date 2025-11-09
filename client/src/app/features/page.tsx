import Footer from "@/components/footer";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Upload,
  BarChart3,
  Users,
  Palette,
  Shield,
  Zap,
  Globe,
  MessageCircle,
  Star,
  CheckCircle,
  ArrowRight,
  Sparkles
} from "lucide-react";

export default function FeaturesPage() {
  const coreFeatures = [
    {
      icon: Upload,
      title: "Easy Artwork Upload",
      description: "Upload your artwork with our intuitive interface. Support for multiple formats with automatic optimization.",
      benefits: ["Drag & drop upload", "Multiple file formats", "Automatic image optimization", "Bulk upload support"],
      color: "blue"
    },
    {
      icon: BarChart3,
      title: "Analytics Dashboard",
      description: "Track your artwork performance with detailed analytics and insights to grow your audience.",
      benefits: ["View statistics", "Engagement metrics", "Audience insights", "Performance trends"],
      color: "green"
    },
    {
      icon: Users,
      title: "Community Engagement",
      description: "Connect with fellow artists, get feedback, and build relationships in our supportive community.",
      benefits: ["Artist networking", "Feedback system", "Community discussions", "Collaborative features"],
      color: "teal"
    },
    {
      icon: Palette,
      title: "Portfolio Customization",
      description: "Create a stunning portfolio that reflects your unique artistic style and professional brand.",
      benefits: ["Custom layouts", "Theme options", "SEO optimization", "Mobile responsive"],
      color: "cyan"
    }
  ];

  const advancedFeatures = [
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your artwork and data are protected with enterprise-grade security and privacy controls.",
      details: ["End-to-end encryption", "Secure file storage", "Privacy controls", "Regular backups"]
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Optimized performance ensures your portfolio loads quickly and provides a smooth user experience.",
      details: ["Global CDN", "Image optimization", "Caching layers", "Performance monitoring"]
    },
    {
      icon: Globe,
      title: "Global Reach",
      description: "Share your work with an international audience and discover art from around the world.",
      details: ["Multi-language support", "Global community", "International exposure", "Cross-cultural connections"]
    },
    {
      icon: MessageCircle,
      title: "Direct Communication",
      description: "Communicate directly with your audience through comments, messages, and feedback systems.",
      details: ["Comment system", "Direct messaging", "Notification system", "Feedback tools"]
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Digital Illustrator",
      avatar: "/avatars/sarah.jpg",
      quote: "Artfolio transformed how I showcase my work. The analytics help me understand what resonates with my audience, and the community is incredibly supportive.",
      rating: 5,
      improvement: "+300% more views"
    },
    {
      name: "Mike Johnson",
      role: "3D Artist",
      avatar: "/avatars/mike.jpg",
      quote: "The platform's ease of use and professional features helped me land my dream job. The portfolio customization options are outstanding.",
      rating: 5,
      improvement: "Got featured in 3 exhibitions"
    },
    {
      name: "Emma Wilson",
      role: "Traditional Artist",
      avatar: "/avatars/emma.jpg",
      quote: "Finally, a platform that understands artists! The community engagement features have connected me with amazing collaborators and collectors.",
      rating: 5,
      improvement: "+150% sales increase"
    }
  ];

  const pricingFeatures = [
    { name: "Unlimited artwork uploads", included: true },
    { name: "Advanced analytics dashboard", included: true },
    { name: "Community features", included: true },
    { name: "Custom portfolio domain", included: true },
    { name: "Priority support", included: true },
    { name: "Commercial license", included: false },
    { name: "White-label solution", included: false }
  ];

  return (
    <div className="min-h-screen bg-black">
      <main>
        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-5xl font-bold text-white mb-6">
              Powerful Features for
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400">
                {" "}Creative Professionals
              </span>
            </h1>
            <p className="text-xl text-zinc-400 mb-8 max-w-3xl mx-auto">
              Everything you need to showcase your art, grow your audience, and build a successful creative career.
              Join thousands of artists who trust Artfolio with their portfolios.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup">
                <Button className="bg-zinc-800 hover:bg-zinc-700 text-white px-8 py-3">
                  Start Free Trial
                </Button>
              </Link>
              <Button variant="outline" className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 px-8 py-3">
                View Examples
              </Button>
            </div>
          </div>
        </section>

        {/* Core Features */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-zinc-900/20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-white mb-4">Core Features</h2>
              <p className="text-zinc-400 text-lg">
                Essential tools every artist needs to succeed in the digital age.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {coreFeatures.map((feature, index) => (
                <Card key={index} className="bg-zinc-900/50 border-zinc-800 hover:bg-zinc-800/50 transition-colors">
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 bg-zinc-800 rounded-lg">
                        <feature.icon className="w-6 h-6 text-zinc-400" />
                      </div>
                      <div>
                        <CardTitle className="text-white">{feature.title}</CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-zinc-400 mb-6">{feature.description}</p>
                    <ul className="space-y-2">
                      {feature.benefits.map((benefit, benefitIndex) => (
                        <li key={benefitIndex} className="flex items-center gap-2 text-sm text-zinc-300">
                          <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Advanced Features */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-white mb-4">Advanced Capabilities</h2>
              <p className="text-zinc-400 text-lg">
                Professional-grade features that scale with your creative career.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {advancedFeatures.map((feature, index) => (
                <div key={index} className="text-center">
                  <div className="p-4 bg-zinc-900/50 rounded-lg border border-zinc-800 mb-4">
                    <feature.icon className="w-8 h-8 text-zinc-400 mx-auto mb-3" />
                    <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
                    <p className="text-zinc-400 text-sm mb-4">{feature.description}</p>
                    <ul className="text-left space-y-1">
                      {feature.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="text-xs text-zinc-500 flex items-center gap-1">
                          <div className="w-1 h-1 bg-zinc-500 rounded-full"></div>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-zinc-900/20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-white mb-4">Loved by Artists Worldwide</h2>
              <p className="text-zinc-400 text-lg">
                See how Artfolio has transformed the careers of creative professionals.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="bg-zinc-900/50 border-zinc-800">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <blockquote className="text-zinc-300 mb-6 italic">
                      &quot;{testimonial.quote}&quot;
                    </blockquote>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-zinc-800 rounded-full flex items-center justify-center">
                        <Users className="w-4 h-4 text-zinc-400" />
                      </div>
                      <div>
                        <div className="text-white font-medium">{testimonial.name}</div>
                        <div className="text-zinc-500 text-sm">{testimonial.role}</div>
                      </div>
                    </div>
                    <Badge className="bg-green-900/20 text-green-400 border-green-800/50">
                      {testimonial.improvement}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Comparison */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-white mb-4">Everything You Need</h2>
              <p className="text-zinc-400 text-lg">
                One platform, unlimited possibilities. All features included with your Artfolio account.
              </p>
            </div>

            <Card className="bg-gradient-to-r from-zinc-900/50 to-zinc-800/50 border-zinc-700">
              <CardHeader className="text-center pb-8">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Sparkles className="w-6 h-6 text-yellow-400" />
                  <Badge className="bg-zinc-800 text-zinc-300">Free Forever</Badge>
                </div>
                <CardTitle className="text-3xl text-white mb-2">Artfolio Pro</CardTitle>
                <div className="text-5xl font-bold text-white mb-4">$0<span className="text-lg text-zinc-400">/month</span></div>
                <p className="text-zinc-400">All features included, no hidden fees, no premium tiers.</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4 mb-8">
                  {pricingFeatures.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      {feature.included ? (
                        <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                      ) : (
                        <div className="w-5 h-5 border border-zinc-600 rounded flex-shrink-0"></div>
                      )}
                      <span className={feature.included ? "text-zinc-300" : "text-zinc-500"}>
                        {feature.name}
                      </span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full bg-zinc-800 hover:bg-zinc-700 text-white py-3">
                  Get Started Free
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-zinc-900/20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Showcase Your Art?</h2>
            <p className="text-zinc-400 text-lg mb-8">
              Join thousands of artists who have found success with Artfolio.
              Start building your professional portfolio today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup">
                <Button className="bg-zinc-800 hover:bg-zinc-700 text-white px-8 py-3">
                  Create Your Portfolio
                </Button>
              </Link>
              <Link href="/examples">
                <Button variant="outline" className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 px-8 py-3">
                  View Examples
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}