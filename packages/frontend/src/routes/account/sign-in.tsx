import SignInPage from '@/features/account/pages/sign-in-page';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/account/sign-in')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main>
      <SignInPage />
    </main>
  );
}
