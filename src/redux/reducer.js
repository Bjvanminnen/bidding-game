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
    p1TieBreaker: true
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

/**
 * Given current state and action, calculate what each player is bidding this
 * turn.
 * @returns {(number|null)[]}
 */
function getCurrentBids(fullState, action) {
  const { playerId, bid } = action;

  return [0, 1].map(id =>  {
    const newBid = playerId === id ? bid : NO_BID;
    const currentBid = fullState.players[id].currentBid;
    if (newBid !== NO_BID && currentBid !== NO_BID) {
      throw new Error(`Player(${id}) already has a current bid`);
    }

    if (newBid !== NO_BID && newBid > fullState.players[id].balance) {
      throw new Error('bid too high');
    }

    return currentBid || newBid;
  });
}

function updateItem(fullState, action) {
  const { playerId, bid } = action;
  const { item } = fullState;

  const bids = getCurrentBids(fullState, action);
  const { delta, p1TieBreaker } = resolveBids(...bids, item.p1TieBreaker);

  return {
    ...item,
    current: item.current + delta,
    p1TieBreaker
  };
}

function updatePlayers(fullState, action) {
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

function resolveBids(bid1, bid2, p1TieBreaker) {
  if (bid1 === NO_BID || bid2 === NO_BID) {
    return { delta: 0, p1TieBreaker };
  }

  let delta;
  let tied = false;
  if (bid1 < bid2) {
    delta = -1;
  } else if (bid1 > bid2) {
    delta = 1;
  } else {
    tied = true;
    delta = p1TieBreaker ? -1 : 1;
  }

  return {
    delta,
    p1TieBreaker: tied ? !p1TieBreaker : p1TieBreaker
  };
}
