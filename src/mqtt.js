import * as MQTT from "paho-mqtt"

const { VITE_MQTT_HOST, VITE_MQTT_PORT } = import.meta.env

export const client = new MQTT.Client(
  VITE_MQTT_HOST,
  Number(VITE_MQTT_PORT),
  "/",
  "paho"
)
