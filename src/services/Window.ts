import { camera, renderer } from '@/services'

export class WindowService {
  public handleEvents(): void {
    window.addEventListener('resize', this.onResize.bind(this), false)
  }

  /**
   * On window resize :
   * Update camera
   * Update renderer
   **/
  private onResize(): void {
    camera.onResize()
    renderer.onResize()
  }
}

export const windowService = new WindowService()
