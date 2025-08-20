import SignInPage from '@/features/account/pages/sign-in-page';
import { trpc } from '@/requests/trpc';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/account/sign-in')({
  component: RouteComponent,
});

function RouteComponent() {
  const healthCheck = trpc.healthCheck.useQuery();

  return (
    <main>
      <SignInPage />
      {JSON.stringify(healthCheck.data)}
    </main>
  );
}
