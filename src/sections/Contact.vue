<script setup lang="ts">
import { ref } from 'vue'
import SectionHeader from '../components/SectionHeader.vue'
import Marquee from '../components/Marquee.vue'
import { socials } from '../content/socials'
import { contacts } from '../content/contact'

const copied = ref<string | null>(null)
async function copy(v: string) {
  try { await navigator.clipboard.writeText(v); copied.value = v; setTimeout(() => (copied.value = null), 1500) } catch {}
}
</script>

<template>
  <section id="contact" class="px-6 md:px-16 py-32 max-w-7xl mx-auto">
    <SectionHeader index="05 · contact" title="Find me." sub="Six platforms, three channels, one human." />

    <Marquee :items="socials.map((s) => s.label)" />

    <div class="grid md:grid-cols-2 gap-12 mt-16">
      <!-- Socials -->
      <div class="reveal">
        <div class="font-mono text-[11px] uppercase tracking-widest text-white/40 mb-4">socials</div>
        <ul class="flex flex-col">
          <li v-for="s in socials" :key="s.url" class="group">
            <a
              :href="s.url"
              target="_blank"
              rel="noreferrer"
              data-magnetic
              class="brand-link flex items-baseline justify-between gap-6 border-b hairline py-5 hover:bg-white/[0.03] transition-colors"
              :style="{ ['--brand' as any]: s.color }"
            >
              <span class="font-display text-3xl md:text-5xl brand-text transition-colors">{{ s.label }}</span>
              <span class="font-mono text-[11px] uppercase tracking-widest text-white/40 group-hover:text-white">open ↗</span>
            </a>
          </li>
        </ul>
      </div>

      <!-- Direct contact -->
      <div class="reveal">
        <div class="font-mono text-[11px] uppercase tracking-widest text-white/40 mb-4">direct</div>
        <ul class="flex flex-col gap-3">
          <li v-for="c in contacts" :key="c.label">
            <button
              data-magnetic
              class="brand-link w-full text-left border hairline p-5 hover:bg-white/[0.03] transition-colors group"
              :style="{ ['--brand' as any]: c.color }"
              @click="copy(c.value)"
            >
              <div class="font-mono text-[10px] uppercase tracking-widest" :style="{ color: c.color }">{{ c.label }}</div>
              <div class="flex items-center justify-between mt-1">
                <span class="font-display text-2xl md:text-3xl brand-text transition-colors">{{ c.value }}</span>
                <span class="font-mono text-[11px] uppercase tracking-widest text-white/40 group-hover:text-white">
                  {{ copied === c.value ? '✓ copied' : 'copy' }}
                </span>
              </div>
            </button>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
