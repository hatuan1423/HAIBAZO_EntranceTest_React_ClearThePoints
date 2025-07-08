import React from 'react'

interface GameControlsProps {
  pointCount: number
  timeElapsed: number
  gameStatus: string
  autoPlay: boolean
  onPointCountChange: (count: number) => void
  onStartGame: () => void
  onRestartGame: () => void
  onToggleAutoPlay: () => void
}

export const GameControls: React.FC<GameControlsProps> = ({
  pointCount,
  timeElapsed,
  gameStatus,
  autoPlay,
  onPointCountChange,
  onStartGame,
  onRestartGame,
  onToggleAutoPlay
}) => {
  const handlePointCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === '' ? 1 : parseInt(e.target.value) || 1
    onPointCountChange(value)
  }

  return (
    <div className='mb-4'>
      <h1 className='text-2xl font-bold text-gray-800 mb-4'>
        {gameStatus === 'completed' ? 'ALL CLEARED' : gameStatus === 'over' ? 'GAME OVER' : "LET'S PLAY"}
      </h1>

      <div className='flex gap-4 mb-4'>
        <div className='flex items-center gap-2'>
          <span className='text-gray-600'>Points:</span>
          <input
            type='number'
            value={pointCount}
            onChange={handlePointCountChange}
            min='1'
            disabled={gameStatus === 'playing'}
            className='border border-gray-300 px-2 py-1 w-20 text-center disabled:bg-gray-100 disabled:text-gray-500'
            placeholder='1+'
          />
        </div>
        <div className='flex items-center gap-2'>
          <span className='text-gray-600'>Time:</span>
          <span className='font-mono'>{timeElapsed.toFixed(1)}s</span>
        </div>
      </div>

      <div className='flex gap-2 mb-4'>
        <button
          onClick={gameStatus === 'completed' ? onStartGame : onRestartGame}
          className='px-4 py-2 bg-gray-200 hover:bg-gray-300 border border-gray-400 rounded'
        >
          {gameStatus === 'completed' ? 'Continue' : 'Restart'}
        </button>

        {gameStatus === 'ready' && (
          <button onClick={onStartGame} className='px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded'>
            Start Game
          </button>
        )}

        {gameStatus === 'playing' && (
          <button
            onClick={onToggleAutoPlay}
            className={`px-4 py-2 border border-gray-400 rounded ${
              autoPlay ? 'bg-red-200 hover:bg-red-300' : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            Auto Play {autoPlay ? 'OFF' : 'ON'}
          </button>
        )}
      </div>
    </div>
  )
}
