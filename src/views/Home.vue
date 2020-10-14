<template>
  <div class="home">
    <World />
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import World from '@/components/scene/World.vue'
  import { AudioAnalyser, Visualizer } from '@/services'
  import { mixin } from 'mixin.ts'
  @Component({
    components: {
      World
    }
  })
  export default class Home extends Vue {
    private world!: { background: Visualizer; audio: AudioAnalyser } = {
      background: new Visualizer(),
      audio: new AudioAnalyser()
    }

    mounted() {
      this.world.background.init()
    }
  }
</script>
