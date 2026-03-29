"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Button } from "../ui/Button";

const EASE = "circOut";

export default function DeveloperSelect() {
  const router = useRouter();

  return (
    <div className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-zinc-950 px-6">
      <div className="relative z-10 w-full max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mb-16"
        >
          <p className="mb-4 font-mono text-xs tracking-[0.3em] text-zinc-600 uppercase">
            Select Developer Profile
          </p>
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-white md:text-6xl">
            The Studio
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <ProfileCard name="Tom" role="Fullstack Specialist" href="/tom" delay={0.1} />
          <ProfileCard name="Therese" role="Backend Architect" href="/therese" delay={0.2} />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-16"
        >
          <Button variant="ghost" onClick={() => router.push("/portfolio")}>
            View Joint Portfolio →
          </Button>
        </motion.div>
      </div>
    </div>
  );
}

function ProfileCard({
  name,
  role,
  href,
  delay,
}: {
  name: string;
  role: string;
  href: string;
  delay: number;
}) {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.8, ease: EASE }}
      onClick={() => router.push(href)}
      className="group relative cursor-pointer overflow-hidden rounded-2xl border border-white/5 bg-zinc-900/50 p-10 transition-all hover:border-white/20"
    >
      <div className="relative z-10 text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-zinc-800 text-3xl font-bold text-white transition-transform group-hover:scale-110">
          {name[0]}
        </div>
        <h2 className="mb-2 text-2xl font-bold text-white">{name}</h2>
        <p className="font-mono text-sm tracking-widest text-zinc-500 uppercase">{role}</p>
      </div>
    </motion.div>
  );
}
