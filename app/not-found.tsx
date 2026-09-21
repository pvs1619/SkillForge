import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-7xl flex-col items-center justify-center px-4 py-16 text-center">
      <div className="rounded-full bg-muted p-4 text-muted-foreground mb-4">
        <Compass className="h-8 w-8" />
      </div>
      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        404 — Page Not Found
      </span>
      <h1 className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
        This learning path doesn&apos;t exist.
      </h1>
      <p className="mt-2 text-sm text-muted-foreground max-w-md">
        The workshop or page you requested could not be located. It may have been moved or is currently not scheduled.
      </p>
      <div className="mt-6 flex gap-3">
        <Link href="/workshops">
          <Button className="gap-2">
            <Compass className="h-4 w-4" />
            <span>Browse Workshops</span>
          </Button>
        </Link>
        <Link href="/">
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            <span>Return Home</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}
