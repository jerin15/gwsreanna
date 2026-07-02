import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import { useState, useCallback, useEffect } from "react";

import catHero from "../assets/cat-hero.jpg";
import catJudge from "../assets/cat-judge.jpg";
import catStretch from "../assets/cat-stretch.jpg";
import catShock from "../assets/cat-shock.jpg";
import catLoaf from "../assets/cat-loaf.jpg";
import catPeek from "../assets/cat-peek.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Feel Better Soon, Reanna!" },
      { name: "description", content: "A little something to make you smile and feel better." },
      { property: "og:title", content: "Feel Better Soon, Reanna!" },
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
  { id: 1, image: catJudge, caption: "when you say you are fine but we both know", reaction: "I see through your lies. Rest. Now." },
  { id: 2, image: catStretch, caption: "me pretending my immune system is a gym bro", reaction: "That is the spirit! Flex on those germs!" },
  { id: 3, image: catShock, caption: "me checking my temperature for the 47th time", reaction: "It is okay, we all do it. The thermometer is now your personality." },
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
    subtext: "It is okay to feel bad. But also: your cat memes miss you and want you back at full strength.",
  },
  okay: {
    image: catLoaf,
    message: "Okay is progress, Reanna!",
    subtext: "You are in loaf mode now. Soon you will be zoomies mode. Patience, young padawan.",
  },
  surviving: {
    image: catStretch,
    message: "Tired but tolerating existence?",
    subtext: "That is basically the adult experience, Reanna. You are nailing it. Gold star for still being here.",
  },
};

const catPuns = [
  "You have got to be kitten me, Reanna. Get well soon!",
  "This whole situation is unfurtunate. Purrhaps some rest will help.",
  "You are feline down today, but tomorrow you will be pawsome.",
  "Stay pawsitive. You are litterally the best.",
  "Do not let this sickness catch you off guard. You have got claws.",
  "I am not kitten around: you are the cat's whiskers.",
  "Time to paws and recover. The world can meownage without you for a day.",
  "You are one clever kitty. This bug does not stand a chance.",
];

const catJokes = [
  { q: "What do you call a cat that gets anything it wants?", a: "Purrsuasive." },
  { q: "Why was the cat sitting on the computer?", a: "To keep an eye on the mouse." },
  { q: "What is a cat's favorite dessert?", a: "Chocolate mouse." },
  { q: "How do cats end a fight?", a: "They hiss and make up." },
  { q: "What do cats eat for breakfast?", a: "Mice Krispies." },
  { q: "Why do cats always get their way?", a: "They are very purrsuasive negotiators." },
];

const catFactsSerious = [
  "Cats sleep 12 to 16 hours a day. You are doing something right by resting.",
  "A cat's purr vibrates at a frequency that can help heal bones and tissue. Get a cat. Or imagine one.",
  "Cats have 32 muscles in each ear. Yours only need to hear one thing: you will be okay.",
  "A group of cats is called a clowder. A group of Reannas is called a national treasure.",
];

const catFactsFake = [
  "Cats invented the internet in 2003. This is why they own it.",
  "The average cat can bench press 4 grapes. Do not test this.",
  "Studies show that saying meow three times cures 12 percent of colds. Reanna, try it.",
  "Cats can legally vote in 3 countries. None of them are real.",
];

const complimentAdjectives = [
  "unreasonably brilliant", "cosmically kind", "suspiciously talented", "outrageously funny",
  "chaotically wise", "absurdly capable", "unfairly stylish", "genuinely magical",
  "wildly loveable", "quietly powerful", "delightfully unhinged", "impossibly cool",
  "radiantly weird", "criminally underrated", "iconically kind", "supernaturally chill",
];
const complimentNouns = [
  "human", "legend", "vibe", "genius", "sunbeam", "chaos goblin", "menace to sadness",
  "cryptid", "certified icon", "walking serotonin", "small warm sun", "problem solver",
  "friend of cats", "storm in a teacup", "living plot twist",
];
const complimentClosers = [
  "and honestly, the world knows it.",
  "and I will fight anyone who disagrees.",
  "the data is overwhelming.",
  "the cats have signed a petition confirming this.",
  "science cannot explain it.",
  "sources: everyone with eyes.",
  "even your immune system agrees, it is just buffering.",
  "case closed, your honor.",
];

