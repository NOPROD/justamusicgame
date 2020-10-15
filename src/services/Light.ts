import { HemisphereLight } from 'three'

class Light {
  private light!: HemisphereLight

  create(): void {
    this.light = new HemisphereLight(0xe9eff2, 0x01010f, 1)
  }

  get(): HemisphereLight {
    return this.light
  }
}

export const light = new Light()
