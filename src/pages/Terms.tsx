import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";

const Terms = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container py-12 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Terms & Conditions</h1>
        
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-lg mb-6">Last updated: {new Date().toLocaleDateString()}</p>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
            <p>By accessing and using Capcipcup.ai, you accept and agree to be bound by these Terms and Conditions.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Use of Service</h2>
            <p>Our decision-making platform is provided for personal and business use subject to these terms.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. User Responsibilities</h2>
            <p>Users are responsible for all activities and content they submit to the platform.</p>
          </section>
        </div>

        <div className="mt-8">
          <Link to="/" className="text-primary hover:underline">← Back to Home</Link>
        </div>
      </main>
    </div>
  );
};

export default Terms;