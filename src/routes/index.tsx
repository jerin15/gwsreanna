import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import { useState, useCallback } from "react";

import catHero from "../assets/cat-hero.jpg";
import catJudge from "../assets/cat-judge.jpg";
import catStretch from "../assets/cat-stretch.jpg";
import catShock from "../assets/cat-shock.jpg";
import catLoaf from "../assets/cat-loaf.jpg";
import catPeek from "../assets/cat-peek.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Feel Better Soon!" },
      { name: "description", content: "A little something to make you smile and feel better." },
      { property: "og:title", content: "Feel Better Soon!" },
      { property: "og:description", content: "A little something to make you smile and feel better." },
    ],
  }),
  component: CheerUpPage,
});

interface CatCardData {
  id: number;
  image: string;
  caption: string;
  reaction: string;
}

const catCards: CatCardData[] = [
  { id: 1, image: catJudge, caption: "when you say you're fine but we both know", reaction: "I see through your lies. Rest. Now." },
  { id: 2, image: catStretch, caption: "me pretending my immune system is a gym bro", reaction: "That's the spirit! Flex on those germs!" },
  { id: 3, image: catShock, caption: "me checking my temperature for the 47th time", reaction: "It's okay, we all do it. The thermometer is now your personality." },
  { id: 4, image: catLoaf, caption: "my current energy level: bread", reaction: "Loaf mode activated. Zero obligations. Maximum cozy." },
  { id: 5, image: catPeek, caption: "me watching my friends have fun without me", reaction: "FOMO is temporary. Your comeback will be legendary." },
  { id: 6, image: catHero, caption: "you in 3 days (manifesting)", reaction: "Visualize it. The cozy blanket era is ending soon." },
];

interface MoodResponse {
  image: string;
  message: string;
  subtext: string;
}

const moodResponses: Record<string, MoodResponse> = {
  sad: {
    image: catShock,
    message: "Aww, Reanna, you poor thing",
    subtext: "It's okay to feel bad. But also: your cat memes miss you and want you back at full strength.",
  },
  okay: {
    image: catLoaf,
    message: "Okay is progress, Reanna!",
    subtext: "You're in loaf mode now. Soon you'll be zoomies mode. Patience, young padawan.",
  },
  surviving: {
    image: catStretch,
    message: "Tired but tolerating existence?",
    subtext: "That's basically the adult experience, Reanna. You're nailing it. Gold star for still being here.",
  },
};

