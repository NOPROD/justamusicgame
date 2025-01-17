import {
  Vector3,
  CatmullRomCurve3,
  TubeGeometry,
  MeshStandardMaterial,
  Mesh,
  BackSide,
  Vector2,
  Geometry,
  Line,
  LineBasicMaterial
} from 'three'

export class Visualizer {
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

  private _window: { ww: number; wh: number } = {
    ww: window.innerWidth,
    wh: window.innerHeight
  }

  private prevTime = 0
  private path = {
    position: new Vector2(this._window.ww * 0.5, this._window.wh * 0.7),
    ratio: new Vector2(0, 0),
    target: new Vector2(this._window.ww * 0.5, this._window.wh * 0.7)
  }

  public getTime(): number {
    return this.prevTime
  }

  public update(time?: number): void {
    if (time) this.prevTime = time
    this.updateMaterialOffset()
    this.updateCurve()
  }

  public createMesh(): void {
    this.points = []
    this.curves = this.createCurves()
    this.tube = this.createTube()

    this.curves.type = 'catmullrom'

    this.geometry = new Geometry()
    this.geometry.vertices = [this.curves.getPoint(70)]

    this.meshLimit()
  }

  public getTube(): Mesh {
    return this.tube
  }

  public getCurves(): CatmullRomCurve3 {
    return this.curves
  }

  private meshLimit(): void {
    this.splineMesh = new Line(this.geometry, new LineBasicMaterial())
  }

  private updateMaterialOffset(): void {
    if (this.tubeMaterial.map) {
      this.tubeMaterial.map.offset.x = this.textureParams.offsetX
      this.tubeMaterial.map.offset.y += 0.001
      this.tubeMaterial.map.repeat.set(
        this.textureParams.repeatX,
        this.textureParams.repeatY
      )
    }
  }

  private updateCurve(): void {
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
    this.path.position.x += (this.path.target.x - this.path.position.x) / 30
    this.path.position.y += (this.path.target.y - this.path.position.y) / 30

    this.path.ratio.x = this.path.position.x / this._window.ww
    this.path.ratio.y = this.path.position.y / this._window.wh

    this.curves.points[2].x = 0.6 * (1 - this.path.ratio.x) - 0.3
    this.curves.points[3].x = 0
    this.curves.points[4].x = 0.6 * (1 - this.path.ratio.x) - 0.3

    this.curves.points[2].y = 0.6 * (1 - this.path.ratio.y) - 0.3
    this.curves.points[3].y = 0
    this.curves.points[4].y = 0.6 * (1 - this.path.ratio.y) - 0.3

    this.splineMesh.geometry.verticesNeedUpdate = true
    this.splineMesh.geometry.vertices = this.curves.getPoints(70)
  }

  /*
   * Divide Tunnel into 5 parts
   * points[4].y = -0.06 >>> It's the end of tunnel, the last segment, so don't see a black hole
   */
  private createCurves(): CatmullRomCurve3 {
    for (let i = 0; i < 5; i++) {
      this.points.push(new Vector3(0, 0, (2.5 * i) / 4))
    }
    this.points[4].y = 0.5
    return new CatmullRomCurve3(this.points)
  }

  private createTube(): Mesh {
    this.tubeGeometry = new TubeGeometry(this.curves, 70, 0.02, 30, false)
    this._tubeGeometry_old = this.tubeGeometry.clone()

    this.tubeMaterial = new MeshStandardMaterial({
      side: BackSide,
      color: 0xffffff
    })

    return new Mesh(this.tubeGeometry, this.tubeMaterial)
  }
}

export const visualizer = new Visualizer()
