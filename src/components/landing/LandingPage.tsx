import { useEffect, useRef, useState } from "react";
import { Check, X, Star, ChevronDown, MessageCircle, ArrowRight } from "lucide-react";
import leiloappLogo from "@/assets/leiloapp-logo.png";

const CHECKOUT_URL = "https://pay.kirvano.com/18d95903-e939-4f97-9749-cea355cd9f3d";
const WHATSAPP_URL = "https://wa.me/556496024540?text=Quero%20mais%20informa%C3%A7%C3%B5es%20sobre%20a%20calculadora%20de%20pesagem!!";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

function trackCheckoutClick(source: string) {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq("track", "InitiateCheckout", { source });
  }
}

function trackWhatsAppClick() {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq("track", "Contact", { source: "whatsapp" });
  }
}

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".fade-in");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in-view");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function CTAButton({ className = "", children = "Garantir meu acesso", source = "cta" }: { className?: string; children?: React.ReactNode; source?: string }) {
  return (
    <a
      href={CHECKOUT_URL}
      onClick={() => trackCheckoutClick(source)}
      className={`inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gold px-6 py-4 text-base font-semibold text-primary-foreground shadow-lg shadow-black/20 transition-transform hover:scale-[1.01] active:scale-[0.99] sm:text-lg ${className}`}
    >
      {children} <ArrowRight className="h-5 w-5" />
    </a>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-gold">{children}</p>
  );
}

