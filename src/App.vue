<script setup lang="ts">
import { onBeforeUnmount, onMounted, provide, ref } from 'vue'
import Cursor from './components/Cursor.vue'
import MeshBackdrop from './components/MeshBackdrop.vue'
import NavDeck from './components/Nav.vue'
import Hero from './sections/Hero.vue'
import About from './sections/About.vue'
import Projects from './sections/Projects.vue'
import Tools from './sections/Tools.vue'
import Games from './sections/Games.vue'
import Contact from './sections/Contact.vue'
import FooterSection from './sections/Footer.vue'

const slides = [
  { id: 'hero',     comp: Hero },
  { id: 'about',    comp: About },
  { id: 'projects', comp: Projects },
  { id: 'tools',    comp: Tools },
  { id: 'games',    comp: Games },
  { id: 'contact',  comp: Contact },
  { id: 'footer',   comp: FooterSection },
]

const index = ref(0)
const total = slides.length
const transitioning = ref(false)
const direction = ref<1 | -1>(1)

provide('deck', { index, total, go, next, prev })

function go(i: number) {
  if (transitioning.value) return
  const clamped = Math.max(0, Math.min(total - 1, i))
  if (clamped === index.value) return
  // Reset scroll of the slide we're leaving so it reappears at top later
  const cur = document.querySelector('.slide.is-active') as HTMLElement | null
  if (cur) cur.scrollTop = 0
  direction.value = clamped > index.value ? 1 : -1
  transitioning.value = true
  index.value = clamped
  window.history.replaceState(null, '', `#${slides[clamped].id}`)
  window.setTimeout(() => { transitioning.value = false }, 950)
}
function next() { go(index.value + 1) }
function prev() { go(index.value - 1) }

function boostMeshSpin() {
  window.dispatchEvent(new CustomEvent('mesh-scroll-boost'))
}

// Wheel pages between slides
let wheelLock = false
function onWheel(e: WheelEvent) {
  const t = e.target as HTMLElement
  if (t.closest('.game-lane, [data-allow-wheel]')) return
  if (Math.abs(e.deltaY) < 8) return
  e.preventDefault()
  boostMeshSpin()
  if (wheelLock) return
  wheelLock = true
  if (e.deltaY > 0) next(); else prev()
  setTimeout(() => { wheelLock = false }, 850)
}

// Keyboard
function onKey(e: KeyboardEvent) {
  if (e.target && (e.target as HTMLElement).tagName === 'INPUT') return
  if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') { e.preventDefault(); next() }
  else if (e.key === 'ArrowUp' || e.key === 'PageUp') { e.preventDefault(); prev() }
  else if (e.key === 'Home') { e.preventDefault(); go(0) }
  else if (e.key === 'End')  { e.preventDefault(); go(total - 1) }
}

// Touch swipe
let touchStartY = 0
let touchStartT = 0
function onTouchStart(e: TouchEvent) {
  touchStartY = e.touches[0].clientY
  touchStartT = Date.now()
}
function onTouchEnd(e: TouchEvent) {
  const dy = e.changedTouches[0].clientY - touchStartY
  const dt = Date.now() - touchStartT
  if (Math.abs(dy) > 50 && dt < 600) {
    boostMeshSpin()
    if (dy < 0) next(); else prev()
  }
}

// Initial hash navigation
function initFromHash() {
  const id = location.hash.replace('#', '')
  const i = slides.findIndex((s) => s.id === id)
  if (i >= 0) index.value = i
}

onMounted(() => {
  initFromHash()
  window.addEventListener('wheel', onWheel, { passive: false })
  window.addEventListener('keydown', onKey)
  window.addEventListener('touchstart', onTouchStart, { passive: true })
  window.addEventListener('touchend', onTouchEnd, { passive: true })
})
onBeforeUnmount(() => {
  window.removeEventListener('wheel', onWheel)
  window.removeEventListener('keydown', onKey)
  window.removeEventListener('touchstart', onTouchStart)
  window.removeEventListener('touchend', onTouchEnd)
})

