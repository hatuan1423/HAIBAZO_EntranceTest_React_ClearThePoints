import React from 'react'

interface GameStatusProps {
  gameStatus: string
  nextNumber: number
}

export const GameStatus: React.FC<GameStatusProps> = ({ gameStatus, nextNumber }) => {
  return (
    <div className='mt-4 text-sm text-gray-600'>
      {gameStatus === 'playing' && <span>Next: {nextNumber}</span>}
      {gameStatus === 'completed' && <span className='text-green-600 font-bold'>All Points Cleared!</span>}
      {gameStatus === 'over' && <span className='text-red-600 font-bold'>Game Over!</span>}
    </div>
  )
}
