<template>
  <div id="content">
    <canvas id="scene"></canvas>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { AudioAnalyser, Visualizer, Particle } from '@/services'
  import { set } from 'vue/types/umd'
  import {
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
      audio: AudioAnalyser
    }

    private scene!: Scene
    private light!: HemisphereLight
    private camera!: PerspectiveCamera
    private renderer!: WebGLRenderer
    private speed: number = 1

    private _window!: { ww: number; wh: number }

    mounted() {
      this._window = {
        ww: window.innerWidth,
        wh: window.innerHeight
      }

      this.renderer = new WebGLRenderer({
        antialias: false,
        canvas: document.querySelector('#scene') as HTMLCanvasElement
      })
      this.renderer.setSize(this._window.ww, this._window.wh)

      this.camera = new PerspectiveCamera(
        15,
        this._window.ww / this._window.wh,
        0.01,
        1000
      )
      this.camera.rotation.y = Math.PI
      this.camera.position.z = 0.35

      this.scene = new Scene()

      this.scene.fog = new Fog(0x000d25, 0.05, 1.6)

      this.light = new HemisphereLight(0xe9eff2, 0x01010f, 1)
      this.world = {
        visualizer: new Visualizer(this.scene, this.camera),
        audio: new AudioAnalyser()
      }
      this.world.visualizer.handleEvents()
      this.scene.add(this.light)
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
      this.renderer.render(this.scene, this.camera)
      window.requestAnimationFrame(this.animate.bind(this))
    }

    private addParticles() {
      this.world.particles = []
      for (var i = 0; i < 70; i++) {
        const settings = this.world.visualizer.getSettings()
        this.world.particles.push(
          new Particle(this.scene, false, settings.time)
        )
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
