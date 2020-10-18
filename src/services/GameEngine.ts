import { Clock, Fog } from 'three'
import {
  Particle,
  renderer,
  camera,
  scene,
  light,
  windowService,
  visualizer,
  audioAnalyser,
  getTicks
} from '.'

import { songs } from '@/data/AudioFile'

export class Engine {
  private world: {
    particles: Particle[] | []
  } = { particles: [] }

  private particles: number = 70
  private speed: number = 0.5
  private time: number = 1

  private clock!: Clock

  constructor(
    private fps: number,
    private songName = 'debug session',
    private userName = 'debug session'
  ) {}

  public start() {
    this.clock = new Clock()

    this.initScene()

    this.initUtils()

    this.addDynamicsElements()

    this.run()
  }

  private run(time?: number) {
    const ticks = getTicks(this.clock, this.fps)
    for (let i = 0; i < ticks; i++) {
      this.animate(time ? time : undefined)
    }
    requestAnimationFrame(this.run.bind(this))
  }

  private initScene(): void {
    renderer.create()

    camera.create()

    scene.create()
    scene.addProperty('fog', new Fog(0x000d25, 0.05, 1.6))

    light.create()

    scene.add3DObject(light.get())

    visualizer.createMesh()
    scene.add3DObject(visualizer.getTube())
  }

  private initUtils(): void {
    windowService.handleEvents()

    audioAnalyser.setAudio()
    audioAnalyser.loadAudio(songs.snails.file)
  }

  private addDynamicsElements() {
    this.addParticles()
  }

  private animate(time?: number) {
    if (time) this.time = time

    visualizer.update(time ? time : this.time)

    for (var i = 0; i < this.world.particles.length; i++) {
      this.world.particles[i].update(this.speed, visualizer.getCurves())
    }
    renderer.render(scene.get(), camera.get())
  }

  private addParticles(): void {
    this.world.particles = []
    for (var i = 0; i < this.particles; i++) {
      var particles = new Particle(false, this.time)
      this.world.particles.push(particles as never)
      scene.add3DObject(particles.getMaterial())
    }
    console.log(this)
  }
}