function CheerUpPage() {
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [surpriseTriggered, setSurpriseTriggered] = useState(false);

  const handleSurprise = useCallback(async () => {
    setSurpriseTriggered(true);
    const confetti = (await import("canvas-confetti")).default;
    const end = Date.now() + 2000;
    const colors = ["#ff7a6b", "#ffb088", "#f4c2c2", "#ffd700", "#ff6b9d"];

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.8 },
        colors,
        shapes: ["circle", "square"],
        scalar: 1.2,
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.8 },
        colors,
        shapes: ["circle", "square"],
        scalar: 1.2,
      });
      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center px-4 pt-12 pb-8 text-center sm:pt-20 sm:pb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
          className="max-w-lg"
        >
          <motion.img
            src={catHero}
            alt="Sleepy cute cat"
            width={280}
            height={280}
            className="mx-auto mb-6 rounded-3xl"
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          />
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Sending{" "}
            <span className="text-coral">Reanna</span> purr-fect healing vibes
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            This page is scientifically proven* to improve mood by at least 47%
          </p>
          <p className="mt-1 text-xs text-muted-foreground/60">*not actually scientific, but still true</p>
        </motion.div>
      </section>

      {/* Cat Meme Grid */}
      <section className="px-4 py-8 sm:py-12">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl"
        >
          <h2 className="mb-2 text-center text-2xl font-bold text-foreground sm:text-3xl">
            Click a cat. Any cat.
          </h2>
          <p className="mb-8 text-center text-muted-foreground">
            They all have opinions about your current situation.
          </p>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6">
            {catCards.map((card, index) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
              >
                <motion.button
                  onClick={() => setActiveCard(activeCard === card.id ? null : card.id)}
                  className="group relative w-full overflow-hidden rounded-2xl bg-card p-3 text-left shadow-sm transition-shadow hover:shadow-md sm:p-4"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <div className="relative aspect-square overflow-hidden rounded-xl bg-muted/30">
                    <img
                      src={card.image}
                      alt={`Cat meme: ${card.caption}`}
                      className="h-full w-full object-contain"
                      loading="lazy"
                      width={512}
                      height={512}
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                      <p className="text-xs font-bold text-white meme-text sm:text-sm">
                        {card.caption}
                      </p>
                    </div>
                  </div>
                </motion.button>

                <AnimatePresence>
                  {activeCard === card.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-2 overflow-hidden rounded-xl bg-coral/10 px-3 py-2"
                    >
                      <p className="text-sm font-medium text-foreground">
                        {card.reaction}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Mood Picker */}
      <section className="px-4 py-8 sm:py-12">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-xl text-center"
        >
          <h2 className="mb-2 text-2xl font-bold text-foreground sm:text-3xl">
            Real talk: how you feelin&apos;?
          </h2>
          <p className="mb-6 text-muted-foreground">
            Be honest. The cats are listening.
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            {[
              { key: "sad", label: "Pretty rough 😿", color: "bg-blush hover:bg-blush/80" },
              { key: "okay", label: "Could be worse 😼", color: "bg-peach hover:bg-peach/80" },
              { key: "surviving", label: "Surviving 😹", color: "bg-coral hover:bg-coral/80" },
            ].map((mood) => (
              <motion.button
                key={mood.key}
                onClick={() => setSelectedMood(mood.key)}
                className={`rounded-full px-6 py-3 text-sm font-semibold text-foreground transition-colors ${mood.color} ${selectedMood === mood.key ? "ring-2 ring-foreground/20" : ""}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {mood.label}
              </motion.button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {selectedMood && (
              <motion.div
                key={selectedMood}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="mt-8 rounded-3xl bg-card p-6 shadow-sm"
              >
                <img
                  src={moodResponses[selectedMood].image}
                  alt="Mood response cat"
                  className="mx-auto mb-4 h-40 w-40 rounded-2xl object-contain"
                  width={512}
                  height={512}
                />
                <h3 className="text-xl font-bold text-foreground">
                  {moodResponses[selectedMood].message}
                </h3>
                <p className="mt-2 text-muted-foreground">
                  {moodResponses[selectedMood].subtext}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Surprise Button */}
      <section className="px-4 py-8 sm:py-12">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mx-auto max-w-md text-center"
        >
          <motion.button
            onClick={handleSurprise}
            className={`relative overflow-hidden rounded-2xl px-8 py-6 text-lg font-bold text-white transition-all ${surpriseTriggered ? "bg-warm" : "bg-destructive hover:bg-destructive/90"}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={surpriseTriggered ? { rotate: [0, -3, 3, -3, 0] } : {}}
            transition={{ duration: 0.5 }}
          >
            {surpriseTriggered ? (
              <span>✨ You did it ✨</span>
            ) : (
              <span>🚫 DO NOT PRESS 🚫</span>
            )}
          </motion.button>

          <AnimatePresence>
            {surpriseTriggered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-6 rounded-2xl bg-card p-6 shadow-sm"
              >
                <p className="text-lg font-bold text-foreground">
                  You rebel. I like you.
                </p>
                <p className="mt-2 text-muted-foreground">
                  Here&apos;s your reward: you are objectively amazing, and this sickness is temporary. 
                  Your comeback energy is going to be UNHINGED. 
                  The world isn&apos;t ready. Rest up, legend.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="px-4 py-12 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-2xl font-bold text-foreground">
            Get well soon, you incredible human 🧡
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Made with excessive cat energy and genuine concern
          </p>
          <div className="mt-6 flex justify-center gap-2 text-2xl">
            {["🐱", "💐", "🍵", "📺", "🛌", "💪"].map((emoji, i) => (
              <motion.span
                key={i}
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 2, delay: i * 0.2 }}
              >
                {emoji}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </footer>
    </div>
  );
}