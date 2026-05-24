<script setup lang="ts">
defineProps<{ index: string; title: string; sub?: string }>()
</script>

<template>
  <header class="reveal flex items-end justify-between gap-6 border-b hairline pb-3 mb-6">
    <div>
      <div class="font-mono text-[10px] uppercase tracking-widest text-white/50">{{ index }}</div>
      <h2 class="font-display text-3xl md:text-5xl leading-[1.1] mt-1 text-white">{{ title }}</h2>
    </div>
    <p v-if="sub" class="font-mono text-[10px] uppercase tracking-widest text-white/40 max-w-xs text-right">{{ sub }}</p>
  </header>
</template>
