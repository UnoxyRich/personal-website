<script setup lang="ts">
import SectionHeader from '../components/SectionHeader.vue'
</script>

<template>
  <section class="h-full w-full px-6 md:px-16 max-w-7xl mx-auto flex flex-col justify-center">
    <SectionHeader index="01 / about" title="About." sub="A quick read on what I make and what I like." />

    <div class="grid md:grid-cols-12 gap-6 reveal">
      <p class="md:col-span-8 font-display text-xl md:text-3xl leading-snug">
        Hi, I'm UnoxyRich. I like turning rough ideas into things people can actually use.
        <span class="italic">
          I make clean web pages, practical tools, edits, and quick experiments that feel good instead of just looking flashy.
        </span>
        Most of my work starts fast, changes a lot, and gets better by being tried for real.
      </p>

      <div class="md:col-span-4 flex flex-col gap-3 font-mono text-[11px] uppercase tracking-widest text-white/60">
        <div class="border hairline p-3">
          <div class="text-white/40">me</div>
          <div class="text-white text-xs normal-case tracking-normal mt-1">Vibe coder / web designer / video editor</div>
        </div>
        <div class="border hairline p-3">
          <div class="text-white/40">style</div>
          <div class="text-white text-xs normal-case tracking-normal mt-1">Fast prototypes, simple interfaces, useful output</div>
        </div>
        <div class="border hairline p-3">
          <div class="text-white/40">currently</div>
          <div class="text-white text-xs normal-case tracking-normal mt-1">Watching Classroom of the Elite / playing Black Souls</div>
        </div>
        <div class="border hairline p-3">
          <div class="text-white/40">soundtrack</div>
          <div class="text-white text-xs normal-case tracking-normal mt-1">Vocaloid and phonk while building or editing</div>
        </div>
      </div>
    </div>
  </section>
</template>
