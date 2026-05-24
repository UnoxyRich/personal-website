<script setup lang="ts">
defineProps<{ items: string[] }>()
</script>

<template>
  <div class="overflow-hidden border-y hairline py-6">
    <div class="marquee-track gap-12 px-6 font-display text-5xl md:text-7xl whitespace-nowrap">
      <span v-for="(t, i) in [...items, ...items]" :key="i" class="flex items-center gap-12">
        <span>{{ t }}</span>
        <span class="opacity-30">✦</span>
      </span>
    </div>
  </div>
</template>
