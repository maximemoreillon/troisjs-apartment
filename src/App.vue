<template>
  <v-app>
    <v-main>
      <LoginDialog :visible="!store.connected" />

      <template v-if="store.connected">
        <v-dialog :model-value="!modelLoaded" max-width="30rem" persistent>
          <v-card class="py-10 px-4">
            <v-row justify="center">
              <v-col cols="auto"> Loading model... </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-progress-linear :model-value="modelLoadingProgress" />
              </v-col>
            </v-row>
          </v-card>
        </v-dialog>
        <Renderer
          ref="renderer"
          antialias
          shadow
          :orbit-ctrl="{ enableDamping: false }"
          resize="true"
        >
          <Camera :position="{ x: 5, y: 9, z: 5 }" />
          <Scene background="#444444">
            <AmbientLight color="#ffffff" :intensity="0.2" />

            <GltfModel
              src="assets/model/model.glb"
              @load="onModelLoaded"
              @progress="onModelProgress"
            />

            <template v-if="modelLoaded">
              <CeilingLight
                v-for="(device, index) in devices"
                :device="device"
                :key="index"
              />
            </template>
          </Scene>
        </Renderer>
      </template>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { client as mqttClient } from "@/mqtt"
import CeilingLight from "./components/CeilingLight.vue"
import LoginDialog from "./components/LoginDialog.vue"
import { useMqttStore } from "@/stores/mqtt"
import * as YAML from "yaml"

const store = useMqttStore()
const devices = ref([])
const modelLoaded = ref(false)
const modelLoadingProgress = ref(0)

onMounted(async () => {
  const response = await fetch("assets/config/config.yml")
  const data = await response.text()
  devices.value = YAML.parse(data)
})

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
  modelLoaded.value = true
}

const onModelProgress = ({ loaded, total }) => {
  modelLoadingProgress.value = (100 * loaded) / total
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
