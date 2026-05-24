<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import * as THREE from 'three'

const taglines = ['Builder.', 'Creator.', 'Player.', 'Tinkerer.', 'Dreamer.']
const taglineIdx = ref(0)
const typed = ref('')
let interval: number | undefined
let charTimer: number | undefined

function typeLoop() {
  const target = taglines[taglineIdx.value]
  let i = 0
  typed.value = ''
  const step = () => {
    if (i <= target.length) {
      typed.value = target.slice(0, i)
      i++
      charTimer = window.setTimeout(step, 70)
    }
  }
  step()
}

const canvasRef = ref<HTMLCanvasElement | null>(null)
let raf = 0
let cleanup: (() => void) | null = null

function initThree() {
  const canvas = canvasRef.value
  if (!canvas) return
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setClearColor(0x000000, 1)

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100)
  camera.position.set(0, 0, 5)

  const geo = new THREE.IcosahedronGeometry(1.6, 1)
  const mat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: 1,
    roughness: 0.18,
    flatShading: true,
  })
  const mesh = new THREE.Mesh(geo, mat)
  scene.add(mesh)

  const wire = new THREE.LineSegments(
    new THREE.EdgesGeometry(geo),
    new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.25 }),
  )
  mesh.add(wire)

  scene.add(new THREE.AmbientLight(0xffffff, 0.25))
  const d1 = new THREE.DirectionalLight(0xffffff, 1.5); d1.position.set(5, 5, 5); scene.add(d1)
  const d2 = new THREE.DirectionalLight(0xffffff, 0.7); d2.position.set(-5, -3, -2); scene.add(d2)
  const p1 = new THREE.PointLight(0xffffff, 0.6); p1.position.set(0, 0, 3); scene.add(p1)

  // Particles around the mesh
  const pCount = 200
  const pGeo = new THREE.BufferGeometry()
  const positions = new Float32Array(pCount * 3)
  for (let i = 0; i < pCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 12
    positions[i * 3 + 1] = (Math.random() - 0.5) * 8
    positions[i * 3 + 2] = (Math.random() - 0.5) * 6 - 1
  }
  pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  const points = new THREE.Points(pGeo, new THREE.PointsMaterial({ color: 0xffffff, size: 0.015, transparent: true, opacity: 0.7 }))
  scene.add(points)

  let mx = 0, my = 0
  const onMove = (e: MouseEvent) => {
    mx = (e.clientX / window.innerWidth - 0.5) * 0.8
    my = (e.clientY / window.innerHeight - 0.5) * 0.8
  }
  window.addEventListener('mousemove', onMove)

  const resize = () => {
    const w = canvas.clientWidth, h = canvas.clientHeight
    renderer.setSize(w, h, false)
    camera.aspect = w / h
    camera.updateProjectionMatrix()
  }
  const ro = new ResizeObserver(resize)
  ro.observe(canvas)
  resize()

  const tick = () => {
    mesh.rotation.x += 0.003
    mesh.rotation.y += 0.005
    mesh.position.x += (mx - mesh.position.x) * 0.04
    mesh.position.y += (-my - mesh.position.y) * 0.04
    points.rotation.y += 0.0008
    renderer.render(scene, camera)
    raf = requestAnimationFrame(tick)
  }
  raf = requestAnimationFrame(tick)

  cleanup = () => {
    cancelAnimationFrame(raf)
    ro.disconnect()
    window.removeEventListener('mousemove', onMove)
    geo.dispose(); mat.dispose(); pGeo.dispose(); renderer.dispose()
  }
}

onMounted(() => {
  typeLoop()
  interval = window.setInterval(() => {
    taglineIdx.value = (taglineIdx.value + 1) % taglines.length
    typeLoop()
  }, 2800)
  try { initThree() } catch (e) { console.error('three init failed', e) }
})

onBeforeUnmount(() => {
  clearInterval(interval)
  clearTimeout(charTimer)
  cleanup?.()
})
</script>

<template>
  <section id="hero" class="relative h-screen w-full overflow-hidden bg-black">
    <canvas ref="canvasRef" class="absolute inset-0 w-full h-full block" />

    <!-- Vignette -->
    <div class="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black pointer-events-none" />

    <!-- HUD -->
    <div class="absolute inset-0 flex flex-col justify-between p-6 md:p-10 pointer-events-none">
      <div class="flex justify-between font-mono text-[11px] uppercase tracking-widest text-white/60">
        <span>UnoxyRich · personal · v1.0</span>
        <span class="hidden md:block">{{ new Date().getFullYear() }} — somewhere on earth</span>
      </div>

      <div class="pointer-events-auto max-w-4xl">
        <div class="font-mono text-xs uppercase tracking-[0.3em] text-white/50 mb-4">Hello — I'm</div>
        <h1 class="font-display text-[18vw] md:text-[12vw] leading-[1.05] tracking-normal">
          Unoxy<span class="italic">Rich</span>
        </h1>
        <div class="mt-6 font-mono text-base md:text-2xl text-white/80">
          <span class="opacity-60">$ ./identify →</span> <span>{{ typed }}</span><span class="animate-pulse">_</span>
        </div>
      </div>

      <div class="flex justify-between items-end font-mono text-[11px] uppercase tracking-widest text-white/60">
        <span>scroll ↓ to enter</span>
        <span class="hidden md:block">made with vue · three · obsession</span>
      </div>
    </div>
  </section>
</template>
