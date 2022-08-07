<template>

    <Sphere ref="box" :position="{ ...position}" :scale="{ x: scale, y: scale, z: scale }" @click="toggle()">
        <BasicMaterial :color="on ? '#ffea00' : '#5c5400'" />
    </Sphere>
    <PointLight :position="position" cast-shadow ref="light" :intensity="intensity" />

</template>

<script>

export default {
    props: {
        position: Object,
    },
    data(){
        return {
            on: false,
            scale: 0.08,
            intensity: 0,
        }
    },
    methods: {
        toggle(){
            this.on = !this.on
            if (this.on) {
                this.smoothlyUpdate(1)
            }
            else {
                this.smoothlyUpdate(0)
            }
        },
        smoothlyUpdate(newVal){

            const step = 0.05

            const interval = setInterval( () => {
                this.intensity += step * Math.sign(newVal - this.intensity)
                console.log(this.intensity)
                if (Math.abs(this.intensity - newVal) < 2 * step) {
                    this.intensity = newVal
                    clearInterval(interval)
                }
            }, 10)
        }
    },
    mounted(){
        const {light} = this.$refs.light
        light.shadow.bias = -0.0001
        
    },

}

</script>