import { motion } from "motion/react";

export function AnimatedBackground() {
  return (
    <div
      aria-hidden
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
    >
      {/* ============ CAPA 1: Gradiente base radial ============ */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#131A2B_0%,#0B0F1A_45%,#060912_100%)]" />

      {/* ============ CAPA 2: Aurora (3 blobs animados) ============ */}
      <motion.div
        animate={{
          x: [0, 60, -40, 0],
          y: [0, -40, 30, 0],
          scale: [1, 1.15, 0.95, 1],
        }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-alba-500/15 blur-[140px]"
      />
      <motion.div
        animate={{
          x: [0, -50, 30, 0],
          y: [0, 40, -30, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{ duration: 32, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full bg-reino-500/15 blur-[140px]"
      />
      <motion.div
        animate={{ x: [0, 40, -60, 0], y: [0, 30, -20, 0] }}
        transition={{ duration: 40, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full bg-fuego-500/8 blur-[130px]"
      />

      {/* ============ CAPA 3: Rayo de luz desde arriba ============ */}
      <div
        className="absolute -top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] opacity-25"
        style={{
          background:
            "conic-gradient(from 180deg at 50% 0%, transparent 0deg, rgba(255,209,102,0.25) 15deg, transparent 30deg, transparent 180deg, rgba(255,209,102,0.15) 195deg, transparent 210deg)",
          filter: "blur(40px)",
        }}
      />

      {/* ============ CAPA 4: Estrellas titilantes ============ */}
      <div className="absolute inset-0">
        {Array.from({ length: 60 }).map((_, i) => {
          const size = (i % 3) + 1;
          const top = (i * 37) % 100;
          const left = (i * 53) % 100;
          const delay = (i % 8) * 0.5;
          const duration = 2 + (i % 5);
          return (
            <motion.span
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.9, 0], scale: [1, 1.4, 1] }}
              transition={{
                duration,
                repeat: Infinity,
                delay,
                ease: "easeInOut",
              }}
              className="absolute rounded-full bg-white"
              style={{
                top: `${top}%`,
                left: `${left}%`,
                width: size,
                height: size,
                boxShadow: "0 0 4px rgba(255,255,255,0.5)",
              }}
            />
          );
        })}
      </div>

      {/* ============ CAPA 5: Grano cinematográfico ============ */}
      <div
        className="absolute inset-0 opacity-[0.06] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "180px 180px",
        }}
      />

      {/* ============ Viñeta para enfocar el centro ============ */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,#060912_100%)] opacity-60" />
    </div>
  );
}
