const SUBMIT_BID = 'bidding-game/SUBMIT_BID';

export function submitBid(playerId, bid) {
  return {
    type: SUBMIT_BID,
    playerId,
    bid
  }
}

const initialPlayerState = {
  balance: 100,
  currentBid: null
};

const initialState = {
  item: {
    min: 0,
    max: 7,
    current: 3,
    firstPlayerHasTiebreaker: true
  },
  players: {
    0: initialPlayerState,
    1: initialPlayerState
  },
  gameOver: false
};

export default function reducer(state = initialState, action) {
  if (action.type === SUBMIT_BID) {
    return {
      ...state,
      item: updateItem(state, action)
    };
  }
  return state;
}

function updateItem(fullState, action) {
  const bids = [
    action.playerId === 0 ? action.bid : fullState.players[0].currentBid,
    action.playerId === 1 ? action.bid : fullState.players[1].currentBid,
  ];

  if (bids[0] === null || bids[1] === null) {
    return fullState.item;
  }

  let delta;
  let tied = false;
  if (bids[0] < bids[1]) {
    delta = -1;
  } else if (bids[0] > bids[1]) {
    delta = 1;
  } else {
    tied = true;
    delta = fullState.firstPlayerHasTiebreaker ? -1 : 1;
  }

  return {
    ...fullState.item,
    current: fullState.current + tieBreaker,
    firstPlayerHasTiebreaker: tied ? !fullState.item.firstPlayerHasTiebreaker :
      fullState.item.firstPlayerHasTiebreaker,
    tieBreaker: (fullState.tieBreaker + (tied ? 1 : 0)) % 2
  };
}
