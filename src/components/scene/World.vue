<template>
  <div id="content">
    <label for="thefile" class="file">
      <input type="file" id="thefile" accept="audio/*" />
    </label>

    <audio id="audio" controls></audio>
    <div id="out"></div>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'

  @Component
  export default class HelloWorld extends Vue {
    @Prop() private msg!: string
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
