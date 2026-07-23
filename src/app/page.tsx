import Link from "next/link";
import { ArrowRight, Scale, Users, GraduationCap, Quote } from "lucide-react";

const SERVICES = [
  {
    icon: Scale,
    title: "Dispute Resolution",
    description:
      "Expert-led arbitration and mediation services tailored for commercial conflicts, ensuring neutrality and efficiency.",
    cta: "View Procedures",
    href: "/services",
  },
  {
    icon: Users,
    title: "Mentorship",
    description:
      "Connecting emerging ADR practitioners with experienced professionals for structured career development and guidance.",
    cta: "Join Program",
    href: "/mentorship",
  },
  {
    icon: GraduationCap,
    title: "Trainings",
    description:
      "Comprehensive certification courses and workshops on Alternative Dispute Resolution (ADR) practice.",
    cta: "Explore Courses",
    href: "/services/trainings",
  },
];

const NEWS = [
  {
    category: "Neutrals",
    title: "NCC-DRC Holds Neutrals' Town Hall, Unveils Specialized Sub-Panels",
    excerpt:
      "The Centre brought together its Panel of Neutrals for dialogue and institutional alignment at a town hall meeting in Abuja.",
    href: "https://nccdrc.org/5181-2/",
  },
  {
    category: "Council",
    title:
      "NCC-DRC Pays Courtesy Visit to Council Member Mohammed Bello Adoke, SAN",
    excerpt:
      "The Centre visited former Attorney-General of the Federation and Council Member, Mohammed Bello Adoke, SAN.",
    href: "https://nccdrc.org/5165-2/",
  },
  {
    category: "Policy",
    title: "NCC-DRC Leads Discussion on National Policy on Arbitration and ADR",
    excerpt:
      "A high-level roundtable in Abuja engaged stakeholders on reforming justice delivery and boosting investor confidence.",
    href: "https://nccdrc.org/ncc-drc-leads-discussion-on-national-policy-on-arbitration-and-adr-to-boost-justice-delivery-and-business-confidence/",
  },
];

//  TESTIMONIALS //

