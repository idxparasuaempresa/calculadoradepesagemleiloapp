import { createFileRoute } from "@tanstack/react-router";
import LandingPage from "@/components/landing/LandingPage";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Calculadora de Pesagem de Gado | LeiloApp — Romaneio Automático Offline" },
      {
        name: "description",
        content:
          "Romaneio automático, média em tempo real, valores por arroba e quilo. Funciona offline no curral com qualquer balança. A partir de R$ 0,77/dia.",
      },
      { property: "og:title", content: "Calculadora de Pesagem de Gado | LeiloApp" },
      {
        property: "og:description",
        content:
          "Romaneio automático e indicadores em tempo real enquanto você pesa. Funciona offline. A partir de R$ 0,77/dia.",
      },
      { property: "og:type", content: "website" },
    ],
    links: [
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap",
      },
    ],
  }),
  component: LandingPage,
});