</script>

<template>
  <div class="grain deck-root">
    <Cursor />
    <MeshBackdrop :active-index="index" />
    <NavDeck :slides="slides.map(s => s.id)" :index="index" @go="go" />

    <!-- Z-axis deck: slides fly through depth -->
    <div class="deck">
      <section
        v-for="(s, i) in slides"
        :key="s.id"
        :id="s.id"
        class="slide"
        :class="{
          'is-active': i === index,
          'is-past':   i <  index,
          'is-future': i >  index,
          'is-adjacent': Math.abs(i - index) === 1,
        }"
        :style="{ zIndex: 100 - Math.abs(i - index) }"
      >
        <component :is="s.comp" :active="i === index" />
      </section>
    </div>

    <!-- Bottom hints -->
    <div class="hints">
      <button class="hint-btn" data-magnetic @click="prev" :disabled="index === 0" aria-label="previous">↑</button>
      <span class="hint-count font-mono">{{ String(index + 1).padStart(2, '0') }} / {{ String(total).padStart(2, '0') }}</span>
      <button class="hint-btn" data-magnetic @click="next" :disabled="index === total - 1" aria-label="next">↓</button>
    </div>
  </div>
</template>

<style>
html, body { height: 100%; overflow: hidden; overscroll-behavior: none; }

.deck-root { position: fixed; inset: 0; width: 100vw; height: 100vh; overflow: hidden; perspective: 1600px; perspective-origin: 50% 50%; background: #000; }

.deck {
  position: absolute;
  inset: 0;
  z-index: 2;
  transform-style: preserve-3d;
}

.slide {
  position: absolute;
  inset: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  transform-style: preserve-3d;
  backface-visibility: hidden;
  will-change: transform, opacity, filter;
  /* Default = future (in front of next slides) */
  transform: translate3d(0, 0, -1400px) rotateX(0deg);
  opacity: 0;
  filter: blur(8px) brightness(0.55);
  pointer-events: none;
  transition:
    transform 1s cubic-bezier(0.7, 0, 0.2, 1),
    opacity .8s ease,
    filter .8s ease;
}

.slide.is-active {
  transform: translate3d(0, 0, 0);
  opacity: 1;
  filter: none;
  pointer-events: auto;
  overflow: hidden;
}

/* Coming from depth (future = ahead of us in the stack) */
.slide.is-future {
  transform: translate3d(0, 0, -1400px);
  opacity: 0;
  filter: blur(10px) brightness(0.5);
}
.slide.is-future.is-adjacent {
  /* Peek-through preview directly behind the active slide */
  transform: translate3d(0, 6vh, -800px);
  opacity: 0.18;
  filter: blur(6px) brightness(0.6);
}

/* Past slides fly toward & past the camera */
.slide.is-past {
  transform: translate3d(0, 0, 1600px);
  opacity: 0;
  filter: blur(14px) brightness(0.6);
}
.slide.is-past.is-adjacent {
  transform: translate3d(0, -6vh, 900px);
  opacity: 0.12;
  filter: blur(10px) brightness(0.7);
}

.hints {
  position: fixed;
  bottom: 1.25rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 60;
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 11px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.55);
}
.hint-btn {
  width: 32px; height: 32px;
  border: 1px solid rgba(255,255,255,0.18);
  display: inline-flex; align-items: center; justify-content: center;
  background: transparent;
  color: rgba(255,255,255,0.7);
  transition: background .25s ease, color .25s ease, border-color .25s ease;
}
.hint-btn:hover { background: #fff; color: #000; border-color: #fff; }
.hint-btn:disabled { opacity: 0.25; cursor: not-allowed; }

@media (prefers-reduced-motion: reduce) {
  .deck, .slide { transition: none; }
}
</style>
