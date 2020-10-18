<template>
  <div class="home"><MainMenu /><License /></div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import MainMenu from '@/components/MainMenu.vue'
  import License from '@/components/License.vue'
  @Component({
    components: {
      MainMenu,
      License
    }
  })
  export default class Home extends Vue {}
</script>
