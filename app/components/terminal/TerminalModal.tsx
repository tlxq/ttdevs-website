"use client";

import { Modal } from "../ui/Modal";
import Terminal from "./Terminal";
import { GitHubRepo } from "../../lib/github/fetchRepos";
import { useEffect, useState } from "react";
import { fetchGitHubRepos } from "../../lib/github/fetchRepos";

interface TerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TerminalModal({ isOpen, onClose }: TerminalModalProps) {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);

  useEffect(() => {
    if (isOpen && repos.length === 0) {
      const loadRepos = async () => {
        try {
          const [reposTom, reposTherese] = await Promise.all([
            fetchGitHubRepos("tlxq"),
            fetchGitHubRepos("thjox")
          ]);
          setRepos([...reposTom, ...reposTherese]);
        } catch (error) {
          console.error("Failed to fetch repos for terminal:", error);
        }
      };
      loadRepos();
    }
  }, [isOpen, repos.length]);

  if (!isOpen) return null;

  return (
    <Modal onClose={onClose}>
      <div className="h-[500px] md:h-[600px] w-full bg-zinc-950 overflow-hidden rounded-3xl border border-white/5">
        <Terminal repos={repos} onStart={onClose} />
      </div>
    </Modal>
  );
}
