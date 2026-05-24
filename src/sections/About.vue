<script setup lang="ts">
import SectionHeader from '../components/SectionHeader.vue'
</script>

<template>
  <section class="h-full w-full px-6 md:px-16 max-w-7xl mx-auto flex flex-col justify-center">
    <SectionHeader index="01 · about" title="About." sub="A snapshot of who's behind the keyboard." />

    <div class="grid md:grid-cols-12 gap-6 reveal">
      <p class="md:col-span-8 font-display text-xl md:text-3xl leading-snug">
        I build small, weird, useful things on the web —
        <span class="italic">
          <span class="color-glow" style="--glow: #ffd166">file converters</span>,
          <span class="color-glow" style="--glow: #a78bfa">AI agents disguised as waifus</span>,
          <span class="color-glow" style="--glow: #34d399">network diagnostics</span>,
          <span class="color-glow" style="--glow: #ff5e57">language-learning toys</span>.
        </span>
        I prefer code that ships over code that's perfect, and tools that work offline over ones that don't.
      </p>
      <div class="md:col-span-4 flex flex-col gap-3 font-mono text-[11px] uppercase tracking-widest text-white/60">
        <div class="border hairline p-3">
          <div class="text-white/40">role</div>
          <div class="text-white text-xs normal-case tracking-normal mt-1">Indie dev · multi-OS native</div>
        </div>
        <div class="border hairline p-3">
          <div class="text-white/40">focus</div>
          <div class="text-white text-xs normal-case tracking-normal mt-1">Local-first apps, AI agents, network tools</div>
        </div>
        <div class="border hairline p-3">
          <div class="text-white/40">currently</div>
          <div class="text-white text-xs normal-case tracking-normal mt-1">Shipping side-projects · learning languages</div>
        </div>
      </div>
    </div>
  </section>
</template>
