import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'

export const Models: {
  [key: string]: { [key: string]: { mesh: string; texture: any; gltf?: GLTF } }
} = {
  snails: {
    jellyFish: {
      mesh: '/3D/snails/jellyFish/source/Comb-jelly.gltf',
      texture: ''
    }
  },
  test: {
    test436: {
      mesh: '/3D/snails/jellyFish/source/Comb-jelly.gltf',
      texture: ''
    }
  },
  foo: {
    bar: {
      mesh: '/3D/snails/jellyFish/source/Comb-jelly.gltf',
      texture: ''
    }
  }
}
