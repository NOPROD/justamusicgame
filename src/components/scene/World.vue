<template>
  <div id="content">
    <canvas id="scene"></canvas>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { Engine } from '@/services'

  @Component
  export default class World extends Vue {
    private engine!: Engine
    private fps: number = 60

    mounted() {
      this.waitForFirstInteraction()
    }

    private waitForFirstInteraction(): void {
      window.addEventListener(
        'click',
        () => {
          this.engine = new Engine(this.fps)
          this.engine.start()
        },
        { once: true }
      )
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
