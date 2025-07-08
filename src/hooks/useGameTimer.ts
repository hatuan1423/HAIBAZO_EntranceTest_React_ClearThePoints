import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/reduxHooks';
import { incrementTimeElapsed, updateCountdowns } from 'redux/slices/gameSlice';

export const useGameTimer = () => {
  const dispatch = useAppDispatch();
  const { gameStatus, timeElapsed } = useAppSelector(state => state.game);

  useEffect(() => {
    if (gameStatus === 'playing') {
      const timer = setTimeout(() => {
        dispatch(incrementTimeElapsed());
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [gameStatus, timeElapsed, dispatch]);

  useEffect(() => {
    if (gameStatus !== 'playing') return;

    const timer = setInterval(() => {
      dispatch(updateCountdowns());
    }, 100);

    return () => clearInterval(timer);
  }, [gameStatus, dispatch]);
};