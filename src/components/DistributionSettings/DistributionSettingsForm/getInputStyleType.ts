type StyleType = 'defaultClear' | 'defaultBrick' | 'brickDefault' | 'brick';

export const getFieldStyleType = (index: number, length: number): StyleType => {
  const isLast = index === length - 1;
  const isFirst = index === 0;
  if (isFirst) {
    return length <= 2 ? 'defaultClear' : 'defaultBrick';
  }
  if (isLast) {
    return 'brickDefault';
  }
  return 'brick';
};
