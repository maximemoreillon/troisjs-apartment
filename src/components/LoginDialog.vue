<template>
  <v-dialog v-model="dialog" max-width="30rem" persistent>
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

<script setup>
import { ref } from "vue"
import { client as mqttClient } from "@/mqtt"

const username = ref("")
const password = ref("")
const loading = ref(false)
const dialog = ref(true)

const connect = () => {
  loading.value = true
  mqttClient.connect({
    onSuccess: onConnect,
    userName: username.value,
    password: password.value,
    useSSL: true,
    keepAliveInterval: 30,
    reconnect: true,
  })
}
const onConnect = () => {
  loading.value = false
  dialog.value = false
}
</script>
