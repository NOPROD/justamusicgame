<template>
  <div class="flex-col">
    <div class="card" v-for="song in songs" :key="song.title">
      <div class="card_picture"><img :src="song.cover" /></div>

      <div class="card_description">
        <div class="card_title">{{ song.title }}</div>
        <div class="card_author">{{ song.author }}</div>
      </div>
      <div class="card_action"><button>Play</button></div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import { songs } from '@/data/AudioFile'

  @Component
  export default class MainMenu extends Vue {
    public songs: any = songs
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
