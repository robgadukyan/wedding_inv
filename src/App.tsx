import { useEffect, useState } from "react";
import { Calendar, Church, Clock, Heart, Home, MapPin, UtensilsCrossed } from "lucide-react";

const WEDDING_DATE = new Date("2026-09-05T14:30:00");
const HERO_BG = "url('/assets/hero.jpg'), url('/assets/placeholder-hero.svg')";
const GALLERY_FALLBACK = "/assets/placeholder-portrait.svg";
const CALENDAR_WEEK_DAYS = ["Երկ", "Երք", "Չրք", "Հնգ", "Ուրբ", "Շբթ", "Կիր"];
const CALENDAR_DATES: Array<number | null> = [null, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
const MAP_LINKS = {
  brideHouse: "https://yandex.com/navi?text=Ler%20Kamsar%20Street%2C%2030%2F3%2C%20Yerevan",
  church: "https://yandex.com/navi/org/srb_zoravor_astvatsatsin_yekeghetsi/183055721455",
  restaurant: "https://yandex.com/navi/org/ojakh/69357937409"
};
const LOCATION_CARD_CLASS = "h-full space-y-4 rounded-xl border border-border bg-card p-6 text-center shadow-sm md:p-8";
const LOCATION_ROW_CLASS = "flex items-start justify-center gap-2 text-base text-muted-foreground md:text-lg";
const MAP_LINK_CLASS = "inline-flex items-center justify-center text-sm font-medium text-primary underline-offset-2 transition hover:underline";
const NUMBER_FONT_CLASS = "number-font";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function useCountdown(target: Date): TimeLeft {
  const calc = (): TimeLeft => {
    const diff = Math.max(0, target.getTime() - Date.now());
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / 1000 / 60) % 60),
      seconds: Math.floor((diff / 1000) % 60)
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calc);

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(calc()), 1000);
    return () => clearInterval(id);
  }, []);

  return timeLeft;
}

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className="flex h-12 w-12 items-center justify-center rounded border border-primary/30 bg-card/80 md:h-20 md:w-20"
        style={{ fontFamily: "'Cinzel', serif" }}
      >
        <span className="text-base font-medium text-primary md:text-3xl">{String(value).padStart(2, "0")}</span>
      </div>
      <span className="text-[10px] uppercase tracking-widest text-muted-foreground md:text-xs">{label}</span>
    </div>
  );
}

const Ornament = () => (
  <div className="flex items-center justify-center gap-4 px-6 py-6">
    <div className="h-px max-w-32 flex-1 bg-border" />
    <span className="text-2xl italic text-primary/50">&#10022;</span>
    <div className="h-px max-w-32 flex-1 bg-border" />
  </div>
);

export default function App() {
  const timeLeft = useCountdown(WEDDING_DATE);
  const applyGalleryFallback = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const image = event.currentTarget;
    image.onerror = null;
    image.src = GALLERY_FALLBACK;
  };

  return (
<div className="min-h-screen bg-background pb-8" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
  <section className="relative flex h-[76vh] min-h-[560px] flex-col items-center justify-center overflow-hidden px-6 py-20 md:h-[86vh]">
    <div
      className="absolute inset-0 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: HERO_BG,
        backgroundSize: "cover, cover",
        backgroundPosition: "center 35%, center"
      }}
    />

    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />

    <div className="relative z-10 mx-auto max-w-2xl space-y-6 text-center md:pt-20">
      <div className="space-y-2">
        <h1 className="text-6xl font-light italic leading-none text-white drop-shadow-lg md:text-8xl">
          Ռոբերտ
        </h1>

        <div className="flex items-center justify-center gap-4 py-2">
          <div className="h-px w-16 bg-white/40" />
          <Heart className="h-4 w-4 fill-white text-white" />
          <div className="h-px w-16 bg-white/40" />
        </div>

        <h1 className="text-6xl font-light italic leading-none text-white drop-shadow-lg md:text-8xl">
          Ելենա
        </h1>
      </div>
    </div>
  </section>

  <Ornament />

  <section className="px-6 py-2 text-center">
<p className="mx-auto max-w-2xl text-center text-xl italic font-light leading-relaxed text-foreground md:text-2xl">
  Սիրով հրավիրում ենք ձեզ մասնակցելու
  <br />
  <span className="inline-flex items-center justify-center gap-2">
    Մեր հարսանեկան արարողությանը
    <Heart className="h-5 w-5 fill-[#C3A795] text-[#C3A795] md:h-6 md:w-6" />
  </span>
