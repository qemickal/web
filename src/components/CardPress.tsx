import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Asterisk } from "lucide-react";
import { MarkAsterisk } from "./Icons";
import { FLOAT_DUR } from "../brand";
import { MEDIA } from "../media";

type Universe = "tienda" | "estudio";

interface CardPressProps {
  universe: Universe;
  mode?: "packed" | "hero";
  stamp?: number; /* variante de estampa */
  className?: string;
}

const canHover = () =>
  typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches;
const reduceMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const STAMP_POS = ["30% 24%", "50% 50%", "68% 72%"];

const COPY: Record<
  Universe,
  { no: string; word: string; tag: string; img: string; serial: string }
> = {
  tienda: {
    no: "MC-01",
    word: "Tienda",
    tag: "Objetos & Ediciones",
    img: MEDIA.tienda.stamp,
    serial: "N° 047/200",
  },
  estudio: {
    no: "MC-02",
    word: "Estudio",
    tag: "Identidad & Experiencias",
    img: MEDIA.estudio.stamp,
    serial: "N° 012/060",
  },
};

export default function CardPress({
  universe,
  mode = "packed",
  stamp = 0,
  className = "",
}: CardPressProps) {
  const copy = COPY[universe];
  const interactive = mode === "hero";
  const floatRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const foilRef = useRef<HTMLDivElement>(null);
  const [flipped, setFlipped] = useState(false);

  /* Flotación continua */
  useEffect(() => {
    if (reduceMotion() || !floatRef.current) return;
    const tween = gsap.to(floatRef.current, {
      y: interactive ? -14 : -8,
      rotation: interactive ? 0.9 : -1.2,
      duration: FLOAT_DUR + (interactive ? 0 : 0.8),
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
    });
    return () => {
      tween.kill();
    };
  }, [interactive]);

  /* Barrido de foil */
  useEffect(() => {
    if (reduceMotion() || !foilRef.current) return;
    const tween = gsap.fromTo(
      foilRef.current,
      { backgroundPositionX: "-180%" },
      {
        backgroundPositionX: "180%",
        duration: 4.8,
        repeat: -1,
        repeatDelay: 2.6,
        ease: "sine.inOut",
      },
    );
    return () => {
      tween.kill();
    };
  }, []);

  /* Flip frente / reverso */
  useEffect(() => {
    if (!innerRef.current) return;
    gsap.to(innerRef.current, {
      rotationY: flipped ? 180 : 0,
      duration: 0.9,
      ease: "power3.inOut",
    });
  }, [flipped]);

  const onMove = (e: React.PointerEvent) => {
    if (!interactive || !canHover() || reduceMotion()) return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    gsap.to(tiltRef.current, {
      rotationY: x * 12,
      rotationX: -y * 9,
      duration: 0.6,
      ease: "power2.out",
    });
  };

  const onLeave = () => {
    if (!interactive) return;
    gsap.to(tiltRef.current, {
      rotationX: 0,
      rotationY: 0,
      duration: 0.9,
      ease: "power3.out",
    });
  };

  const card = (
    <div ref={floatRef} className="cp-float">
      <div ref={tiltRef} className="cp-tilt">
        <div ref={innerRef} className="cp-inner">
          {/* ——— Frente ——— */}
          <div className={`cp-face cp-front cp-${universe}`}>
            <div className="cp-top mono-label">
              <span>Mono Cromat &amp; Co.</span>
              <span>{copy.no}</span>
            </div>
            <div
              className="cp-stamp"
              style={{
                backgroundImage: `url(${copy.img})`,
                backgroundPosition: STAMP_POS[stamp % STAMP_POS.length],
              }}
            >
              <span className="cp-serial mono-label">{copy.serial}</span>
            </div>
            <div className="cp-word font-display">{copy.word}</div>
            <div className="cp-bot mono-label">
              <span>{copy.tag}</span>
              <Asterisk className="h-3.5 w-3.5" strokeWidth={2.4} />
            </div>
            <div ref={foilRef} className="cp-foil" />
            <div className="cp-shadowedge" />
          </div>

          {/* ——— Reverso ——— */}
          <div className={`cp-face cp-back cp-back-${universe}`}>
            <div className="cp-back-head mono-label">
              <span>{copy.no} — Reverso</span>
              <span>{copy.serial}</span>
            </div>
            <MarkAsterisk className="cp-back-mark" />
            <div className="cp-back-lines mono-label">
              <p>Cada golpe deja marca.</p>
              <p>Solo la primera tinta.</p>
              <p>La técnica es poética.</p>
              <p>Lift your vision.</p>
            </div>
            <div className="cp-back-foot mono-label">
              <span>Validado por el taller</span>
              <span>CDMX</span>
            </div>
            <div className="cp-shadowedge" />
          </div>
        </div>
      </div>
    </div>
  );

  if (!interactive) {
    return (
      <div className={`cp-root packed ${className}`} aria-hidden="true">
        {card}
      </div>
    );
  }

  return (
    <button
      type="button"
      className={`cp-root hero ${className}`}
      onClick={() => setFlipped((f) => !f)}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      aria-pressed={flipped}
      aria-label={`Tarjeta ${copy.word}. Activa para ver el ${flipped ? "frente" : "reverso"}.`}
    >
      {card}
    </button>
  );
}
