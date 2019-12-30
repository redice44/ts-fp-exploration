import { compose, curryN } from '../fp';

type position = {
  x: number;
  y: number;
};
type direction = 'horizontal' | 'vertical';

const _move = (
  direction: direction,
  scale: number,
  position: position
): position => {
  const updatedPosition = { ...position };
  direction === 'horizontal'
    ? (updatedPosition.x += scale)
    : (updatedPosition.y += scale);
  return updatedPosition;
};

const move = curryN(2, _move);

export const moveVertical = move('vertical');
export const moveHorizontal = move('horizontal');
export const moveUp = moveVertical(1);
export const moveDown = moveVertical(-1);
export const moveRight = moveHorizontal(1);
export const moveLeft = moveHorizontal(-1);
