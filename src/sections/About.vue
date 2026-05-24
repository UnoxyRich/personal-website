<script setup lang="ts">
import SectionHeader from '../components/SectionHeader.vue'
</script>

<template>
  <section id="about" class="min-h-screen px-6 md:px-16 py-32 max-w-7xl mx-auto">
    <SectionHeader index="01 · about" title="About." sub="A snapshot of who's behind the keyboard." />

    <div class="grid md:grid-cols-12 gap-8 reveal">
      <p class="md:col-span-8 font-display text-3xl md:text-5xl leading-tight">
        I build small, weird, useful things on the web —
        <span class="italic text-white/70">file converters, AI agents disguised as waifus, network diagnostics, language-learning toys.</span>
        I prefer code that ships over code that's perfect, and tools that work offline over ones that don't.
      </p>
      <div class="md:col-span-4 flex flex-col gap-4 font-mono text-xs uppercase tracking-widest text-white/60">
        <div class="border hairline p-4">
          <div class="text-white/40">role</div>
          <div class="text-white text-sm normal-case tracking-normal mt-1">Indie dev · multi-OS native</div>
        </div>
        <div class="border hairline p-4">
          <div class="text-white/40">focus</div>
          <div class="text-white text-sm normal-case tracking-normal mt-1">Local-first apps, AI agents, network tools</div>
        </div>
        <div class="border hairline p-4">
          <div class="text-white/40">currently</div>
          <div class="text-white text-sm normal-case tracking-normal mt-1">Shipping side-projects · learning more languages</div>
        </div>
      </div>
    </div>
  </section>
</template>
