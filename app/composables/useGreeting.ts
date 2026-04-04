import type { GreetingConfig } from '../types/greeting'

const GREETINGS: GreetingConfig[] = [
  { label: 'Good morning',   icon: '🌤️', range: [5,  12] },
  { label: 'Good afternoon', icon: '☀️',  range: [12, 17] },
  { label: 'Good evening',   icon: '🌇', range: [17, 21] },
  { label: 'Good night',     icon: '🌙', range: [21, 24] },
  // midnight → early morning
  { label: 'Good night',     icon: '🌙', range: [0,   5] },
]

function getGreetingConfig(hour: number): GreetingConfig {
  return GREETINGS.find(({ range }) => hour >= range[0] && hour < range[1])!
}

function pad(n: number) {
  return String(n).padStart(2, '0')
}

export function useGreeting() {
  const now = ref(new Date())
  let timer: ReturnType<typeof setInterval>

  onMounted(() => {
    // tick every second for live clock
    timer = setInterval(() => { now.value = new Date() }, 1000)
  })

  onUnmounted(() => clearInterval(timer))

  const greeting = computed(() => {
    const h = now.value.getHours()
    return getGreetingConfig(h)
  })

  // "3:42 PM" or "15:42" depending on locale
  const timeString = computed(() => {
    const h = now.value.getHours()
    const m = now.value.getMinutes()
    const s = now.value.getSeconds()
    const isPM = h >= 12
    const h12 = h % 12 || 12
    return `${pad(h12)}:${pad(m)}:${pad(s)} ${isPM ? 'PM' : 'AM'}`
  })

  // "Friday, April 3, 2026"
  const dateString = computed(() =>
    now.value.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  )

  return {
    greeting,   // { label, icon }
    timeString, // "03:42:07 PM"
    dateString, // "Friday, April 3, 2026"
    now,
  }
}
