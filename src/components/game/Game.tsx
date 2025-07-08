import GameBoard from 'components/game-board/GameBoard'
import GameControls from 'components/game-control/GameControl'
import GameFooter from 'components/game-footer/GameFooter'
import GameHeader from 'components/game-header/GameHeader'
import GameInfo from 'components/game-info/GameInfo'
import { useAutoPlay, useGameTimer } from 'hooks'
import React from 'react'

const GameContainer: React.FC = () => {
  useGameTimer()
  useAutoPlay()

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4'>
      <div className='bg-white rounded-lg shadow-lg p-6 w-full max-w-4xl'>
        <div className='mb-4'>
          <GameHeader />
          <GameInfo />
          <GameControls />
        </div>
        <GameBoard />
        <GameFooter />
      </div>
    </div>
  )
}

export const Game: React.FC = () => {
  return <GameContainer />
}
