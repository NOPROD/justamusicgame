import {
  AnimationClip,
  AnimationMixer,
  Clock,
  DoubleSide,
  Mesh,
  MeshPhongMaterial,
  PerspectiveCamera,
  RepeatWrapping,
  Scene,
  SphereGeometry,
  SpotLight,
  Texture,
  TextureLoader,
  WebGLRenderer
} from 'three'

import { camera, assetManager } from '.'

import TextureBlue from './../assets/background/space/Nebula_Blue.png'
import TextureRed from './../assets/background/space/Nebula_Red.png'
import TexturePink from './../assets/background/space/Nebula_Aqua_Pink.png'
import { getTicks } from './ClockUtils'

class Space {
  private texture: { blue?: Texture; red?: Texture; pink?: Texture } = {}
  private geo!: SphereGeometry
  private material!: MeshPhongMaterial

  private backSphere!: Mesh

  private camera!: PerspectiveCamera
  private clock!: Clock
  private time: number = 1

  private scene!: Scene

  private renderer!: WebGLRenderer
  private fps: number = 60

  private models3D!: any

  private mixers: AnimationMixer[] | [] = []

  public async initSpace() {
    this.clock = new Clock()

    this.scene = new Scene()
    this.camera = camera.create2()
    this.renderer = new WebGLRenderer({
      antialias: false,
      canvas: document.querySelector('#scene') as HTMLCanvasElement
    })
    this.renderer.setSize(window.innerWidth, window.innerHeight)

    this.loadTextures()

    await this.loadModels()

    this.geo = new SphereGeometry(20, 20, 20)
    this.material = new MeshPhongMaterial()
    this.material.map = this.texture.blue

    this.backSphere = new Mesh(this.geo, this.material)

    this.backSphereUpdateMaterialOptions()

    this.camera.position.x = 0
    this.camera.position.y = 0
    this.camera.position.z = -15
    this.camera.lookAt(this.scene.position)

    //create two spotlights to illuminate the scene
    const spotLight = new SpotLight(0x5192e9)
    spotLight.position.set(-40, 60, -10)
    spotLight.intensity = 1.5

    const spotLight2 = new SpotLight(0xffffff)
    spotLight2.position.set(40, -60, 30)
    spotLight2.intensity = 1.5

    this.scene.add(spotLight)

    this.scene.add(spotLight2)

    this.scene.add(this.backSphere)
    this.scene.add(this.camera)

    // Add all models
    Object.values(this.models3D).forEach((model: any) => {
      this.scene.add(model.scene)

      const mixer = new AnimationMixer(model.scene)
      const firstClip = Object.values(model.animations)[0]
      const action = mixer.clipAction(firstClip as AnimationClip)
      action.play()
      this.mixers.push(mixer as never)
    })

    this.render()
  }

  private changeTexture(texture: 'pink' | 'red' | 'blue'): void {
    this.backSphere.material.map = this.texture[texture]
    this.backSphereUpdateMaterialOptions()
  }

  private render(time?: number) {
    if (time) this.time = time

    const ticks = getTicks(this.clock, this.fps)
    for (let i = 0; i < ticks; i++) {
      for (const mixer of this.mixers) {
        mixer.update(0.1)
      }

      this.renderer.render(this.scene, this.camera)
    }
    window.requestAnimationFrame(this.render.bind(this))
  }

  private backSphereUpdateMaterialOptions(): void {
    this.backSphere.material.side = DoubleSide
    this.backSphere.material.map.wrapS = RepeatWrapping
    this.backSphere.material.map.wrapT = RepeatWrapping
    this.backSphere.material.map.repeat.set(5, 3)
    this.backSphere.material.needsUpdate = true
  }

  private async loadModels(): Promise<any> {
    this.models3D = await assetManager.load3DModels()

    var _modelsHolder = {}
    this.models3D.forEach(model => {
      _modelsHolder[Object.keys(model)[0]] = model[Object.keys(model)[0]]
    })
    this.models3D = _modelsHolder
    this.models3D = assetManager.set3DAnimation(this.models3D)
    console.log(this.models3D)
  }

  private loadTextures(): void {
    this.texture.blue = new TextureLoader().load(TextureBlue)
    this.texture.red = new TextureLoader().load(TextureRed)
    this.texture.pink = new TextureLoader().load(TexturePink)
  }
}

export const space = new Space()
