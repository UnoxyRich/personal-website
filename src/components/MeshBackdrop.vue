<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import * as THREE from 'three'

const props = defineProps<{ activeIndex: number }>()

const canvasRef = ref<HTMLCanvasElement | null>(null)
let raf = 0
let cleanup: (() => void) | null = null

function initThree() {
  const canvas = canvasRef.value
  if (!canvas) return

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setClearColor(0x000000, 0)

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100)
  camera.position.set(0, 0, 5)

  const group = new THREE.Group()
  scene.add(group)

  const geo = new THREE.IcosahedronGeometry(1.6, 1)
  const mat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: 1,
    roughness: 0.18,
    flatShading: true,
    transparent: true,
    opacity: 1,
  })
  const mesh = new THREE.Mesh(geo, mat)
  group.add(mesh)

  const wireMat = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.25 })
  const wire = new THREE.LineSegments(new THREE.EdgesGeometry(geo), wireMat)
  mesh.add(wire)

  scene.add(new THREE.AmbientLight(0xffffff, 0.25))
  const d1 = new THREE.DirectionalLight(0xffffff, 1.5)
  d1.position.set(5, 5, 5)
  scene.add(d1)
  const d2 = new THREE.DirectionalLight(0xffffff, 0.7)
  d2.position.set(-5, -3, -2)
  scene.add(d2)
  const p1 = new THREE.PointLight(0xffffff, 0.6)
  p1.position.set(0, 0, 3)
  scene.add(p1)

  const pCount = 200
  const pGeo = new THREE.BufferGeometry()
  const positions = new Float32Array(pCount * 3)
  for (let i = 0; i < pCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 12
    positions[i * 3 + 1] = (Math.random() - 0.5) * 8
    positions[i * 3 + 2] = (Math.random() - 0.5) * 6 - 1
  }
  pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  const pointsMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.015, transparent: true, opacity: 0.7 })
  const points = new THREE.Points(pGeo, pointsMat)
  scene.add(points)

  let mx = 0
  let my = 0
  let spinBoost = 0
  const state = { x: 0, y: 0, scale: 1, opacity: 1 }

  const onMove = (e: MouseEvent) => {
    mx = (e.clientX / window.innerWidth - 0.5) * 0.8
    my = (e.clientY / window.innerHeight - 0.5) * 0.8
  }
  const onBoost = () => {
    spinBoost = Math.min(spinBoost + 0.035, 0.11)
  }
  window.addEventListener('mousemove', onMove)
  window.addEventListener('mesh-scroll-boost', onBoost)

  const resize = () => {
    const w = canvas.clientWidth
    const h = canvas.clientHeight
    renderer.setSize(w, h, false)
    camera.aspect = w / h
    camera.updateProjectionMatrix()
  }
  const ro = new ResizeObserver(resize)
  ro.observe(canvas)
  resize()

  const tick = () => {
    const isHero = props.activeIndex === 0
    const target = isHero
      ? { x: mx, y: -my, scale: 1, opacity: 1 }
      : { x: -1.9 + mx * 0.18, y: 0.12 - my * 0.12, scale: 0.58, opacity: 0.24 }

    state.x += (target.x - state.x) * 0.055
    state.y += (target.y - state.y) * 0.055
    state.scale += (target.scale - state.scale) * 0.055
    state.opacity += (target.opacity - state.opacity) * 0.055

    group.position.set(state.x, state.y, 0)
    group.scale.setScalar(state.scale)
    mat.opacity = state.opacity
    wireMat.opacity = state.opacity * 0.32
    pointsMat.opacity = state.opacity * 0.7

    const spin = 0.003 + spinBoost
    mesh.rotation.x += spin * 0.6
    mesh.rotation.y += spin
    points.rotation.y += 0.0008 + spinBoost * 0.18
    spinBoost *= 0.92

    renderer.render(scene, camera)
    raf = requestAnimationFrame(tick)
  }
  raf = requestAnimationFrame(tick)

  cleanup = () => {
    cancelAnimationFrame(raf)
    ro.disconnect()
    window.removeEventListener('mousemove', onMove)
    window.removeEventListener('mesh-scroll-boost', onBoost)
    geo.dispose()
    mat.dispose()
    wireMat.dispose()
    pGeo.dispose()
    pointsMat.dispose()
    renderer.dispose()
  }
}

onMounted(() => {
  try { initThree() } catch (e) { console.error('three init failed', e) }
})

onBeforeUnmount(() => {
  cleanup?.()
})
</script>

<template>
  <canvas ref="canvasRef" class="mesh-backdrop" aria-hidden="true" />
</template>

<style scoped>
.mesh-backdrop {
  position: fixed;
  inset: 0;
  z-index: 1;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
}
</style>
