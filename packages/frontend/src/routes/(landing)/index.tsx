import { IconInfo, IconPlusBox } from "@/components/icon";
import { Button } from "@/components/ui/button";
import HeroImage from "@/features/home/components/hero-image";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/(landing)/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main className="flex flex-col gap-2 justify-between h-full pb-2 relative">
      <div>{/* INTENTIONAL EMPTY */}</div>
      <header className="py-14 space-y-6 px-4 absolute w-full bg-gradient-to-b from-white via-85% via-white to-white/10 z-10">
        <h1 className="text-4xl font-bold text-center text-pretty">
          Hide Your Text <br />
          Behind a Price Tag
        </h1>
        <p className="text-center text-sm md:text-lg text-gray-600 leading-4">
          Sell Anything — As Long As It’s Text
        </p>
        <div className="flex flex-col gap-2">
          <Button className="w-full md:w-54 mx-auto">
            <IconPlusBox />
            <span>START SELLING</span>
          </Button>
          <Button
            variant="secondary"
            className="w-full md:w-54 mx-auto"
            asChild
          >
            <Link to="/about">
              <IconInfo />
              <span className="tracking-tight">WTH is HEXIS?</span>
            </Link>
          </Button>
        </div>
      </header>

      <div className="max-w-full">
        <HeroImage />
      </div>
    </main>
  );
}
