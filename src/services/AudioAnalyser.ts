import {
  Audio as ThreeAudio,
  AudioListener,
  AudioLoader,
  Camera,
  Object3D
} from 'three'

class AudioAnalyser {
  private listener!: AudioListener
  private audioLoader!: AudioLoader
  private sound!: ThreeAudio

  private options: { volume: number; loop: false } = {
    volume: 0.5,
    loop: false
  }

  public setAudio(camera?: Camera) {
    this.listener = new AudioListener()
    if (camera) this.addToCamera(camera)
    this.sound = new ThreeAudio(this.listener) // Linter, don't ask why...
  }

  // Add audio to camera, so it's audible if camera move
  private addToCamera(camera: Camera) {
    camera.add((this.listener as unknown) as Object3D) // Yeah linter..
  }

  public loadAudio(soundPath: string) {
    this.audioLoader = new AudioLoader()
    // this.audioLoader.load(soundPath, (buffer: AudioBuffer) => {
    //   console.log(buffer)
    //   this.sound.setBuffer(buffer)
    //   this.sound.setLoop(this.options.loop)
    //   this.sound.setVolume(this.options.volume)
    //   this.sound.play()
    // })
    const mediaElement = new Audio(soundPath)
    this.sound.setMediaElementSource(mediaElement)

    mediaElement.play()
  }

  public setVolume(volume: number) {
    this.sound.setVolume(volume)
  }
}
export const audioAnalyser = new AudioAnalyser()
