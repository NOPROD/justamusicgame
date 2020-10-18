<template>
  <div class="flex-col">
    <div class="card" v-for="model in all.modelsLicense" :key="model.title">
      <div class="card_description">
        <div class="card_title">{{ model.title }}</div>
        <div v-for="(creator, index) in model.creator" :key="index">
          <div class="card_author">{{ creator.title }}</div>
          <div class="card_author_link">{{ creator.link }}</div>
        </div>
      </div>
    </div>
    <div class="card" v-for="audio in all.audioLicense" :key="audio.title">
      <div class="card_picture"><img :src="audio.cover" /></div>

      <div class="card_description">
        <div class="card_title">{{ audio.title }}</div>
        <div v-for="(author, index) in audio.creator" :key="index">
          <div class="card_author">{{ author.title }}</div>
          <div class="card_author_link">{{ author.link }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import { modelsLicense, audioLicense } from '@/license'

  @Component
  export default class MainMenu extends Vue {
    public all = {
      modelsLicense,
      audioLicense
    }

    mounted() {
      console.log(this.all)
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