const meowBallAnswers = [
  "Meow. (That is a yes.)",
  "Absolutely, and twice on Sundays.",
  "The cats say: nap first, decide later.",
  "Signs point to yes. Also snacks.",
  "Ask again after tea.",
  "Hard no. The vibes are off.",
  "Yes, but only if you smile while doing it.",
  "The universe says: rest, then conquer.",
  "Reanna, you already know the answer.",
  "100 percent. The council of loafs has spoken.",
  "Try again, this time with more confidence.",
  "Purrhaps. The stars are still loading.",
];

const moodDialStages: { label: string; message: string; emoji: string; bg: string }[] = [
  { label: "Full Goblin Mode", emoji: "😾", bg: "from-slate-400/40 to-slate-600/30", message: "Reanna is feral. Do not approach without snacks." },
  { label: "Grumpy Loaf", emoji: "🙀", bg: "from-indigo-300/40 to-slate-400/30", message: "Reanna has become bread. Angry bread. Respect the loaf." },
  { label: "Tired Kitten", emoji: "😿", bg: "from-blue-200/40 to-indigo-300/30", message: "Reanna would like the sun to keep it down, please." },
  { label: "Meh Meow", emoji: "😼", bg: "from-purple-200/40 to-pink-200/30", message: "Reanna is functioning. Barely. Bravely." },
  { label: "Cozy Curl", emoji: "🐱", bg: "from-pink-200/50 to-peach/40", message: "Reanna is a warm little swirl of blanket and vibes." },
  { label: "Purr Machine", emoji: "😽", bg: "from-peach/50 to-coral/30", message: "Reanna is vibrating at a frequency known to heal souls." },
  { label: "Playful Zoomie", emoji: "😸", bg: "from-yellow-200/50 to-peach/50", message: "Reanna just knocked something off a shelf and felt joy." },
  { label: "Happy Cat", emoji: "😺", bg: "from-yellow-200/60 to-coral/40", message: "Reanna is smiling and it is illegal how contagious it is." },
  { label: "Sun Beam Bliss", emoji: "😻", bg: "from-orange-200/60 to-yellow-200/50", message: "Reanna has found the one warm sunbeam. Nothing else matters." },
  { label: "Cosmic Cat Overlord", emoji: "🐈‍⬛✨", bg: "from-coral/50 to-fuchsia-300/40", message: "Reanna has ascended. The cats bow. The universe purrs." },
];

const catNamePrefixes = ["Sir", "Lady", "Captain", "Duchess", "Professor", "Baron", "Miss", "Lord", "Chief", "Madame", "Dr.", "General"];
const catNameFirsts = ["Whiskers", "Biscuit", "Noodle", "Mochi", "Pickle", "Waffle", "Sushi", "Muffin", "Pumpkin", "Toast", "Peanut", "Dumpling", "Bagel", "Pancake"];
const catNameLasts = ["McFluffington", "Von Purr", "the Third", "of the Blanket Realm", "McSnoozerson", "the Magnificent", "the Absolutely Unhinged", "the Great", "the Cozy", "Longwhiskers"];

const catDiceFaces = ["🐱 nap", "🐟 snack", "😹 zoomies", "🧶 chaos", "☀️ sunbeam", "📦 box"];

const wheelActivities = [
  "Watch a comfort movie",
  "Text a friend a bad pun",
  "Drink an entire glass of water",
  "Take a 20 minute nap",
  "Wrap yourself in a blanket burrito",
  "Look at photos of baby animals",
  "Sing loudly to one song",
  "Do exactly zero productive things",
];

