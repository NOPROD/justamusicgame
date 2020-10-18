import { LoadingManager } from 'three'

/**
 * for percent : itemsLoaded / itemsTotal * 100 | 0
 **/
export class AssetsManager {
  public load3DModels(
    onEnd: () => {},
    onLoad: (url: string, itemsLoaded: number, itemsTotal: number) => void
  ): void {
    const manager = new LoadingManager()
    manager.onLoad = onEnd
    manager.onProgress = onLoad
  }
}

export const assetManager = new AssetsManager()
