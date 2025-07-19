import { IconClock } from "@/components/icon";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/search/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main>
      <div>
        <IconClock width={32} height={32} />
        <p>Coming soon...</p>
      </div>
    </main>
  );
}
