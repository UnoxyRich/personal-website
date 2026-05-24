<script setup lang="ts">
import SectionHeader from '../components/SectionHeader.vue'
import { projects } from '../content/projects'
import { vTilt } from '../composables/useTilt'
</script>

<template>
  <section class="h-full w-full px-6 md:px-16 max-w-7xl mx-auto flex flex-col justify-center">
    <SectionHeader index="02 · projects" title="Projects." :sub="`${projects.length} shipped (or shipping). All open source.`" />

    <div class="grid md:grid-cols-3 gap-4 reveal">
      <a
        v-for="(p, i) in projects"
        :key="p.url"
        :href="p.url"
        target="_blank"
        rel="noreferrer"
        class="tilt-wrap group"
      >
        <article
          v-tilt
          class="tilt project-card relative border hairline bg-ink-100 p-5 h-full flex flex-col justify-between overflow-hidden"
          :style="{ ['--accent' as any]: p.color }"
        >
          <div class="absolute inset-0 bg-gradient-to-br from-white/[0.03] via-transparent to-transparent" />
          <div class="absolute top-4 right-4 font-mono text-[10px] uppercase tracking-widest" :style="{ color: p.color }">
            {{ String(i + 1).padStart(2, '0') }} / {{ String(projects.length).padStart(2, '0') }}
          </div>

          <div class="relative">
            <h3 class="font-display text-xl md:text-2xl leading-tight project-title transition-colors">{{ p.title }}</h3>
            <p class="mt-3 text-white/70 text-xs md:text-sm leading-relaxed">{{ p.description }}</p>
          </div>

          <div class="relative mt-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest">
            <span class="text-white/40">github → repo</span>
            <span class="inline-flex items-center gap-2 group-hover:gap-4 transition-all" :style="{ color: p.color }">
              <span>open</span>
              <span class="block w-6 h-px" :style="{ background: p.color }" />
              <span>→</span>
            </span>
          </div>
        </article>
      </a>
    </div>
  </section>
</template>