function toCatSpeak(text: string): string {
  if (!text.trim()) return "";
  const words = text.trim().split(/\s+/);
  return words
    .map((w, i) => {
      const len = Math.max(1, Math.min(6, w.length));
      const base = ["mew", "meow", "purr", "mrrp", "nya", "prr"][i % 6];
      const suffix = "o".repeat(Math.max(0, len - 3));
      const punct = /[.!?,]$/.test(w) ? w.slice(-1) : "";
      return base + suffix + punct;
    })
    .join(" ");
}



function CheerUpPage() {
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [surpriseTriggered, setSurpriseTriggered] = useState(false);
  const [punIndex, setPunIndex] = useState(0);
  const [jokeIndex, setJokeIndex] = useState(0);
  const [punchlineShown, setPunchlineShown] = useState(false);
  const [seriousMode, setSeriousMode] = useState(true);
  const [cozyMode, setCozyMode] = useState(false);
  const [petCount, setPetCount] = useState(0);
  const [prescriptionOpen, setPrescriptionOpen] = useState(false);
  const [complimentSeed, setComplimentSeed] = useState(0);
  const [complimentCount, setComplimentCount] = useState(1);
  const [bubbles, setBubbles] = useState<{ id: number; x: number; emoji: string }[]>([]);
  const [bubbleTotal, setBubbleTotal] = useState(0);
  const [meowQuestion, setMeowQuestion] = useState("");
  const [meowAnswer, setMeowAnswer] = useState<string | null>(null);
  const [meowShaking, setMeowShaking] = useState(false);
  const [moodDial, setMoodDial] = useState(50);
  const [catNameSeed, setCatNameSeed] = useState(0);
  const [translatorText, setTranslatorText] = useState("");
  const [diceRolls, setDiceRolls] = useState<string[]>([]);
  const [diceRolling, setDiceRolling] = useState(false);
  const [wheelSpinning, setWheelSpinning] = useState(false);
  const [wheelResult, setWheelResult] = useState<string | null>(null);
  const [wheelAngle, setWheelAngle] = useState(0);

  const pick = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];
  const currentCompliment = (() => {
    // seed dependency keeps this recomputed on button press
    void complimentSeed;
    return `Reanna, you are ${pick(complimentAdjectives)} — a truly ${pick(complimentAdjectives)} ${pick(complimentNouns)}, ${pick(complimentClosers)}`;
  })();

  const spawnBubble = () => {
    const emojis = ["🐱", "😺", "😻", "🐾", "💛", "✨", "🧡", "💫", "🌸", "🫧"];
    const id = bubbleTotal + 1;
    setBubbleTotal(id);
    setBubbles((b) => [...b, { id, x: Math.random() * 90 + 5, emoji: pick(emojis) }]);
    setTimeout(() => setBubbles((b) => b.filter((x) => x.id !== id)), 3500);
  };

  const askMeowBall = () => {
    setMeowShaking(true);
    setTimeout(() => {
      setMeowAnswer(pick(meowBallAnswers));
      setMeowShaking(false);
    }, 700);
  };


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

  const nextPun = () => setPunIndex((i) => (i + 1) % catPuns.length);
  const nextJoke = () => {
    setJokeIndex((i) => (i + 1) % catJokes.length);
    setPunchlineShown(false);
  };

  const petCat = useCallback(async () => {
    setPetCount((c) => c + 1);
    if ((petCount + 1) % 10 === 0) {
      const confetti = (await import("canvas-confetti")).default;
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#ff7a6b", "#ffd700", "#ff6b9d"],
      });
    }
  }, [petCount]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", cozyMode);
  }, [cozyMode]);

  const facts = seriousMode ? catFactsSerious : catFactsFake;

  return (
    <div className="min-h-screen bg-background transition-colors duration-500">
      {/* Cozy mode toggle */}
      <div className="fixed top-4 right-4 z-50 flex items-center gap-2 rounded-full bg-card/80 px-3 py-2 shadow backdrop-blur">
        <span className="text-xs font-semibold">{cozyMode ? "🌙 Blanket Fort" : "☀️ Daytime"}</span>
        <button
          onClick={() => setCozyMode((v) => !v)}
          className={`relative h-6 w-11 rounded-full transition-colors ${cozyMode ? "bg-coral" : "bg-muted"}`}
          aria-label="Toggle cozy mode"
        >
          <motion.span
            className="absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow"
            animate={{ x: cozyMode ? 20 : 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
        </button>
      </div>

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
            alt="Sleepy cute grey cat"
            width={280}
            height={280}
            className="mx-auto mb-6 rounded-3xl"
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          />
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Sending{" "}
            <span className="text-coral">Reanna</span> perfect healing vibes
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            This page is scientifically proven* to improve mood by at least 47 percent
          </p>
          <p className="mt-1 text-xs text-muted-foreground/60">*not actually scientific, but still true</p>
        </motion.div>
      </section>

      {/* Pet the cat counter */}
      <section className="px-4 py-8 sm:py-12">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mx-auto max-w-md rounded-3xl bg-card p-6 text-center shadow-sm"
        >
          <h2 className="mb-2 text-2xl font-bold text-foreground">Pet the cat</h2>
          <p className="mb-4 text-sm text-muted-foreground">
            Clinically proven to release serotonin. Also fun.
          </p>
          <motion.button
            onClick={petCat}
            whileTap={{ scale: 0.9, rotate: -5 }}
            className="mx-auto block"
          >
            <motion.img
              src={catLoaf}
              alt="A grey loaf cat waiting for pets"
              className="mx-auto h-40 w-40 rounded-2xl object-contain"
              animate={petCount > 0 ? { rotate: [0, -3, 3, 0] } : {}}
              transition={{ duration: 0.4 }}
              key={petCount}
              width={512}
              height={512}
            />
          </motion.button>
          <p className="mt-4 text-lg font-bold text-coral">
            {petCount === 0 ? "Give this loaf a pet" : `${petCount} pet${petCount === 1 ? "" : "s"} delivered`}
          </p>
          {petCount >= 10 && (
            <p className="mt-1 text-sm text-muted-foreground">
              Purr level: maximum. Cat is now yours forever.
            </p>
          )}
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

      {/* Pun generator */}
      <section className="px-4 py-8 sm:py-12">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mx-auto max-w-xl text-center"
        >
          <h2 className="mb-2 text-2xl font-bold text-foreground sm:text-3xl">
            The Purr Generator
          </h2>
          <p className="mb-6 text-muted-foreground">
            Warning: side effects include eye rolls and reluctant smiles.
          </p>
          <div className="rounded-3xl bg-peach/40 p-6 shadow-sm">
            <AnimatePresence mode="wait">
              <motion.p
                key={punIndex}
                initial={{ opacity: 0, y: 10, rotate: -2 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="text-xl font-bold text-foreground"
              >
                {catPuns[punIndex]}
              </motion.p>
            </AnimatePresence>
          </div>
          <motion.button
            onClick={nextPun}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-4 rounded-full bg-coral px-6 py-3 text-sm font-semibold text-white shadow"
          >
            Hit me with another pun 🐾
          </motion.button>
        </motion.div>
      </section>

      {/* Joke card */}
      <section className="px-4 py-8 sm:py-12">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mx-auto max-w-xl"
        >
          <h2 className="mb-2 text-center text-2xl font-bold text-foreground sm:text-3xl">
            The Joke Box
          </h2>
          <p className="mb-6 text-center text-muted-foreground">
            Tap to reveal. Groan responsibly.
          </p>
          <motion.div
            className="rounded-3xl bg-card p-6 shadow-sm"
            key={jokeIndex}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <p className="text-lg font-semibold text-foreground">
              {catJokes[jokeIndex].q}
            </p>
            <AnimatePresence>
              {punchlineShown && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-3 text-lg font-bold text-coral"
                >
                  {catJokes[jokeIndex].a}
                </motion.p>
              )}
            </AnimatePresence>
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => setPunchlineShown((v) => !v)}
                className="flex-1 rounded-xl bg-blush px-4 py-2 text-sm font-semibold text-foreground hover:bg-blush/80"
              >
                {punchlineShown ? "Hide punchline" : "Reveal punchline"}
              </button>
              <button
                onClick={nextJoke}
                className="flex-1 rounded-xl bg-peach px-4 py-2 text-sm font-semibold text-foreground hover:bg-peach/80"
              >
                Next joke →
              </button>
            </div>
          </motion.div>
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
            Real talk: how you feeling?
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

      {/* Fact toggle */}
      <section className="px-4 py-8 sm:py-12">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mx-auto max-w-xl"
        >
          <div className="mb-4 flex items-center justify-center gap-3">
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
              Cat Facts
            </h2>
          </div>
          <div className="mb-6 flex justify-center gap-2">
            <button
              onClick={() => setSeriousMode(true)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${seriousMode ? "bg-coral text-white" : "bg-muted text-muted-foreground"}`}
            >
              🧠 Real facts
            </button>
            <button
              onClick={() => setSeriousMode(false)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${!seriousMode ? "bg-coral text-white" : "bg-muted text-muted-foreground"}`}
            >
              🤥 Fake facts
            </button>
          </div>
          <AnimatePresence mode="wait">
            <motion.ul
              key={seriousMode ? "serious" : "fake"}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-3"
            >
              {facts.map((fact, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="rounded-2xl bg-card px-4 py-3 text-foreground shadow-sm"
                >
                  <span className="mr-2 text-coral font-bold">🐾</span>
                  {fact}
                </motion.li>
              ))}
            </motion.ul>
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Prescription */}
      <section className="px-4 py-8 sm:py-12">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mx-auto max-w-md"
        >
          <div className="relative rounded-3xl border-2 border-dashed border-coral/40 bg-cream p-6 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-widest text-coral">
                Dr. Whiskers, MD
              </span>
              <span className="text-xs text-muted-foreground">Prescription</span>
            </div>
            <p className="text-sm text-muted-foreground">Patient: Reanna</p>
            <p className="mt-1 text-sm text-muted-foreground">Diagnosis: temporary human malfunction</p>
            <button
              onClick={() => setPrescriptionOpen((v) => !v)}
              className="mt-4 w-full rounded-xl bg-coral px-4 py-3 text-sm font-semibold text-white"
            >
              {prescriptionOpen ? "Close prescription" : "Open prescription"}
            </button>
            <AnimatePresence>
              {prescriptionOpen && (
                <motion.ul
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 space-y-2 overflow-hidden text-sm text-foreground"
                >
                  <li>💊 One (1) nap, taken as needed. Refills unlimited.</li>
                  <li>🍜 One warm bowl of soup. Any soup. No wrong soup.</li>
                  <li>📺 Two episodes of comfort show. Not the sad one.</li>
                  <li>🫖 Tea, honey, and zero guilt about being unproductive.</li>
                  <li>🐈 Approximately 47 imaginary cat cuddles.</li>
                  <li>📵 Doom scrolling: strictly forbidden. Doctor is watching.</li>
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
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
                  You rebel. I like you, Reanna.
                </p>
                <p className="mt-2 text-muted-foreground">
                  Here is your reward: you are objectively amazing, and this sickness is temporary.
                  Your comeback energy is going to be UNHINGED.
                  The world is not ready. Rest up, legend.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Endless Compliment Machine */}
      <section className="px-4 py-8 sm:py-12">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mx-auto max-w-xl text-center"
        >
          <h2 className="mb-2 text-2xl font-bold text-foreground sm:text-3xl">
            The Endless Compliment Machine
          </h2>
          <p className="mb-6 text-muted-foreground">
            Warning: literally will never run out. Trust the process.
          </p>
          <div className="rounded-3xl bg-blush/40 p-6 shadow-sm min-h-[120px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.p
                key={complimentSeed}
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -10 }}
                transition={{ type: "spring", stiffness: 200, damping: 18 }}
                className="text-lg font-semibold text-foreground"
              >
                {currentCompliment}
              </motion.p>
            </AnimatePresence>
          </div>
          <motion.button
            onClick={() => {
              setComplimentSeed((s) => s + 1);
              setComplimentCount((c) => c + 1);
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.92 }}
            className="mt-4 rounded-full bg-coral px-6 py-3 text-sm font-semibold text-white shadow"
          >
            Another one 💛
          </motion.button>
          <p className="mt-3 text-xs text-muted-foreground">
            {complimentCount} compliment{complimentCount === 1 ? "" : "s"} delivered. Infinite remaining.
          </p>
        </motion.div>
      </section>

      {/* Cat Bubble Spawner */}
      <section className="px-4 py-8 sm:py-12">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mx-auto max-w-xl"
        >
          <h2 className="mb-2 text-center text-2xl font-bold text-foreground sm:text-3xl">
            Release the cats
          </h2>
          <p className="mb-6 text-center text-muted-foreground">
            Hold, tap, spam. Each click sends a little friend into the wild.
          </p>
          <div className="relative h-80 overflow-hidden rounded-3xl bg-gradient-to-b from-peach/30 to-coral/20 shadow-sm">
            <AnimatePresence>
              {bubbles.map((b) => (
                <motion.div
                  key={b.id}
                  initial={{ y: 320, opacity: 0, scale: 0.5 }}
                  animate={{ y: -40, opacity: 1, scale: 1, rotate: (b.id % 2 ? 1 : -1) * 20 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 3.4, ease: "easeOut" }}
                  className="absolute text-3xl select-none pointer-events-none"
                  style={{ left: `${b.x}%` }}
                >
                  {b.emoji}
                </motion.div>
              ))}
            </AnimatePresence>
            <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-2 p-4">
              <motion.button
                onClick={spawnBubble}
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.05 }}
                className="rounded-full bg-coral px-8 py-4 text-lg font-bold text-white shadow-lg"
              >
                🐾 Spawn a cat
              </motion.button>
              <p className="text-xs font-semibold text-foreground/70">
                {bubbleTotal} total cats released into the world
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Magic Meow Ball */}
      <section className="px-4 py-8 sm:py-12">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mx-auto max-w-md"
        >
          <h2 className="mb-2 text-center text-2xl font-bold text-foreground sm:text-3xl">
            The Magic Meow Ball
          </h2>
          <p className="mb-6 text-center text-muted-foreground">
            Ask any question. The cats have all the answers.
          </p>
          <div className="rounded-3xl bg-card p-6 shadow-sm">
            <input
              value={meowQuestion}
              onChange={(e) => setMeowQuestion(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && askMeowBall()}
              placeholder="Will I feel better tomorrow?"
              className="w-full rounded-2xl border border-input bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-coral"
            />
            <motion.button
              onClick={askMeowBall}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              className="mt-3 w-full rounded-2xl bg-coral px-6 py-3 font-semibold text-white shadow"
            >
              🎱 Consult the cats
            </motion.button>
            <motion.div
              animate={meowShaking ? { x: [0, -8, 8, -8, 8, 0], rotate: [0, -3, 3, -3, 3, 0] } : {}}
              transition={{ duration: 0.6 }}
              className="mt-6 flex min-h-[120px] items-center justify-center rounded-2xl bg-warm/20 p-6 text-center"
            >
              <AnimatePresence mode="wait">
                {meowShaking ? (
                  <motion.p
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-lg font-semibold text-muted-foreground"
                  >
                    the cats are conferring...
                  </motion.p>
                ) : meowAnswer ? (
                  <motion.p
                    key={meowAnswer + complimentSeed}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="text-lg font-bold text-foreground"
                  >
                    {meowAnswer}
                  </motion.p>
                ) : (
                  <motion.p
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-sm text-muted-foreground"
                  >
                    Ask something. Anything. The council awaits.
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </motion.div>
      </section>




      {/* Never-ending Mood Dial */}
      <section className="px-4 py-8 sm:py-12">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mx-auto max-w-xl"
        >
          <h2 className="mb-2 text-center text-2xl font-bold text-foreground sm:text-3xl">
            The Never Ending Mood Dial
          </h2>
          <p className="mb-6 text-center text-muted-foreground">
            Drag it. Reanna's cat mood shifts in real time.
          </p>
          {(() => {
            const stage = moodDialStages[Math.min(
              moodDialStages.length - 1,
              Math.floor((moodDial / 100) * moodDialStages.length),
            )];
            const rotate = (moodDial - 50) * 0.9;
            const scale = 0.85 + (moodDial / 100) * 0.5;
            const hue = Math.round((moodDial - 50) * 1.6);
            const wobble = 0.4 + (moodDial / 100) * 1.6;
            return (
              <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${stage.bg} p-6 shadow-sm transition-colors duration-500`}>
                <div className="flex flex-col items-center gap-4 text-center">
                  <motion.div
                    key={stage.label}
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xs font-bold uppercase tracking-wider text-foreground/70"
                  >
                    {stage.label}
                  </motion.div>
                  <motion.div
                    className="text-6xl select-none"
                    animate={{ rotate: [rotate - 4, rotate + 4, rotate - 4], scale }}
                    transition={{ rotate: { repeat: Infinity, duration: wobble, ease: "easeInOut" }, scale: { type: "spring", stiffness: 200, damping: 15 } }}
                    style={{ filter: `hue-rotate(${hue}deg)` }}
                  >
                    {stage.emoji}
                  </motion.div>
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={stage.message}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="min-h-[3rem] text-lg font-semibold text-foreground"
                    >
                      {stage.message}
                    </motion.p>
                  </AnimatePresence>
                  <div className="w-full">
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={moodDial}
                      onChange={(e) => setMoodDial(Number(e.target.value))}
                      aria-label="Reanna mood dial"
                      className="w-full accent-coral"
                    />
                    <div className="mt-1 flex justify-between text-xs font-semibold text-foreground/60">
                      <span>Goblin</span>
                      <span className="text-coral">{moodDial}%</span>
                      <span>Overlord</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}
        </motion.div>
      </section>

      {/* Cat Name Generator */}
      <section className="px-4 py-8 sm:py-12">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mx-auto max-w-xl text-center"
        >
          <h2 className="mb-2 text-2xl font-bold text-foreground sm:text-3xl">
            Reanna's Emergency Cat Name Generator
          </h2>
          <p className="mb-6 text-muted-foreground">
            For the cat you will inevitably adopt during recovery.
          </p>
          <div className="rounded-3xl bg-blush/60 p-6 shadow-sm">
            {(() => {
              void catNameSeed;
              const name = `${pick(catNamePrefixes)} ${pick(catNameFirsts)} ${pick(catNameLasts)}`;
              return (
                <AnimatePresence mode="wait">
                  <motion.p
                    key={catNameSeed}
                    initial={{ opacity: 0, y: 10, rotate: -3 }}
                    animate={{ opacity: 1, y: 0, rotate: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-2xl font-bold text-foreground"
                  >
                    {name}
                  </motion.p>
                </AnimatePresence>
              );
            })()}
          </div>
          <motion.button
            onClick={() => setCatNameSeed((s) => s + 1)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-4 rounded-full bg-coral px-6 py-3 text-sm font-semibold text-white shadow"
          >
            Generate another 🐾
          </motion.button>
        </motion.div>
      </section>

      {/* Cat Translator */}
      <section className="px-4 py-8 sm:py-12">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mx-auto max-w-xl"
        >
          <h2 className="mb-2 text-center text-2xl font-bold text-foreground sm:text-3xl">
            Human to Cat Translator
          </h2>
          <p className="mb-6 text-center text-muted-foreground">
            Type anything. Get the cat interpretation.
          </p>
          <div className="rounded-3xl bg-card p-6 shadow-sm">
            <textarea
              value={translatorText}
              onChange={(e) => setTranslatorText(e.target.value)}
              placeholder="Type something for Reanna's inner cat to say..."
              rows={3}
              className="w-full resize-none rounded-2xl border border-border bg-background p-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-coral"
            />
            <div className="mt-4 rounded-2xl bg-peach/40 p-4 text-center min-h-[3rem]">
              <AnimatePresence mode="wait">
                <motion.p
                  key={translatorText}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="text-lg font-bold text-foreground"
                >
                  {translatorText.trim() ? toCatSpeak(translatorText) : "meow? (waiting for input)"}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Cat Dice */}
      <section className="px-4 py-8 sm:py-12">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mx-auto max-w-xl text-center"
        >
          <h2 className="mb-2 text-2xl font-bold text-foreground sm:text-3xl">
            Roll the Cat Dice
          </h2>
          <p className="mb-6 text-muted-foreground">
            Three dice. They decide your next 30 seconds.
          </p>
          <div className="flex justify-center gap-3">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={diceRolling ? { rotate: [0, 360, 720], y: [0, -20, 0] } : {}}
                transition={{ duration: 0.6 }}
                className="flex h-24 w-24 items-center justify-center rounded-2xl bg-card p-2 text-center text-xs font-bold text-foreground shadow-sm sm:h-28 sm:w-28 sm:text-sm"
              >
                {diceRolls[i] ?? "🎲"}
              </motion.div>
            ))}
          </div>
          <motion.button
            onClick={() => {
              setDiceRolling(true);
              setTimeout(() => {
                setDiceRolls([pick(catDiceFaces), pick(catDiceFaces), pick(catDiceFaces)]);
                setDiceRolling(false);
              }, 600);
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-6 rounded-full bg-coral px-6 py-3 text-sm font-semibold text-white shadow"
          >
            Roll the dice 🎲
          </motion.button>
        </motion.div>
      </section>

      {/* Wheel of Cozy Activities */}
      <section className="px-4 py-8 sm:py-12">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mx-auto max-w-xl text-center"
        >
          <h2 className="mb-2 text-2xl font-bold text-foreground sm:text-3xl">
            Wheel of What Reanna Should Do Next
          </h2>
          <p className="mb-6 text-muted-foreground">
            Spin it. The wheel is legally binding.
          </p>
          <div className="relative mx-auto h-56 w-56">
            <div className="absolute left-1/2 top-0 z-10 -translate-x-1/2 text-3xl">🔻</div>
            <motion.div
              className="h-full w-full rounded-full border-4 border-coral bg-gradient-conic shadow-inner"
              style={{
                background: `conic-gradient(#ff7a6b 0deg 45deg, #ffb088 45deg 90deg, #f4c2c2 90deg 135deg, #ffd700 135deg 180deg, #ff6b9d 180deg 225deg, #ffb088 225deg 270deg, #ff7a6b 270deg 315deg, #f4c2c2 315deg 360deg)`,
              }}
              animate={{ rotate: wheelAngle }}
              transition={{ duration: 2.5, ease: "easeOut" }}
            />
          </div>
          <motion.button
            onClick={() => {
              if (wheelSpinning) return;
              setWheelSpinning(true);
              setWheelResult(null);
              const pickIdx = Math.floor(Math.random() * wheelActivities.length);
              const target = wheelAngle + 360 * 5 + (360 - pickIdx * 45 - 22.5);
              setWheelAngle(target);
              setTimeout(() => {
                setWheelResult(wheelActivities[pickIdx]);
                setWheelSpinning(false);
              }, 2600);
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-6 rounded-full bg-coral px-6 py-3 text-sm font-semibold text-white shadow disabled:opacity-60"
            disabled={wheelSpinning}
          >
            {wheelSpinning ? "Spinning..." : "Spin the wheel 🌀"}
          </motion.button>
          <AnimatePresence mode="wait">
            {wheelResult && (
              <motion.p
                key={wheelResult}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="mt-4 text-lg font-bold text-coral"
              >
                → {wheelResult}
              </motion.p>
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
          <p className="text-lg font-semibold text-foreground">
            Get well soon, <span className="text-coral">Reanna</span>, you incredible human 🧡
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
