// components/GameInfo.tsx
import React from 'react'
import { useAppSelector, useAppDispatch } from '../../redux/reduxHooks'
import { setPointCount } from '../../redux/slices/gameSlice'

const GameInfo: React.FC = () => {
  const dispatch = useAppDispatch()
  const { pointCount, timeElapsed, gameStatus } = useAppSelector((state) => state.game)

  const handlePointCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === '' ? 1 : parseInt(e.target.value) || 1
    dispatch(setPointCount(value))
  }

  return (
    <div className='flex flex-col gap-2 mb-4'>
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
  )
}

export default GameInfo
