import {
  BoxBufferGeometry,
  CatmullRomCurve3,
  Color,
  IcosahedronBufferGeometry,
  Mesh,
  MeshPhongMaterial,
  SphereBufferGeometry,
  Vector3
} from 'three'

export class Particle {
  public percent!: number
  public burst!: boolean

  private object!:
    | BoxBufferGeometry
    | SphereBufferGeometry
    | IcosahedronBufferGeometry

  private color!: Color

  private radius: number = Math.random() * 0.002 + 0.0003
  private range: number = 200
  private offset: number | Vector3 = 1
  private material!: MeshPhongMaterial

  private mesh!: Mesh

  private speed!: number
  private rotate!: Vector3

  private position!: Vector3

  private grid = [-0.005, +0.007, 0]
  private random = Math.floor(Math.random() * this.grid.length)

  constructor(burst: boolean, time: number) {
    this.object = this.setRandomObject()
    this.color = this.setRandomColor(burst, time)
    this.material = new MeshPhongMaterial({
      color: this.color,
      flatShading: true
    })
    this.mesh = new Mesh(this.object, this.material)
    this.mesh.scale.set(this.radius, this.radius, this.radius)
    this.mesh.position.set(0, 0, 1.5)
    this.percent = burst ? 0.2 : Math.random()
    this.burst = burst
    this.speed = Math.random() * 0.004 + 0.0002
    if (this.burst) this.explode()

    this.rotate = new Vector3(
      -Math.random() * 0.1 + 0.01,
      0,
      Math.random() * 0.01
    )
    this.position = new Vector3(0, 0, 0)
  }

  public update(speed: number, curves: CatmullRomCurve3): void {
    this.percent += this.speed * (this.burst ? 1 : speed)
    this.position = curves.getPoint(1 - (this.percent % 1))
    this.mesh.position.x = this.position.x + this.grid[this.random]
    this.mesh.position.y = this.position.y - 0.003 // -0.003
    this.mesh.position.z = this.position.z + 0.3
    this.mesh.rotation.x += this.rotate.x
    this.mesh.rotation.y += this.rotate.y
    this.mesh.rotation.z += this.rotate.z
  }

  public getMaterial(): Mesh {
    return this.mesh
  }

  private explode(): void {
    this.speed += 0.003
    this.mesh.scale.x *= 1.4
    this.mesh.scale.y *= 1.4
    this.mesh.scale.z *= 1.4
  }

  // Get random particles form
  private setRandomObject():
    | BoxBufferGeometry
    | SphereBufferGeometry
    | IcosahedronBufferGeometry {
    const random = Math.random()
    return random > 0.9
      ? new BoxBufferGeometry(1, 1, 1)
      : random > 0.8
      ? new SphereBufferGeometry(1, 6, 6)
      : new IcosahedronBufferGeometry(1, 0)
  }

  private setRandomColor(burst: boolean, time: number): Color {
    return burst
      ? new Color('hsl(' + time / 50 + ',100%,60%)')
      : new Color(
          'hsl(' +
            (Math.random() * this.range + (this.offset as number)) +
            ',100%,80%)'
        )
  }
}
