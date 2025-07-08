import type { Point } from 'defines'
import React from 'react'

interface GameBoardProps {
  points: Point[]
  nextNumber: number
  gameStatus: string
  onPointClick: (pointId: number) => void
}

export const GameBoard: React.FC<GameBoardProps> = ({ points, nextNumber, gameStatus, onPointClick }) => {
  return (
    <div className='relative border-2 border-gray-400 w-full h-96 bg-gray-50 overflow-hidden'>
      {points.map((point) => (
        <div
          key={point.id}
          className={`absolute w-12 h-12 rounded-full border-2 border-gray-400 flex items-center justify-center text-sm font-bold transition-all duration-300 ${
            point.isClicked
              ? 'bg-red-500 text-white'
              : point.id === nextNumber
                ? 'bg-red-400 text-white hover:bg-red-500 cursor-pointer'
                : 'bg-white text-gray-800 hover:bg-gray-100 cursor-pointer'
          }`}
          style={{
            left: `${point.x}px`,
            top: `${point.y}px`,
            zIndex: 1000 - point.id
          }}
          onClick={() => !point.isClicked && onPointClick(point.id)}
        >
          {point.countdown !== undefined ? point.countdown.toFixed(1) : point.id}
        </div>
      ))}

      {gameStatus === 'ready' && (
        <div className='absolute inset-0 flex items-center justify-center'>
          <div className='text-center'>
            <h2 className='text-xl font-bold text-gray-600 mb-2'>Click Start to Begin!</h2>
            <p className='text-gray-500'>Click the numbers in order: 1, 2, 3...</p>
          </div>
        </div>
      )}
    </div>
  )
}
