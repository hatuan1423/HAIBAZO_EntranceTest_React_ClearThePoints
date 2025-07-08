import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

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

const initialState: GameState = {
  points: [],
  pointCount: 5,
  timeElapsed: 0,
  gameStatus: 'ready',
  currentLevel: 1,
  autoPlay: false,
  nextNumber: 1,
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setPoints: (state, action: PayloadAction<Point[]>) => {
      state.points = action.payload;
    },
    
    setPointCount: (state, action: PayloadAction<number>) => {
      state.pointCount = Math.max(1, action.payload);
    },
    
    setTimeElapsed: (state, action: PayloadAction<number>) => {
      state.timeElapsed = action.payload;
    },
    
    setGameStatus: (state, action: PayloadAction<GameState['gameStatus']>) => {
      state.gameStatus = action.payload;
    },
    
    setCurrentLevel: (state, action: PayloadAction<number>) => {
      state.currentLevel = action.payload;
    },
    
    setAutoPlay: (state, action: PayloadAction<boolean>) => {
      state.autoPlay = action.payload;
    },
    
    setNextNumber: (state, action: PayloadAction<number>) => {
      state.nextNumber = action.payload;
    },
    
    incrementNextNumber: (state) => {
      state.nextNumber += 1;
    },
    
    incrementTimeElapsed: (state) => {
      state.timeElapsed = parseFloat((state.timeElapsed + 0.1).toFixed(1));
    },
    
    clickPoint: (state, action: PayloadAction<number>) => {
      const pointId = action.payload;
      state.points = state.points.map(p =>
        p.id === pointId
          ? { ...p, isClicked: true, countdown: 3.0 }
          : p
      );
    },
    
    // Thêm action mới để xử lý auto play click
    autoPlayClick: (state) => {
      const targetPoint = state.points.find(p => p.id === state.nextNumber && !p.isClicked);
      if (targetPoint && state.nextNumber <= state.pointCount && state.autoPlay && state.gameStatus === 'playing') {
        // Click point
        state.points = state.points.map(p =>
          p.id === targetPoint.id
            ? { ...p, isClicked: true, countdown: 3.0 }
            : p
        );
        // Increment next number
        state.nextNumber += 1;
      }
    },
    
    updateCountdowns: (state) => {
      let updatedPoints = state.points.map(p => {
        if (p.isClicked && p.countdown && p.countdown > 0) {
          return { ...p, countdown: parseFloat((p.countdown - 0.1).toFixed(1)) };
        }
        return p;
      });

      // Remove points with countdown <= 0
      updatedPoints = updatedPoints.filter(p => p.countdown === undefined || p.countdown > 0);
      
      state.points = updatedPoints;
      
      // Check if game completed
      if (updatedPoints.length === 0) {
        state.gameStatus = 'completed';
      }
    },
    
    startGame: (state, action: PayloadAction<Point[]>) => {
      state.points = action.payload;
      state.timeElapsed = 0;
      state.gameStatus = 'playing';
      state.nextNumber = 1;
    },
    
    restartGame: (state, action: PayloadAction<Point[]>) => {
      state.points = action.payload;
      state.currentLevel = 1;
      state.timeElapsed = 0;
      state.gameStatus = 'playing';
      state.autoPlay = false;
      state.nextNumber = 1;
    },
    
    toggleAutoPlay: (state) => {
      state.autoPlay = !state.autoPlay;
    },
    
    gameOver: (state) => {
      state.gameStatus = 'over';
    },
  },
});

export const {
  setPoints,
  setPointCount,
  setTimeElapsed,
  setGameStatus,
  setCurrentLevel,
  setAutoPlay,
  setNextNumber,
  incrementNextNumber,
  incrementTimeElapsed,
  clickPoint,
  autoPlayClick,
  updateCountdowns,
  startGame,
  restartGame,
  toggleAutoPlay,
  gameOver,
} = gameSlice.actions;

export default gameSlice.reducer;