import { IconClock } from '@/components/icon';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/account/sign-in')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main className='w-full h-full flex flex-1 justify-center items-center flex-col gap-2'>
      <IconClock width={64} height={64} />
      <p className='font-bold'>COMING SOON</p>
    </main>
  );
}
