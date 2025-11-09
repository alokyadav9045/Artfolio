"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Palette, Heart, MessageCircle } from "lucide-react";
import { AnimatedGrid } from "@/components/ui/animated-grid";
import { AnimatedText } from "@/components/ui/animated-text";
import { ParticleBackground } from "@/components/ui/particle-background";
import { useSpring, animated } from '@react-spring/web';

export default function Hero() {
  const buttonSpring = useSpring({
    from: { scale: 0.8, opacity: 0 },
    to: { scale: 1, opacity: 1 },
    delay: 2000,
    config: { tension: 300, friction: 20 },
  });

  return (
    <section
      className="relative bg-gradient-to-br from-black via-zinc-900 to-black min-h-screen flex items-center py-20 sm:py-32 overflow-hidden"
      aria-labelledby="hero-heading"
      role="banner"
    >
      {/* Animated Grid Background */}
      <AnimatedGrid className="opacity-30" />

      {/* Particle Background */}
      <ParticleBackground className="opacity-60" />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-transparent to-pink-900/10" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Badge */}
          <AnimatedText
            text="Artfolio - Portfolio Builder for Artists"
            className="inline-flex items-center rounded-full px-4 py-1.5 text-sm font-medium bg-zinc-800/50 text-zinc-300 ring-1 ring-inset ring-zinc-700/20 mb-8"
            delay={500}
          />

          {/* Main Heading */}
          <h1
            id="hero-heading"
            className="text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl mb-6"
          >
            A gallery that{" "}
            <AnimatedText
              text="breathes"
              type="gradient"
              className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl"
              delay={1000}
            />
          </h1>

          {/* Subheading */}
          <AnimatedText
            text="Creators upload light and color, visitors leave echoes (likes, comments). Build your artistic portfolio, showcase your work, connect with your audience."
            className="mt-6 text-lg leading-8 text-zinc-300 max-w-3xl mx-auto"
            delay={1500}
          />

          {/* Features */}
          <div
            className="mt-10 flex items-center justify-center gap-x-8 text-zinc-400"
            role="list"
            aria-label="Platform features"
          >
            <AnimatedText
              className="flex items-center gap-x-2"
              delay={1800}
            >
              <Heart className="w-5 h-5" aria-hidden="true" />
              <span>Likes</span>
            </AnimatedText>
            <AnimatedText
              className="flex items-center gap-x-2"
              delay={2000}
            >
              <MessageCircle className="w-5 h-5" aria-hidden="true" />
              <span>Comments</span>
            </AnimatedText>
            <AnimatedText
              className="flex items-center gap-x-2"
              delay={2200}
            >
              <Palette className="w-5 h-5" aria-hidden="true" />
              <span>Showcase</span>
            </AnimatedText>
          </div>

          {/* CTA Buttons */}
          <animated.div
            style={buttonSpring}
            className="mt-10 flex items-center justify-center gap-x-6"
            role="group"
            aria-label="Call to action buttons"
          >
            <Link href="/login">
              <Button
                size="lg"
                className="text-base px-8 py-3 bg-zinc-800 hover:bg-zinc-700 text-white hover:scale-105 transition-all duration-300"
                aria-describedby="get-started-description"
              >
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Button>
              <span id="get-started-description" className="sr-only">
                Sign up or log in to start creating your portfolio
              </span>
            </Link>
            <Link href="/artwork/create">
              <Button
                variant="outline"
                size="lg"
                className="text-base px-8 py-3 border-zinc-700 text-zinc-800 hover:bg-zinc-800 hover:text-white hover:scale-105 transition-all duration-300"
                aria-describedby="upload-description"
              >
                Upload Artwork
              </Button>
              <span id="upload-description" className="sr-only">
                Upload your first artwork to showcase your talent
              </span>
            </Link>
          </animated.div>

        </div>
      </div>
    </section>
  );
}