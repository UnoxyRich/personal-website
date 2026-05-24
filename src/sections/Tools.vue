<script setup lang="ts">
import SectionHeader from '../components/SectionHeader.vue'
import { toolGroups } from '../content/tools'
</script>

<template>
  <section id="tools" class="min-h-screen px-6 md:px-16 py-32 max-w-7xl mx-auto">
    <SectionHeader index="03 · tools" title="Stack." sub="The chisels behind the marble." />

    <div class="grid md:grid-cols-4 gap-4 reveal">
      <div
        v-for="g in toolGroups"
        :key="g.label"
        class="border hairline p-6 bg-ink-100/40 hover:bg-ink-200 transition-colors duration-300"
      >
        <div class="font-mono text-[11px] uppercase tracking-widest text-white/40 mb-4">{{ g.label }}</div>
        <ul class="flex flex-col gap-2">
          <li
            v-for="t in g.items"
            :key="t.name"
            class="font-display text-2xl leading-tight cursor-default transition-all"
            :style="{ color: 'rgba(255,255,255,0.6)' }"
            data-magnetic
            @mouseenter="(e) => ((e.currentTarget as HTMLElement).style.color = t.color)"
            @mouseleave="(e) => ((e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.6)')"
          >{{ t.name }}</li>
        </ul>
      </div>
    </div>
  </section>
</template>
