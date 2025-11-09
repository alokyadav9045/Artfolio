import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, MessageSquare, Send } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-black">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Contact Us</h1>
          <p className="text-zinc-400 text-lg">
            Have questions or feedback? We&apos;d love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="bg-zinc-900/50 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Send us a message
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-zinc-300">First Name</Label>
                    <Input
                      id="firstName"
                      placeholder="John"
                      className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-zinc-300">Last Name</Label>
                    <Input
                      id="lastName"
                      placeholder="Doe"
                      className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-zinc-300">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-zinc-300">Subject</Label>
                  <Input
                    id="subject"
                    placeholder="How can we help?"
                    className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-zinc-300">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us more about your inquiry..."
                    rows={5}
                    className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
                  />
                </div>

                <Button className="w-full bg-zinc-800 hover:bg-zinc-700 text-white">
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <div className="space-y-8">
            <Card className="bg-zinc-900/50 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-white">Get in Touch</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-zinc-400" />
                  <div>
                    <p className="text-white font-medium">Email</p>
                    <p className="text-zinc-400">hello@artfolio.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <MessageSquare className="w-5 h-5 text-zinc-400" />
                  <div>
                    <p className="text-white font-medium">Support</p>
                    <p className="text-zinc-400">24/7 available for artists</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-zinc-900/50 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-white">FAQ</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-white font-medium mb-1">How do I upload artworks?</h4>
                    <p className="text-zinc-400 text-sm">Sign up for an account and use the &quot;Create Artwork&quot; page to upload your work.</p>
                  </div>

                  <div>
                    <h4 className="text-white font-medium mb-1">Is Artfolio free?</h4>
                    <p className="text-zinc-400 text-sm">Yes! Artfolio is completely free for artists to showcase their work.</p>
                  </div>

                  <div>
                    <h4 className="text-white font-medium mb-1">How do I get featured?</h4>
                    <p className="text-zinc-400 text-sm">High-quality artworks are automatically featured on our homepage.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}