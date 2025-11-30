import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Feature = {
  title: string;
  description: string;
  href: "/actions" | "/cache" | "/trpc" | "/streaming" | "/webrtc";
};

const features: Feature[] = [
  {
    title: "Server Actions",
    description: "useActionState hook with 'use server' directive for form handling",
    href: "/actions",
  },
  {
    title: "Composable Caching",
    description: "'use cache' with cacheLife, cacheTag, and on-demand revalidation",
    href: "/cache",
  },
  {
    title: "tRPC + TanStack Query",
    description: "End-to-end typesafe APIs with React Query for async state",
    href: "/trpc",
  },
  {
    title: "SSR Streaming",
    description: "Server-Sent Events for OpenAI-style streaming responses",
    href: "/streaming",
  },
  {
    title: "WebRTC",
    description: "Peer-to-peer video/audio with camera access and ICE negotiation",
    href: "/webrtc",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen p-8 max-w-4xl mx-auto">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Next.js Features</h1>
        <p className="text-lg text-muted-foreground">
          A playground for exploring Next.js 16 and React 19.2 features.
          Each demo includes working code and links to official documentation.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {features.map((feature) => (
          <Link key={feature.href} href={feature.href}>
            <Card className="h-full transition-colors hover:bg-muted/50">
              <CardHeader>
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <span className="text-sm text-muted-foreground">
                  Explore demo
                </span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="mt-12 p-6 border rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Stack</h2>
        <div className="grid gap-2 text-sm text-muted-foreground md:grid-cols-2">
          <p>Next.js 16.0.5 with Turbopack</p>
          <p>React 19.2.0</p>
          <p>tRPC + TanStack Query</p>
          <p>Tailwind CSS v4</p>
          <p>shadcn/ui (new-york)</p>
          <p>TypeScript with strict mode</p>
        </div>
      </div>
    </main>
  );
}
