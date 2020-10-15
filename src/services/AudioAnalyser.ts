import { Audio, AudioLoader, Object3D } from 'three'

class AudioAnalyser {
  [x: string]: any // Cause of extends >> Linter

  private listener!: AudioListener
  private audioLoader!: AudioLoader
  private sound!: Audio

  private options: { volume: number; loop: false } = {
    volume: 0.5,
    loop: false
  }

  public setAudio() {
    this.listener = new AudioListener()
    if (this.camera) this.addToCamera()
    this.sound = new Audio((this.listener as unknown) as THREE.AudioListener) // Linter, don't ask why...
    this.audioLoader = new AudioLoader()
  }

  // Add audio to camera, so it's audible if camera move
  private addToCamera() {
    this.camera.add((this.listener as unknown) as Object3D) // Yeah linter..
  }

  public loadAudio(soundPath: string) {
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
export const audioAnalyser = new AudioAnalyser()
