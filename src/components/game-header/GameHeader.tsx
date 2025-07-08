import React from 'react'
import { useAppSelector } from '../../redux/reduxHooks'

const GameHeader: React.FC = () => {
  const gameStatus = useAppSelector((state) => state.game.gameStatus)

  return (
    <h1 className='text-2xl font-bold mb-4'>
      {gameStatus === 'completed' ? (
        <span className='text-green-600'>ALL CLEARED</span>
      ) : gameStatus === 'over' ? (
        <span className='text-red-600'>GAME OVER</span>
      ) : (
        <span className='text-gray-800'>LET'S PLAY</span>
      )}
    </h1>
  )
}

export default GameHeader
