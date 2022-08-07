<template>
  <Renderer ref="renderer" shadow :orbit-ctrl="{ enableDamping: false }" resize="window">
    <Camera :position="{ x: 2, y: 3, z: 2}" />
    <Scene background="#444444">
      <AmbientLight color="#ffffff" :intensity="0.2" />
      <!-- Living -->
      <CeilingLight :position="{ x: 0.8, y: ceilingHeight, z: 0.6 }" />
      <!-- Kitchen -->
      <CeilingLight :position="{ x: -0.6, y: ceilingHeight, z: 0.9 }" />
      <!-- bedroom -->
      <CeilingLight :position="{ x: 0.6, y: ceilingHeight, z: -1.3 }" />

      <GltfModel src="assets/apartment.gltf" @load="onReady" />
    </Scene>
  </Renderer>
</template>

<script>
import CeilingLight from './components/CeilingLight.vue';
export default {
  components: {
    CeilingLight
  },
  data(){
    return {
      ceilingHeight: 0.4
    }
  },
  methods: {
    onReady(model) {
      model.scene.traverse(object => {
        if (object.isMesh) {
          const asArray = Array.isArray(object.material) ? object.material : [object.material]
          asArray.forEach(mat => mat.metalness = 0)
          object.castShadow = true;
          object.receiveShadow = true;
        }
      })

    },
    onProgress() {
      console.log('Progress')
    }
  }
};
</script>

<style>
body {
  margin: 0;
}

canvas {
  display: block;
}
</style>