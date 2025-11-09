import Hero from "@/components/hero";
import Footer from "@/components/footer";
import { StatsSection } from "@/components/home/StatsSection";
import { FeaturedArtists } from "@/components/home/FeaturedArtists";
import { CategoriesSection } from "@/components/home/CategoriesSection";
import { TrendingArtworks } from "@/components/home/TrendingArtworks";
import { RecentActivity } from "@/components/home/RecentActivity";
import { CallToAction } from "@/components/home/CallToAction";
import { ArtworkGrid } from "@/components/artwork/ArtworkGrid";
import { ScrollAnimatedSection } from "@/components/ui/scroll-animated-section";
import ErrorBoundary from "@/components/ErrorBoundary";

export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      <Hero />

      {/* Platform Statistics */}
      <ScrollAnimatedSection className="py-20" delay={200}>
        <ErrorBoundary>
          <StatsSection />
        </ErrorBoundary>
      </ScrollAnimatedSection>

      {/* Featured Artworks */}
      <ScrollAnimatedSection className="py-20 bg-zinc-900/20" delay={300} direction="fade">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Featured Artworks</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              Discover amazing creations from our talented community
            </p>
          </div>
          <ErrorBoundary>
            <ArtworkGrid />
          </ErrorBoundary>
        </div>
      </ScrollAnimatedSection>

      {/* Featured Artists */}
      <ScrollAnimatedSection className="py-20" delay={400} direction="left">
        <ErrorBoundary>
          <FeaturedArtists />
        </ErrorBoundary>
      </ScrollAnimatedSection>

      {/* Categories */}
      <ScrollAnimatedSection className="py-20 bg-zinc-900/20" delay={500} direction="right">
        <ErrorBoundary>
          <CategoriesSection />
        </ErrorBoundary>
      </ScrollAnimatedSection>

      {/* Trending Artworks */}
      <ScrollAnimatedSection className="py-20" delay={600} direction="up">
        <ErrorBoundary>
          <TrendingArtworks />
        </ErrorBoundary>
      </ScrollAnimatedSection>

      {/* Recent Activity */}
      <ScrollAnimatedSection className="py-20 bg-zinc-900/20" delay={700} direction="fade">
        <ErrorBoundary>
          <RecentActivity />
        </ErrorBoundary>
      </ScrollAnimatedSection>

      {/* Call to Action */}
      <ScrollAnimatedSection className="py-20" delay={800} direction="up">
        <ErrorBoundary>
          <CallToAction />
        </ErrorBoundary>
      </ScrollAnimatedSection>

      <Footer />
    </div>
  );
}
