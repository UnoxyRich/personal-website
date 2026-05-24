<script setup lang="ts">
import SectionHeader from '../components/SectionHeader.vue'
import { toolGroups } from '../content/tools'
</script>

<template>
  <section data-allow-wheel class="h-full w-full overflow-y-auto px-6 md:px-16 py-8 md:py-12 max-w-7xl mx-auto flex flex-col justify-center">
    <SectionHeader index="03 / tools" title="Stack." sub="The chisels behind the marble." />

    <div class="grid md:grid-cols-4 gap-4 reveal">
      <div
        v-for="(g, gi) in toolGroups"
        :key="g.label"
        class="color-card group min-h-[310px] border p-4 transition duration-300 hover:-translate-y-1"
        :style="{ ['--accent' as any]: g.items[gi % g.items.length]?.color || '#fff' }"
      >
        <div class="relative flex items-center justify-between gap-4 mb-4">
          <div>
            <div class="font-mono text-[10px] uppercase tracking-widest text-white/40">toolkit</div>
            <h3 class="font-display text-2xl mt-1 color-glow" :style="{ ['--glow' as any]: g.items[0]?.color || '#fff' }">{{ g.label }}</h3>
          </div>
          <div class="font-mono text-[11px] uppercase tracking-widest text-white/45">{{ String(g.items.length).padStart(2, '0') }}</div>
        </div>

        <ul class="relative flex flex-wrap gap-1.5">
          <li
            v-for="t in g.items"
            :key="t.name"
            class="rounded-none border hairline px-2 py-1.5 font-display text-sm leading-none cursor-default transition hover:-translate-y-0.5 hover:bg-white/10"
            :style="{ ['--glow' as any]: t.color, color: t.color, textShadow: `0 0 18px ${t.color}66, 0 0 34px ${t.color}33` }"
            data-magnetic
          >
            {{ t.name }}
          </li>
        </ul>

        <div class="relative mt-6 h-2 overflow-hidden bg-white/5">
          <div
            class="h-full w-2/3 transition-all duration-500 group-hover:w-full"
            :style="{ background: `linear-gradient(90deg, ${g.items[0]?.color || '#fff'}, ${g.items[g.items.length - 1]?.color || '#fff'})` }"
          />
        </div>
      </div>
    </div>
  </section>
</template>
