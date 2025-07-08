import type { Point } from "redux/slices/gameSlice";

export const generatePoints = (pointCount: number): Point[] => {
  const points: Point[] = [];
  const gameArea = { width: 640, height: 384 };
  const pointSize = 48;
  const margin = 4;

  for (let i = 1; i <= pointCount; i++) {
    let x, y;
    let attempts = 0;

    do {
      x = Math.random() * (gameArea.width - pointSize - margin * 2) + margin;
      y = Math.random() * (gameArea.height - pointSize - margin * 2) + margin;
      attempts++;
    } while (
      points.some(p => Math.abs(p.x - x) < 50 && Math.abs(p.y - y) < 50) &&
      attempts < 50
    );

    points.push({ id: i, x, y, isClicked: false, fadeOut: false });
  }

  return points;
};