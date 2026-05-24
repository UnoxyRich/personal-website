<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

const dot = ref<HTMLElement | null>(null)
const ring = ref<HTMLElement | null>(null)

let mx = 0, my = 0
let rx = 0, ry = 0
let raf = 0

function loop() {
  rx += (mx - rx) * 0.18
  ry += (my - ry) * 0.18
  if (dot.value) dot.value.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`
  if (ring.value) ring.value.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`
  raf = requestAnimationFrame(loop)
}

function onMove(e: MouseEvent) {
  mx = e.clientX; my = e.clientY
}

function onOver(e: MouseEvent) {
  const t = e.target as HTMLElement
  const interactive = t.closest('a, button, [data-magnetic], input, textarea, .pill, .tilt')
  dot.value?.classList.toggle('hovering', !!interactive)
  ring.value?.classList.toggle('hovering', !!interactive)
}

onMounted(() => {
  window.addEventListener('mousemove', onMove)
  window.addEventListener('mouseover', onOver)
  raf = requestAnimationFrame(loop)
})
onBeforeUnmount(() => {
  window.removeEventListener('mousemove', onMove)
  window.removeEventListener('mouseover', onOver)
  cancelAnimationFrame(raf)
})
</script>

<template>
  <div ref="ring" class="cursor-ring" />
  <div ref="dot" class="cursor-dot" />
</template>
