<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<template>
  <footer class="h-full w-full relative overflow-hidden px-6 md:px-16 flex flex-col justify-center">
    <div class="max-w-[1600px] mx-auto">
      <h2 class="font-display leading-[1.05] tracking-normal text-[24vw] md:text-[18vw]">
        Unoxy<span class="italic">Rich</span>
      </h2>
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mt-8 font-mono text-[11px] uppercase tracking-widest text-white/40">
        <span>© {{ year }} · all rights reserved · & none</span>
        <span>built with vue · three · gsap · obsession</span>
        <a href="#hero" data-magnetic class="hover:text-white">back to top ↑</a>
      </div>
    </div>
  </footer>
</template>
