import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from 'redux/reduxHooks'
import { autoPlayClick } from 'redux/slices/gameSlice'

export const useAutoPlay = () => {
  const dispatch = useAppDispatch()
  const { autoPlay, gameStatus } = useAppSelector((state) => state.game)

  useEffect(() => {
    if (autoPlay && gameStatus === 'playing') {
      const interval = setInterval(() => {
        dispatch(autoPlayClick())
      }, 800)

      return () => clearInterval(interval)
    }
  }, [autoPlay, gameStatus, dispatch])
}