export default function LandingPage() {
  useReveal();
  const heroRef = useRef<HTMLDivElement>(null);
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowSticky(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background pb-24 text-foreground sm:pb-0">
      {/* HERO */}
      <header ref={heroRef} className="px-5 pt-8 pb-12 sm:pt-12 sm:pb-20">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-8 flex items-center justify-center">
            <img src={leiloappLogo} alt="LeiloApp" className="h-20 w-auto object-contain sm:h-24" />
          </div>
          <h1 className="text-balance text-3xl font-bold leading-tight sm:text-5xl">
            Terminou a pesagem e ficou conferindo peso por peso?{" "}
            <span className="block mt-3 mb-8 text-gold text-3xl sm:text-4xl font-bold uppercase tracking-wide">
              Isso acabou.
            </span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-pretty text-base text-muted-foreground sm:text-lg">
            Romaneio automático, média em tempo real e valores por arroba e quilo calculados enquanto você pesa. Funciona offline, com qualquer balança.
          </p>
          <div className="mx-auto mt-8 max-w-md">
            <CTAButton />
            <p className="mt-3 text-sm text-muted-foreground">
              R$ 0,77/dia · Acesso imediato · Funciona offline
            </p>
          </div>
        </div>
      </header>

      {/* SOCIAL PROOF BAR */}
      <section className="border-y border-border bg-white/[0.04] px-5 py-4">
        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-x-6 gap-y-2 text-center text-sm font-medium sm:text-base">
          <span>+2.000 produtores usando</span>
          <span className="text-gold">·</span>
          <span className="flex items-center gap-1"><Star className="h-4 w-4 fill-gold text-gold" /> 4.9 avaliação</span>
          <span className="text-gold">·</span>
          <span>96% de renovação</span>
        </div>
      </section>

      {/* COMPARATIVO — segunda dobra: choque visual rápido */}
      <section className="px-5 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl">
          <div className="fade-in mb-10 text-center">
            <h2 className="text-balance text-3xl font-bold sm:text-4xl">
              Caderno na pesagem = <span className="text-pain">prejuízo disfarçado</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              A diferença não está na balança. Está em como você registra.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:gap-5">
            <div className="fade-in rounded-xl border border-pain/30 bg-pain/10 p-5">
              <h3 className="mb-4 text-center text-base font-bold uppercase text-pain sm:text-lg">Caderno</h3>
              <ul className="space-y-3 text-sm sm:text-base">
                {["Perde dado", "Erra conta", "Refaz tudo", "Perde tempo", "Romaneio amador", "Resultado só no final"].map((x) => (
                  <li key={x} className="flex items-start gap-2"><X className="mt-0.5 h-4 w-4 flex-shrink-0 text-pain" /><span>{x}</span></li>
                ))}
              </ul>
            </div>
            <div className="fade-in rounded-xl border border-solution/30 bg-solution/10 p-5">
              <h3 className="mb-4 text-center text-base font-bold uppercase text-solution sm:text-lg">LeiloApp</h3>
              <ul className="space-y-3 text-sm sm:text-base">
                {["Resultado na hora", "Romaneio automático", "Histórico salvo", "Offline no curral", "Qualquer balança", "Valores na hora"].map((x) => (
                  <li key={x} className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-solution" /><span>{x}</span></li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* DOR */}
      <section className="bg-bg-deep px-5 py-16 sm:py-24">
        <div className="mx-auto max-w-3xl">
          <div className="fade-in text-center">
            <SectionLabel>O problema não é a balança</SectionLabel>
            <h2 className="text-balance text-3xl font-bold sm:text-4xl">
              O prejuízo nasce no <span className="text-pain">registro</span>&nbsp;{"\n"}não no equipamento
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Você pesa certo. Mas na hora de anotar, calcular e conferir, tudo dá errado.
            </p>
          </div>

          <ul className="fade-in mt-10 space-y-3">
            {[
              "Caderninho some no dia que mais precisa, fica no carro, fica em casa",
              "Erra um número e refaz tudo com o comprador ali esperando",
              "Resultado só aparece no final e se não bater, vira confusão",
              "Tempo jogado fora recalculando o que já devia estar pronto",
              "Romaneio sai amador e dá briga na negociação",
              "Conta que não bate custa caro e você só descobre depois",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 rounded-lg bg-white/[0.04] p-4">
                <X className="mt-0.5 h-5 w-5 flex-shrink-0 text-pain" />
                <span className="text-sm sm:text-base">{item}</span>
              </li>
            ))}
          </ul>

          <div className="fade-in mt-10 rounded-2xl border-2 border-gold/60 bg-bg-deep p-6 sm:p-8">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-gold">Caso real</p>
            <p className="text-base leading-relaxed sm:text-lg">
              Um produtor pesou 36 bois no papel. A média deu <strong>646 kg</strong>.
              Na Calculadora LeiloApp, deu <strong>652 kg</strong>.
              <br />
              <span className="mt-2 block">Duzentos quilos de diferença no lote.</span>
              <span className="text-pain font-semibold">A R$ 11,50 o quilo = R$ 2.300 de prejuízo.</span>
              <br />
              <span className="mt-2 block text-muted-foreground">
                O erro não era no peso. Era no cálculo. A calculadora pegou antes de fechar negócio.
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* SOLUÇÃO + VÍDEO */}
      <section className="bg-bg-deep px-5 py-16 sm:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <div className="fade-in">
            <SectionLabel>Calculadora de Pesagem LeiloApp</SectionLabel>
            <h2 className="text-balance text-3xl font-bold sm:text-4xl">
              O que você faz no papel, faz no app <span className="text-gold">sem erro</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Registra o peso, vê os indicadores na hora e sai do curral com o romaneio pronto. Simples assim.
            </p>
          </div>
          <div className="fade-in mx-auto mt-10 max-w-md overflow-hidden rounded-2xl border border-border shadow-2xl">
            <div className="relative aspect-video w-full">
              <iframe
                src="https://www.youtube.com/embed/RO1ISd3-VpY"
                title="Calculadora de Pesagem LeiloApp"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
                className="absolute inset-0 h-full w-full"
              />
            </div>
          </div>
          <p className="fade-in mt-6 text-base font-medium italic text-gold">
            Será que no papelzinho você consegue tudo isso?
          </p>
        </div>
      </section>

      {/* RECURSOS */}
      <section className="px-5 py-16 sm:py-24">
        <div className="mx-auto max-w-5xl">
          <div className="fade-in mb-10 text-center">
            <SectionLabel>Funcionalidades</SectionLabel>
            <h2 className="text-balance text-3xl font-bold sm:text-4xl">
              Tudo que você precisa, nada que você não usa
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { t: "Não precisa de bluetooth", d: "Funciona com qualquer balança — balanção, varão, digital, coletiva. Você digita o peso manualmente." },
              { t: "Funciona offline", d: "Sem internet, sem wi-fi, sem problema. Usa no pasto, no curral, onde não pega sinal." },
              { t: "Romaneio instantâneo", d: "O romaneio vai gerando enquanto você pesa. Acabou o manejo, o documento está pronto." },
              { t: "Pesagens ficam salvas", d: "Histórico completo no celular. Consulta qualquer pesagem a qualquer momento." },
              { t: "Pesa por arroba com RC", d: "Rendimento de carcaça incluído. Calcula direto por arroba com o RC que você definir." },
              { t: "Pesa por kg ou arroba", d: "Você escolhe. Coloca valor por quilo ou por arroba e vê o total calculado na hora." },
            ].map((f) => (
              <div key={f.t} className="fade-in rounded-xl border border-white/10 bg-white/[0.06] p-5">
                <h3 className="mb-2 text-lg font-semibold text-gold">{f.t}</h3>
                <p className="text-sm text-muted-foreground">{f.d}</p>
              </div>
            ))}
          </div>
          <p className="fade-in mt-6 text-center text-sm text-muted-foreground">
            + Média em tempo real · Mais leve e mais pesado · Cabeças contadas · Categorias · Exporta tabela
          </p>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section className="bg-bg-deep px-5 py-16 sm:py-24">
        <div className="mx-auto max-w-3xl">
          <div className="fade-in mb-12 text-center">
            <SectionLabel>Como funciona</SectionLabel>
            <h2 className="text-balance text-3xl font-bold sm:text-4xl">
              3 passos mais simples que <span className="text-gold">caderno</span>
            </h2>
          </div>
          <div className="space-y-6">
            {[
              { n: "01", t: "Abre&nbsp;→ entra em ferramentas → Calculadora Padrão", d: "Nova pesagem, digita o número que saiu na balança e aperta registrar. Pronto." },
              { n: "02", t: "Indicadores na hora", d: "Média, mais leve, mais pesado e total de cabeças — tudo aparece em tempo real enquanto você pesa." },
              { n: "03", t: "Romaneio pronto", d: "Acabou de pesar? O romaneio já está pronto. Exporta a tabela e envia pro comprador ali mesmo." },
            ].map((s) => (
              <div key={s.n} className="fade-in flex gap-5 rounded-xl border border-border bg-white/[0.04] p-5 sm:p-6">
                <div className="text-4xl font-black text-gold sm:text-5xl">{s.n}</div>
                <div>
                  <h3 className="mb-1 text-lg font-semibold sm:text-xl">{s.t}</h3>
                  <p className="text-sm text-muted-foreground sm:text-base">{s.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA INTERMEDIÁRIA */}
      <section className="px-5 py-12 sm:py-16">
        <div className="fade-in mx-auto max-w-2xl rounded-2xl border border-gold/40 bg-gold/[0.06] p-6 text-center sm:p-10">
          <h3 className="text-balance text-2xl font-bold sm:text-3xl">
            Pare de perder dinheiro no <span className="text-gold">curral</span>
          </h3>
          <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground sm:text-base">
            R$ 0,77/dia. Acesso imediato. Funciona offline com qualquer balança.
          </p>
          <div className="mx-auto mt-6 max-w-md">
            <CTAButton>Quero a calculadora agora</CTAButton>
          </div>
        </div>
      </section>

      <section className="bg-bg-deep px-5 py-16 sm:py-24">
        <div className="mx-auto max-w-4xl">
          <div className="fade-in mb-10 text-center">
            <SectionLabel>Depoimentos</SectionLabel>
            <h2 className="text-balance text-3xl font-bold sm:text-4xl">
              Se fosse ruim, não teria tanta indicação e renovação
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[
              { n: "Marcos Prampero", t: "Bom demais o app, dá até vontade de fechar gado só pra pesar" },
              { n: "Guilherme Pacajá", t: "Show, já estou usando, inclusive vou por as pesagens todas que tenho aqui. Bom que fica salvo no celular" },
              { n: "Maicon Aissa", t: "É uma ferramenta de bolso. Canivete vai num bolso e o app no outro" },
              { n: "Cesar Romano", t: "Eu já imaginava que tinha que ter isso faz tempo. Vou querer mais um pro meu filho e um pro meu corretor" },
            ].map((d) => {
              const initials = d.n.split(" ").map((p) => p[0]).slice(0, 2).join("");
              return (
                <div key={d.n} className="fade-in rounded-xl border border-border bg-white/[0.04] p-5">
                  <div className="mb-3 flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gold text-base font-bold text-primary-foreground">{initials}</div>
                    <div>
                      <p className="font-semibold">{d.n}</p>
                      <div className="flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className="h-3.5 w-3.5 fill-gold text-gold" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">"{d.t}"</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-5 py-16 sm:py-24">
        <div className="mx-auto max-w-3xl">
          <div className="fade-in mb-10 text-center">
            <SectionLabel>FAQ</SectionLabel>
            <h2 className="text-balance text-3xl font-bold sm:text-4xl">Dúvidas frequentes</h2>
          </div>
          <Faq />
        </div>
      </section>

      {/* OFERTA */}
      <section className="bg-bg-deep px-5 py-16 sm:py-24">
        <div className="mx-auto max-w-4xl">
          <div className="fade-in mb-10 text-center">
            <SectionLabel>Oferta</SectionLabel>
            <h2 className="text-balance text-3xl font-bold sm:text-4xl">
              A calculadora digital de pesagem mais <span className="text-gold">em conta</span> do mercado
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Será que no papelzinho você gera romaneio automático? Será que no caderno a conta não erra? Será que se fosse ruim, teria tanta indicação e renovação?
            </p>
          </div>

          <div className="fade-in grid grid-cols-1 gap-5 sm:grid-cols-2">
            {/* Anual destaque */}
            <a
              href={CHECKOUT_URL}
              onClick={() => trackCheckoutClick("plano-anual")}
              className="group relative block rounded-2xl border-2 border-gold bg-background p-6 shadow-xl shadow-black/20 transition-transform hover:scale-[1.02] sm:p-8"
            >
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gold px-3 py-1 text-xs font-bold uppercase text-primary-foreground">Melhor plano</span>
              <h3 className="mb-2 text-xl font-bold">Plano Anual</h3>
              <div className="mb-2 flex items-baseline gap-2">
                <span className="text-base text-muted-foreground line-through">R$ 280</span>
                <span className="text-4xl font-black text-gold">R$ 266</span>
              </div>
              <p className="text-sm text-muted-foreground">12 meses · 5% de desconto · R$ 0,72/dia</p>
              <p className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-gold">
                Assinar agora <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </p>
            </a>
            {/* Mensal */}
            <a
              href={CHECKOUT_URL}
              onClick={() => trackCheckoutClick("plano-mensal")}
              className="group block rounded-2xl border border-border bg-background p-6 transition-transform hover:scale-[1.02] hover:border-gold/60 sm:p-8"
            >
              <h3 className="mb-2 text-xl font-bold">Plano Mensal</h3>
              <div className="mb-2 flex items-baseline gap-2">
                <span className="text-base text-muted-foreground line-through">R$ 60</span>
                <span className="text-4xl font-black">R$ 55</span>
              </div>
              <p className="text-sm text-muted-foreground">Experimenta 1 mês · Se for pro anual, abate o valor</p>
              <p className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-foreground">
                Assinar agora <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </p>
            </a>
          </div>

          <p className="fade-in mt-8 text-center text-base font-medium text-gold sm:text-lg">
            R$ 0,77/dia — menos que um café pra parar de perder dinheiro no curral.
          </p>

          <div className="fade-in mx-auto mt-6 max-w-md">
            <CTAButton />
          </div>

          <ul className="fade-in mx-auto mt-8 grid max-w-xl grid-cols-1 gap-2 sm:grid-cols-2">
            {[
              "Acesso imediato após confirmação",
              "Pagamento seguro",
              "Funciona no celular, tablet ou computador",
              "Suporte direto com a equipe LeiloApp",
              "Funciona offline desde o primeiro uso",
            ].map((c) => (
              <li key={c} className="flex items-start gap-2 text-sm">
                <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-solution" />
                <span>{c}</span>
              </li>
            ))}
          </ul>

          <div className="fade-in mx-auto mt-8 max-w-xl rounded-xl border border-border bg-white/[0.04] p-5 text-center text-sm italic text-muted-foreground">
            Se fosse difícil de mexer, não teria tanta indicação e renovação.
          </div>
        </div>
      </section>

      {/* CTA SECUNDÁRIO + FOOTER */}
      <section className="px-5 py-12">
        <div className="mx-auto max-w-md">
          <a
            href={WHATSAPP_URL}
            onClick={trackWhatsAppClick}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-4 text-base font-semibold text-white shadow-lg shadow-black/20 transition-transform hover:scale-[1.01] active:scale-[0.99]"
          >
            <svg viewBox="0 0 32 32" className="h-6 w-6" fill="currentColor" aria-hidden="true">
              <path d="M19.11 17.205c-.372 0-1.088 1.39-1.518 1.39a.63.63 0 01-.315-.1c-.802-.402-1.504-.817-2.163-1.447-.545-.516-1.146-1.29-1.46-1.963a.426.426 0 01-.073-.215c0-.33.99-.945.99-1.49 0-.143-.73-2.09-.832-2.335-.143-.372-.214-.487-.6-.487-.187 0-.36-.043-.53-.043-.302 0-.53.115-.746.315-.688.645-1.032 1.318-1.06 2.264v.114c-.015.99.472 1.977 1.017 2.78 1.23 1.82 2.506 3.41 4.554 4.34.616.287 2.035.888 2.722.888.817 0 2.15-.515 2.478-1.318.13-.33.244-.658.244-1.018 0-.058 0-.144-.03-.215-.1-.172-2.434-1.36-2.678-1.46zm-2.908 7.593c-1.798 0-3.564-.504-5.084-1.49L7.69 24.41l1.13-3.347a9.179 9.179 0 01-1.789-5.444c0-5.05 4.121-9.17 9.17-9.17s9.172 4.12 9.172 9.17c0 5.049-4.122 9.17-9.171 9.17zm0-20.1c-6.034 0-10.929 4.895-10.929 10.929 0 1.86.475 3.704 1.376 5.348L5 27.39l5.502-1.682c1.59.86 3.36 1.32 5.21 1.32 6.032 0 10.928-4.895 10.928-10.929 0-6.034-4.896-10.929-10.929-10.929z" />
            </svg>
            Falar com atendente via WhatsApp
          </a>
        </div>
      </section>

      <footer className="border-t border-border px-5 py-8 text-center text-sm text-muted-foreground">
        LeiloApp © 2026 · Todos os direitos reservados
      </footer>

      {/* Sticky CTA mobile */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 border-t border-gold/30 bg-background/95 px-4 py-3 backdrop-blur transition-transform sm:hidden ${
          showSticky ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <a
          href={CHECKOUT_URL}
          onClick={() => trackCheckoutClick("sticky-mobile")}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gold px-5 py-3 text-base font-semibold text-primary-foreground"
        >
          Garantir meu acesso <ArrowRight className="h-5 w-5" />
        </a>
      </div>
    </div>
  );
}

function Faq() {
  const items = [
    { q: "Meu pessoal não usa app.", a: "É mais simples que caderno: abriu, digitou o peso, apertou registrar. Pronto. Se sabe usar WhatsApp, sabe usar a calculadora." },
    { q: "No curral não dá tempo.", a: "Justamente: você digita e já vê a média. Sem conferir tudo depois. Economiza tempo, não gasta." },
    { q: "Sem internet não funciona?", a: "Funciona 100% offline. Sem wi-fi, sem sinal, sem problema. Feito pro curral real." },
    { q: "Eu já faço no Excel.", a: "Excel é depois. O erro nasce no curral, na hora de anotar. Aqui resolve na hora, durante a pesagem." },
    { q: "Se não conecta na balança, não vale.", a: "O prejuízo não nasce na balança — nasce no registro e na conta refeita. Você pesa como sempre e registra no app." },
    { q: "É mais uma assinatura.", a: "R$ 0,77/dia. Menos que um café. E o anual sai mais em conta: R$ 266 por 12 meses." },
    { q: "E se eu não gostar?", a: "Começa pela mensalidade de R$ 55. Se gostar e for pro anual, o valor da mensalidade é abatido." },
  ];
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="space-y-3">
      {items.map((it, i) => (
        <div key={it.q} className="fade-in overflow-hidden rounded-xl border border-border bg-white/[0.04]">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-base font-semibold transition-colors hover:bg-white/[0.04]"
          >
            <span>{it.q}</span>
            <ChevronDown className={`h-5 w-5 flex-shrink-0 text-gold transition-transform ${open === i ? "rotate-180" : ""}`} />
          </button>
          <div className={`grid transition-all duration-300 ${open === i ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
            <div className="overflow-hidden">
              <p className="px-5 pb-4 text-sm text-muted-foreground sm:text-base">{it.a}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
