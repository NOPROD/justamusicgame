export default class Player {
  constructor(private name: string, private score = 0, private music: string) {}

  public setScore(score: number): void {
    this.score = score
  }

  public getScore(): number {
    return this.score
  }

  public getName(): string {
    return this.name
  }

  public getSession(): string {
    return this.music
  }
}
