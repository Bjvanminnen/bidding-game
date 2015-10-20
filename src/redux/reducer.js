const SUBMIT_BID = 'bidding-game/SUBMIT_BID';

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
    max: 7,
    current: 3,
    firstPlayerHasTiebreaker: true
  },
  players: [0, 1].map(() => initialPlayerState),
  gameOver: false
};

export default function reducer(state = initialState, action) {
  if (action.type === SUBMIT_BID) {
    return {
      ...state,
      item: updateItem(state, action),
      players: updatePlayers(state, action)
    };
  }
  return state;
}

function getCurrentBids(fullState, action) {
  const { playerId, bid } = action;

  return [0, 1].map(id =>  {
    const newBid = playerId === id ? bid : NO_BID;
    const currentBid = fullState.players[id].currentBid;
    if (newBid !== NO_BID && currentBid !== NO_BID) {
      throw new Error(`Player(${id}) already has a current bid`);
    }

    return currentBid || newBid;
  });
}

function updateItem(fullState, action) {
  const { playerId, bid } = action;

  const bids = getCurrentBids(fullState, action);
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
    current: fullState.current + delta,
    firstPlayerHasTiebreaker: tied ? !fullState.item.firstPlayerHasTiebreaker :
      fullState.item.firstPlayerHasTiebreaker,
    tieBreaker: (fullState.tieBreaker + (tied ? 1 : 0)) % 2
  };
}

function updatePlayers(fullState, action) {
  const { playerId, bid } = action;

  const bids = getCurrentBids(fullState, action);

  if (fullState.players[playerId].currentBid !== NO_BID) {
    throw new Error(`already have bid for player: ${playerId}`);
  }

  if (bids[0] !== NO_BID && bids[1] !== NO_BID) {
    // TODO - handle resolution (probably share some logic with updateItem)
    throw new Error('NYI');
    return fullState.players;
  }

  // Not all bids are in yet
  return {
    ...[0, 1].map(id => {
      return {
        ...fullState.players[id],
        currentBid: bids[id]
      };
    })
  };
}
