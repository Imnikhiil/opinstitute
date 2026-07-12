import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <section className="min-h-[70vh] flex items-center justify-center section-padding bg-[#f5f5f7] dark:bg-gray-950">
      <div className="container-custom text-center max-w-lg">
        <p className="font-display text-8xl md:text-9xl font-bold text-brand-600/20 select-none">
          404
        </p>
        <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground -mt-4 mb-3">
          Page Not Found
        </h1>
        <p className="text-muted-foreground mb-8 leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or may have been
          moved. Let&apos;s get you back on track.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-600 text-white font-semibold hover:bg-brand-700 transition"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-brand-600 text-brand-600 font-semibold hover:bg-brand-50 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}
