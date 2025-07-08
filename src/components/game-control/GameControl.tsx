import { generatePoints } from 'utils/gameUtils'
import { useAppDispatch, useAppSelector } from 'redux/reduxHooks'
import { restartGame, startGame, toggleAutoPlay } from 'redux/slices/gameSlice'

const GameControls: React.FC = () => {
  const dispatch = useAppDispatch()
  const { gameStatus, pointCount, autoPlay, nextNumber } = useAppSelector((state) => state.game)

  const handleStartGame = () => {
    const points = generatePoints(pointCount)
    dispatch(startGame(points))
  }

  const handleRestartGame = () => {
    const points = generatePoints(pointCount)
    dispatch(restartGame(points))
  }

  const handleToggleAutoPlay = () => {
    dispatch(toggleAutoPlay())
  }

  return (
    <div className='flex gap-2 mb-4'>
      {gameStatus === 'ready' && (
        <button onClick={handleStartGame} className='px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded'>
          Play
        </button>
      )}

      {gameStatus === 'playing' && (
        <>
          <button
            onClick={handleRestartGame}
            className='px-4 py-2 bg-gray-200 hover:bg-gray-300 border border-gray-400 rounded'
          >
            Restart
          </button>

          {nextNumber <= pointCount && (
            <button
              onClick={handleToggleAutoPlay}
              className={`px-4 py-2 border border-gray-400 rounded ${
                autoPlay ? 'bg-red-200 hover:bg-red-300' : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              Auto Play {autoPlay ? 'OFF' : 'ON'}
            </button>
          )}
        </>
      )}

      {(gameStatus === 'completed' || gameStatus === 'over') && (
        <button onClick={handleRestartGame} className='px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded'>
          Restart
        </button>
      )}
    </div>
  )
}

export default GameControls
