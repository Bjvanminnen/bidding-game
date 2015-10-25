// TODO - split out server

import { getCurrentBids, resolveBids } from './bidUtils';

export const SUBMIT_BID = 'bidding-game/SUBMIT_BID';

const NO_BID = null;

export function submitBid(playerId, bid) {
  return {
    type: SUBMIT_BID,
    playerId,
    bid
  }
}

const initialPlayerState = {
  balance: 100,
  currentBid: NO_BID
};

const initialState = {
  item: {
    min: 0,
    max: 6,
    current: 3,
    p1TieBreaker: true
  },
  players: [0, 1].map(() => initialPlayerState),
  gameOver: false  
};

export default function reducer(state = initialState, action) {
  if (state.gameOver) {
    throw new Error('game is over');
  }

  if (action.type === SUBMIT_BID) {
    const newItem = item(state, action);
    return {
      ...state,
      item: newItem,
      players: players(state, action),
      gameOver: newItem.current === newItem.min || newItem.current === newItem.max
    };
  }

  return state;
}

// TODO - do item/players belong in their own files?
function item(fullState, action) {
  const { playerId, bid } = action;
  const { item } = fullState;

  const bids = getCurrentBids(fullState, action);
  const { delta, p1TieBreaker } = resolveBids(...bids, item.p1TieBreaker);

  const current = item.current + delta;

  return {
    ...item,
    current,
    p1TieBreaker
  };
}

function players(fullState, action) {
  const { playerId, bid } = action;

  const bids = getCurrentBids(fullState, action);

  if (fullState.players[playerId].currentBid !== NO_BID) {
    throw new Error(`already have bid for player: ${playerId}`);
  }

  const { delta, p1TieBreaker } = resolveBids(...bids, fullState.item.p1TieBreaker);

  return fullState.players.map((player, index) => {
    // TODO - store historical bids
    const currentBid = bids[index];
    return {
      ...player,
      currentBid: delta === 0 ? currentBid : null,
      balance: player.balance - (delta === 0 ? 0 : currentBid)
    };
  });
}
