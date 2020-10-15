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

    mounted() {
      this.engine = new Engine()
      this.engine.start()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
