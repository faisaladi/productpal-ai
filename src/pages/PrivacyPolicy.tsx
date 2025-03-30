
import Navbar from "@/components/Navbar";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col w-full">
      <Navbar />
      
      <main className="flex-1 container max-w-4xl py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
        
        <div className="prose max-w-none">
          <p className="text-lg mb-6">
            Last updated: {new Date().toLocaleDateString()}
          </p>
          
          <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
          <p className="mb-6 leading-relaxed">
            Capcipcup ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how your personal information is collected, used, and disclosed by Capcipcup.
          </p>
          
          <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
          <p className="mb-6 leading-relaxed">
            We collect information that you provide directly to us, such as when you create an account, use our services, or communicate with us. This may include your name, email address, and the content of your conversations with our AI service.
          </p>
          
          <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
          <p className="mb-6 leading-relaxed">
            We use the information we collect to provide, maintain, and improve our services, process transactions, send communications, and for other internal purposes such as data analysis and testing.
          </p>
          
          <h2 className="text-2xl font-semibold mb-4">Information Sharing</h2>
          <p className="mb-6 leading-relaxed">
            We do not share your personal information with third parties except as described in this Privacy Policy, including to comply with laws, to protect our rights, and with service providers who help us operate our business.
          </p>
          
          <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
          <p className="mb-6 leading-relaxed">
            We implement measures designed to protect your information from unauthorized access, use, or disclosure. However, no method of transmission over the Internet or electronic storage is 100% secure.
          </p>
          
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p className="mb-6 leading-relaxed">
            If you have any questions about this Privacy Policy, please contact us at privacy@capcipcup.ai.
          </p>
        </div>
      </main>
      
      <footer className="py-6 border-t w-full">
        <div className="container flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2023 Capcipcup.ai. All rights reserved.
          </p>
          <div className="flex items-center space-x-6">
            <a href="/privacy" className="text-muted-foreground hover:text-foreground text-sm">
              Privacy Policy
            </a>
            <a href="/terms" className="text-muted-foreground hover:text-foreground text-sm">
              Terms & Conditions
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PrivacyPolicy;
