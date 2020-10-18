<template>
  <div class="home">
    <World />
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import World from '@/components/scene/World.vue'
  @Component({
    components: {
      World
    }
  })
  export default class Game extends Vue {}
</script>
