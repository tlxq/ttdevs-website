"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "./supabase";

export interface SystemStatus {
  nodeName: string;
  isOnline: boolean;
  cpuUsage: number;
  ramUsage: number;
  latencyMs: number;
  lastSeen: string;
}

interface PulseContextType {
  nodes: SystemStatus[];
  tom: { isOnline: boolean; activeNodes: number };
  therese: { isOnline: boolean; activeNodes: number };
  activityIntensity: number; // 0 to 1
  isLoading: boolean;
}

interface NodeStatusRow {
  node_name: string;
  cpu_usage: number | null;
  ram_usage: number | null;
  latency_ms: number | null;
  last_seen: string;
}

const PulseContext = createContext<PulseContextType | undefined>(undefined);

export function PulseProvider({ children }: { children: React.ReactNode }) {
  const [nodes, setNodes] = useState<SystemStatus[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [now, setNow] = useState(Date.now());

  // Update "now" every 30 seconds to refresh online status
  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 30000);
    return () => clearInterval(interval);
  }, []);
const checkOnline = React.useCallback((timestamp: string) => {
  if (!timestamp) return false;
  const lastSeen = new Date(timestamp).getTime();
  const nowTimestamp = typeof now === 'number' ? now : new Date(now).getTime();
  const diffMinutes = (nowTimestamp - lastSeen) / (1000 * 60);
  return diffMinutes < 15; // Be lenient: 15 minutes window
}, [now]);

const mapRowToStatus = React.useCallback((row: NodeStatusRow): SystemStatus => ({
  nodeName: row.node_name,
  isOnline: checkOnline(row.last_seen),
  cpuUsage: row.cpu_usage || 0,
  ramUsage: row.ram_usage || 0,
  latencyMs: row.latency_ms || 0,
  lastSeen: row.last_seen,
}), [checkOnline]);


  const fetchStatus = React.useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from("node_status")
        .select("*");

      if (error) throw error;
      if (data) {
        setNodes((data as NodeStatusRow[]).map(mapRowToStatus));
      }
    } catch (err) {
      console.error("Pulse fetch error:", err);
    } finally {
      setIsLoading(false);
    }
  }, [mapRowToStatus]);

  useEffect(() => {
    fetchStatus();

    const channel = supabase
      .channel("node_status_changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "node_status" },
        () => fetchStatus()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchStatus]);

  // Aggregate status for Tom (tlxq) and Therese (thjox)
  const tomNodes = nodes.filter(n => n.nodeName.toLowerCase().startsWith("tlxq"));
  const thereseNodes = nodes.filter(n => n.nodeName.toLowerCase().startsWith("thjox"));

  const tom = {
    isOnline: tomNodes.some(n => n.isOnline),
    activeNodes: tomNodes.filter(n => n.isOnline).length
  };

  const therese = {
    isOnline: thereseNodes.some(n => n.isOnline),
    activeNodes: thereseNodes.filter(n => n.isOnline).length
  };

  const totalCpu = nodes.reduce((acc, n) => acc + n.cpuUsage, 0);
  const activityIntensity = nodes.length > 0 ? Math.min(totalCpu / (nodes.length * 100) + 0.1, 1) : 0.1;

  return (
    <PulseContext.Provider value={{ nodes, tom, therese, activityIntensity, isLoading }}>
      {children}
    </PulseContext.Provider>
  );
}

export function usePulse() {
  const context = useContext(PulseContext);
  if (context === undefined) {
    throw new Error("usePulse must be used within a PulseProvider");
  }
  return context;
}
