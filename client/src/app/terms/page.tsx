import Footer from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-black">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Terms of Service</h1>
          <p className="text-zinc-400">Last updated: November 8, 2025</p>
        </div>

        <div className="space-y-8">
          <Card className="bg-zinc-900/50 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-white">Acceptance of Terms</CardTitle>
            </CardHeader>
            <CardContent className="text-zinc-300 space-y-4">
              <p>
                By accessing and using Artfolio, you accept and agree to be bound by the terms
                and provision of this agreement. If you do not agree to abide by the above,
                please do not use this service.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900/50 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-white">User Accounts</CardTitle>
            </CardHeader>
            <CardContent className="text-zinc-300 space-y-4">
              <p>
                When you create an account with us, you must provide information that is accurate,
                complete, and current at all times. You are responsible for safeguarding the password
                and for all activities that occur under your account.
              </p>
              <p>
                You must immediately notify us of any unauthorized uses of your account or any other
                breaches of security.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900/50 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-white">Content Ownership</CardTitle>
            </CardHeader>
            <CardContent className="text-zinc-300 space-y-4">
              <p>
                You retain all rights to your artwork and content. By uploading content to Artfolio,
                you grant us a non-exclusive, royalty-free, worldwide license to use, display,
                and distribute your content on our platform.
              </p>
              <p>
                You are responsible for ensuring that your content does not violate any copyrights,
                trademarks, or other intellectual property rights.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900/50 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-white">Prohibited Uses</CardTitle>
            </CardHeader>
            <CardContent className="text-zinc-300 space-y-4">
              <p>You may not use our service to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Upload illegal, harmful, or offensive content</li>
                <li>Violate intellectual property rights</li>
                <li>Harass, abuse, or harm other users</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Distribute malware or viruses</li>
                <li>Spam or engage in fraudulent activities</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900/50 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-white">Service Availability</CardTitle>
            </CardHeader>
            <CardContent className="text-zinc-300 space-y-4">
              <p>
                We strive to provide continuous service but do not guarantee that the service
                will be uninterrupted or error-free. We reserve the right to modify or discontinue
                the service at any time.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900/50 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-white">Limitation of Liability</CardTitle>
            </CardHeader>
            <CardContent className="text-zinc-300 space-y-4">
              <p>
                Artfolio shall not be liable for any indirect, incidental, special, consequential,
                or punitive damages resulting from your use of the service.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900/50 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-white">Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="text-zinc-300">
              <p>
                If you have any questions about these Terms of Service, please contact us at:
              </p>
              <p className="mt-2">
                Email: legal@artfolio.com<br />
                Address: Artfolio Legal Team
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}