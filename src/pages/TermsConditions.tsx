
import Navbar from "@/components/Navbar";

const TermsConditions = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container max-w-4xl py-12">
        <h1 className="text-3xl font-bold mb-8">Terms & Conditions</h1>
        
        <div className="prose max-w-none">
          <p className="text-lg mb-6">
            Last updated: {new Date().toLocaleDateString()}
          </p>
          
          <h2 className="text-2xl font-semibold mb-4">Agreement to Terms</h2>
          <p className="mb-6">
            By accessing or using the Capcipcup service, you agree to be bound by these Terms and Conditions and all applicable laws and regulations.
          </p>
          
          <h2 className="text-2xl font-semibold mb-4">Use License</h2>
          <p className="mb-6">
            Permission is granted to temporarily use the Capcipcup service for personal, non-commercial use only. This is the grant of a license, not a transfer of title.
          </p>
          
          <h2 className="text-2xl font-semibold mb-4">User Accounts</h2>
          <p className="mb-6">
            When you create an account with us, you must provide accurate, complete, and current information. You are responsible for safeguarding the password and for all activities that occur under your account.
          </p>
          
          <h2 className="text-2xl font-semibold mb-4">Limitations</h2>
          <p className="mb-6">
            You may not use our service for any illegal or unauthorized purpose. You agree not to modify, distribute, transmit, display, perform, reproduce, publish, license, create derivative works from, transfer, or sell any information or services obtained from Capcipcup.
          </p>
          
          <h2 className="text-2xl font-semibold mb-4">Disclaimer</h2>
          <p className="mb-6">
            The information provided by Capcipcup is for general informational purposes only. All information is provided in good faith, however we make no representation or warranty of any kind regarding the accuracy, adequacy, validity, reliability, availability or completeness of any information.
          </p>
          
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p className="mb-6">
            If you have any questions about these Terms and Conditions, please contact us at legal@capcipcup.ai.
          </p>
        </div>
      </main>
      
      <footer className="py-6 border-t">
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

export default TermsConditions;
