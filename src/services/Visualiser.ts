import {
  Vector3,
  CatmullRomCurve3,
  TubeGeometry,
  MeshStandardMaterial,
  Mesh,
  BackSide,
  Scene,
  Vector2,
  WebGLRenderer,
  PerspectiveCamera,
  Geometry,
  Line,
  LineBasicMaterial,
  Fog,
  HemisphereLight
} from 'three'

import { TimelineMax, Power1, Power2 } from 'gsap'

import { AudioAnalyser } from './AudioAnalyser'

export default class Visualizer extends AudioAnalyser {
  private points!: Vector3[]
  private curves!: CatmullRomCurve3
  private tube!: Mesh

  private geometry!: Geometry
  private splineMesh!: any // Any cause of linter...

  private tubeMaterial!: MeshStandardMaterial
  private tubeGeometry!: TubeGeometry
  private _tubeGeometry_old!: TubeGeometry

  private textureParams: {
    offsetX: number
    offsetY: number
    repeatX: number
    repeatY: number
  } = {
    offsetX: 0,
    offsetY: 0,
    repeatX: 10,
    repeatY: 4
  }

  private scene!: Scene
  private light!: HemisphereLight
  private camera!: PerspectiveCamera
  private renderer!: WebGLRenderer
  private _window: { ww: number; wh: number } = {
    ww: window.innerWidth,
    wh: window.innerHeight
  }

  private speed = 1
  private mouse = {
    position: new Vector2(this._window.ww * 0.5, this._window.wh * 0.5),
    ratio: new Vector2(0, 0),
    target: new Vector2(this._window.ww * 0.5, this._window.wh * 0.5)
  }

  private context: this = this

  constructor() {
    super()
    this.init()
    this.render()
  }

  public render() {
    this.createMesh()
    this.update()
  }

  private update() {
    this.updateMaterialOffset()
    this.updateCurve()
    this.renderer.render(this.scene, this.camera)

    window.requestAnimationFrame(this.render.bind(this.context))
  }

  private animate() {
    const hyperSpace = new TimelineMax({ repeat: -1 })
    hyperSpace.to(this.textureParams, 4, {
      repeatX: 0.3,
      ease: Power1.easeInOut
    })
    hyperSpace.to(
      this.textureParams,
      12,
      {
        offsetX: 8,
        ease: Power2.easeInOut
      },
      0
    )
    hyperSpace.to(
      this.textureParams,
      6,
      {
        repeatX: 10,
        ease: Power2.easeInOut
      },
      '-=5'
    )
  }

  private createMesh() {
    this.points = []
    this.curves = this.getCurves()
    this.tube = this.getTube()

    this.curves.type = 'catmullrom'

    this.geometry = new Geometry()
    this.geometry.vertices = [this.curves.getPoint(70)]

    this.meshLimit()

    this.scene.add(this.tube)
    this.scene.add(this.light)
    this.animate()
  }

  private init(): void {
    this.renderer = new WebGLRenderer({
      antialias: true,
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
  }

  private meshLimit() {
    this.splineMesh = new Line(this.geometry, new LineBasicMaterial())
  }

  private updateMaterialOffset() {
    if (this.tubeMaterial.map) {
      this.tubeMaterial.map.offset.x = this.textureParams.offsetX
      this.tubeMaterial.map.offset.y += 0.001
      this.tubeMaterial.map.repeat.set(
        this.textureParams.repeatX,
        this.textureParams.repeatY
      )
    }
  }

  private updateCurve() {
    let i = 0
    let index = 0
    var vertice_o = null
    var vertice = null
    for (i = 0; i < this.tubeGeometry.vertices.length; i++) {
      vertice_o = this._tubeGeometry_old.vertices[i]
      vertice = this.tubeGeometry.vertices[i]
      index = Math.floor(i / this.tubeGeometry.vertices.length)
      vertice.x +=
        (vertice_o.x + this.splineMesh.geometry.vertices[index].x - vertice.x) /
        15
      vertice.y +=
        (vertice_o.y + this.splineMesh.geometry.vertices[index].y - vertice.y) /
        15
    }

    this.tubeGeometry.verticesNeedUpdate = true

    this.splineMesh.geometry.verticesNeedUpdate = true
    this.splineMesh.geometry.vertices = this.curves.getPoints(70)
  }

  /**
   * On window resize :
   * Update camera
   * Update renderer
   **/
  private onResize() {
    this._window.ww = window.innerWidth
    this._window.wh = window.innerHeight

    this.camera.aspect = this._window.ww / this._window.wh
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(this._window.ww, this._window.wh)
  }

  /*
   * Add 3D vector to points Array
   */
  private getCurves(): CatmullRomCurve3 {
    for (let i = 0; i < 5; i++) {
      this.points.push(new Vector3(0, 0, (2.5 * i) / 4))
    }

    return new CatmullRomCurve3(this.points)
  }

  private getTube(): Mesh {
    this.tubeGeometry = new TubeGeometry(this.curves, 70, 0.02, 50, false)
    this._tubeGeometry_old = this.tubeGeometry.clone()

    this.tubeMaterial = new MeshStandardMaterial({
      side: BackSide,
      color: 0xffffff
    })

    return new Mesh(this.tubeGeometry, this.tubeMaterial)
  }
}
