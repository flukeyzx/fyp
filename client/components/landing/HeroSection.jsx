import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function HeroSection() {
  const router = useRouter();
  return (
    <section className="relative w-full flex flex-col items-center justify-center text-center px-4 py-20 bg-background">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <img
          src="/assets/joblix.svg"
          className="absolute blur-sm opacity-20 w-64 h-64 top-10 left-10 rotate-12"
          alt="bg-logo"
        />
        <img
          src="/assets/joblix.svg"
          className="absolute blur-sm opacity-10 w-64 h-64 top-1/2 right-10 rotate-12"
          alt="bg-logo"
        />
        <img
          src="/assets/joblix.svg"
          className="absolute blur-sm opacity-15 w-64 h-64 bottom-10 left-1/3 rotate-12"
          alt="bg-logo"
        />
      </div>

      <div className="relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold max-w-4xl leading-tight">
          <span className="underline decoration-cyan-400 decoration-4 underline-offset-4">
            Your Career
          </span>
          , <span className="text-cyan-500">Your Way</span>
          <br />
          <span>Find Jobs. Send Proposals.</span>
          <br />
          <span className="text-cyan-400">Get Hired.</span>
        </h2>

        <p className="mt-4 text-lg max-w-xl text-muted-foreground">
          Discover top companies hiring now. Joblix connects you with the best
          job opportunities based on your skills and preferences.
        </p>

        <Button
          onClick={() => {
            router.push("/dashboard");
          }}
          className="mt-6 bg-gradient-to-r from-cyan-500 to-blue-500 hover:opacity-90 text-white px-8 py-3 rounded-2xl text-lg shadow-lg transition cursor-pointer"
        >
          Get Started
        </Button>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="h-36">
            <h3 className="text-2xl font-bold">3M+</h3>
            <p className="text-sm text-muted-foreground">
              Active user community
            </p>
          </div>
          <div className="h-36">
            <h3 className="text-2xl font-bold">$300,000+</h3>
            <p className="text-sm text-muted-foreground">Daily Deals</p>
          </div>
          <div className="h-36">
            <h3 className="text-2xl font-bold">More Than 100</h3>
            <p className="text-sm text-muted-foreground">Companies Collab</p>
          </div>
        </div>
      </div>
    </section>
  );
}
