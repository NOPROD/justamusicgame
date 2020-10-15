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
    light,
    windowService,
    visualizer
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
    private speed: number = 1

    mounted() {
      renderer.create()

      camera.create()

      scene.create()
      scene.addProperty('fog', new Fog(0x000d25, 0.05, 1.6))

      light.create()

      scene.add3DObject(light.get())

      visualizer.render()
      var tube = visualizer.createMesh()
      scene.add3DObject(tube)

      windowService.handleEvents()

      this.animate()
    }

    private animate() {
      visualizer.update()

      // if (this.world.particles) {
      //   for (var i = 0; i < this.world.particles.length; i++) {
      //     this.world.particles[i].update(
      //       this.speed,
      //       this.world.visualizer.get
      //     )
      //     if (
      //       this.world.particles[i].burst &&
      //       this.world.particles[i].percent > 1
      //     ) {
      //       this.world.particles.splice(i, 1)
      //       i--
      //     }
      //   }
      // }

      renderer.render(scene.get(), camera.get())
      window.requestAnimationFrame(this.animate.bind(this))
    }

    // private addParticles() {
    //   this.world.particles = []
    //   for (var i = 0; i < 70; i++) {
    //     this.world.particles.push(
    //       new Particle(scene.get(), false, visualizer.getTime())
    //     )
    //   }
    // }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
