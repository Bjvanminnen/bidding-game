const MOVE_ITEM = 'bidding-game/itemPosition/MOVE_ITEM';

export function SubmitBid(direction) {
  if (direction !== 'left' && direction !== 'right') {
    throw new Error('unknown direction: ' + direction);
  }
  return {
    type: MOVE_ITEM,
    direction
  }
}

export default function reducer(state = 3, action) {
  if (action.type ===
}
