<template>
  <div id="content">
    <canvas id="scene"></canvas>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import {
    audioAnalyser,
    Visualizer,
    Particle,
    renderer,
    camera,
    scene,
    light
  } from '@/services'
  import { set } from 'vue/types/umd'
  import {
    AudioAnalyser,
    Fog,
    HemisphereLight,
    PerspectiveCamera,
    Scene,
    WebGLRenderer
  } from 'three'

  @Component
  export default class World extends Vue {
    private world!: {
      visualizer: Visualizer
      particles?: Particle[]
    }
    private light!: HemisphereLight
    private speed: number = 1

    mounted() {
      renderer.create()

      camera.create()

      scene.create()
      scene.addProperty('fog', new Fog(0x000d25, 0.05, 1.6))

      light.create()
      setTimeout(() => {
        scene.add3DObject(this.light)
      }, 0)

      this.world = {
        visualizer: new Visualizer(scene.get(), camera.get())
      }
      this.world.visualizer.handleEvents()
      this.addParticles()

      this.animate()
    }

    private animate() {
      this.world.visualizer.render()

      if (this.world.particles) {
        for (var i = 0; i < this.world.particles.length; i++) {
          this.world.particles[i].update(
            this.speed,
            this.world.visualizer.getSettings().curves
          )
          if (
            this.world.particles[i].burst &&
            this.world.particles[i].percent > 1
          ) {
            this.world.particles.splice(i, 1)
            i--
          }
        }
      }

      renderer.render(scene.get(), camera.get())
      window.requestAnimationFrame(this.animate.bind(this))
    }

    private addParticles() {
      this.world.particles = []
      for (var i = 0; i < 70; i++) {
        const settings = this.world.visualizer.getSettings()
        this.world.particles.push(
          new Particle(scene.get(), false, settings.time)
        )
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
