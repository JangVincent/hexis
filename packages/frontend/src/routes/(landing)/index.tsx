import HeroImage from "@/features/home/components/hero-image";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(landing)/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <HeroImage />
    </div>
  );
}
