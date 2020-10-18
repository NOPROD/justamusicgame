import { LoadingManager } from 'three'

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

import { Models } from '@/data/Models'

/**
 * for percent : itemsLoaded / itemsTotal * 100 | 0
 **/
export class AssetsManager {
  public async load3DModels(): Promise<any> {
    var promises = []
    const manager = new LoadingManager()
    const gltfLoader = new GLTFLoader(manager)
    for (const theme of Object.values(Models)) {
      for (const model of Object.values(theme)) {
        promises.push(
          new Promise(res => {
            gltfLoader.load(model.url, gltf => {
              res({ [Object.keys(theme)[0]]: gltf })
            })
          })
        )
      }
    }
    return Promise.all(promises)
  }

  public set3DAnimation(models: any): any {
    Object.values(models).forEach((model: any) => {
      const animsByName: any = {}
      model.animations.forEach((clip: any) => {
        animsByName[clip.name] = clip
      })
      model.animations = animsByName
    })
    return models
  }
}

export const assetManager = new AssetsManager()
