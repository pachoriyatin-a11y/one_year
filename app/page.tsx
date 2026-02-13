"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Heart, Sparkles, Music2, MapPin, ChevronDown, X, Play, Pause } from "lucide-react";

// NOTE:
// - This is a single-file React experience designed like a scroll journey.
// - Replace the placeholder photos (picsum URLs) with your own images.
// - Works best in a modern React app (Vite/Next). Tailwind assumed.

const clamp = (n: number, a: number, b: number): number =>
  Math.max(a, Math.min(b, n));

const DEFAULT_STORY = [
  {
    id: "chapter-1",
    date: "Day 1",
    title: "How We Met",
    subtitle: "The moment the universe quietly introduced us.",
    location: "Our first hello",
    color: "from-pink-500 via-rose-500 to-orange-400",
    thought:
      "Some people arrive like a coincidence… and then become a reason.",
    photos: [
      {
        src: "our_first_convo.jpeg",
        alt: "First memory",
        caption: "The beginning"
      },
      {
        src: "how_we_met.jpg",
        alt: "Early days",
        caption: "Our first Memory together"
      }
    ],
    interactionLabel: "Tap ",
    interaction:
      "When I think back to this moment, it feels like destiny being subtle  like it didn’t want to scare us by being too obvious."
  },
  {
    id: "chapter-2",
    date: "Week 6",
    title: "The First Spark",
    subtitle: "Where ‘Love’ started feeling real.",
    location: "A small moment, a big shift",
    color: "from-indigo-500 via-violet-500 to-fuchsia-500",
    thought:
      "I didn’t fall all at once  I leaned in, little by little, until you became home.",
    photos: [
      {
        src: "my_first_spark.jpg",
        alt: "Spark",
        caption: "The spark"
      },
      {
        src: "my_first_spark_2.jpeg",
        alt: "",
        caption: "The love"
      }
    ],
    interactionLabel: "Tap ",
    interaction:
      "From here, everything started to glow. Not loud — just steady. Like love learning your name."
  },
  {
    id: "chapter-3",
    date: "Month 11",
    title: "The best date",
    subtitle: "We fought but our love is too strong to hold the importance more than our ego.",
    location: "Inside jokes & rituals",
    color: "from-emerald-500 via-teal-500 to-cyan-400",
    thought:
      "Love is not only big promises  it’s the small proofs.",
    photos: [
      {
        src: "The_best_date.jpg",
        alt: "Traditions",
        caption: "Our thing"
      },
      {
        src: "The_best_date_2.jpg",
        alt: "Comfort",
        caption: "Comfort"
      }
    ],
    interactionLabel: "Tap",
    interaction:
      "We didn’t just spend time — we built a language. A safe place. A rhythm only we understand."
  },
  {
    id: "chapter-4",
    date: "Month 4",
    title: "Hard Days, Stronger Us",
    subtitle: "When love proved it isn’t fragile.",
    location: "Choosing each other",
    color: "from-slate-700 via-zinc-700 to-neutral-900",
    thought:
      "Even when the day wasn’t kind, you were.",
    photos: [
      {
        src: "hard_times.jpg",
        alt: "Strength",
        caption: "Do you remember this??"
      },
      {
        src: "hard_times_2.jpg",
        alt: "Hope",
        caption: "Cried but still love you the most"
      }
    ],
    interactionLabel: "Tap",
    interaction:
      "If the world ever gets heavy, I want to be the place you exhale. I will not be perfect — but I will be present."
  },
  {
    id: "chapter-5",
    date: "Today",
    title: "1 Year  The Next Chapter",
    subtitle: "Not an ending. A beginning.",
    location: "Forward",
    color: "from-yellow-400 via-pink-500 to-purple-600",
    thought:
      "I don’t want a love that just lasts. I want a love that grows.",
    photos: [
      {
        src: "new_start.jpeg",
        alt: "Future",
        caption: "YOU"
      },
      {
        src: "new_start_3.jpg",
        alt: "Forever",
        caption: "ME"
      }
    ],
    interactionLabel: "Tap ",
    interaction:
      "Happy 1 year, my love. If you’re reading this, it means we made something rare: a love that still feels new  and still feels safe."
  }
];

function useScrollProgress() {
  const progress = useMotionValue(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      progress.set(p);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [progress]);

  return progress;
}

