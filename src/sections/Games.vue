<script setup lang="ts">
import { computed, ref } from 'vue'
import { steamGames, otherGames, coverUrl, storeUrl, type Game } from '../content/games'

const query = ref('')
const sortMode = ref<'az' | 'shuffle'>('shuffle')
const shuffleSeed = ref(1)

function seededShuffle<T>(arr: T[], seed: number): T[] {
  const a = arr.slice()
  let s = seed || 1
  for (let i = a.length - 1; i > 0; i--) {
    s = (s * 9301 + 49297) % 233280
    const j = Math.floor((s / 233280) * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

const filtered = computed<Game[]>(() => {
  const q = query.value.trim().toLowerCase()
  let list = steamGames.filter((g) => g.title.toLowerCase().includes(q))
  if (sortMode.value === 'az') list.sort((a, b) => a.title.localeCompare(b.title))
  else list = seededShuffle(list, shuffleSeed.value)
  return list
})

const rows = computed(() => {
  const list = filtered.value
  if (list.length === 0) return [[], [], []] as Game[][]
  return [
    seededShuffle(list, shuffleSeed.value + 1),
    seededShuffle(list, shuffleSeed.value + 2),
    seededShuffle(list, shuffleSeed.value + 3),
  ]
})

function shuffle() {
  sortMode.value = 'shuffle'
  shuffleSeed.value = Math.floor(Math.random() * 100000) + 1
}
</script>

<template>
  <section class="h-full w-full flex flex-col justify-start pt-8 md:pt-12">
    <div class="px-6 md:px-16 w-full max-w-7xl mx-auto">
      <header class="reveal grid gap-5 border-b hairline pb-5 mb-7 md:grid-cols-[minmax(220px,1fr)_minmax(360px,520px)] md:items-start">
        <div>
          <div class="font-mono text-[10px] uppercase tracking-widest text-white/50">04 · games</div>
          <h2 class="font-display text-4xl md:text-6xl leading-[1.05] mt-1 color-glow" style="--glow: #66c0f4">Library.</h2>
          <p class="mt-3 max-w-sm font-mono text-[10px] uppercase tracking-widest text-white/40">
            {{ steamGames.length }} on Steam · color, covers, motion
          </p>
        </div>

        <div class="flex flex-col gap-3 md:pt-2">
          <div class="relative">
            <input
              v-model="query"
              type="search"
              placeholder="search 130+ games…"
              class="w-full bg-white/[0.04] border hairline px-4 py-4 pr-24 font-mono text-xs placeholder:text-white/30 focus:outline-none focus:border-[#66c0f4]/70 focus:shadow-[0_0_28px_rgba(102,192,244,0.22)]"
            />
            <span class="absolute right-4 top-1/2 -translate-y-1/2 font-mono text-[11px] text-white/45">{{ filtered.length }} / {{ steamGames.length }}</span>
          </div>
          <div class="flex gap-2 font-mono text-[11px] uppercase tracking-widest">
            <button data-magnetic class="border hairline px-4 py-3 transition-colors" :class="sortMode === 'az' ? 'bg-[#ffd60a] text-black border-[#ffd60a]' : 'hover:bg-white/10'" @click="sortMode = 'az'">A → Z</button>
            <button data-magnetic class="border hairline px-4 py-3 transition-colors" :class="sortMode === 'shuffle' ? 'bg-[#ff2c55] text-white border-[#ff2c55]' : 'hover:bg-white/10'" @click="shuffle">Shuffle ⤭</button>
          </div>
        </div>
      </header>
    </div>

    <!-- Auto-scrolling lanes with V-shaped god rays -->
    <div class="lanes reveal relative">
      <div
        v-for="(row, ri) in rows"
        :key="ri"
        class="lane"
        :class="ri % 2 === 1 ? 'lane--reverse' : ''"
      >
        <div class="lane-track" v-if="row.length">
          <a
            v-for="(g, gi) in [...row, ...row]"
            :key="g.title + '-' + ri + '-' + gi"
            :href="g.appid ? storeUrl(g.appid) : undefined"
            :target="g.appid ? '_blank' : undefined"
            rel="noreferrer"
            data-magnetic
            class="game-card relative block shrink-0 w-[88px] sm:w-[100px] md:w-[112px] aspect-[2/3] border hairline overflow-hidden bg-ink-100"
          >
            <img
              v-if="g.appid"
              :src="coverUrl(g.appid)"
              :alt="g.title"
              loading="lazy"
              draggable="false"
              class="absolute inset-0 w-full h-full object-cover"
              @error="($event.target as HTMLImageElement).style.display='none'"
            />
            <div class="absolute inset-0 flex flex-col justify-between p-3 bg-gradient-to-br from-ink-300 via-ink-100 to-black" :class="g.appid ? 'opacity-0' : 'opacity-100'">
              <div class="font-mono text-[10px] uppercase tracking-widest text-white/40">No cover</div>
              <div class="font-display text-xl leading-tight">{{ g.title }}</div>
            </div>
          </a>
        </div>
      </div>

      <!-- Soft cone of light cast from the top-left corner.
           A conic-gradient mask defines a feathered wedge; inside it = color, outside = grayscale veil. -->
      <div class="veil" aria-hidden="true" />

      <!-- Visible god-ray beams fanning out from the same corner -->
      <div class="rays" aria-hidden="true">
        <span class="ray ray-1" />
        <span class="ray ray-2" />
        <span class="ray ray-3" />
        <span class="ray ray-4" />
        <span class="ray ray-5" />
        <span class="ray ray-6" />
        <span class="ray ray-7" />
      </div>
      <!-- Bright bloom at the source corner -->
      <div class="bloom" aria-hidden="true" />

      <div v-if="!filtered.length" class="px-6 md:px-16 font-mono text-white/40 py-20">no match · try another title</div>

      <!-- Edge fades -->
      <div class="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-black to-transparent z-20" />
      <div class="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-black to-transparent z-20" />
    </div>

    <div class="px-6 md:px-16 max-w-7xl mx-auto mt-3 reveal">
      <div class="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-white/40">
        <span>elsewhere ·</span>
        <span v-for="g in otherGames" :key="g" class="pill border hairline px-2 py-1 text-xs text-white/80" data-magnetic>{{ g }}</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.lanes {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  position: relative;
}

.lane { overflow: hidden; width: 100%; }
.lane-track {
  display: flex;
  gap: 0.5rem;
  width: max-content;
  animation: scroll-x 160s linear infinite;
}
.lane--reverse .lane-track { animation-direction: reverse; }

@keyframes scroll-x {
  from { transform: translate3d(0, 0, 0); }
  to   { transform: translate3d(-50%, 0, 0); }
}

.game-card { transition: transform .4s ease; }
.game-card:hover { transform: translateY(-6px); z-index: 5; }

/* Soft cone of light from the top-left corner.
   The conic-gradient mask defines an angular wedge with feathered edges,
   giving a rounded, organic cone instead of a hard triangle. */
.veil {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 10;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: grayscale(1) brightness(0.5) contrast(0.95);
  -webkit-backdrop-filter: grayscale(1) brightness(0.5) contrast(0.95);
  /* CONIC mask centered at the top-left corner (0% 0%).
     CSS conic-gradient: 0deg points up, 90deg right, 180deg down.
     We let the cone open into the down-right quadrant.
     Wedge of "no veil" (transparent) sits between ~80° and ~165°,
     with 25° feathered transitions on each side for the rounded look. */
  -webkit-mask:
    conic-gradient(
      from 0deg at 8% -4%,
      black 0deg,
      black 60deg,
      transparent 95deg,
      transparent 150deg,
      black 185deg,
      black 360deg
    );
          mask:
    conic-gradient(
      from 0deg at 8% -4%,
      black 0deg,
      black 60deg,
      transparent 95deg,
      transparent 150deg,
      black 185deg,
      black 360deg
    );
}

/* Visible god-ray beams streaming out of the same corner */
.rays {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 11;
  overflow: hidden;
  mix-blend-mode: screen;
}
.ray {
  position: absolute;
  top: -14%;
  left: 3%;
  width: 7%;
  height: 180%;
  background: radial-gradient(
    ellipse at 50% 0%,
    rgba(255, 255, 255, 0.18) 0%,
    rgba(255, 255, 255, 0.12) 18%,
    rgba(255, 255, 255, 0.05) 48%,
    rgba(255, 255, 255, 0.0) 100%
  );
  border-radius: 999px;
  transform-origin: 50% 0%;
  filter: blur(22px);
  opacity: 0.58;
  animation: ray-pulse 7s ease-in-out infinite;
}
/* Fan: angles increase clockwise from straight down (0deg = down here since we rotate from top). */
.ray-1 { transform: translateX(-50%) rotate(60deg);  width: 5%; opacity: 0.55; animation-delay: 0s; }
.ray-2 { transform: translateX(-50%) rotate(75deg);  width: 7%; opacity: 0.75; animation-delay: 0.9s; }
.ray-3 { transform: translateX(-50%) rotate(90deg);  width: 9%; opacity: 0.95; animation-delay: 1.8s; }
.ray-4 { transform: translateX(-50%) rotate(105deg); width: 10%; opacity: 1;    animation-delay: 2.7s; }
.ray-5 { transform: translateX(-50%) rotate(120deg); width: 9%; opacity: 0.95; animation-delay: 3.6s; }
.ray-6 { transform: translateX(-50%) rotate(135deg); width: 7%; opacity: 0.75; animation-delay: 4.5s; }
.ray-7 { transform: translateX(-50%) rotate(150deg); width: 5%; opacity: 0.55; animation-delay: 5.4s; }

@keyframes ray-pulse {
  0%, 100% { filter: blur(22px); }
  50%      { filter: blur(18px); }
}

/* Soft bright bloom at the corner where the rays originate */
.bloom {
  position: absolute;
  top: -18%;
  left: 1%;
  width: 420px;
  height: 420px;
  transform: translate(-50%, -50%);
  pointer-events: none;
  z-index: 12;
  border-radius: 9999px;
  background: radial-gradient(
    circle,
    rgba(255, 255, 255, 0.14) 0%,
    rgba(102, 192, 244, 0.1) 36%,
    rgba(255, 255, 255, 0.0) 72%
  );
  mix-blend-mode: screen;
  filter: blur(28px);
  opacity: 0.75;
}

@media (prefers-reduced-motion: reduce) {
  .lane-track { animation: none; }
  .ray { animation: none; }
}
</style>
