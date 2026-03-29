"use client";

import { usePulse } from "../../lib/pulse/PulseContext";

export function SystemStatusBar() {
  const { tom, therese, nodes, isLoading } = usePulse();

  if (isLoading) return null;

  return (
    <div className="flex items-center justify-center gap-4 text-[10px] font-mono tracking-[0.2em] uppercase text-zinc-500 mb-8 border-y border-white/5 py-3">
      <span className="text-nebula-accent font-bold">System Status:</span>
      <StatusTag 
        name="TOM" 
        isOnline={tom.isOnline} 
        status={tom.isOnline ? `ONLINE (${tom.activeNodes})` : "OFFLINE"} 
      />
      <span className="opacity-20">|</span>
      <StatusTag 
        name="THERESE" 
        isOnline={therese.isOnline} 
        status={therese.isOnline ? `ACTIVE (${therese.activeNodes})` : "AWAY"} 
      />
      <span className="opacity-20">|</span>
      <StatusTag 
        name="NODES" 
        status={`${nodes.filter(n => n.isOnline).length} ACTIVE`} 
        isOnline={nodes.some(n => n.isOnline)} 
      />
    </div>
  );
}

function StatusTag({ name, status, isOnline }: { name: string; status: string; isOnline: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <span className={isOnline ? "text-emerald-500" : "text-zinc-700"}>
        {name} [{status}]
      </span>
    </div>
  );
}
