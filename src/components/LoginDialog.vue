<template>
  <v-dialog v-model="dialog" max-width="30rem">
    <!-- <template v-slot:activator="{ props }">
      <v-btn color="primary" v-bind="props"> Open Dialog </v-btn>
    </template> -->

    <v-card>
      <v-card-text>
        <v-form class="text-center" @submit.prevent="connect()">
          <v-text-field
            prepend-icon="mdi-account"
            label="Username"
            v-model="username"
          />

          <v-text-field
            prepend-icon="mdi-lock"
            label="Password"
            type="Password"
            v-model="password"
          />

          <v-btn type="submit" :loading="loading" prepend-icon="mdi-login">
            Login
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { client as mqttClient } from "@/mqtt"
const { VITE_MQTT_HOST, VITE_MQTT_PORT } = import.meta.env
export default {
  data() {
    return {
      dialog: true,
      username: "",
      password: "",
      loading: false,
    }
  },
  methods: {
    connect() {
      this.loading = true
      mqttClient.connect({
        onSuccess: this.onConnect,
        userName: this.username,
        password: this.password,
        useSSL: true,
        keepAliveInterval: 30,
        reconnect: true,
        // reconnectInterval: 10,
      })
    },
    onConnect() {
      console.log("[MQTT] connected")
      this.loading = false
      this.dialog = false
      this.$emit("mqttConnected")
    },
  },
}
</script>
