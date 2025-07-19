import HeroImage from "@/features/home/components/hero-image";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(landing)/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main className="flex flex-col gap-2 justify-between h-full pb-2">
      <header className="py-14 space-y-6 px-4">
        <h1 className="text-3xl md:text-5xl font-bold text-center text-pretty ">
          Hide Your Text <br />
          Behind a Price Tag
        </h1>
        <p className="text-center text-sm md:text-lg text-gray-600 leading-4">
          Sell Anything — As Long As It’s Text
        </p>
      </header>
      <div className="max-w-full">
        <HeroImage />
      </div>
    </main>
  );
}
