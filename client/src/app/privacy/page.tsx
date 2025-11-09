import Footer from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-black">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Privacy Policy</h1>
          <p className="text-zinc-400">Last updated: November 8, 2025</p>
        </div>

        <div className="space-y-8">
          <Card className="bg-zinc-900/50 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-white">Information We Collect</CardTitle>
            </CardHeader>
            <CardContent className="text-zinc-300 space-y-4">
              <p>
                We collect information you provide directly to us, such as when you create an account,
                upload artworks, or contact us for support.
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Account information (name, email, username)</li>
                <li>Profile information (bio, location, website, social links)</li>
                <li>Artwork content and metadata</li>
                <li>Communication preferences</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900/50 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-white">How We Use Your Information</CardTitle>
            </CardHeader>
            <CardContent className="text-zinc-300 space-y-4">
              <p>We use the information we collect to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Provide and maintain our services</li>
                <li>Process and display your artworks</li>
                <li>Communicate with you about your account</li>
                <li>Improve our platform and develop new features</li>
                <li>Ensure platform security and prevent abuse</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900/50 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-white">Information Sharing</CardTitle>
            </CardHeader>
            <CardContent className="text-zinc-300 space-y-4">
              <p>
                We do not sell, trade, or otherwise transfer your personal information to third parties
                without your consent, except as described in this policy.
              </p>
              <p>
                Your artworks and profile information are publicly visible on our platform by default.
                You can control the visibility of your content through your account settings.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900/50 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-white">Data Security</CardTitle>
            </CardHeader>
            <CardContent className="text-zinc-300 space-y-4">
              <p>
                We implement appropriate security measures to protect your personal information against
                unauthorized access, alteration, disclosure, or destruction.
              </p>
              <p>
                However, no method of transmission over the internet or electronic storage is 100% secure.
                We cannot guarantee absolute security.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900/50 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-white">Your Rights</CardTitle>
            </CardHeader>
            <CardContent className="text-zinc-300 space-y-4">
              <p>You have the right to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Access and update your personal information</li>
                <li>Delete your account and associated data</li>
                <li>Opt out of marketing communications</li>
                <li>Request data portability</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900/50 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-white">Contact Us</CardTitle>
            </CardHeader>
            <CardContent className="text-zinc-300">
              <p>
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <p className="mt-2">
                Email: privacy@artfolio.com<br />
                Address: Artfolio Privacy Team
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}