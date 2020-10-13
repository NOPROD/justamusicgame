import {
  Vector3,
  CatmullRomCurve3,
  TubeGeometry,
  MeshStandardMaterial,
  Mesh,
  BackSide,
  RepeatWrapping,
  Scene,
  Vector2,
  WebGLRenderer
} from 'three'

export default class Visualizer {
  private points: Vector3[] = []

  private curves!: CatmullRomCurve3
  private scene!: Scene

  private renderer!: WebGLRenderer
  private _window: { ww: number; wh: number } = {
    ww: window.innerWidth,
    wh: window.innerHeight
  }

  private speed = 8
  private mouse = {
    position: new Vector2(this._window.ww * 0.5, this._window.wh * 0.5),
    ratio: new Vector2(0, 0),
    target: new Vector2(this._window.ww * 0.5, this._window.wh * 0.5)
  }

  constructor() {
    this.scene = new Scene()

    this.curves = this.getCurves()

    this.scene.add(this.getTube())
  }

  private initSettings() {
    this.renderer = new WebGLRenderer({
      antialias: true,
      canvas: document.querySelector('#scene') as HTMLCanvasElement
    })
    this.renderer.setSize(this._window.ww, this._window.wh)
  }

  private getCurves(): CatmullRomCurve3 {
    for (let i = 0; i < 5; i++) {
      this.points.push(new Vector3(0, 0, (2.5 * i) / 4))
    }

    return new CatmullRomCurve3(this.points)
  }

  private getTube() {
    const tubeGeometry = new TubeGeometry(this.curves, 70, 0.02, 50, false)

    const tubeMaterial = new MeshStandardMaterial({
      side: BackSide,
      color: 0xffffff
    })

    // Repeat the pattern to prevent the texture being stretched
    if (tubeMaterial.map) {
      tubeMaterial.map.wrapS = RepeatWrapping
      tubeMaterial.map.wrapT = RepeatWrapping
      tubeMaterial.map.repeat.set(30, 6)
    }

    return new Mesh(tubeGeometry, tubeMaterial)
  }
}
