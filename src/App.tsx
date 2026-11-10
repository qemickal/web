import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Hero from "./components/Hero";
import Tienda from "./pages/Tienda";
import Estudio from "./pages/Estudio";
import { WIPE_LABEL, WIPE_DUR, EASE, LINK_MODE, WP_URLS, type PageId } from "./brand";

export default function App() {
  const [page, setPage] = useState<PageId>("hero");
  const wrapRef = useRef<HTMLDivElement>(null);
  const aRef = useRef<HTMLDivElement>(null);
  const bRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const busy = useRef(false);

  /* Si el navegador restaura esta vista desde bfcache (botón "atrás"
     tras salir a WordPress), asegura que la cortina quede abierta. */
  useEffect(() => {
    const onPageShow = (e: PageTransitionEvent) => {
      if (e.persisted) gsap.set([aRef.current, bRef.current], { scaleY: 0 });
    };
    window.addEventListener("pageshow", onPageShow);
    return () => window.removeEventListener("pageshow", onPageShow);
  }, []);

  const navigate = useCallback((target: PageId) => {
    if (busy.current) return;
    busy.current = true;
    const external = LINK_MODE === "wp";
    const wrap = wrapRef.current!;
    const a = aRef.current!;
    const b = bRef.current!;
    const label = labelRef.current!;

    gsap
      .timeline({
        onComplete: () => {
          busy.current = false;
        },
      })
      .set(wrap, { pointerEvents: "auto" })
      .set([a, b], { scaleY: 0, transformOrigin: "50% 0%" })
      .set(label, { autoAlpha: 0 })
      .to(a, { scaleY: 1, duration: WIPE_DUR, ease: EASE })
      .to(b, { scaleY: 1, duration: WIPE_DUR, ease: EASE }, "-=0.38")
      .add(() => {
        label.textContent = WIPE_LABEL[target];
        if (external) {
          /* Modo WordPress: la cortina cubre y salimos a la página WP */
          window.location.assign(WP_URLS[target]);
          return;
        }
        setPage(target);
        window.scrollTo(0, 0);
      })
      .to(label, { autoAlpha: 1, duration: 0.28, ease: "power2.out" }, "<")
      .to(label, { autoAlpha: 0, duration: 0.28, ease: "power2.in" }, "+=0.55")
      .set([a, b], { transformOrigin: "50% 100%" })
      .to(b, { scaleY: 0, duration: WIPE_DUR, ease: EASE })
      .to(a, { scaleY: 0, duration: WIPE_DUR, ease: EASE }, "-=0.38")
      .set(wrap, { pointerEvents: "none" });
  }, []);

  return (
    <>
      {page === "hero" && <Hero onNavigate={navigate} />}
      {page === "tienda" && <Tienda onNavigate={navigate} />}
      {page === "estudio" && <Estudio onNavigate={navigate} />}

      {/* Cortina de transición */}
      <div ref={wrapRef} className="wipe" aria-hidden="true">
        <div ref={aRef} className="wipe-panel wipe-a" />
        <div ref={bRef} className="wipe-panel wipe-b" />
        <div ref={labelRef} className="wipe-label mono-label" />
      </div>
    </>
  );
}