function FloatingParticles() {
  const [dots, setDots] = useState<
    {
      id: number;
      left: number;
      top: number;
      size: number;
      duration: number;
      delay: number;
    }[]
  >([]);

  useEffect(() => {
    const generated = Array.from({ length: 26 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: 2 + Math.random() * 4,
      duration: 5 + Math.random() * 9,
      delay: Math.random() * 2
    }));
    setDots(generated);
  }, []);

  // Prevent SSR mismatch
  if (dots.length === 0) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {dots.map((d) => (
        <motion.span
          key={d.id}
          className="absolute rounded-full bg-white/25"
          style={{
            left: `${d.left}%`,
            top: `${d.top}%`,
            width: d.size,
            height: d.size
          }}
          animate={{ y: [0, -20, 0], opacity: [0.2, 0.5, 0.2] }}
          transition={{
            duration: d.duration,
            repeat: Infinity,
            delay: d.delay,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
}

function Modal({
  open,
  onClose,
  children
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[999] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-black/70" onClick={onClose} />
          <motion.div
            initial={{ scale: 0.96, opacity: 0, y: 18 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.98, opacity: 0, y: 12 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            className="relative w-full max-w-4xl overflow-hidden rounded-3xl border border-white/10 bg-zinc-950 shadow-2xl"
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 z-10 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-2 text-sm text-white backdrop-blur hover:bg-white/15"
            >
              <X className="h-4 w-4" /> Close
            </button>
            {children}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function PhotoGrid({
  photos,
  onOpen
}: {
  photos: typeof DEFAULT_STORY[number]["photos"];
  onOpen: (p: typeof DEFAULT_STORY[number]["photos"][number]) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {photos.map((p, i) => (
        <motion.button
          key={p.src + i}
          onClick={() => onOpen(p)}
          className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-white/5 text-left"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.99 }}
        >
          <img
            src={p.src}
            alt={p.alt}
            className="h-full w-full object-cover opacity-90 transition duration-500 group-hover:scale-[1.06] group-hover:opacity-100"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3">
            <div className="text-xs font-medium text-white/90">{p.caption}</div>
            <div className="text-[11px] text-white/60">Click to enlarge</div>
          </div>
        </motion.button>
      ))}
    </div>
  );
}

function JourneyCard({
  chapter,
  index,
  onOpenMemory,
  onOpenPhoto
}: {
  chapter: typeof DEFAULT_STORY[number];
  index: number;
  onOpenMemory: (c: typeof DEFAULT_STORY[number]) => void;
  onOpenPhoto: (p: typeof DEFAULT_STORY[number]["photos"][number]) => void;
}) {

  const ref = useRef(null);

  return (
    <section ref={ref} id={chapter.id} className="relative mx-auto w-full max-w-6xl px-4 py-14 md:py-20">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="grid gap-6 md:grid-cols-[1.2fr_0.8fr]"
      >
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8 backdrop-blur">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-3 py-1.5 text-xs text-white/80">
              <MapPin className="h-3.5 w-3.5" />
              <span>{chapter.location}</span>
            </div>
            <div className="text-xs text-white/60">{chapter.date}</div>
          </div>

          <div className="mt-4">
            <h2 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">{chapter.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-white/70 md:text-[15px]">{chapter.subtitle}</p>
          </div>

          <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-4">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 rounded-xl border border-white/10 bg-white/10 p-2">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <p className="text-sm text-white/80">{chapter.thought}</p>
            </div>
          </div>

          <div className="mt-6">
            <PhotoGrid photos={chapter.photos} onOpen={onOpenPhoto} />
          </div>

          <div className="mt-6">
            <motion.button
              onClick={() => onOpenMemory(chapter)}
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-zinc-900 shadow-lg shadow-black/20"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <Heart className="h-4 w-4" /> {chapter.interactionLabel}
            </motion.button>
            <div className="mt-2 text-center text-[11px] text-white/50">
              Every destination has something hidden.
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br p-[1px]">
          <div className={`absolute inset-0 bg-gradient-to-br ${chapter.color} opacity-30`} />
          <div className="relative h-full rounded-3xl bg-zinc-950/60 p-6 md:p-8">
            <div className="text-xs font-medium text-white/60">Chapter {index + 1}</div>
            <div className="mt-3 text-lg font-semibold text-white">Timeline</div>

            <div className="mt-4 space-y-3">
              {chapter.photos.map((p, i) => (
                <motion.button
                  key={p.src + i + "mini"}
                  onClick={() => onOpenPhoto(p)}
                  className="group flex w-full items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-3 text-left hover:bg-white/10"
                  whileHover={{ x: 3 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <img
                    src={p.src}
                    alt={p.alt}
                    className="h-12 w-12 rounded-xl object-cover opacity-90 group-hover:opacity-100"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-medium text-white/85">{p.caption}</div>
                    <div className="text-[11px] text-white/50">Tap to view</div>
                  </div>
                </motion.button>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-white/10 bg-black/30 p-4">
              <div className="text-xs font-medium text-white/70">Meaning</div>
              <p className="mt-2 text-sm leading-relaxed text-white/65">
                This chapter is a checkpoint  proof that love is movement, not a place.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function MusicToggle({ src }: { src: string }) {
  const audioRef = useRef(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    if (!src) return;
    audioRef.current = new Audio(src);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.45;
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [src]);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    if (on) a.play().catch(() => setOn(false));
    else a.pause();
  }, [on]);

  if (!src) return null;

  return (
    <button
      onClick={() => setOn((v) => !v)}
      className="fixed bottom-5 left-5 z-50 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-4 py-2 text-xs font-medium text-white backdrop-blur hover:bg-black/55"
    >
      <Music2 className="h-4 w-4" />
      {on ? (
        <>
          <Pause className="h-4 w-4" /> Pause
        </>
      ) : (
        <>
          <Play className="h-4 w-4" /> Play
        </>
      )}
    </button>
  );
}

function ProgressRail({
  progress
}: {
  progress: ReturnType<typeof useScrollProgress>;
}) {
  const smooth = useSpring(progress, { stiffness: 180, damping: 28 });
  const height = useTransform(smooth, [0, 1], [0, 100]);

  return (
    <div className="fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 md:block">
      <div className="h-56 w-2 overflow-hidden rounded-full border border-white/10 bg-white/10">
        <motion.div className="w-full bg-white" style={{ height: height }} />
      </div>
      <div className="mt-3 text-center text-[10px] text-white/60">Scroll</div>
    </div>
  );
}

export default function AnniversaryJourneySite() {
  const [story] = useState(DEFAULT_STORY);
  const [memoryOpen, setMemoryOpen] = useState(false);
  const [photoOpen, setPhotoOpen] = useState(false);
  const [activeChapter, setActiveChapter] = useState(null);
  const [activePhoto, setActivePhoto] = useState(null);

  const scrollProgress = useScrollProgress();
  const smooth = useSpring(scrollProgress, { stiffness: 160, damping: 26 });
  const bgY = useTransform(smooth, [0, 1], [0, -240]);
  const glow = useTransform(smooth, [0, 1], [0.15, 0.5]);

  const openMemory = (chapter) => {
    setActiveChapter(chapter);
    setMemoryOpen(true);
  };

  const openPhoto = (photo) => {
    setActivePhoto(photo);
    setPhotoOpen(true);
  };

  const jumpTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Background */}
      <motion.div className="fixed inset-0 -z-10" style={{ y: bgY }}>
        <div className="absolute inset-0 bg-[radial-gradient(90rem_45rem_at_50%_-10%,rgba(255,255,255,0.10),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(80rem_40rem_at_20%_20%,rgba(236,72,153,0.14),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(70rem_45rem_at_80%_40%,rgba(139,92,246,0.14),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(70rem_40rem_at_40%_90%,rgba(34,211,238,0.10),transparent_55%)]" />
        <motion.div className="absolute inset-0" style={{ opacity: glow }}>
          <FloatingParticles />
        </motion.div>
      </motion.div>

      {/* Sticky Top Bar */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-black/35 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="rounded-xl border border-white/10 bg-white/10 p-2">
              <Heart className="h-4 w-4" />
            </div>
            <div className="leading-tight">
              <div className="text-sm font-semibold">Our 1 Year Journey</div>

            </div>
          </div>

          <nav className="hidden items-center gap-1 md:flex">
            {story.map((c) => (
              <button
                key={c.id}
                onClick={() => jumpTo(c.id)}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/75 hover:bg-white/10"
              >
                {c.date}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative mx-auto max-w-6xl px-4 pb-14 pt-14 md:pb-16 md:pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="grid items-center gap-10 md:grid-cols-[1.2fr_0.8fr]"
        >
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-white/70">
              <Sparkles className="h-4 w-4" />
              <span>For the love of my life</span>
            </div>
            <h1 className="mt-5 text-4xl font-semibold tracking-tight md:text-6xl">
              We didn’t just date.
              <span className="block bg-gradient-to-r from-pink-400 via-fuchsia-400 to-purple-400 bg-clip-text text-transparent">
                We built a story.
              </span>
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/70 md:text-base">
              You came as a blessing,
              when I didn’t even know I needed one
              and somehow, everything just felt lighter with you around.

            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <button
                onClick={() => jumpTo(story[0].id)}
                className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-zinc-900 shadow-lg shadow-black/25"
              >
                Start the Journey <ChevronDown className="h-4 w-4" />
              </button>
              <button
                onClick={() => openMemory(story[story.length - 1])}
                className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white/90 hover:bg-white/10"
              >
                Open the final surprise <Sparkles className="h-4 w-4" />
              </button>
            </div>


          </div>

          <div className="relative">
            <div className="absolute -inset-1 rounded-[2rem] bg-gradient-to-br from-pink-500/30 via-purple-500/25 to-cyan-500/25 blur-2xl" />
            <div className="relative rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur">
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold">Your Timeline</div>
                <div className="text-xs text-white/60">5 destinations</div>
              </div>
              <div className="mt-4 space-y-2">
                {story.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => jumpTo(c.id)}
                    className="group flex w-full items-center justify-between rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-left hover:bg-black/35"
                  >
                    <div>
                      <div className="text-xs text-white/55">{c.date}</div>
                      <div className="text-sm font-medium text-white/85 group-hover:text-white">{c.title}</div>
                    </div>
                    <div className="text-[11px] text-white/50">Go</div>
                  </button>
                ))}
              </div>

              <div className="mt-5 rounded-2xl border border-white/10 bg-black/30 p-4">
                <div className="text-xs font-medium text-white/70 text-center">I LOVE YOU MY BHAVYA</div>

              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Journey */}
      <main>
        {story.map((chapter, idx) => (
          <JourneyCard
            key={chapter.id}
            chapter={chapter}
            index={idx}
            onOpenMemory={openMemory}
            onOpenPhoto={openPhoto}
          />
        ))}

        {/* Finale */}
        <section className="mx-auto max-w-6xl px-4 pb-24">
          <div className="rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-[1px]">
            <div className="rounded-[2.5rem] bg-black/35 p-10 text-center backdrop-blur">
              <h3 className="text-3xl font-semibold">And this is only Chapter One.</h3>
              <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-white/70 md:text-base">
                One year down  a lifetime to go. The next time we scroll, it won’t be a website.
                It’ll be our life.
              </p>
              <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={() => openMemory(story[story.length - 1])}
                  className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-zinc-900"
                >
                  Open the final letter <Heart className="h-4 w-4" />
                </button>
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white/90 hover:bg-white/10"
                >
                  Back to top
                </button>
              </div>
              <div className="mt-4 text-[11px] text-white/55">Made with love. Protected by memories.</div>
            </div>
          </div>
        </section>
      </main>

      <ProgressRail progress={scrollProgress} />

      {/* OPTIONAL: add your song file URL here (mp3) */}
      <MusicToggle src={""} />

      {/* Memory Modal */}
      <Modal
        open={memoryOpen}
        onClose={() => {
          setMemoryOpen(false);
          setActiveChapter(null);
        }}
      >
        {activeChapter ? (
          <div className="grid gap-0 md:grid-cols-[1fr_0.9fr]">
            <div className="relative">
              <div className={`absolute inset-0 bg-gradient-to-br ${activeChapter.color} opacity-35`} />
              <div className="relative h-full min-h-[260px] p-8">
                <div className="text-xs font-medium text-white/70">{activeChapter.date}</div>
                <div className="mt-2 text-2xl font-semibold">{activeChapter.title}</div>
                <p className="mt-3 text-sm leading-relaxed text-white/80">{activeChapter.interaction}</p>

                <div className="mt-6 rounded-2xl border border-white/15 bg-black/20 p-4">
                  <div className="text-xs font-medium text-white/70">A promise</div>
                  <p className="mt-2 text-sm text-white/85">
                    “I choose you  in calm days and in chaos  in distance and in closeness  and I will keep choosing
                    you.”
                  </p>
                </div>


              </div>
            </div>

            <div className="bg-zinc-950 p-6 md:p-8">
              <div className="text-sm font-semibold">Quick memories</div>
              <p className="mt-2 text-xs text-white/60">Tap any photo to open full-screen.</p>
              <div className="mt-4">
                <PhotoGrid photos={activeChapter.photos} onOpen={openPhoto} />
              </div>
              <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-4">

                <p className="mt-2 text-sm text-white/70">
                  jab pehli bar msg kiya tha aur pehli bar milne aya tha aur jo scene hua tha  toh tab socha ni tha yaha tk aa payenge but still hum aaj sath me hai toh yeah it's god's plan khair goddess bhi ap hi ho and I promise to keep you forever , to be with you always , to love you forever, to do things for you forever and be your alarm and be the arms only on which you can cry, i'll be your bestie, bf, cook, cudu, caretaker, bodyguard, your mind dump, your other half and i also promise to love you forever❤️❤️❤️.
                </p>
              </div>
            </div>
          </div>
        ) : null}
      </Modal>

      {/* Photo Modal */}
      <Modal
        open={photoOpen}
        onClose={() => {
          setPhotoOpen(false);
          setActivePhoto(null);
        }}
      >
        {activePhoto ? (
          <div className="bg-black">
            <div className="relative">
              <img src={activePhoto.src} alt={activePhoto.alt} className="max-h-[78vh] w-full object-contain" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                <div className="text-sm font-semibold">{activePhoto.caption}</div>
                <div className="text-xs text-white/60">A photo that holds a whole day inside it.</div>
              </div>
            </div>
          </div>
        ) : null}
      </Modal>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black/40 py-8">

      </footer>
    </div>
  );
}
