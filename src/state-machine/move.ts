import { compose, curryN } from '../fp';

export type position = {
  x: number;
  y: number;
};
export type direction = 'horizontal' | 'vertical';

export const move = curryN(
  2,
  (direction: direction, scale: number, position: position): position => {
    const updatedPosition = { ...position };
    direction === 'horizontal'
      ? (updatedPosition.x += scale)
      : (updatedPosition.y += scale);
    return updatedPosition;
  }
);

export const moveVertical = move('vertical');
export const moveHorizontal = move('horizontal');
export const moveUp = moveVertical(1);
export const moveDown = moveVertical(-1);
export const moveRight = moveHorizontal(1);
export const moveLeft = moveHorizontal(-1);
