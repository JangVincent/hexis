import HomePage from '@/features/home/pages/home-page';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(home)/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <HomePage />;
}
