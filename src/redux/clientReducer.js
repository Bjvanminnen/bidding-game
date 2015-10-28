import { combineReducers } from 'redux';

// TODO - dedup actions
export const ACTIVATE_PLAYER = 'bidding-game/client/ACTIVATE_PLAYER';
export const SERVER_UPDATE = 'bidding-game/server/SERVER_UPDATE';
export const SUBMIT_BID = 'bidding-game/client/SUBMIT_BID';

export const NO_BID = null;

// action creators
export function activatePlayer(playerIndex) {
  return {
    type: ACTIVATE_PLAYER,
    playerIndex
  };
}

// reducers
function serverState(state = null, action) {
  if (action.type === SERVER_UPDATE) {
    return action.state;
  }
  return state;
}

function activePlayer(state = null, action) {
  if (action.type === ACTIVATE_PLAYER) {
    return action.playerIndex;
  }

  return state;
}

function currentBid(state = [NO_BID, NO_BID], action) {
  if (action.type === SUBMIT_BID) {
    const { playerId, bid } = action;
    return state.map((_, index) => index === playerId ? bid : NO_BID);
  }
  if (action.type === SERVER_UPDATE) {
    const { bidThisRound } = action.state;
    return state.map((_, index) => bidThisRound[index] ? state[index] : NO_BID);
  }
  
  return state;
}

export default combineReducers({
  serverState,
  activePlayer,
  currentBid
});
