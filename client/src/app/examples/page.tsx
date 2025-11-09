import Footer from "@/components/footer";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Palette,
  Camera,
  Code,
  PenTool,
  Image,
  ExternalLink,
  Eye,
  Heart,
  MessageCircle,
  Star
} from "lucide-react";

export default function ExamplesPage() {
  const examplePortfolios = [
    {
      id: 1,
      title: "Digital Illustrator Portfolio",
      artist: "Alex Rivera",
      description: "A vibrant showcase of digital illustrations featuring character design and concept art. Clean layout with hover effects and smooth animations.",
      category: "Digital Art",
      style: "Modern",
      views: 2450,
      likes: 189,
      comments: 23,
      featured: true,
      image: "/examples/digital-illustrator.jpg",
      tags: ["Character Design", "Concept Art", "Digital Painting"],
      link: "/artist/alex-rivera"
    },
    {
      id: 2,
      title: "Photographer's Gallery",
      artist: "Sarah Chen",
      description: "Minimalist photography portfolio with stunning landscape and portrait work. Grid layout with lightbox functionality and client testimonials.",
      category: "Photography",
      style: "Minimalist",
      views: 3200,
      likes: 267,
      comments: 45,
      featured: false,
      image: "/examples/photographer.jpg",
      tags: ["Landscape", "Portrait", "Street Photography"],
      link: "/artist/sarah-chen"
    },
    {
      id: 3,
      title: "3D Artist Showcase",
      artist: "Mike Johnson",
      description: "Immersive 3D art portfolio with interactive models and animations. Dark theme with neon accents perfect for sci-fi and fantasy work.",
      category: "3D Art",
      style: "Interactive",
      views: 1890,
      likes: 156,
      comments: 31,
      featured: false,
      image: "/examples/3d-artist.jpg",
      tags: ["3D Modeling", "Animation", "Sci-Fi"],
      link: "/artist/mike-johnson"
    },
    {
      id: 4,
      title: "Traditional Artist Gallery",
      artist: "Emma Wilson",
      description: "Warm, inviting portfolio for traditional media artists. Features oil paintings, watercolors, and sketches with detailed process shots.",
      category: "Traditional",
      style: "Classic",
      views: 2750,
      likes: 203,
      comments: 28,
      featured: false,
      image: "/examples/traditional-artist.jpg",
      tags: ["Oil Painting", "Watercolor", "Sketching"],
      link: "/artist/emma-wilson"
    },
    {
      id: 5,
      title: "Concept Artist Portfolio",
      artist: "David Kim",
      description: "Bold, cinematic concept art portfolio with movie posters, game concepts, and world-building illustrations. Dramatic lighting and typography.",
      category: "Concept Art",
      style: "Cinematic",
      views: 3100,
      likes: 298,
      comments: 52,
      featured: false,
      image: "/examples/concept-artist.jpg",
      tags: ["Game Art", "Movie Posters", "World Building"],
      link: "/artist/david-kim"
    },
    {
      id: 6,
      title: "Graphic Designer Hub",
      artist: "Lisa Park",
      description: "Versatile design portfolio showcasing branding, UI/UX, and print design. Clean, professional layout with case studies and design process.",
      category: "Graphic Design",
      style: "Professional",
      views: 1980,
      likes: 145,
      comments: 19,
      featured: false,
      image: "/examples/graphic-designer.jpg",
      tags: ["Branding", "UI/UX", "Print Design"],
      link: "/artist/lisa-park"
    }
  ];

  const categories = [
    { name: "All", icon: Palette, count: 24 },
    { name: "Digital Art", icon: PenTool, count: 8 },
    { name: "Photography", icon: Camera, count: 6 },
    { name: "3D Art", icon: Code, count: 4 },
    { name: "Traditional", icon: Image, count: 3 },
    { name: "Graphic Design", icon: PenTool, count: 3 }
  ];

  return (
    <div className="min-h-screen bg-black">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Portfolio Examples</h1>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            Get inspired by successful artist portfolios on Artfolio. Browse examples across different art styles,
            discover trending layouts, and find the perfect template for your work.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <Badge
              key={category.name}
              variant={category.name === "All" ? "default" : "secondary"}
              className={`cursor-pointer px-4 py-2 flex items-center gap-2 ${
                category.name === "All"
                  ? "bg-zinc-800 hover:bg-zinc-700 text-white"
                  : "bg-zinc-900 hover:bg-zinc-800 text-zinc-300"
              }`}
            >
              <category.icon className="w-4 h-4" />
              {category.name}
              <span className="text-xs opacity-75">({category.count})</span>
            </Badge>
          ))}
        </div>

        {/* Featured Example */}
        {examplePortfolios.find(p => p.featured) && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">Featured Portfolio</h2>
            <Card className="bg-zinc-900/50 border-zinc-800 overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <div className="h-64 md:h-full bg-zinc-800 flex items-center justify-center">
                    <span className="text-zinc-500">Portfolio Preview</span>
                  </div>
                </div>
                <div className="md:w-1/2 p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <Badge className="bg-zinc-800 text-zinc-300">
                      {examplePortfolios.find(p => p.featured)?.category}
                    </Badge>
                    <Badge variant="outline" className="border-zinc-600 text-zinc-400">
                      {examplePortfolios.find(p => p.featured)?.style}
                    </Badge>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {examplePortfolios.find(p => p.featured)?.title}
                  </h3>
                  <p className="text-zinc-400 mb-4">
                    by {examplePortfolios.find(p => p.featured)?.artist}
                  </p>
                  <p className="text-zinc-400 mb-6">
                    {examplePortfolios.find(p => p.featured)?.description}
                  </p>

                  {/* Stats */}
                  <div className="flex items-center gap-6 mb-6">
                    <div className="flex items-center gap-1 text-zinc-500">
                      <Eye className="w-4 h-4" />
                      <span className="text-sm">{examplePortfolios.find(p => p.featured)?.views}</span>
                    </div>
                    <div className="flex items-center gap-1 text-zinc-500">
                      <Heart className="w-4 h-4" />
                      <span className="text-sm">{examplePortfolios.find(p => p.featured)?.likes}</span>
                    </div>
                    <div className="flex items-center gap-1 text-zinc-500">
                      <MessageCircle className="w-4 h-4" />
                      <span className="text-sm">{examplePortfolios.find(p => p.featured)?.comments}</span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {examplePortfolios.find(p => p.featured)?.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="bg-zinc-800 text-zinc-300 text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <Button className="bg-zinc-800 hover:bg-zinc-700 text-white">
                      <Eye className="w-4 h-4 mr-2" />
                      View Portfolio
                    </Button>
                    <Button variant="outline" className="border-zinc-700 text-zinc-300 hover:bg-zinc-800">
                      <Star className="w-4 h-4 mr-2" />
                      Save Template
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Portfolio Grid */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Explore Examples</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {examplePortfolios.filter(p => !p.featured).map((portfolio) => (
              <Card key={portfolio.id} className="bg-zinc-900/50 border-zinc-800 overflow-hidden hover:bg-zinc-800/50 transition-colors group">
                <div className="h-48 bg-zinc-800 flex items-center justify-center relative">
                  <span className="text-zinc-500">{portfolio.category}</span>
                  <div className="absolute top-3 right-3">
                    <Badge variant="secondary" className="bg-black/50 text-white text-xs">
                      {portfolio.style}
                    </Badge>
                  </div>
                </div>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="border-zinc-600 text-zinc-400 text-xs">
                      {portfolio.category}
                    </Badge>
                    <div className="flex items-center gap-1 text-zinc-500 text-xs">
                      <Star className="w-3 h-3" />
                      4.8
                    </div>
                  </div>
                  <CardTitle className="text-white text-lg leading-tight group-hover:text-zinc-100 transition-colors">
                    {portfolio.title}
                  </CardTitle>
                  <p className="text-zinc-400 text-sm">by {portfolio.artist}</p>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-zinc-400 text-sm mb-4 line-clamp-2">
                    {portfolio.description}
                  </p>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-xs text-zinc-500 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {portfolio.views}
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart className="w-3 h-3" />
                        {portfolio.likes}
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="w-3 h-3" />
                      {portfolio.comments}
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {portfolio.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="secondary" className="bg-zinc-800 text-zinc-300 text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {portfolio.tags.length > 2 && (
                      <Badge variant="secondary" className="bg-zinc-800 text-zinc-300 text-xs">
                        +{portfolio.tags.length - 2}
                      </Badge>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white">
                      <ExternalLink className="w-3 h-3 mr-1" />
                      View
                    </Button>
                    <Button size="sm" variant="outline" className="border-zinc-700 text-zinc-300 hover:bg-zinc-800">
                      <Star className="w-3 h-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <Card className="bg-zinc-900/50 border-zinc-800">
          <CardContent className="p-8 text-center">
            <Palette className="w-12 h-12 text-zinc-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-4">Ready to Create Your Portfolio?</h3>
            <p className="text-zinc-400 mb-6 max-w-lg mx-auto">
              Join thousands of artists who have built stunning portfolios on Artfolio.
              Start showcasing your work today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup">
                <Button className="bg-zinc-800 hover:bg-zinc-700 text-white">
                  Get Started Free
                </Button>
              </Link>
              <Button variant="outline" className="border-zinc-700 text-zinc-300 hover:bg-zinc-800">
                View Templates
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}