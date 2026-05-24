<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, provide, ref } from 'vue'
import { animate, stagger } from 'animejs'
import Cursor from './components/Cursor.vue'
import MeshBackdrop from './components/MeshBackdrop.vue'
import NavDeck from './components/Nav.vue'
import Hero from './sections/Hero.vue'
import About from './sections/About.vue'
import Projects from './sections/Projects.vue'
import Tools from './sections/Tools.vue'
import Games from './sections/Games.vue'
import Contact from './sections/Contact.vue'

const slides = [
  { id: 'hero', comp: Hero },
  { id: 'about', comp: About },
  { id: 'projects', comp: Projects },
  { id: 'tools', comp: Tools },
  { id: 'games', comp: Games },
  { id: 'contact', comp: Contact },
]

const index = ref(0)
const total = slides.length
const transitioning = ref(false)
const direction = ref<1 | -1>(1)
const slideEls = ref<HTMLElement[]>([])
const transitionLayer = ref<HTMLElement | null>(null)

type SlidePose = {
  x: number
  y: number
  z: number
  scale: number
  opacity: number
  blur: number
  brightness: number
}

type SplitPose = {
  x: number
  y: number
  scale: number
  opacity: number
  blur: number
  brightness: number
  skew: number
}

provide('deck', { index, total, go, next, prev })

function setSlideRef(el: unknown, i: number) {
  if (el instanceof HTMLElement) slideEls.value[i] = el
}

function travel() {
  return Math.max(54, Math.min(92, window.innerHeight * 0.1))
}

function applyPose(el: HTMLElement, pose: SlidePose) {
  el.style.transform = `translate3d(${pose.x}px, ${pose.y}px, ${pose.z}px) scale(${pose.scale})`
  el.style.opacity = String(pose.opacity)
  el.style.filter = `blur(${pose.blur}px) brightness(${pose.brightness})`
  el.style.clipPath = 'inset(0 0 0 0)'
}

function applySplitPose(el: HTMLElement, pose: SplitPose) {
  el.style.transform = `translate3d(${pose.x}px, ${pose.y}px, 0) skewX(${pose.skew}deg) scale(${pose.scale})`
  el.style.opacity = String(pose.opacity)
  el.style.filter = pose.blur === 0 && pose.brightness === 1
    ? 'none'
    : `blur(${pose.blur}px) brightness(${pose.brightness})`
}

function idlePose(i: number, active = index.value): SlidePose {
  const delta = i - active
  const t = travel()
  if (delta === 0) return { x: 0, y: 0, z: 0, scale: 1, opacity: 1, blur: 0, brightness: 1 }
  if (delta > 0) return { x: 0, y: t * 0.7, z: -260, scale: 0.985, opacity: delta === 1 ? 0.12 : 0, blur: 8, brightness: 0.62 }
  return { x: 0, y: -t * 0.7, z: 260, scale: 1.015, opacity: delta === -1 ? 0.08 : 0, blur: 10, brightness: 0.62 }
}

function settleSlides(active = index.value) {
  slideEls.value.forEach((el, i) => {
    if (el) applyPose(el, idlePose(i, active))
  })
}

function animateReveal(el: HTMLElement) {
  const items = el.querySelectorAll<HTMLElement>('.reveal')
  if (!items.length) return
  animate(items, {
    keyframes: [
      { opacity: 0, translateX: 0, translateY: 56, duration: 0 },
      { opacity: 0.85, translateX: 0, translateY: -8, duration: 300, ease: 'outCubic' },
      { opacity: 1, translateX: 0, translateY: 0, duration: 220, ease: 'outQuart' },
    ],
    delay: stagger(55, { start: 120 }),
  })
}

function waitForPaint() {
  return new Promise<void>((resolve) => {
    requestAnimationFrame(() => requestAnimationFrame(() => resolve()))
  })
}

function makeSplitShard(source: HTMLElement, side: 'left' | 'right') {
  const layer = transitionLayer.value
  if (!layer) return null

  const shard = source.cloneNode(true) as HTMLElement
  shard.removeAttribute('id')
  shard.classList.add('slide-split-shard', `is-${side}`)
  shard.style.transform = 'translate3d(0, 0, 0) scale(1)'
  shard.style.opacity = '1'
  shard.style.filter = 'none'
  shard.style.clipPath = side === 'left' ? 'inset(0 50% 0 0)' : 'inset(0 0 0 50%)'
  shard.style.pointerEvents = 'none'
  shard.style.zIndex = '3'
  layer.appendChild(shard)
  return shard
}

