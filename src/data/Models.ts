import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'

export const Models: {
  [key: string]: { [key: string]: { url: string; texture: any; gltf?: GLTF } }
} = {
  snails: {
    jellyFish: {
      url: '/3D/snails/jellyFish/source/Comb-jelly.gltf',
      texture: ''
    }
  }
}
