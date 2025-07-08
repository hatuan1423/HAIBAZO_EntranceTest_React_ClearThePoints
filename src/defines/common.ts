export interface Point {
  id: number;
  x: number;
  y: number;
  isClicked: boolean;
  fadeOut: boolean;
  countdown?: number;
}

export interface GameState {
  points: Point[];
  pointCount: number;
  timeElapsed: number;
  gameStatus: 'playing' | 'completed' | 'over' | 'ready';
  currentLevel: number;
  autoPlay: boolean;
  nextNumber: number;
}