async function animateToSlide(from: number, to: number) {
  const outgoing = slideEls.value[from]
  const incoming = slideEls.value[to]
  const dir = to > from ? 1 : -1
  const vh = window.innerHeight
  const vw = window.innerWidth

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !outgoing || !incoming) {
    settleSlides(to)
    animateReveal(incoming)
    return
  }

  const leftShard = makeSplitShard(outgoing, 'left')
  const rightShard = makeSplitShard(outgoing, 'right')
  const shardDrift = Math.max(170, Math.min(380, vw * 0.28))
  const verticalBias = dir > 0 ? -vh * 0.018 : vh * 0.018
  const leftPose: SplitPose = { x: 0, y: 0, scale: 1, opacity: 1, blur: 0, brightness: 1, skew: 0 }
  const rightPose: SplitPose = { ...leftPose }
  const inPose: SlidePose = {
    x: 0,
    y: dir > 0 ? vh * 0.22 : -vh * 0.22,
    z: -120,
    scale: 0.992,
    opacity: 0.92,
    blur: 3,
    brightness: 0.74,
  }
  const inTarget = idlePose(to, to)

  if (leftShard) applySplitPose(leftShard, leftPose)
  if (rightShard) applySplitPose(rightShard, rightPose)
  applyPose(incoming, inPose)
  transitionLayer.value?.getBoundingClientRect()
  await waitForPaint()
  outgoing.style.opacity = '0'

  const splitAnimations = [leftShard, rightShard].filter(Boolean).map((shard, shardIndex) => {
    const isLeft = shardIndex === 0
    const pose = isLeft ? leftPose : rightPose
    return animate(pose, {
      x: isLeft ? -shardDrift : shardDrift,
      y: verticalBias,
      scale: 1.012,
      opacity: 0,
      blur: 0,
      brightness: 1,
      skew: isLeft ? -0.8 : 0.8,
      duration: 920,
      ease: 'outQuart',
      onRender: () => applySplitPose(shard as HTMLElement, pose),
    })
  })
  const inAnim = animate(inPose, {
    ...inTarget,
    duration: 900,
    delay: 50,
    ease: 'outQuint',
    onRender: () => applyPose(incoming, inPose),
  })

  animateReveal(incoming)
  await Promise.all([...splitAnimations.map((anim) => anim.then()), inAnim.then()])
  leftShard?.remove()
  rightShard?.remove()
  settleSlides(to)
}

async function go(i: number) {
  if (transitioning.value) return
  const clamped = Math.max(0, Math.min(total - 1, i))
  if (clamped === index.value) return

  const from = index.value
  const cur = document.querySelector('.slide.is-active') as HTMLElement | null
  if (cur) cur.scrollTop = 0

  direction.value = clamped > index.value ? 1 : -1
  transitioning.value = true
  window.history.replaceState(null, '', `#${slides[clamped].id}`)
  await animateToSlide(from, clamped)
  index.value = clamped
  await nextTick()
  settleSlides(clamped)
  transitioning.value = false
}

function next() { go(index.value + 1) }
function prev() { go(index.value - 1) }

function boostMeshSpin() {
  window.dispatchEvent(new CustomEvent('mesh-scroll-boost'))
}

let wheelLock = false
function onWheel(e: WheelEvent) {
  const t = e.target as HTMLElement
  if (t.closest('.game-lane, [data-allow-wheel]')) return
  if (Math.abs(e.deltaY) < 8) return
  e.preventDefault()
  boostMeshSpin()
  if (wheelLock) return
  wheelLock = true
  if (e.deltaY > 0) next()
  else prev()
  setTimeout(() => { wheelLock = false }, 940)
}

function onKey(e: KeyboardEvent) {
  if (e.target && (e.target as HTMLElement).tagName === 'INPUT') return
  if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') { e.preventDefault(); next() }
  else if (e.key === 'ArrowUp' || e.key === 'PageUp') { e.preventDefault(); prev() }
  else if (e.key === 'Home') { e.preventDefault(); go(0) }
  else if (e.key === 'End') { e.preventDefault(); go(total - 1) }
}

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
    if (dy < 0) next()
    else prev()
  }
}

function initFromHash() {
  const id = location.hash.replace('#', '')
  const i = slides.findIndex((s) => s.id === id)
  if (i >= 0) index.value = i
}

onMounted(() => {
  initFromHash()
  nextTick(() => {
    settleSlides(index.value)
    const active = slideEls.value[index.value]
    if (active) animateReveal(active)
  })
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

    <div class="deck">
      <section
        v-for="(s, i) in slides"
        :key="s.id"
        :id="s.id"
        :ref="(el) => setSlideRef(el, i)"
        class="slide"
        :class="{
          'is-active': i === index,
          'is-past': i < index,
          'is-future': i > index,
          'is-adjacent': Math.abs(i - index) === 1,
        }"
        :style="{ zIndex: 100 - Math.abs(i - index) }"
      >
        <component :is="s.comp" :active="i === index" />
      </section>
    </div>
    <div ref="transitionLayer" class="transition-layer" aria-hidden="true"></div>

    <div class="hints">
      <button class="hint-btn" data-magnetic @click="prev" :disabled="index === 0" aria-label="previous">&larr;</button>
      <span class="hint-count font-mono">{{ String(index + 1).padStart(2, '0') }} / {{ String(total).padStart(2, '0') }}</span>
      <button class="hint-btn" data-magnetic @click="next" :disabled="index === total - 1" aria-label="next">&rarr;</button>
    </div>
  </div>
</template>

<style>
html, body { height: 100%; overflow: hidden; overscroll-behavior: none; }

.deck-root { position: fixed; inset: 0; width: 100vw; height: 100vh; overflow: hidden; perspective: 1400px; perspective-origin: 50% 50%; background: #000; }

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
  transform: translate3d(0, 0, -360px) scale(0.94);
  opacity: 0;
  filter: blur(8px) brightness(0.55);
  pointer-events: none;
}

.slide.is-active {
  opacity: 1;
  filter: none;
  pointer-events: auto;
  overflow: hidden;
}

.transition-layer {
  position: fixed;
  inset: 0;
  z-index: 45;
  pointer-events: none;
  overflow: hidden;
  transform: translateZ(0);
}

.slide-split-shard {
  position: absolute !important;
  inset: 0 !important;
  width: 100vw !important;
  height: 100vh !important;
  overflow: hidden !important;
  transform-origin: center center;
  backface-visibility: hidden;
  will-change: transform, opacity, filter;
  contain: paint;
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

