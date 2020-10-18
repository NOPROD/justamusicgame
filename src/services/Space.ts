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

import test from './../assets/background/space/Nebula_Blue.png'

class Space {
  private texture!: Texture
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

    this.texture = new TextureLoader().load(test)
    this.geo = new SphereGeometry(20, 20, 20)
    this.material = new MeshPhongMaterial()
    this.material.map = this.texture

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
  }

  private render() {
    window.requestAnimationFrame(this.render.bind(this))
    this.renderer.render(this.scene, this.camera)
  }
}

export const space = new Space()
