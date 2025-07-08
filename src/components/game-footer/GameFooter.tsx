import React from 'react'
import { useAppSelector } from 'redux/reduxHooks'

const GameFooter: React.FC = () => {
  const { gameStatus, nextNumber, pointCount } = useAppSelector((state) => state.game)

  return (
    <div className='mt-4 text-sm text-gray-600'>
      {gameStatus === 'playing' && nextNumber <= pointCount && <span>Next: {nextNumber}</span>}
    </div>
  )
}

export default GameFooter
