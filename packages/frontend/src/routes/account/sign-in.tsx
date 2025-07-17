import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/account/sign-in')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/account/sign-in"!</div>
}