const TESTIMONIALS = [
  {
    quote:
      "Choosing arbitration through NCCDRC saved us months of uncertainty — our commercial dispute was resolved fairly and quickly.",
    name: "Kereti Usoroh",
    role: "Business Owner",
  },
  {
    quote:
      "The panel of neutrals was professional and impartial throughout. I'd recommend NCCDRC to any business facing a dispute.",
    name: "Amina",
    role: "Client",
  },
  {
    quote:
      "NCCDRC gave us a structured, trustworthy path to resolve a difficult partnership disagreement without going to court.",
    name: "Bianca",
    role: "Client",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* HERO SECTION */}
      <section className="relative flex min-h-150 items-center overflow-hidden bg-slate-900 bg-[url('/images/hero-section.png')] bg-cover bg-center bg-blend-">
        <div className="absolute inset-0 bg-linear-to-r from-slate-900/95 via-slate-900/80 to-slate-900/50" />
        <div className="relative px-4 py-24 sm:px-6 lg:px-8">
          <p className="mb-4 text-xs font-bold uppercase tracking-widest text-emerald-400">
            Official Dispute Resolution Centre
          </p>
          <h1 className="max-w-2xl font-display text-4xl font-bold leading-tight text-white sm:text-5xl">
            Nigerian Chambers of Commerce and Industry Dispute Resolution Centre
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-300">
            Providing world-class arbitration, mediation, and conciliation
            services to foster commercial stability and trust within the
            Nigerian business ecosystem.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-md bg-emerald-500 px-6 py-3.5 text-[15px] font-semibold text-white shadow-sm transition-colors hover:bg-emerald-600"
            >
              Contact Us
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center rounded-md border border-white/30 px-6 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-white/10"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Core services */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="font-display text-2xl font-bold text-slate-900 sm:text-3xl">
              Our Core Services
            </h2>
            <div className="mx-auto mt-3 h-1 w-14 rounded-full bg-emerald-500" />
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.title}
                  className="rounded-xl bg-white p-7 shadow-sm ring-1 ring-slate-900/5"
                >
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg bg-emerald-50">
                    <Icon
                      size={22}
                      className="text-emerald-600"
                      strokeWidth={2}
                    />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-slate-900">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">
                    {service.description}
                  </p>
                  <Link
                    href={service.href}
                    className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-emerald-700 hover:text-emerald-800"
                  >
                    {service.cta}
                    <ArrowRight size={14} />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Institutional history */}
      <section className="bg-white py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-emerald-600">
              Institutional History
            </p>
            <h2 className="font-display text-2xl font-bold leading-snug text-slate-900 sm:text-3xl">
              Advancing Commercial Justice Across Nigeria
            </h2>
            <blockquote className="mt-6 border-l-4 border-emerald-500 pl-4 text-base italic leading-relaxed text-slate-600">
              &ldquo;Founded with a singular vision: to create an environment
              where commerce can thrive through fair, professional resolution of
              disputes.&rdquo;
            </blockquote>
            <p className="mt-5 text-sm leading-relaxed text-slate-500">
              Established as the dispute resolution arm of the Chamber of
              Commerce in 2017, NCCDRC was created to serve the commercial
              stability mandate of the chambers movement — giving businesses
              access to confidential, expert-led alternatives to litigation.
            </p>
            <Link
              href="/about"
              className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-emerald-700 hover:text-emerald-800"
            >
              Our Full Story
              <ArrowRight size={14} />
            </Link>
          </div>
          <div className="aspect-4/5 w-full rounded-xl bg-slate-100 bg-[url('/images/madam.png')] bg-cover bg-center" />
        </div>
      </section>

      {/* Stats */}
      <section className="bg-slate-900 py-14">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:grid-cols-2 sm:px-6 lg:px-8">
          <div className="border-l-4 border-emerald-500 pl-5">
            <p className="font-display text-4xl font-bold text-emerald-400">
              50+
            </p>
            <p className="mt-1 text-sm font-semibold uppercase tracking-wide text-white">
              Strategic Partners
            </p>
            <p className="mt-1 text-sm text-slate-400">
              Affiliated with leading chambers and legal institutions.
            </p>
          </div>
          <div className="border-l-4 border-emerald-500 pl-5">
            <p className="font-display text-4xl font-bold text-emerald-400">
              5+
            </p>
            <p className="mt-1 text-sm font-semibold uppercase tracking-wide text-white">
              Years Experience
            </p>
            <p className="mt-1 text-sm text-slate-400">
              Of excellence in administrative ADR and corporate governance.
            </p>
          </div>
        </div>
      </section>

      {/* Latest news */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-2xl font-bold text-slate-900 sm:text-3xl">
                Latest From The Centre
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                Stay updated with the latest ADR trends and institutional news.
              </p>
            </div>
            <Link
              href="/blog/news"
              className="inline-flex items-center gap-1 text-sm font-semibold text-emerald-700 hover:text-emerald-800"
            >
              View All News
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {NEWS.map((post) => (
              <a
                key={post.href}
                href={post.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-slate-900/5 transition-shadow hover:shadow-md"
              >
                <div className="aspect-16/10 w-full bg-slate-200" />
                <div className="p-5">
                  <p className="text-xs font-bold uppercase tracking-wide text-emerald-600">
                    {post.category}
                  </p>
                  <h3 className="mt-2 font-display text-base font-semibold leading-snug text-slate-900 group-hover:text-emerald-700">
                    {post.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-500">
                    {post.excerpt}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-emerald-700">
                    Read More
                    <ArrowRight size={14} />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <Quote
            className="mx-auto text-emerald-500"
            size={36}
            strokeWidth={2}
          />
          <blockquote className="mt-6 font-display text-xl font-medium leading-relaxed text-slate-800 sm:text-2xl">
            &ldquo;{TESTIMONIALS[0].quote}&rdquo;
          </blockquote>
          <p className="mt-6 text-sm font-semibold text-slate-900">
            {TESTIMONIALS[0].name}
          </p>
          <p className="text-sm text-slate-500">{TESTIMONIALS[0].role}</p>

          <div className="mt-6 flex justify-center gap-2">
            {TESTIMONIALS.map((t, i) => (
              <span
                key={t.name}
                className={`h-2 w-2 rounded-full ${
                  i === 0 ? "bg-emerald-500" : "bg-slate-200"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate-900 py-20">
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
            Ready to Resolve Your Dispute?
          </h2>
          <p className="mt-3 text-sm text-slate-400">
            Contact our registry today to discuss your case or explore our panel
            of accredited arbitrators.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center rounded-md bg-emerald-500 px-6 py-3.5 text-[15px] font-semibold text-white shadow-sm transition-colors hover:bg-emerald-600"
            >
              Start Resolution Now
            </Link>
            <Link
              href="/secretariat"
              className="inline-flex items-center rounded-md border border-white/30 px-6 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-white/10"
            >
              Contact Registry
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
