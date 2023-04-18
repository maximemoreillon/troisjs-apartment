import * as MQTT from "paho-mqtt"
import { v4 as uuidv4 } from "uuid"
const { VITE_MQTT_HOST, VITE_MQTT_PORT } = import.meta.env

export const client = new MQTT.Client(
  VITE_MQTT_HOST,
  Number(VITE_MQTT_PORT),
  "/",
  uuidv4()
)
