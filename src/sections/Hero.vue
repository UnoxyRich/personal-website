<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

const taglines = ['Builder.', 'Creator.', 'Player.', 'Tinkerer.', 'Dreamer.']
const taglineIdx = ref(0)
const typed = ref('')
let interval: number | undefined
let charTimer: number | undefined

function typeLoop() {
  const target = taglines[taglineIdx.value]
  let i = 0
  typed.value = ''
  const step = () => {
    if (i <= target.length) {
      typed.value = target.slice(0, i)
      i++
      charTimer = window.setTimeout(step, 70)
    }
  }
  step()
}

onMounted(() => {
  typeLoop()
  interval = window.setInterval(() => {
    taglineIdx.value = (taglineIdx.value + 1) % taglines.length
    typeLoop()
  }, 2800)
})

onBeforeUnmount(() => {
  clearInterval(interval)
  clearTimeout(charTimer)
})
</script>

<template>
  <section id="hero" class="relative h-screen w-full overflow-hidden">
    <!-- HUD -->
    <div class="absolute inset-0 flex flex-col justify-between p-6 md:p-10 pointer-events-none">
      <div class="flex justify-between font-mono text-[11px] uppercase tracking-widest text-white/60">
        <span>UnoxyRich · personal · v1.0</span>
        <span class="hidden md:block">{{ new Date().getFullYear() }} — somewhere on earth</span>
      </div>

      <div class="pointer-events-auto max-w-4xl">
        <div class="font-mono text-xs uppercase tracking-[0.3em] text-white/50 mb-4">Hello — I'm</div>
        <h1 class="font-display text-[18vw] md:text-[12vw] leading-[1.05] tracking-normal">
          Unoxy<span class="italic">Rich</span>
        </h1>
        <div class="mt-6 font-mono text-base md:text-2xl text-white/80">
          <span class="opacity-60">$ ./identify →</span> <span>{{ typed }}</span><span class="animate-pulse">_</span>
        </div>
      </div>

      <div class="flex justify-between items-end font-mono text-[11px] uppercase tracking-widest text-white/60">
        <span>scroll ↓ to enter</span>
        <span class="hidden md:block">made with vue · three · obsession</span>
      </div>
    </div>
  </section>
</template>
