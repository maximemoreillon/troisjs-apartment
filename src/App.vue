<template>
  <v-app>
    <v-main>
      <LoginDialog v-if="!store.connected" />
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

          <GltfModel src="assets/apartment.gltf" @load="onModelLoaded" />
        </Scene>
      </Renderer>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from "vue"
import { client as mqttClient } from "@/mqtt"
import CeilingLight from "./components/CeilingLight.vue"
import LoginDialog from "./components/LoginDialog.vue"
import deviceList from "./devices"
import { useMqttStore } from "@/stores/mqtt"

const store = useMqttStore()
const devices = ref(deviceList)

mqttClient.onConnected = () => {
  console.log("[MQTT] connected")
  store.connected = true
  mqttSubscribe()
}

mqttClient.onMessageArrived = (message) => {
  try {
    const { payloadString, topic } = message
    const foundDevice = devices.value.find(
      (device) => `${device.topic}/status` === topic
    )
    if (!foundDevice) return
    const { state } = JSON.parse(payloadString)
    foundDevice.state = state.toLowerCase()
  } catch (error) {
    console.warn(error)
  }
}

mqttClient.onConnectionLost = (responseObject) => {
  store.connected = false
  if (responseObject.errorCode !== 0) {
    console.error("[MQTT] Connection lost:" + responseObject.errorMessage)
  }
}

const onModelLoaded = (model) => {
  model.scene.traverse((object) => {
    // Shadows
    if (object.isMesh) {
      const asArray = Array.isArray(object.material)
        ? object.material
        : [object.material]
      asArray.forEach((mat) => (mat.metalness = 0))
      object.castShadow = true
      object.receiveShadow = true
    }
  })
}

const mqttSubscribe = () => {
  devices.value.forEach(({ topic }) => {
    mqttClient.subscribe(`${topic}/status`)
  })
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
