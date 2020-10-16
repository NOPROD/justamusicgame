import { Fog } from 'three'
import {
  Particle,
  renderer,
  camera,
  scene,
  light,
  windowService,
  visualizer
} from './'

export class Engine {
  private world: {
    particles: Particle[] | []
  } = { particles: [] }

  private particles: number = 70
  private speed: number = 0.5
  private time: number = 1

  constructor(
    private songName = 'debug session',
    private userName = 'debug session'
  ) {}

  public start() {
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
    renderer.render(scene.get(), camera.get())
    window.requestAnimationFrame(this.animate.bind(this))
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
