<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

const items = [
  { id: 'hero', label: '00 · index' },
  { id: 'about', label: '01 · about' },
  { id: 'projects', label: '02 · projects' },
  { id: 'tools', label: '03 · tools' },
  { id: 'games', label: '04 · games' },
  { id: 'contact', label: '05 · contact' },
]

const active = ref('hero')
const show = ref(false)
let obs: IntersectionObserver | null = null

onMounted(() => {
  show.value = false
  const onScroll = () => { show.value = window.scrollY > window.innerHeight * 0.5 }
  window.addEventListener('scroll', onScroll, { passive: true })
  ;(onMounted as any)._onScroll = onScroll

  obs = new IntersectionObserver(
    (entries) => {
      for (const e of entries) if (e.isIntersecting) active.value = (e.target as HTMLElement).id
    },
    { threshold: 0.4 },
  )
  items.forEach((it) => {
    const el = document.getElementById(it.id)
    if (el) obs!.observe(el)
  })
})

onBeforeUnmount(() => {
  obs?.disconnect()
})
</script>

<template>
  <nav
    class="fixed right-6 top-1/2 -translate-y-1/2 z-50 font-mono text-[11px] uppercase tracking-widest transition-opacity duration-500"
    :class="show ? 'opacity-100' : 'opacity-0 pointer-events-none'"
  >
    <ul class="flex flex-col gap-3">
      <li v-for="it in items" :key="it.id">
        <a
          :href="`#${it.id}`"
          data-magnetic
          class="flex items-center gap-3 group"
        >
          <span class="block h-px transition-all duration-300"
                :class="active === it.id ? 'w-10 bg-white' : 'w-4 bg-white/30 group-hover:bg-white/70'" />
          <span :class="active === it.id ? 'text-white' : 'text-white/40 group-hover:text-white/80'">{{ it.label }}</span>
        </a>
      </li>
    </ul>
  </nav>
</template>
