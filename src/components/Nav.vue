<script setup lang="ts">
const props = defineProps<{ slides: string[]; index: number }>()
const emit = defineEmits<{ (e: 'go', i: number): void }>()

const labels: Record<string, string> = {
  hero: '00 · index',
  about: '01 · about',
  projects: '02 · projects',
  tools: '03 · tools',
  games: '04 · games',
  contact: '05 · contact',
  footer: '06 · end',
}
</script>

<template>
  <nav class="deck-nav font-mono">
    <ul class="flex flex-col gap-3">
      <li v-for="(id, i) in props.slides" :key="id">
        <button
          data-magnetic
          class="flex items-center gap-3 group w-full text-left"
          @click="emit('go', i)"
        >
          <span class="block h-px transition-all duration-300"
                :class="i === props.index ? 'w-10 bg-white' : 'w-4 bg-white/30 group-hover:bg-white/70'" />
          <span :class="i === props.index ? 'text-white' : 'text-white/40 group-hover:text-white/80'">{{ labels[id] || id }}</span>
        </button>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.deck-nav {
  position: fixed;
  right: 1.5rem;
  top: 50%;
  transform: translateY(-50%);
  z-index: 60;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.2em;
}
</style>
