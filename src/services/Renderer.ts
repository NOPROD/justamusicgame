import { Camera, Object3D, Scene, WebGLRenderer } from 'three'

class Renderer {
  private renderer!: WebGLRenderer

  public create(): void {
    this.renderer = new WebGLRenderer({
      antialias: false,
      canvas: document.querySelector('#scene') as HTMLCanvasElement
    })
    this.renderer.setSize(window.innerWidth, window.innerHeight)
  }

  public render(element: Scene, camera: Camera) {
    this.renderer.render(element, camera)
  }

  public onResize() {
    this.renderer.setSize(window.innerWidth, window.innerHeight)
  }

  public get(): WebGLRenderer {
    return this.renderer
  }
}

export const renderer = new Renderer()
