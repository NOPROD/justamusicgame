import { PerspectiveCamera } from 'three'

class Camera {
  private camera!: PerspectiveCamera

  public create(): void {
    this.camera = new PerspectiveCamera(
      15,
      window.innerWidth / window.innerHeight,
      0.01,
      100
    )
    this.camera.rotation.y = Math.PI
    this.camera.position.z = 0.3
  }

  public create2(): PerspectiveCamera {
    return new PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
  }

  public update(): void {
    this.camera.updateProjectionMatrix()
  }

  public onResize(): void {
    this.camera.aspect = window.innerWidth / window.innerHeight
    this.camera.updateProjectionMatrix()
  }

  public get(): PerspectiveCamera {
    return this.camera
  }
}

export const camera = new Camera()
