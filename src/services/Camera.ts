import { PerspectiveCamera } from 'three'

class Camera {
  private camera!: PerspectiveCamera

  public create(): void {
    this.camera = new PerspectiveCamera(
      15,
      window.innerWidth / window.innerHeight,
      0.01,
      1000
    )
    this.camera.rotation.y = Math.PI
    this.camera.position.z = 0.35
  }

  public update() {
    this.camera.updateProjectionMatrix()
  }

  public onResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight
    this.camera.updateProjectionMatrix()
  }

  public get(): PerspectiveCamera {
    return this.camera
  }
}

export const camera = new Camera()