</p>
  </section>

      <section className="px-6 py-8">
        <div className="mx-auto max-w-2xl rounded-2xl border border-white/30 bg-[#C3A795] px-5 py-8 text-white shadow-lg md:px-10">
          <div className="mb-6 flex items-center justify-center gap-4 md:gap-8">
            <div className="h-px w-16 bg-white/70 md:w-24" />

            <h2
              className="text-5xl font-bold italic md:text-7xl"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Սեպտեմբեր
            </h2>

            <div className="h-px w-16 bg-white/70 md:w-24" />
          </div>

          <div className="grid grid-cols-7 gap-y-3 text-center md:gap-y-5">
            {CALENDAR_WEEK_DAYS.map((day) => (
              <p key={day} className="text-lg font-bold tracking-wider text-white md:text-3xl">
                {day}
              </p>
            ))}

            {CALENDAR_DATES.map((date, index) => (
              <div key={`cal-${index}`} className="flex items-center justify-center">
                {date ? (
                  <span className={`${NUMBER_FONT_CLASS} relative flex h-11 w-11 items-center justify-center text-2xl font-bold text-white md:h-16 md:w-16 md:text-4xl`}>
                    {date === 5 ? (
                      <>
                        <span className="absolute inset-0 -rotate-6 rounded-[52%_48%_50%_50%/46%_54%_47%_53%] border-[2.5px] border-white" />
                        <span className="absolute inset-[2px] rotate-6 rounded-[48%_52%_45%_55%/54%_46%_53%_47%] border border-white/90" />
                      </>
                    ) : null}

                    <span className="relative z-10">{date}</span>
                  </span>
                ) : (
                  <span className="h-11 w-11 md:h-16 md:w-16" aria-hidden="true" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Ornament />

      <section className="px-6 py-0">
        <div className="mx-auto max-w-xl space-y-6 text-center">
          <h2 className="text-2xl font-light italic text-foreground md:text-3xl">Հարսանյաց հանդեսին մնացել է</h2>
          <div className="flex items-start justify-center gap-3 md:gap-6">
            <CountdownUnit value={timeLeft.days} label="Օր" />
            <span className="mt-3 text-lg text-primary/40 md:mt-4 md:text-2xl">:</span>
            <CountdownUnit value={timeLeft.hours} label="Ժամ" />
            <span className="mt-3 text-lg text-primary/40 md:mt-4 md:text-2xl">:</span>
            <CountdownUnit value={timeLeft.minutes} label="Րոպե" />
            <span className="mt-3 text-lg text-primary/40 md:mt-4 md:text-2xl">:</span>
            <CountdownUnit value={timeLeft.seconds} label="Վրկ" />
          </div>
        </div>
      </section>

      <Ornament />

      <section className="overflow-hidden">
        <div className="grid grid-cols-2 gap-[2px] md:grid-cols-4">
          <div className="aspect-[3/4] overflow-hidden">
            <img
              src="/assets/gallery1.jpeg"
              alt="Robert and Yelena gallery one"
              onError={applyGalleryFallback}
              className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
          <div className="aspect-[3/4] overflow-hidden">
            <img
              src="/assets/gallery4.jpeg"
              alt="Robert and Yelena gallery two"
              onError={applyGalleryFallback}
              className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
          <div className="aspect-[3/4] overflow-hidden">
            <img
              src="/assets/gallery3.jpeg"
              alt="Robert and Yelena gallery three"
              onError={applyGalleryFallback}
              className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
          <div className="aspect-[3/4] overflow-hidden">
            <img
              src="/assets/gallery5.jpeg"
              alt="Robert and Yelena gallery four"
              onError={applyGalleryFallback}
              className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
        </div>
      </section>

      <Ornament />

      <section className="px-6 py-4">
        <div className="mx-auto max-w-3xl space-y-10">
          <div className="space-y-2 text-center">
       
            <h2 className="text-3xl font-light italic text-foreground md:text-4xl">Ժամանակ և վայր</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            <div className={LOCATION_CARD_CLASS}>
              <div className="flex justify-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent">
                  <Home className="h-5 w-5 text-primary" />
                </div>
              </div>

              <h3 className="text-xl font-medium leading-snug tracking-wide md:text-2xl" style={{ fontFamily: "'Cinzel', serif" }}>
                Հարսի տուն  
              </h3>

              <div className="space-y-3">

                <div className="flex items-center justify-center gap-2">
                  <Clock className="h-5 w-5 shrink-0 text-primary/80 md:h-6 md:w-6" />
                 <span className={`${NUMBER_FONT_CLASS} text-4xl font-bold text-primary md:text-6xl`}>12։30</span>
                </div>

                <div className={LOCATION_ROW_CLASS}>
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary/70" />
                  <span className="font-medium">Լեռ Կամսար 30/3</span>
                </div>

                <a
                  href={MAP_LINKS.brideHouse}
                  target="_blank"
                  rel="noreferrer"
                  className={MAP_LINK_CLASS}
                >
                  Բացել քարտեզը
                </a>
              </div>
            </div>

            <div className={LOCATION_CARD_CLASS}>
              <div className="flex justify-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent">
                  <Church className="h-5 w-5 text-primary" />
                </div>
              </div>

              <h3 className="text-xl font-medium leading-snug tracking-wide md:text-2xl" style={{ fontFamily: "'Cinzel', serif" }}>
                Պսակադրություն
              </h3>

              <div className="space-y-3">
                <div className="flex items-center justify-center gap-2">
                  <Clock className="h-5 w-5 shrink-0 text-primary/80 md:h-6 md:w-6" />
                  <span className={`${NUMBER_FONT_CLASS} text-4xl font-bold text-primary md:text-6xl`}>14։30</span>
                </div>

                <div className={LOCATION_ROW_CLASS}>
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary/70" />
                  <span className="font-medium">Սուրբ Զորավոր Աստվածածին Եկեղեցի</span>
                </div>

                <a
                  href={MAP_LINKS.church}
                  target="_blank"
                  rel="noreferrer"
                  className={MAP_LINK_CLASS}
                >
                  Բացել քարտեզը
                </a>
              </div>
            </div>

            <div className={LOCATION_CARD_CLASS}>
              <div className="flex justify-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent">
                  <UtensilsCrossed className="h-5 w-5 text-primary" />
                </div>
              </div>

              <h3 className="text-xl font-medium tracking-wide md:text-2xl" style={{ fontFamily: "'Cinzel', serif" }}>
                Ընդունելություն
              </h3>

              <div className="space-y-3">

                <div className="flex items-center justify-center gap-2">
                  <Clock className="h-5 w-5 shrink-0 text-primary/80 md:h-6 md:w-6" />
                  <span className={`${NUMBER_FONT_CLASS} text-4xl font-bold text-primary md:text-6xl`}>17։30</span>
                </div>

                <div className={LOCATION_ROW_CLASS}>
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary/70" />
                  <span className="font-medium">
                   Օջախ ռեստորան, Կոտայք
                  </span>
                </div>

                <a
                  href={MAP_LINKS.restaurant}
                  target="_blank"
                  rel="noreferrer"
                  className={MAP_LINK_CLASS}
                >
                  Բացել քարտեզը
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Ornament />

      <section className="px-6 py-14">
        <div className="mx-auto max-w-md space-y-6 text-center">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.4em] text-foreground font-bold md:text-sm" style={{ fontFamily: "'Cinzel', serif" }}>
              Խնդրում ենք պատասխանել
            </p>
          </div>

          <p className="text-lg font-light text-foreground">
            Մենք ուրախ կլինենք նշել այս հատուկ օրը ձեզ հետ։ Խնդրում ենք տեղեկացնել՝ կարո՞ղ եք մասնակցել։
          </p>
        </div>
      </section>

      <footer className="border-t border-border px-6 py-10 text-center">
        <div className="mb-3 flex items-center justify-center gap-3">
          <div className="h-px w-12 bg-border" />
          <Heart className="h-3 w-3 fill-primary text-primary" />
          <div className="h-px w-12 bg-border" />
        </div>

        <p className="text-2xl font-light italic text-muted-foreground">Ռոբերտ &amp; Ելենա</p>
        <p className={`${NUMBER_FONT_CLASS} mt-1 text-xs uppercase tracking-widest text-muted-foreground/60`}>Սեպտեմբեր 5, 2026</p>
      </footer>
    </div>
  );
}