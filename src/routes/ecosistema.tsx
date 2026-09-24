import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/ecosistema")({
  component: () => <Outlet />,
});
