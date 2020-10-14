import { Audio, AudioLoader, Object3D, PerspectiveCamera } from 'three'

export class AudioAnalyser {
  private listener!: AudioListener
  private audioLoader!: AudioLoader
  private sound!: Audio

  private camera!: PerspectiveCamera

  private options: { volume: number; loop: false } = {
    volume: 0.5,
    loop: false
  }

  constructor(camera: PerspectiveCamera) {
    this.listener = new AudioListener()
    if (camera) this.addToCamera(camera)
    this.sound = new Audio((this.listener as unknown) as THREE.AudioListener) // Linter, don't ask why...
    this.audioLoader = new AudioLoader()
  }

  // Add audio to camera, so it's audible if camera move
  private addToCamera(camera: PerspectiveCamera) {
    this.camera = camera
    this.camera.add((this.listener as unknown) as Object3D) // Yeah linter..
  }

  public load(soundPath: string) {
    this.audioLoader.load(soundPath, (buffer: AudioBuffer) => {
      this.sound.setBuffer(buffer)
      this.sound.setLoop(this.options.loop)
      this.sound.setVolume(this.options.volume)
      this.sound.play()
    })
  }

  public setVolume(volume: number) {
    this.sound.setVolume(volume)
  }
}
