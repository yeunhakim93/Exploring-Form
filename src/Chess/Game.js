let knightPosition = [0, 0];
let observer = null;

function emitChange() {
  observer(knightPosition);
}

export function observe(o) {
  if (observer) {
    throw new Error("Multiple observers not implemented.");
  }

  observer = o;
  emitChange();
}

export function moveKnight(toX, toY) {
  knightPosition = [toX, toY];
  emitChange();
}

export function canMoveKnight(toX, toY) {
  return (
    (Math.abs(toX - knightPosition[0]) === 2 &&
      Math.abs(toY - knightPosition[1]) === 1) ||
    (Math.abs(toX - knightPosition[0]) === 1 &&
      Math.abs(toY - knightPosition[1]) === 2)
  );
}
