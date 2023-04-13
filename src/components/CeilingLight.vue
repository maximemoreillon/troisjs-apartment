<template>
  <Sphere
    ref="box"
    :position="{ ...device.position }"
    :scale="{ x: 0.08, y: 0.08, z: 0.08 }"
    @click="toggle()"
  >
    <BasicMaterial :color="on ? '#ffea00' : '#5c5400'" />
  </Sphere>
  <PointLight
    :position="device.position"
    cast-shadow
    ref="light"
    :intensity="on ? 1 : 0"
  />
</template>

<script>
import * as MQTT from "paho-mqtt"
import { client as mqttClient } from "@/mqtt"

export default {
  props: {
    device: Object,
  },
  data() {
    return {}
  },

  methods: {
    toggle() {
      const message = new MQTT.Message(JSON.stringify({ state: "toggle" }))
      message.destinationName = `${this.device.topic}/command`
      mqttClient.send(message)
    },
  },
  mounted() {
    const { light } = this.$refs.light
    light.shadow.bias = -0.0001
  },
  computed: {
    on() {
      return this.device.state === "on"
    },
  },
}
</script>
