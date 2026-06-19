import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { Card } from "@/components/ui/Card";
import { ArrowLeft, ArrowRight, ExternalLink, Github } from "lucide-react";
import Link from "next/link";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { locale, slug } = await params;

  // Fetch project
  const res = await fetch(`${SITE_URL}/api/projects/${slug}`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) notFound();

  const { data: project } = await res.json();
  if (!project) notFound();

  const isAr = locale === "ar";
  const title = isAr ? project.title_ar : project.title_en;
  const desc = isAr ? project.description_ar : project.description_en;
  const longDesc = isAr ? project.long_desc_ar : project.long_desc_en;
  const results = isAr ? project.results_ar : project.results_en;

  // Parse results into bullet points
  const resultPoints = results
    ? results.split(/\.\s+/).filter((s: string) => s.trim())
    : [];

  return (
    <main>
      <Navbar />

      {/* Hero Banner */}
      <section className="bg-gradient-to-b from-navy-900 to-[var(--bg-primary)] pt-32 pb-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <Badge variant="blue" size="md">{project.category}</Badge>
            {project.roi_metric && (
              <Badge variant="green" size="md">{project.roi_metric}</Badge>
            )}
          </div>
          <h1 className="font-[family-name:var(--font-poppins)] text-3xl md:text-5xl font-bold text-[var(--text-primary)] mb-4">
            {title}
          </h1>
          <p className="text-lg text-[var(--text-muted)] max-w-3xl mb-6">{desc}</p>
          <div className="flex flex-wrap gap-3">
            {project.live_url && (
              <Button variant="primary" size="md" href={project.live_url} rightIcon={<ExternalLink className="h-4 w-4" />}>
                {isAr ? "شوف الموقع" : "Live Demo"}
              </Button>
            )}
            {project.github_url && (
              <Button variant="outline" size="md" href={project.github_url} rightIcon={<Github className="h-4 w-4" />}>
                GitHub
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-5xl mx-auto px-4 py-16 space-y-16">
        {/* Long description */}
        {longDesc && (
          <div>
            <h2 className="font-[family-name:var(--font-poppins)] text-2xl font-bold text-[var(--text-primary)] mb-4">
              {isAr ? "نظرة عامة" : "Overview"}
            </h2>
            <p className="text-[var(--text-muted)] leading-relaxed">{longDesc}</p>
          </div>
        )}

        {/* Results */}
        {resultPoints.length > 0 && (
          <div>
            <h2 className="font-[family-name:var(--font-poppins)] text-2xl font-bold text-[var(--text-primary)] mb-6">
              {isAr ? "النتايج" : "Key Results"}
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              {resultPoints.map((point: string, i: number) => (
                <Card key={i} variant="elevated" className="text-center">
                  <div className="text-3xl font-bold text-blue-400 font-[family-name:var(--font-poppins)] mb-2">
                    <AnimatedCounter end={parseInt(point.match(/\d+/)?.[0] || "0")} suffix={point.includes("%") ? "%" : "+"} />
                  </div>
                  <p className="text-sm text-[var(--text-muted)]">{point.replace(/\d+%?/g, "").trim()}</p>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Tech Stack */}
        {project.tech_stack.length > 0 && (
          <div>
            <h2 className="font-[family-name:var(--font-poppins)] text-2xl font-bold text-[var(--text-primary)] mb-4">
              {isAr ? "التقنيات المستخدمة" : "Tech Stack"}
            </h2>
            <div className="flex flex-wrap gap-2">
              {project.tech_stack.map((tech: string) => (
                <Badge key={tech} variant="outline" size="md" mono className="text-base px-4 py-2">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <Card variant="elevated" className="text-center py-10">
          <h3 className="font-[family-name:var(--font-poppins)] text-2xl font-bold text-[var(--text-primary)] mb-3">
            {isAr ? "عندك مشروع مشابه؟ كلمني." : "Have a similar project? Let's talk."}
          </h3>
          <Button
            variant="primary"
            size="lg"
            href={`/${locale}/contact?service=${project.category}`}
            rightIcon={<ArrowRight className="h-4 w-4" />}
          >
            {isAr ? "ابدأ مشروعك" : "Start a Project"}
          </Button>
        </Card>

        {/* Back */}
        <div className="text-center">
          <Button variant="ghost" href={`/${locale}/portfolio`} leftIcon={<ArrowLeft className="h-4 w-4" />}>
            {isAr ? "كل الأعمال" : "All Projects"}
          </Button>
        </div>
      </section>

      <Footer />
    </main>
  );
}
