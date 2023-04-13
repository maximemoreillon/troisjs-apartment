import { defineStore } from "pinia"
import { ref } from "vue"

export const useMqttStore = defineStore("mqtt", () => {
  const connected = ref(false)

  return { connected }
})
