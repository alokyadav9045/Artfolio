import Footer from "@/components/footer";
import { ArtworkGrid } from "@/components/artwork/ArtworkGrid";

export default function ExplorePage() {
  return (
    <div className="min-h-screen bg-black">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Explore Artworks</h1>
          <p className="text-zinc-400">Discover amazing artworks from talented artists around the world</p>
        </div>

        {/* Filters/Sorting - TODO: Implement */}
        <div className="mb-8 flex flex-wrap gap-4">
          <div className="text-sm text-zinc-400">
            Sort by: <span className="text-white">Latest</span>
          </div>
          <div className="text-sm text-zinc-400">
            Filter: <span className="text-white">All</span>
          </div>
        </div>

        <ArtworkGrid />
      </main>
      <Footer />
    </div>
  );
}