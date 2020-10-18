import { License, ShareAdapt } from '.'

export const audioLicense: License = {
  snails: {
    title: 'Snails House-Pixel Galaxy (Lone Alpha)',
    creator: [
      {
        title: 'Lone Alpha',
        link: 'https://soundcloud.com/lonealphamusic'
      },
      { title: "Ujico*/Snail's House", link: 'https://soundcloud.com/ujico' }
    ],
    source:
      'https://soundcloud.com/lonealphamusic/snails-house-pixel-galaxy-lone-alpha-remix',
    cover: '/pictures/lone_alpha.jpg',
    license: ShareAdapt
  },
  killbill: {
    title: '',
    creator: [
      {
        title: 'Rav',
        link: 'https://iamrav.bandcamp.com/'
      },
      {
        title: 'Kill Bill: The Rapper',
        link: 'https://soundcloud.com/kill-bill-on-the-beat'
      }
    ],
    source: 'https://www.youtube.com/watch?v=MZjB4JHo7pk',
    cover: '/pictures/rav.jpg',
    license: ShareAdapt
  }
}
