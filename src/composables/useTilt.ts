import type { Directive } from 'vue'

export const vTilt: Directive<HTMLElement> = {
  mounted(el) {
    const max = 10
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect()
      const x = (e.clientX - r.left) / r.width - 0.5
      const y = (e.clientY - r.top) / r.height - 0.5
      el.style.transform = `rotateY(${x * max}deg) rotateX(${-y * max}deg) translateZ(0)`
    }
    const onLeave = () => { el.style.transform = 'rotateY(0) rotateX(0)' }
    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    ;(el as any)._tilt = { onMove, onLeave }
  },
  unmounted(el) {
    const t = (el as any)._tilt
    if (t) {
      el.removeEventListener('mousemove', t.onMove)
      el.removeEventListener('mouseleave', t.onLeave)
    }
  },
}
