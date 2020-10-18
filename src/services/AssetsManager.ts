import { LoadingManager } from 'three'

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

import { Models } from '@/data/Models'

/**
 * for percent : itemsLoaded / itemsTotal * 100 | 0
 **/
export class AssetsManager {
  public load3DModels(): any {
    var modelHandler: any = {}
    const manager = new LoadingManager()
    const gltfLoader = new GLTFLoader(manager)
    for (const theme of Object.values(Models)) {
      for (const model of Object.values(theme)) {
        gltfLoader.load(model.mesh, gltf => {
          modelHandler[Object.keys(theme)[0]] = gltf // put loaded 3D object to handler
        })
      }
    }

    return modelHandler
  }

  public set3DAnimation(models: any): any {
    Object.values(models).forEach((themes: any) => {
      Object.values(themes).forEach((model: any) => {
        const animsByName: any = {}
        model.animations.forEach((clip: any) => {
          animsByName[clip.name] = clip
        })
        model.animations = animsByName
      })
    })
  }
}

export const assetManager = new AssetsManager()
