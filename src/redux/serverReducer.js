import { combineReducers } from 'redux';

// actions
export const ACTIVATE_PLAYER = 'bidding-game/client/ACTIVATE_PLAYER';
export const SUBMIT_BID = 'bidding-game/client/SUBMIT_BID';
export const SERVER_UPDATE = 'bidding-game/server/SERVER_UPDATE';
export const RESOLVE_BIDS = 'bidding-game/server/RESOLVE_BIDS';

export const NO_BID = null;

// action creators
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
    if (readyForResolve(nextState)) {
      store.dispatch(resolveBids(nextState));
    }
  }
};

// helper
export function readyForResolve(state) {
  const [ p1DidBid, p2DidBid ] = state.bidThisRound;
  return p1DidBid && p2DidBid;
}

// reducers
const initialStateItem = {
  min: 0,
  max: 6,
  current: 3
};

export default combineReducers({
  item,
  round,
  tieBreaker,
  balance,
  bidThisRound,
  serverOnly: combineReducers({
    bids: serverOnlyBids
  })
});

function item(state = initialStateItem, action) {
  if (action.type === RESOLVE_BIDS) {
    const { tieBreaker, serverOnly } = action.rootState;
    const [bid1, bid2] = serverOnly.bids;

    let delta;
    if (bid1 < bid2) {
      delta = -1;
    } else if (bid1 > bid2) {
      delta = 1;
    } else {
      delta = tieBreaker[0] ? -1 : 1
    }

    if (state.current + delta > state.max || state.current + delta < state.min) {
      throw new Error('Moved item off the board');
    }

    return {
      ...state,
      current: state.current + delta
    }
  }
  return state;
}

function round(state = 1, action) {
  if (action.type === RESOLVE_BIDS) {
    return state + 1;
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
    const { bids } = action.rootState.serverOnly;
    return state.map((current, index) => current - bids[index]);
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

function serverOnlyBids(state = [NO_BID, NO_BID], action) {
  if (action.type === SUBMIT_BID) {
    const { playerId, bid } = action;
    if (playerId > state.length) {
      throw new Error(`Invalid playerId: ${playerId}`);
    }
    if (state[playerId] !== NO_BID) {
      throw new Error(`Already have a bid for: ${playerId}`);
    }
    // TODO - dont have access to balance. should all validation happen in
    // middleware? can we have this in our root reducer?
    // if (bid > rootState.balance[playerId]) {
    //   throw new Error('Bid greater than balance');
    // }
    return state.map((existingBid, index) => index === playerId ? bid : existingBid);
  } else if (action.type === RESOLVE_BIDS) {
    return [NO_BID, NO_BID];
  }
  return state;
}
