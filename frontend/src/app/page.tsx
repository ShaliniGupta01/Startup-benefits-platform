import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <h1 className="mb-6 text-5xl font-bold">
          Startup Benefits Platform
        </h1>

        <p className="mb-8 max-w-xl text-gray-600">
          Exclusive SaaS deals and benefits for startup founders,
          early-stage teams, and indie hackers.
        </p>

        <div className="flex flex-col gap-4 sm:flex-row">
          <Link
            href="/deals"
            className="w-full rounded-md bg-black px-6 py-3 text-center text-white hover:bg-black/90 sm:w-40"
          >
            Explore Deals
          </Link>
        </div>
      </section>
    </main>
  );
}
