import {
  Audio as ThreeAudio,
  AudioAnalyser as ThreeAudioAnalyser,
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

  public loadAudio(sound: any) {
    const mediaElement = new Audio(sound)
    this.sound.setMediaElementSource(mediaElement)
    mediaElement.play()
    this.analyse()
  }

  public analyse() {
    const analyser = new ThreeAudioAnalyser(this.sound, 32)
    setInterval(() => {
      console.log(analyser.getFrequencyData())
      console.log(analyser.getAverageFrequency())
    }, 1000)
  }

  public setVolume(volume: number) {
    this.sound.setVolume(volume)
  }
}
export const audioAnalyser = new AudioAnalyser()
