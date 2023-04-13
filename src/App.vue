<template>
  <v-app>
    <v-main>
      <LoginDialog @mqttConnected="mqttSubscribe()" />
      <Renderer
        ref="renderer"
        antialias
        shadow
        :orbit-ctrl="{ enableDamping: false }"
        resize="true"
      >
        <Camera :position="{ x: 2, y: 3, z: 2 }" />
        <Scene background="#444444">
          <AmbientLight color="#ffffff" :intensity="0.2" />

          <CeilingLight
            v-for="(device, index) in devices"
            :device="device"
            :key="index"
          />

          <GltfModel src="assets/apartment.gltf" @load="onReady" />
        </Scene>
      </Renderer>
    </v-main>
  </v-app>
</template>

<script>
import { client as mqttClient } from "@/mqtt"
import CeilingLight from "./components/CeilingLight.vue"
import LoginDialog from "./components/LoginDialog.vue"
import devices from "./devices"

export default {
  components: {
    CeilingLight,
    LoginDialog,
  },
  data() {
    return {
      devices,
    }
  },
  mounted() {
    mqttClient.onMessageArrived = (message) => {
      try {
        const { payloadString, topic } = message
        const foundDevice = this.devices.find(
          (device) => `${device.topic}/status` === topic
        )
        if (!foundDevice) return
        const { state } = JSON.parse(payloadString)
        foundDevice.state = state
      } catch (error) {
        console.warn(error)
      }
    }
  },
  methods: {
    onReady(model) {
      model.scene.traverse((object) => {
        if (object.isMesh) {
          const asArray = Array.isArray(object.material)
            ? object.material
            : [object.material]
          asArray.forEach((mat) => (mat.metalness = 0))
          object.castShadow = true
          object.receiveShadow = true
        }
      })
    },
    mqttSubscribe() {
      devices.forEach(({ topic }) => {
        mqttClient.subscribe(`${topic}/status`)
      })
    },
  },
}
</script>

<style>
body {
  margin: 0;
}

canvas {
  display: block;
}
</style>
