import {
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

import { camera } from '.'

import TextureBlue from './../assets/background/space/Nebula_Blue.png'
import TextureRed from './../assets/background/space/Nebula_Red.png'
import TexturePink from './../assets/background/space/Nebula_Aqua_Pink.png'

class Space {
  private texture: { blue?: Texture; red?: Texture; pink?: Texture } = {}
  private geo!: SphereGeometry
  private material!: MeshPhongMaterial

  private backSphere!: Mesh

  private camera!: PerspectiveCamera

  private scene!: Scene

  private renderer!: WebGLRenderer

  public initSpace() {
    this.scene = new Scene()
    this.camera = camera.create2()
    this.renderer = new WebGLRenderer({
      antialias: false,
      canvas: document.querySelector('#scene') as HTMLCanvasElement
    })
    this.renderer.setSize(window.innerWidth, window.innerHeight)

    this.texture.blue = new TextureLoader().load(TextureBlue)
    this.texture.red = new TextureLoader().load(TextureRed)
    this.texture.pink = new TextureLoader().load(TexturePink)
    this.geo = new SphereGeometry(20, 20, 20)
    this.material = new MeshPhongMaterial()
    this.material.map = this.texture.blue

    this.backSphere = new Mesh(this.geo, this.material)
    this.backSphere.material.side = DoubleSide
    this.backSphere.material.map.wrapS = RepeatWrapping
    this.backSphere.material.map.wrapT = RepeatWrapping
    this.backSphere.material.map.repeat.set(5, 3)

    this.camera.position.x = 0
    this.camera.position.y = 0
    this.camera.position.z = -15
    this.camera.lookAt(this.scene.position)

    //create two spotlights to illuminate the scene
    const spotLight = new SpotLight(0x5192e9)
    spotLight.position.set(-40, 60, -10)
    spotLight.intensity = 1.5
    this.scene.add(spotLight)

    const spotLight2 = new SpotLight(0xffffff)
    spotLight2.position.set(40, -60, 30)
    spotLight2.intensity = 1.5
    this.scene.add(spotLight2)

    this.scene.add(this.backSphere)
    this.scene.add(this.camera)
    this.render()

    setTimeout(() => {
      this.changeTexture('red')
    }, 3000)
  }

  private changeTexture(texture: 'pink' | 'red' | 'blue'): void {
    this.backSphere.material.map = this.texture[texture]
    this.backSphere.material.side = DoubleSide
    this.backSphere.material.map.wrapS = RepeatWrapping
    this.backSphere.material.map.wrapT = RepeatWrapping
    this.backSphere.material.map.repeat.set(5, 3)
    this.backSphere.material.needsUpdate = true
  }

  private render() {
    window.requestAnimationFrame(this.render.bind(this))
    this.renderer.render(this.scene, this.camera)
  }
}

export const space = new Space()
