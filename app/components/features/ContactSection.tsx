"use client";

import { motion } from "framer-motion";
import { Button } from "../ui/Button";
import { useTranslations } from "next-intl";

interface ContactProps {
  onContactClick: (recipientKey: "tom" | "therese", name: string) => void;
}

export function ContactSection({ onContactClick }: ContactProps) {
  const t = useTranslations("Contact");

  return (
    <section id="contact" className="px-4 py-32 bg-zinc-950">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-8">
              {t("title1")} <br />
              <span className="text-zinc-500">{t("title2")}</span>
            </h2>
            <p className="text-zinc-400 text-lg mb-8 max-w-md">
              {t("description")}
            </p>
            <div className="flex flex-col gap-4">
              <a href="mailto:hello@ttdevs.com" className="text-zinc-100 hover:text-zinc-500 transition-colors font-mono">
                hello@ttdevs.com
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <div className="p-10 rounded-3xl border border-white/5 bg-zinc-900/40 backdrop-blur-md">
              <h3 className="text-2xl font-bold text-white mb-6">{t("inquiry")}</h3>
              <p className="text-zinc-500 mb-8">
                {t("inquiryDescription")}
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Button 
                  onClick={() => onContactClick("tom", "Tom")}
                  variant="primary"
                >
                  {t("contactTom")}
                </Button>
                <Button 
                  onClick={() => onContactClick("therese", "Therese")}
                  variant="outline"
                >
                  {t("contactTherese")}
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
