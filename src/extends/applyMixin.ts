// https://codeburst.io/multiple-inheritance-with-typescript-mixins-d92d01198907

export function applyMixins(derivedConstructor: any, baseConstructors: any[]) {
  return baseConstructors.forEach(baseConstructor => {
    Object.getOwnPropertyNames(baseConstructor.prototype).forEach(name => {
      Object.defineProperty(
        derivedConstructor.prototype,
        name,
        Object.getOwnPropertyDescriptor(
          baseConstructor.prototype,
          name
        ) as PropertyDescriptor
      )
    })
  })
}
