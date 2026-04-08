"use client";

import { motion } from "framer-motion";
import { Card } from "../ui/Card";
import { Profile } from "../../lib/data/profiles";
import { GitHubRepo } from "../../lib/github/fetchRepos";
import { StarIcon, CodeBracketIcon } from "@heroicons/react/24/outline";
import React from "react";

interface ProjectsProps {
  profile: Profile;
  repos?: GitHubRepo[];
}

function ProjectsSectionComponent({ profile, repos }: ProjectsProps) {
  const hasRepos = repos && repos.length > 0;
  const isJoint = profile.id === "joint";

  return (
    <section id="projects" className="px-4 py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 text-center"
        >
          <span className="text-nebula-accent text-xs font-bold tracking-widest uppercase font-mono mb-4 block">
            {hasRepos ? "Live Ecosystem" : "Selected Works"}
          </span>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white italic">
            Engineered <span className="text-gradient inline-block px-4 italic">Growth</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {hasRepos ? (
            repos.map((repo, idx) => (
              <motion.div
                key={repo.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="group h-full flex flex-col p-8 bg-zinc-900/20">
                  <div className="mb-auto">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex flex-col gap-1">
                        <CodeBracketIcon className="h-6 w-6 text-nebula-cyan opacity-50" />
                        {isJoint && (
                          <span className="text-[10px] font-mono text-nebula-accent/60 uppercase">
                            by {repo.owner.login}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-500">
                        <StarIcon className="h-3.5 w-3.5" />
                        {repo.stargazers_count}
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-nebula-cyan transition-colors truncate">
                      {repo.name}
                    </h3>
                    <p className="text-zinc-400 text-sm leading-relaxed mb-8 line-clamp-3">
                      {repo.description || "Experimental repository part of the TTdevs digital ecosystem."}
                    </p>
                  </div>
                  
                  <div className="mt-auto flex items-center justify-between">
                    <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-tighter">
                      {repo.language || "TypeScript"}
                    </span>
                    <a 
                      href={repo.html_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-white hover:text-nebula-secondary transition-colors inline-flex items-center gap-2"
                    >
                      View Code
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </a>
                  </div>
                </Card>
              </motion.div>
            ))
          ) : (
            profile.projects.map((project, idx) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="group h-full flex flex-col p-8 bg-zinc-900/20">
                  <div className="mb-auto">
                    <span className="text-nebula-accent text-[10px] font-bold font-mono tracking-tighter uppercase mb-4 block">
                      {project.tag}
                    </span>
                    <h3 className="text-xl font-bold text-white mb-4 group-hover:text-nebula-cyan transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-zinc-400 text-sm leading-relaxed mb-8">
                      {project.desc}
                    </p>
                  </div>
                  
                  <div className="mt-auto">
                    <button className="text-xs font-bold text-white hover:text-nebula-secondary transition-colors inline-flex items-center gap-2">
                      Learn More
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </button>
                  </div>
                </Card>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

export const ProjectsSection = React.memo(ProjectsSectionComponent);
