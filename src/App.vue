<script setup lang="ts">
import { onBeforeUnmount, onMounted } from 'vue'
import Lenis from 'lenis'
import Cursor from './components/Cursor.vue'
import Nav from './components/Nav.vue'
import Hero from './sections/Hero.vue'
import About from './sections/About.vue'
import Projects from './sections/Projects.vue'
import Tools from './sections/Tools.vue'
import Games from './sections/Games.vue'
import Contact from './sections/Contact.vue'
import FooterSection from './sections/Footer.vue'
import { useReveal } from './composables/useReveal'

useReveal()

let lenis: Lenis | null = null
let raf = 0

onMounted(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (!reduce) {
    lenis = new Lenis({ duration: 1.1, smoothWheel: true })
    const loop = (t: number) => { lenis?.raf(t); raf = requestAnimationFrame(loop) }
    raf = requestAnimationFrame(loop)
  }
})

onBeforeUnmount(() => {
  cancelAnimationFrame(raf)
  lenis?.destroy()
})
</script>

<template>
  <div class="grain vignette min-h-screen">
    <Cursor />
    <Nav />
    <main>
      <Hero />
      <About />
      <Projects />
      <Tools />
      <Games />
      <Contact />
      <FooterSection />
    </main>
  </div>
</template>
