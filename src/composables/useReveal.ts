import { onMounted, onBeforeUnmount } from 'vue'

export function useReveal(selector = '.reveal') {
  let observer: IntersectionObserver | null = null
  onMounted(() => {
    observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('in')
            observer?.unobserve(e.target)
          }
        }
      },
      { threshold: 0.15 },
    )
    document.querySelectorAll(selector).forEach((el) => observer!.observe(el))
  })
  onBeforeUnmount(() => observer?.disconnect())
}
