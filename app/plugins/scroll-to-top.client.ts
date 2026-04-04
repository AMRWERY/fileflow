export default defineNuxtPlugin((nuxtApp) => {
  // page:transition:finish fires after the full out-in transition lifecycle
  // (leave + enter animations), preventing the race condition where the
  // entering animation re-anchors scroll after page:finish fires.
  nuxtApp.hook("page:transition:finish", () => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" })
  })
})