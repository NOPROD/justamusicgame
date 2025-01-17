export interface License {
  [key: string]: {
    title: string
    creator: Link | Link[]
    source: string
    license: Link
    cover?: string
  }
}

export interface Link {
  title: string
  link: string
}

export * from './Models'
export * from './Audio'
export * from './CC'
