import React from 'react'
import { useAppDispatch, useAppSelector } from 'redux/reduxHooks'
import { clickPoint, gameOver, incrementNextNumber } from 'redux/slices/gameSlice'

const GameBoard: React.FC = () => {
  const dispatch = useAppDispatch()
  const { points, gameStatus, nextNumber } = useAppSelector((state) => state.game)

  const handlePointClick = (pointId: number) => {
    if (gameStatus !== 'playing') return

    if (pointId === nextNumber) {
      dispatch(clickPoint(pointId))
      dispatch(incrementNextNumber())
    } else {
      dispatch(gameOver())
    }
  }

  return (
    <div className='relative border-2 border-gray-400 w-full h-96 bg-gray-50 overflow-hidden'>
      {points.map((point) => {
        const opacity = point.countdown !== undefined ? Math.max(0, point.countdown / 3.0) : 1

        return (
          <div
            key={point.id}
            className={`absolute w-12 h-12 rounded-full border-2 border-gray-400 flex items-center justify-center text-sm font-bold transition-all duration-100 ${
              point.isClicked ? 'bg-red-500 text-white' : 'bg-white text-gray-800 hover:bg-gray-100 cursor-pointer'
            }`}
            style={{
              left: `${point.x}px`,
              top: `${point.y}px`,
              zIndex: 1000 - point.id,
              opacity: opacity
            }}
            onClick={() => !point.isClicked && handlePointClick(point.id)}
          >
            {point.countdown !== undefined ? point.countdown.toFixed(1) : point.id}
          </div>
        )
      })}

      {gameStatus === 'ready' && (
        <div className='absolute inset-0 flex items-center justify-center'>
          <div className='text-center'>
            <h2 className='text-xl font-bold text-gray-600 mb-2'>Ready to Play!</h2>
            <p className='text-gray-500'>Click the numbers in order: 1, 2, 3...</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default GameBoard
