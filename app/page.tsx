import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const features = [
  {
    title: "Server Actions",
    description: "Run server-side code from client components with 'use server' directive",
    href: "/actions",
    docs: "https://react.dev/reference/rsc/server-actions",
  },
  {
    title: "Composable Caching",
    description: "Fine-grained caching with 'use cache', cacheLife, and cacheTag",
    href: "/cache",
    docs: "https://nextjs.org/docs/app/api-reference/directives/use-cache",
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
          <Link key={feature.href} href={feature.href as "/actions" | "/cache"}>
            <Card className="h-full transition-colors hover:bg-muted/50">
              <CardHeader>
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <span className="text-sm text-muted-foreground hover:underline">
                  View docs
                </span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="mt-12 p-6 border rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Stack</h2>
        <div className="grid gap-2 text-sm text-muted-foreground">
          <p>Next.js 16.0.5 with App Router</p>
          <p>React 19.2.0</p>
          <p>Tailwind CSS v4</p>
          <p>shadcn/ui (new-york)</p>
          <p>TypeScript with strict mode</p>
        </div>
      </div>
    </main>
  );
}
