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
  <section class="h-full w-full px-6 md:px-16 max-w-7xl mx-auto flex flex-col justify-center">
    <SectionHeader index="05 · contact" title="Find me." sub="Six platforms, three channels, one human." />

    <Marquee :items="socials.map((s) => s.label)" />

    <div class="grid lg:grid-cols-[1.15fr_0.85fr] gap-5 mt-8">
      <div class="reveal grid sm:grid-cols-2 gap-3">
        <a
          v-for="s in socials"
          :key="s.url"
          :href="s.url"
          target="_blank"
          rel="noreferrer"
          data-magnetic
          class="color-card group min-h-[118px] border p-4 flex flex-col justify-between transition duration-300 hover:-translate-y-1"
          :style="{ ['--accent' as any]: s.color, ['--brand' as any]: s.color }"
        >
          <div class="flex items-start justify-between gap-4">
            <div class="font-mono text-[10px] uppercase tracking-widest text-white/40">social</div>
            <div class="font-mono text-[10px] uppercase tracking-widest text-white/45 group-hover:text-white">open ↗</div>
          </div>
          <div>
            <div class="font-display text-2xl md:text-3xl leading-none color-glow" :style="{ ['--glow' as any]: s.color }">{{ s.label }}</div>
            <div class="mt-2 min-h-4 font-mono text-[11px] text-white/50 truncate">{{ s.handle || s.url.replace(/^https?:\/\//, '') }}</div>
          </div>
        </a>
      </div>

      <div class="reveal color-card border p-5 md:p-6" style="--accent: #41b883">
        <div class="flex items-start justify-between gap-4 mb-5">
          <div>
            <div class="font-mono text-[10px] uppercase tracking-widest text-white/40">direct</div>
            <h3 class="font-display text-3xl color-glow mt-1" style="--glow: #41b883">Contact info</h3>
          </div>
          <div class="font-mono text-[10px] uppercase tracking-widest text-white/40">{{ contacts.length }} ways</div>
        </div>

        <ul class="relative flex flex-col gap-3">
          <li v-for="c in contacts" :key="c.label">
            <button
              data-magnetic
              class="group w-full text-left border hairline bg-black/20 px-4 py-4 transition hover:bg-white/[0.06]"
              :style="{ ['--brand' as any]: c.color }"
              @click="copy(c.value)"
            >
              <div class="flex items-center justify-between gap-4">
                <span class="font-mono text-[10px] uppercase tracking-widest" :style="{ color: c.color }">{{ c.label }}</span>
                <span class="font-mono text-[10px] uppercase tracking-widest text-white/40 group-hover:text-white">
                  {{ copied === c.value ? 'copied' : 'copy' }}
                </span>
              </div>
              <div
                class="mt-2 break-all font-display text-xl md:text-2xl leading-tight color-glow"
                :style="{ ['--glow' as any]: c.color }"
              >
                {{ c.value }}
              </div>
            </button>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
