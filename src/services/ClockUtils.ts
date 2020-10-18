import { Clock } from 'three'

export const getTicks = (clock: Clock, fps: number): number => {
  return Math.round(clock.getDelta() / (1 / fps))
}
