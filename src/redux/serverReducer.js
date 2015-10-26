import { combineReducers } from 'redux';

// actions
export const ACTIVATE_PLAYER = 'bidding-game/client/ACTIVATE_PLAYER';
export const SUBMIT_BID = 'bidding-game/client/SUBMIT_BID';
export const SERVER_UPDATE = 'bidding-game/server/SERVER_UPDATE';
export const RESOLVE_BIDS = 'bidding-game/server/RESOLVE_BIDS';

export const NO_BID = null;

// action creators
export function activatePlayer(playerIndex) {
  return {
    type: ACTIVATE_PLAYER,
    playerIndex
  };
}

export function submitBid(playerId, bid) {
  return {
    type: SUBMIT_BID,
    playerId,
    bid
  }
}

export function serverUpdate(state) {
  // TODO - perhaps we strip private info here?
  return {
    type: SERVER_UPDATE,
    state
  };
}

export function resolveBids(rootState) {
  return {
    type: RESOLVE_BIDS,
    rootState
  };
}

// middleware
export const resolveBidsIfNecessary = store => next=> action=> {
  next(action);
  if (action.type === SUBMIT_BID) {
    const nextState = store.getState();

    const [ p1DidBid, p2DidBid ] = nextState.bidThisRound;
    if (p1DidBid && p2DidBid) {
      store.dispatch(resolveBids(nextState));
    }
    // Don't alert client in this case until we've resolved
  } else {
    // TODO - let client know about changes
  }
};

// reducers
const initialStateItem = {
  min: 0,
  max: 6,
  current: 3
};

export default combineReducers({
  item,
  round,
  gameOver,
  tieBreaker,
  balance,
  bidThisRound,
  serverOnly
});

function item(state = initialStateItem, action) {
  if (action.type === RESOLVE_BIDS) {
    const { rootState } = action;
    throw new Error('NYI');
  }
  return state;
}

function round(state = 1, action) {
  if (action.type === RESOLVE_BIDS) {
    return state + 1;
  }
  return state;
}

function gameOver(state = false, action) {
  if (action.type === RESOLVE_BIDS) {
    throw new Error('NYI');
  }
  return state;
}

function tieBreaker(state = [true, false], action) {
  if (action.type === RESOLVE_BIDS) {
    const { rootState } = action;
    const [bid1, bid2] = rootState.serverOnly.bids;
    if (bid1 === bid2) {
      // swap who has the tie breaker
      return state.map(tie => !tie);
    }
  }
  return state;
}

function balance(state = [100, 100], action) {
  if (action.type === RESOLVE_BIDS) {
    throw new Error('NYI');
  }
  return state;
}

function bidThisRound(state = [false, false], action) {
  if (action.type === SUBMIT_BID) {
    const { playerId } = action;
    if (playerId > state.length) {
      throw new Error(`Invalid playerId: ${playerId}`);
    }
    if (state[playerId]) {
      throw new Error(`Already have a bid for: ${playerId}`);
    }
    return state.map((didBid, index) => didBid || index === playerId);
  } else if (action.type === RESOLVE_BIDS) {
    return [false, false];
  }
  return state;
}

const serverOnly = combineReducers({
  bids: serverOnlyBids
});

function serverOnlyBids(state = [NO_BID, NO_BID], action) {
  if (action.type === SUBMIT_BID) {
    const { playerId, bid } = action;
    if (playerId > state.length) {
      throw new Error(`Invalid playerId: ${playerId}`);
    }
    if (state[playerId] !== NO_BID) {
      throw new Error(`Already have a bid for: ${playerId}`);
    }
    return state.map((existingBid, index) => index === playerId ? bid : existingBid);
  } else if (action.type === RESOLVE_BIDS) {
    return [NO_BID, NO_BID];
  }
  return state;
}
