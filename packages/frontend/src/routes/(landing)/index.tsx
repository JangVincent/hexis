import BoxGraphic from "@/components/graphic/box-graphic";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(landing)/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <div>
        <BoxGraphic />
      </div>
    </div>
  );
}
