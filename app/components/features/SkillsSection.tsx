"use client";

import { motion } from "framer-motion";
import { Profile } from "../../lib/data/profiles";
import React from "react";

interface SkillsProps {
  profile: Profile;
}

function SkillsSectionComponent({ profile }: SkillsProps) {
  return (
    <section id="skills" className="px-4 py-32">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {profile.skills.map((skill, idx) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="group glass p-8 rounded-3xl relative overflow-hidden"
            >
              {/* Animated Glow Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-nebula-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <span className="text-[10px] text-nebula-accent font-mono block mb-2 uppercase tracking-widest">
                  {skill.category}
                </span>
                <h3 className="text-zinc-100 font-bold text-lg mb-4">{skill.name}</h3>
                
                <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-nebula-accent to-nebula-secondary"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export const SkillsSection = React.memo(SkillsSectionComponent);
