import React, { useEffect } from 'react'
// import { useAppSelector } from '../store/hooks';
// import { useGameActions } from '../hooks/useGameActions';
import { GameBoard } from 'components/game-board'
import { GameControls } from 'components/game-controls'
import { GameStatus } from 'components/game-status'
import { useAppSelector } from 'redux/hook'
import { useGameActions } from 'hooks/useGameActions'
// import { GameBoard } from './GameBoard';
// import { GameControls } from './GameControls';
// import { GameStatus } from 'components/game-status';
// import { GameStatus } from './GameStatus';

export const ClearPoints: React.FC = () => {
  const gameState = useAppSelector((state) => state.game)
  const {
    handleStartGame,
    handleRestartGame,
    handleSetPointCount,
    handleToggleAutoPlay,
    handlePointClick,
    handleUpdateCountdown,
    handleUpdateTimer
  } = useGameActions()

  // Auto play logic
  useEffect(() => {
    if (gameState.autoPlay && gameState.gameStatus === 'playing') {
      const interval = setInterval(() => {
        const targetPoint = gameState.points.find((p) => p.id === gameState.nextNumber && !p.isClicked)
        if (targetPoint) {
          handlePointClick(targetPoint.id)
        }
      }, 800)
      return () => clearInterval(interval)
    }
  }, [gameState.autoPlay, gameState.gameStatus, gameState.nextNumber, gameState.points, handlePointClick])

  // Countdown effect
  useEffect(() => {
    if (gameState.gameStatus !== 'playing') return

    const timer = setInterval(() => {
      handleUpdateCountdown()
    }, 100)

    return () => clearInterval(timer)
  }, [gameState.gameStatus, handleUpdateCountdown])

  // Timer effect
  useEffect(() => {
    if (gameState.gameStatus === 'playing') {
      const timer = setTimeout(() => {
        handleUpdateTimer()
      }, 100)

      return () => clearTimeout(timer)
    }
  }, [gameState.gameStatus, gameState.timeElapsed, handleUpdateTimer])

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4'>
      <div className='bg-white rounded-lg shadow-lg p-6 w-full max-w-4xl'>
        <GameControls
          pointCount={gameState.pointCount}
          timeElapsed={gameState.timeElapsed}
          gameStatus={gameState.gameStatus}
          autoPlay={gameState.autoPlay}
          onPointCountChange={handleSetPointCount}
          onStartGame={handleStartGame}
          onRestartGame={handleRestartGame}
          onToggleAutoPlay={handleToggleAutoPlay}
        />

        <GameBoard
          points={gameState.points}
          nextNumber={gameState.nextNumber}
          gameStatus={gameState.gameStatus}
          onPointClick={handlePointClick}
        />

        <GameStatus gameStatus={gameState.gameStatus} nextNumber={gameState.nextNumber} />
      </div>
    </div>
  )
}
