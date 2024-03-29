import { loadFonts } from "./webfontloader"
import vuetify from "./vuetify"
import { createPinia } from "pinia"

const pinia = createPinia()

export function registerPlugins(app) {
  loadFonts()
  app.use(vuetify)
  app.use(pinia)
}
