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
    Object3D,
    PerspectiveCamera,
    Scene,
    WebGLRenderer
  } from 'three'

  @Component
  export default class World extends Vue {
    private world: {
      particles?: Particle[] | []
    } = { particles: [] }

    private particles: number = 70
    private speed: number = 8
    private time: number = 1

    mounted() {
      renderer.create()

      camera.create()

      scene.create()
      scene.addProperty('fog', new Fog(0x000d25, 0.05, 1.6))

      light.create()

      scene.add3DObject(light.get())

      visualizer.createMesh()
      scene.add3DObject(visualizer.getTube())

      windowService.handleEvents()
      this.addParticles()
      this.animate()
    }

    private animate(time?: number) {
      if (time) this.time = time

      visualizer.update(time ? time : this.time)

      for (var i = 0; i < this.world.particles.length; i++) {
        this.world.particles[i].update(this.speed, visualizer.getCurves())
      }
      console.log(this.time)
      renderer.render(scene.get(), camera.get())
      window.requestAnimationFrame(this.animate.bind(this))
    }

    private addParticles(): void {
      this.world.particles = []
      for (var i = 0; i < this.particles; i++) {
        var particles = new Particle(false, this.time)
        this.world.particles.push(particles)
        scene.add3DObject(particles.getMaterial())
      }
      console.log(this.world.particles)
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
