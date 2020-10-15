import { Object3D, Scene } from 'three'

class SceneService {
  private scene!: Scene

  public create(): void {
    this.scene = new Scene()
  }

  public add3DObject(object3D: Object3D) {
    this.scene.add(object3D)
  }

  public addProperty(prop: string, value: any) {
    //@ts-ignore
    this.scene[prop] = value
  }

  public get(): Scene {
    return this.scene
  }
}

export const scene = new SceneService()
